import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "../..");
const PRESENTATIONS_ROOT = path.join(REPO_ROOT, "public", "presentations");
const SELECTOR_PATH = path.join(
  PRESENTATIONS_ROOT,
  "narration",
  "beat-breeze-language-selector",
  "controller.js",
);
const NARRATION_CONTROLLER_PATH = path.join(
  PRESENTATIONS_ROOT,
  "narration",
  "beat-breeze-localized",
  "controller.js",
);
const MOTION_CONTROLLER_PATH = path.join(
  PRESENTATIONS_ROOT,
  "narration",
  "beat-breeze-motion",
  "controller.js",
);
const LOCALES = {
  ko: {
    language: "ko-KR",
    html: "ko",
    name: "Korean",
    title: "Beat Breeze — 제품 개요 2026 (한국어)",
    characters: /[가-힣]/,
  },
  ja: {
    language: "ja-JP",
    html: "ja",
    name: "Japanese",
    title: "Beat Breeze — 製品概要 2026（日本語）",
    characters: /[ぁ-んァ-ヶ一-龯]/,
  },
  ar: {
    language: "ar",
    html: "ar",
    name: "Arabic",
    title: "Beat Breeze — نظرة عامة على المنتج 2026 (العربية)",
    characters: /[\u0600-\u06FF]/,
    direction: "rtl",
  },
};
const ALL_DECKS = [
  "beat-breeze.html",
  "beat-breeze-th.html",
  "beat-breeze-zh.html",
  "beat-breeze-vi.html",
  "beat-breeze-id.html",
  "beat-breeze-ms.html",
  "beat-breeze-ko.html",
  "beat-breeze-ja.html",
  "beat-breeze-ar.html",
];

const fail = (message) => {
  throw new Error(message);
};
const sha256Buffer = (buffer) =>
  createHash("sha256").update(buffer).digest("hex");
const sha256File = (file) => sha256Buffer(readFileSync(file));
const closeEnough = (left, right, tolerance) =>
  Math.abs(Number(left) - Number(right)) <= tolerance;
const decodeLabel = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

for (const required of [
  path.join(PRESENTATIONS_ROOT, "soundtrack.html"),
  SELECTOR_PATH,
  NARRATION_CONTROLLER_PATH,
  MOTION_CONTROLLER_PATH,
  ...ALL_DECKS.map((deck) => path.join(PRESENTATIONS_ROOT, deck)),
]) {
  if (!existsSync(required)) fail(`Required presentation artifact is missing: ${required}`);
}

const selector = readFileSync(SELECTOR_PATH, "utf8");
const narrationController = readFileSync(NARRATION_CONTROLLER_PATH, "utf8");
const motionController = readFileSync(MOTION_CONTROLLER_PATH, "utf8");
for (const deckName of ALL_DECKS) {
  const deck = readFileSync(path.join(PRESENTATIONS_ROOT, deckName), "utf8");
  if (
    (
      deck.match(
        /beat-breeze-language-selector\/controller\.js\?v=2026-09-03-2/g,
      ) || []
    ).length !== 1
  ) {
    fail(`Language selector is missing or duplicated in ${deckName}.`);
  }
  if (!selector.includes(deckName)) {
    fail(`Language selector does not offer ${deckName}.`);
  }
}
if (
  !selector.includes("slideHash") ||
  !selector.includes("aria-haspopup") ||
  !selector.includes('event.key === "Escape"') ||
  !selector.includes("prefers-reduced-motion")
) {
  fail("Language selector accessibility or slide-preservation behavior is incomplete.");
}
if (
  selector.includes('role="menuitem" dir="${locale.dir}"') ||
  !selector.includes('<span dir="${locale.dir}">${locale.name}</span>') ||
  !selector.includes("direction: ltr;") ||
  !selector.includes("unicode-bidi: isolate;")
) {
  fail("Language selector must isolate label direction without moving RTL rows.");
}

