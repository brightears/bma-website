import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "../..");
const SOURCE_PATH = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze.html",
);
const OUTPUT_PATH = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-ms.html",
);
const PRESENTATION_ROOT = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  "beat-breeze-ms",
);
const SCRIPT_PATH = path.join(PRESENTATION_ROOT, "script.json");
const COPY_PATH = path.join(PRESENTATION_ROOT, "copy.json");
const MANIFEST_PATH = path.join(PRESENTATION_ROOT, "manifest.json");
const ENGLISH_GUARD_SOURCE_PATTERN =
  /\n  <template id="beat-breeze-layout-guard-source"[\s\S]*?<\/template>/;
const MOTION_SCRIPT =
  '  <script src="./narration/beat-breeze-motion/controller.js?v=2026-09-03-5" defer></script>';
const LANGUAGE_SELECTOR_SCRIPT =
  '  <script src="./narration/beat-breeze-language-selector/controller.js?v=2026-09-03-2" defer></script>';
const MOTION_SCRIPT_PATTERN =
  /\n\s*<script src="\.\/narration\/beat-breeze-motion(?:-preview)?\/controller\.js(?:\?v=[^"]+)?" defer><\/script>/g;
const LANGUAGE_SELECTOR_SCRIPT_PATTERN =
  /\n\s*<script src="\.\/narration\/beat-breeze-language-selector\/controller\.js(?:\?v=[^"]+)?" defer><\/script>/g;

const requiredFiles = [
  SOURCE_PATH,
  SCRIPT_PATH,
  COPY_PATH,
];
for (const required of requiredFiles) {
  if (!existsSync(required)) {
    throw new Error(`Required Malay presentation source is missing: ${required}`);
  }
}

const SLIDE_LABELS = new Map([
  ["Title", "Muka hadapan"],
  ["One platform, many jobs", "Satu platform, pelbagai fungsi"],
  ["Music that runs itself", "Muzik yang berjalan sendiri"],
  ["Automations", "Automasi"],
  ["Your Music Director", "Music Director anda"],
  ["Compose", "Compose"],
  ["Studio &amp; screens", "Studio dan skrin"],
  ["Announcements", "Pengumuman suara"],
  ["Works with Claude &amp; ChatGPT", "Berfungsi dengan Claude dan ChatGPT"],
  ["Built for operators", "Dibina untuk pasukan operasi"],
  ["Never go silent", "Muzik tidak pernah terhenti"],
  ["Why Beat Breeze", "Mengapa Beat Breeze"],
  ["Pricing", "Harga"],
  ["Who's behind it", "Pasukan di sebalik Beat Breeze"],
  ["Close", "Mulakan"],
]);

const MALAY_FONT_CSS = `
section {
  word-break: normal;
  overflow-wrap: break-word;
  hyphens: none;
}
`;

const normalizeNode = (value) => value.replace(/\s+/g, " ").trim();
const escapeAttribute = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const script = JSON.parse(readFileSync(SCRIPT_PATH, "utf8"));
const copy = new Map(Object.entries(JSON.parse(readFileSync(COPY_PATH, "utf8"))));
if (
  script.deck !== "beat-breeze" ||
  script.presentation !== "beat-breeze-ms" ||
  script.language !== "ms-MY" ||
  !Array.isArray(script.slides) ||
  script.slides.length !== 15
) {
  throw new Error("The Malay presenter script must contain all 15 Beat Breeze slides.");
}

const source = readFileSync(SOURCE_PATH, "utf8")
  .replace(ENGLISH_GUARD_SOURCE_PATTERN, "")
  .replace(MOTION_SCRIPT_PATTERN, "")
  .replace(LANGUAGE_SELECTOR_SCRIPT_PATTERN, "");
const templateMarker = '<script type="__bundler/template">';
const templateStart = source.indexOf(templateMarker) + templateMarker.length;
const templateEnd = source.indexOf("</script>", templateStart);
if (templateStart < templateMarker.length || templateEnd < templateStart) {
  throw new Error("The bundled Beat Breeze slide template could not be found.");
}

let template = JSON.parse(source.slice(templateStart, templateEnd).trim());
const sections = [
  ...template.matchAll(
    /<section\b[^>]*data-label="([^"]+)"[^>]*>[\s\S]*?<\/section>/g,
  ),
];
if (sections.length !== 15) {
  throw new Error(`Expected 15 Beat Breeze slides, found ${sections.length}.`);
}

