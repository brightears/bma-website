import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "../..");
const PRESENTATION_ROOT = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  "beat-breeze-voice-preview",
);
const OFFICIAL_DECK = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze.html",
);
const REMOVED_PREVIEW_DECK = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-voice-preview.html",
);
const SCRIPT_PATH = path.join(PRESENTATION_ROOT, "script.json");
const MANIFEST_PATH = path.join(PRESENTATION_ROOT, "manifest.json");
const CONTROLLER_PATH = path.join(PRESENTATION_ROOT, "controller.js");
const REMOVED_THAI_PREVIEW_DECK = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-voice-preview-th.html",
);

const fail = (message) => {
  throw new Error(message);
};
const sha256Buffer = (buffer) =>
  createHash("sha256").update(buffer).digest("hex");
const sha256File = (file) => sha256Buffer(readFileSync(file));
const closeEnough = (a, b, tolerance) =>
  Math.abs(Number(a) - Number(b)) <= tolerance;

const official = readFileSync(OFFICIAL_DECK, "utf8");
const script = JSON.parse(readFileSync(SCRIPT_PATH, "utf8"));
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
const controller = readFileSync(CONTROLLER_PATH, "utf8");

if (existsSync(REMOVED_PREVIEW_DECK) || existsSync(REMOVED_THAI_PREVIEW_DECK)) {
  fail("A retired Beat Breeze preview HTML route still exists.");
}

if (
  manifest.source.officialDeckPath !== "public/presentations/beat-breeze.html" ||
  sha256File(OFFICIAL_DECK) !== manifest.source.officialDeckSha256 ||
  sha256File(SCRIPT_PATH) !== manifest.source.scriptSha256
) {
  fail("A source hash in the narration manifest is stale.");
}

const templateMarker = '<script type="__bundler/template">';
const templateStart = official.indexOf(templateMarker) + templateMarker.length;
const templateEnd = official.indexOf("</script>", templateStart);
const template = JSON.parse(official.slice(templateStart, templateEnd).trim());
const decodeLabel = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
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
  fail("Deck, script, and manifest slide labels or order do not match.");
}

if (
  manifest.ready !== true ||
  manifest.status !== "official-english-narrated-presentation" ||
  manifest.slides.length !== 15 ||
  manifest.coverage.slideIndexes.join(",") !==
    Array.from({ length: 15 }, (_, index) => index + 1).join(",")
) {
  fail("The narration manifest does not declare complete 15-slide coverage.");
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
    fail(`Slide ${index + 1} is inconsistent across script and manifest.`);
  }
  if (!Array.isArray(scriptSlide.visualCoverage) || !scriptSlide.visualCoverage.length) {
    fail(`Slide ${index + 1} has no declared visual coverage.`);
  }

  const audioPath = path.join(PRESENTATION_ROOT, manifestSlide.src);
  if (sha256File(audioPath) !== manifestSlide.audioSha256) {
    fail(`Audio hash mismatch on slide ${index + 1}.`);
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
    !closeEnough(probe.format?.duration, manifestSlide.durationSeconds, 0.02)
  ) {
    fail(`Media probe mismatch on slide ${index + 1}.`);
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
  if (
    Math.abs(manifestSlide.integratedLufs + 18) > 1.5 ||
    manifestSlide.truePeakDbtp > -1.5
  ) {
    fail(`Audio loudness gate failed on slide ${index + 1}.`);
  }
  if (!controller.includes(manifestSlide.src)) {
    fail(`Local fallback is missing slide ${index + 1}.`);
  }
  durationTotal += manifestSlide.durationSeconds;
}

if (!closeEnough(durationTotal, manifest.totalDurationSeconds, 0.02)) {
  fail("Total narration duration does not match the slide clips.");
}
if (
  !official.includes("<title>Beat Breeze — Product Overview 2026</title>") ||
  !official.includes("./narration/beat-breeze-voice-preview/controller.js") ||
  !official.includes('<template id="beat-breeze-layout-guard-source"')
) {
  fail("The official English deck is missing its final title, controller, or layout source.");
}
if (
  (official.match(/<section class="slide" data-zone="slide"/g) || []).length !== 15 ||
  official.includes("line-height:0.92")
) {
  fail("The official English layout source is incomplete or below the display safety floor.");
}
if (/Preview slides 1|slides 1 and 2|two-slide/i.test(controller)) {
  fail("Two-slide pilot copy remains in the full controller.");
}

execFileSync(process.execPath, ["--check", CONTROLLER_PATH]);
execFileSync(process.execPath, ["--check", fileURLToPath(import.meta.url)]);

console.log("PASS: official English route contains the narrated deck and both preview HTML routes are removed.");
console.log(
  `PASS: ${manifest.slides.length} English Sulafat clips decode correctly (${manifest.totalDurationSeconds.toFixed(1)}s total).`,
);
console.log("PASS: deck, script, manifest, audio hashes, labels, and local fallback agree.");
