import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "../..");
const PRESENTATION_ROOT = path.join(REPO_ROOT, "public", "presentations");
const MOTION_REFERENCE =
  './narration/beat-breeze-motion/controller.js?v=2026-09-02-5';
const VIETNAMESE_MOTION_REFERENCE =
  './narration/beat-breeze-motion/controller.js?v=2026-09-03-1';
const MOTION_CONTROLLER = path.join(
  PRESENTATION_ROOT,
  "narration",
  "beat-breeze-motion",
  "controller.js",
);
const RETIRED_PREVIEW = path.join(
  PRESENTATION_ROOT,
  "beat-breeze-motion-preview.html",
);

const decks = [
  {
    locale: "en",
    path: path.join(PRESENTATION_ROOT, "beat-breeze.html"),
    languageMarker: "<html>",
    narration: "./narration/beat-breeze-voice-preview/controller.js",
  },
  {
    locale: "th",
    path: path.join(PRESENTATION_ROOT, "beat-breeze-th.html"),
    languageMarker: '<html lang="th">',
    narration: "./narration/beat-breeze-voice-preview-th/controller.js",
  },
  {
    locale: "zh",
    path: path.join(PRESENTATION_ROOT, "beat-breeze-zh.html"),
    languageMarker: '<html lang="zh-CN">',
    narration: "./narration/beat-breeze-zh/controller.js",
  },
  {
    locale: "vi",
    path: path.join(PRESENTATION_ROOT, "beat-breeze-vi.html"),
    languageMarker: '<html lang="vi">',
    narration: "./narration/beat-breeze-vi/controller.js",
    motionReference: VIETNAMESE_MOTION_REFERENCE,
  },
];

if (existsSync(RETIRED_PREVIEW)) {
  throw new Error("The retired Beat Breeze motion-preview route still exists.");
}
if (!existsSync(MOTION_CONTROLLER)) {
  throw new Error("The official shared motion controller is missing.");
}

for (const deck of decks) {
  const html = readFileSync(deck.path, "utf8");
  if (!html.includes(deck.languageMarker)) {
    throw new Error(`${deck.locale}: document language marker is missing.`);
  }
  if (!html.includes(deck.narration)) {
    throw new Error(`${deck.locale}: localized narration controller is missing.`);
  }
  if (!html.includes(deck.motionReference || MOTION_REFERENCE)) {
    throw new Error(`${deck.locale}: official motion controller is missing or stale.`);
  }
  const templateMarker = '<script type="__bundler/template">';
  const templateStart = html.indexOf(templateMarker) + templateMarker.length;
  const templateEnd = html.indexOf("</script>", templateStart);
  if (templateStart < templateMarker.length || templateEnd < templateStart) {
    throw new Error(`${deck.locale}: packed slide template is missing.`);
  }
  const template = JSON.parse(html.slice(templateStart, templateEnd).trim());
  const slides = [...template.matchAll(/<section\b[^>]*data-label="[^"]+"/g)];
  if (slides.length !== 15) {
    throw new Error(`${deck.locale}: expected 15 slides, found ${slides.length}.`);
  }
}

const controller = readFileSync(MOTION_CONTROLLER, "utf8");
for (const required of [
  'const VERSION = "2026-09-03-official-2"',
  "const ENGLISH_CUE_TIMELINES",
  "const THAI_CUE_TIMELINES",
  "const CHINESE_CUE_TIMELINES",
  "const VIETNAMESE_CUE_TIMELINES",
  'focusStyle: "subtle lift and brightness"',
]) {
  if (!controller.includes(required)) {
    throw new Error(`Motion controller contract is incomplete: ${required}`);
  }
}
if (controller.includes("bbm-cue-surface::before") || controller.includes("drop-shadow")) {
  throw new Error("The retired orange focus frame or shadow has returned.");
}

console.log(
  "PASS: English, Thai, Chinese, and Vietnamese official decks each contain 15 slides, localized narration, and the shared subtle-motion controller; the preview route is removed.",
);