let cursor = 0;
let translatedTemplate = "";
let translatedNodeCount = 0;
for (const [index, match] of sections.entries()) {
  const englishLabel = match[1];
  const malayLabel = SLIDE_LABELS.get(englishLabel);
  const scriptSlide = script.slides[index];
  if (!malayLabel || scriptSlide.label !== malayLabel) {
    throw new Error(`Malay label mismatch on slide ${index + 1}: ${englishLabel}.`);
  }

  let section = match[0]
    .replace(`data-label="${englishLabel}"`, `data-label="${malayLabel}"`)
    .replace(
      /data-speaker-notes="[^"]*"/,
      `data-speaker-notes="${escapeAttribute(scriptSlide.text)}"`,
    )
    .replace(
      "<section ",
        '<section class="slide" data-zone="slide" data-layout_box_budget="1920x1080-approved-layout-safe-nav-top-940" data-mechanical_layout_preflight="malay-copy-and-line-break-check-required" ',
    );

  section = section.replace(/>([^<>]+)</g, (whole, rawNode) => {
    const normalized = normalizeNode(rawNode);
    const translated = copy.get(normalized);
    if (translated === undefined) return whole;
    translatedNodeCount += 1;
    const leading = rawNode.match(/^\s*/)?.[0] || "";
    const trailing = rawNode.match(/\s*$/)?.[0] || "";
    return `>${leading}${translated}${trailing}<`;
  });

  const firstHeadingIndex = section.search(/<h[1-3]\b/i);
  if (firstHeadingIndex >= 0) {
    const titleContainerStarts = [
      ...section.slice(0, firstHeadingIndex).matchAll(/<div\b[^>]*>/gi),
    ];
    const titleContainer = titleContainerStarts.at(-1);
    if (titleContainer) {
      const at = titleContainer.index;
      section = `${section.slice(0, at)}${titleContainer[0].replace(
        /^<div\b/i,
        '<div data-zone="title"',
      )}${section.slice(at + titleContainer[0].length)}`;
    }
  }

  translatedTemplate += template.slice(cursor, match.index) + section;
  cursor = match.index + match[0].length;
}
translatedTemplate += template.slice(cursor);
template = translatedTemplate
  .replace("<html>", '<html lang="ms">')
  .replace(
    "<title>Beat Breeze — Product Overview 2026</title>",
    "<title>Beat Breeze — Gambaran Keseluruhan Produk 2026</title>",
  )
  .replace("<style>", `<style>${MALAY_FONT_CSS}`);

const remainingText = [
  ...template.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g),
].flatMap((sectionMatch) =>
  [...sectionMatch[0].matchAll(/>([^<>]+)</g)]
    .map((item) => normalizeNode(item[1]))
    .filter(Boolean),
);
const untranslated = remainingText.filter(
  (value) => copy.has(value) && copy.get(value) !== value,
);
if (untranslated.length) {
  throw new Error(
    `Untranslated Malay slide text remains:\n${[
      ...new Set(untranslated),
    ].join("\n")}`,
  );
}

let output = source
  .replace("<html>", '<html lang="ms">')
  .replace(
    "<title>Beat Breeze — Product Overview 2026</title>",
    "<title>Beat Breeze — Gambaran Keseluruhan Produk 2026 (Bahasa Melayu)</title>",
  )
  .replace("Unpacking...", "Menyediakan pembentangan…")
  .replace("This page requires JavaScript to display.", "Pembentangan ini memerlukan JavaScript untuk dipaparkan.")
  .replace(
    source.slice(templateStart, templateEnd),
    `\n${JSON.stringify(template).replaceAll("</script>", "<\\/script>")}\n  `,
  )
  .replace(
    '\n  <script src="./narration/beat-breeze-voice-preview/controller.js" defer></script>',
    "",
  )
  .replace(
    "\n</body>",
    `\n  <template id="beat-breeze-malay-layout-guard-source" aria-hidden="true">\n${[
      ...template.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g),
    ]
      .map((match) => match[0])
      .join("\n")}\n  </template>\n</body>`,
  )
  .replace(
    "\n</body>",
    `\n  <script src="./narration/beat-breeze-ms/controller.js" defer></script>\n${MOTION_SCRIPT}\n${LANGUAGE_SELECTOR_SCRIPT}\n</body>`,
  )
  .replace(/[ \t]+$/gm, "");

writeFileSync(OUTPUT_PATH, output);
if (existsSync(MANIFEST_PATH)) {
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  manifest.source.englishDeckSha256 = createHash("sha256")
    .update(readFileSync(SOURCE_PATH))
    .digest("hex");
  manifest.source.officialDeckSha256 = createHash("sha256")
    .update(Buffer.from(output))
    .digest("hex");
  manifest.source.copySha256 = createHash("sha256")
    .update(readFileSync(COPY_PATH))
    .digest("hex");
  const pendingManifestPath = `${MANIFEST_PATH}.${process.pid}.tmp`;
  try {
    writeFileSync(pendingManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    renameSync(pendingManifestPath, MANIFEST_PATH);
  } finally {
    rmSync(pendingManifestPath, { force: true });
  }
}

console.log(
  `Malay presentation built: 15 slides, ${translatedNodeCount} localized text nodes, ${path.relative(
    REPO_ROOT,
    OUTPUT_PATH,
  )}.`,
);
