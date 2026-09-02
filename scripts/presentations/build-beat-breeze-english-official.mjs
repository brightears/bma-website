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
const DECK_PATH = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze.html",
);
const MANIFEST_PATH = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  "beat-breeze-voice-preview",
  "manifest.json",
);
const THAI_MANIFEST_PATH = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  "beat-breeze-voice-preview-th",
  "manifest.json",
);
const CHINESE_MANIFEST_PATH = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  "beat-breeze-zh",
  "manifest.json",
);
const GUARD_SOURCE_PATTERN =
  /\n  <template id="beat-breeze-layout-guard-source"[\s\S]*?<\/template>/;
const MOTION_SCRIPT =
  '  <script src="./narration/beat-breeze-motion/controller.js?v=2026-09-02-5" defer></script>';
const MOTION_SCRIPT_PATTERN =
  /\n\s*<script src="\.\/narration\/beat-breeze-motion(?:-preview)?\/controller\.js(?:\?v=[^"]+)?" defer><\/script>/g;

const sha256 = (value) =>
  createHash("sha256").update(Buffer.from(value)).digest("hex");

const updateManifest = (manifestPath, update) => {
  if (!existsSync(manifestPath)) return;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  update(manifest);
  const pendingPath = `${manifestPath}.${process.pid}.tmp`;
  try {
    writeFileSync(pendingPath, `${JSON.stringify(manifest, null, 2)}\n`);
    renameSync(pendingPath, manifestPath);
  } finally {
    rmSync(pendingPath, { force: true });
  }
};

let output = readFileSync(DECK_PATH, "utf8")
  .replace(GUARD_SOURCE_PATTERN, "")
  .replace(MOTION_SCRIPT_PATTERN, "");
const templateMarker = '<script type="__bundler/template">';
const templateStart = output.indexOf(templateMarker) + templateMarker.length;
const templateEnd = output.indexOf("</script>", templateStart);
if (templateStart < templateMarker.length || templateEnd < templateStart) {
  throw new Error("The bundled Beat Breeze slide template could not be found.");
}

let runtimeTemplate = JSON.parse(output.slice(templateStart, templateEnd).trim());
const runtimeSections = [
  ...runtimeTemplate.matchAll(
    /<section\b[^>]*data-label="([^"]+)"[^>]*>[\s\S]*?<\/section>/g,
  ),
];
if (runtimeSections.length !== 15) {
  throw new Error(`Expected 15 Beat Breeze slides, found ${runtimeSections.length}.`);
}

// This is a single-line cover wordmark, but 0.92 is below the shared display
// safety floor. The 0.95 adjustment is deliberately limited to that wordmark.
// The four display utility rules are unused by this deck; resolving their CSS
// variables keeps the packed source legible to the static layout guard.
runtimeTemplate = runtimeTemplate
  .replace("line-height:0.92", "line-height:0.95")
  .replaceAll("line-height: var(--lh-6xl)", "line-height: 1.08")
  .replaceAll("line-height: var(--lh-5xl)", "line-height: 1.08")
  .replaceAll("line-height: var(--lh-4xl)", "line-height: 1.08")
  .replaceAll("line-height: var(--lh-3xl)", "line-height: 1.08");

const guardSections = [
  ...runtimeTemplate.matchAll(
    /<section\b[^>]*data-label="([^"]+)"[^>]*>[\s\S]*?<\/section>/g,
  ),
].map((match) => {
  let section = match[0].replace(
    "<section ",
    '<section class="slide" data-zone="slide" data-layout_box_budget="1920x1080-approved-layout-safe-nav-top-940" data-mechanical_layout_preflight="packed-source-mirror" ',
  );
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
  return section;
});

output = output
  .replace(
    output.slice(templateStart, templateEnd),
    `\n${JSON.stringify(runtimeTemplate).replaceAll("</script>", "<\\/script>")}\n  `,
  )
  .replace(
    "\n</body>",
    `\n  <template id="beat-breeze-layout-guard-source" aria-hidden="true">\n${guardSections.join(
      "\n",
    )}\n  </template>\n</body>`,
  )
  .replace(
    '\n  <script src="./narration/beat-breeze-voice-preview/controller.js" defer></script>',
    `\n  <script src="./narration/beat-breeze-voice-preview/controller.js" defer></script>\n${MOTION_SCRIPT}`,
  )
  .replace(/[ \t]+$/gm, "");

writeFileSync(DECK_PATH, output);
const officialDeckSha256 = sha256(output);
updateManifest(MANIFEST_PATH, (manifest) => {
  manifest.source.officialDeckSha256 = officialDeckSha256;
});
updateManifest(THAI_MANIFEST_PATH, (manifest) => {
  manifest.source.englishDeckSha256 = officialDeckSha256;
});
updateManifest(CHINESE_MANIFEST_PATH, (manifest) => {
  manifest.source.englishDeckSha256 = officialDeckSha256;
});

console.log(
  `English official presentation built: ${guardSections.length} slides, ${path.relative(
    REPO_ROOT,
    DECK_PATH,
  )}.`,
);