for (const [localeCode, locale] of Object.entries(LOCALES)) {
  const presentation = `beat-breeze-${localeCode}`;
  const root = path.join(PRESENTATIONS_ROOT, "narration", presentation);
  const officialPath = path.join(PRESENTATIONS_ROOT, `${presentation}.html`);
  const scriptPath = path.join(root, "script.json");
  const copyPath = path.join(root, "copy.json");
  const manifestPath = path.join(root, "manifest.json");
  for (const required of [officialPath, scriptPath, copyPath, manifestPath]) {
    if (!existsSync(required)) fail(`Required ${locale.name} artifact is missing: ${required}`);
  }

  const official = readFileSync(officialPath, "utf8");
  const script = JSON.parse(readFileSync(scriptPath, "utf8"));
  const copy = JSON.parse(readFileSync(copyPath, "utf8"));
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (
    !official.includes(
      `<html lang="${locale.html}" dir="${locale.direction || "ltr"}">`,
    ) ||
    !official.includes(`<title>${locale.title}</title>`) ||
    !official.includes(
      "./narration/beat-breeze-localized/controller.js?v=2026-09-03-1",
    ) ||
    !official.includes(
      "./narration/beat-breeze-motion/controller.js?v=2026-09-03-5",
    )
  ) {
    fail(`The official ${locale.name} deck is missing its language, title, or controllers.`);
  }
  if (Object.keys(copy).length !== 220) {
    fail(`${locale.name} on-screen copy must contain all 220 source phrases.`);
  }
  if (
    script.deck !== "beat-breeze" ||
    script.presentation !== presentation ||
    script.language !== locale.language ||
    script.slides.length !== 15 ||
    !script.slides.every(
      (slide) =>
        locale.characters.test(slide.text) &&
        Array.isArray(slide.visualCoverage) &&
        slide.visualCoverage.length,
    )
  ) {
    fail(`The ${locale.name} presenter script is incomplete or not localized.`);
  }

  const marker = '<script type="__bundler/template">';
  const start = official.indexOf(marker) + marker.length;
  const end = official.indexOf("</script>", start);
  const template = JSON.parse(official.slice(start, end).trim());
  const deckLabels = [
    ...template.matchAll(/<section\b[^>]*data-label="([^"]+)"/g),
  ].map((match) => decodeLabel(match[1]));
  const scriptLabels = script.slides.map((slide) => slide.label);
  const manifestLabels = manifest.slides.map((slide) => slide.label);
  if (
    deckLabels.length !== 15 ||
    JSON.stringify(deckLabels) !== JSON.stringify(scriptLabels) ||
    JSON.stringify(deckLabels) !== JSON.stringify(manifestLabels)
  ) {
    fail(`${locale.name} deck, script, and manifest labels do not match.`);
  }

  if (
    manifest.ready !== true ||
    manifest.status !== `official-${localeCode}-narrated-presentation` ||
    manifest.slides.length !== 15 ||
    manifest.coverage.slideIndexes.join(",") !==
      Array.from({ length: 15 }, (_, index) => index + 1).join(",")
  ) {
    fail(`The ${locale.name} manifest does not declare complete narration coverage.`);
  }
  if (
    manifest.source.englishDeckPath !==
      "public/presentations/beat-breeze.html" ||
    manifest.source.officialDeckPath !==
      `public/presentations/beat-breeze-${localeCode}.html` ||
    manifest.source.scriptPath !==
      `public/presentations/narration/${presentation}/script.json` ||
    manifest.source.copyPath !==
      `public/presentations/narration/${presentation}/copy.json` ||
    sha256File(path.join(PRESENTATIONS_ROOT, "beat-breeze.html")) !==
      manifest.source.englishDeckSha256 ||
    sha256File(officialPath) !== manifest.source.officialDeckSha256 ||
    sha256File(scriptPath) !== manifest.source.scriptSha256 ||
    sha256File(copyPath) !== manifest.source.copySha256
  ) {
    fail(`A source hash in the ${locale.name} manifest is stale.`);
  }

  const transcriptQa = manifest.qualityAssurance?.transcription;
  if (
    transcriptQa?.model !== "gemini-3.5-transcribe" ||
    transcriptQa?.languageCode !== locale.language ||
    transcriptQa?.slidesPassing !== 15 ||
    transcriptQa?.maximumCharacterErrorRate >
      transcriptQa?.requiredMaximumCharacterErrorRate
  ) {
    fail(`The ${locale.name} transcription quality gate is missing or failed.`);
  }

  let durationTotal = 0;
  for (const [index, manifestSlide] of manifest.slides.entries()) {
    const scriptSlide = script.slides[index];
    if (
      manifestSlide.index !== index + 1 ||
      manifestSlide.id !== scriptSlide.id ||
      manifestSlide.text !== scriptSlide.text ||
      JSON.stringify(manifestSlide.visualCoverage) !==
        JSON.stringify(scriptSlide.visualCoverage)
    ) {
      fail(`${locale.name} slide ${index + 1} differs between script and manifest.`);
    }
    const audioPath = path.join(root, manifestSlide.src);
    if (
      !existsSync(audioPath) ||
      sha256File(audioPath) !== manifestSlide.audioSha256
    ) {
      fail(`${locale.name} audio hash mismatch on slide ${index + 1}.`);
    }
    const probe = JSON.parse(
      execFileSync("ffprobe", [
        "-v",
        "error",
        "-show_entries",
        "format=duration:stream=codec_name,sample_rate,channels,bit_rate",
        "-of",
        "json",
        audioPath,
      ]).toString(),
    );
    const stream = probe.streams?.[0];
    if (
      stream?.codec_name !== "mp3" ||
      Number(stream?.sample_rate) !== 48000 ||
      Number(stream?.channels) !== 1 ||
      !closeEnough(
        probe.format?.duration,
        manifestSlide.durationSeconds,
        0.02,
      ) ||
      Math.abs(manifestSlide.integratedLufs + 18) > 1.5 ||
      manifestSlide.truePeakDbtp > -1.5
    ) {
      fail(`${locale.name} media gate failed on slide ${index + 1}.`);
    }
    execFileSync("ffmpeg", [
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      audioPath,
      "-f",
      "null",
      "-",
    ]);
    durationTotal += manifestSlide.durationSeconds;
  }
  if (!closeEnough(durationTotal, manifest.totalDurationSeconds, 0.02)) {
    fail(`${locale.name} total narration duration is inconsistent.`);
  }

  console.log(
    `PASS: ${locale.name} deck, 15 audio clips, labels, hashes, and transcript QA agree (${manifest.totalDurationSeconds.toFixed(1)}s).`,
  );
}

for (const localeCode of Object.keys(LOCALES)) {
  if (
    !narrationController.includes(`${localeCode}:`) ||
    !motionController.includes(`"${localeCode}"`) &&
      !motionController.includes(`${localeCode}:`)
  ) {
    fail(`Shared controllers do not recognize ${localeCode}.`);
  }
}
execFileSync(process.execPath, ["--check", SELECTOR_PATH]);
execFileSync(process.execPath, ["--check", NARRATION_CONTROLLER_PATH]);
execFileSync(process.execPath, ["--check", MOTION_CONTROLLER_PATH]);
execFileSync(process.execPath, ["--check", fileURLToPath(import.meta.url)]);

console.log("PASS: all nine Beat Breeze decks expose one accessible slide-preserving language selector.");
