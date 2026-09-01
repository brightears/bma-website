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
  "beat-breeze-voice-preview-th",
);
const ORIGINAL_DECK = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze.html",
);
const ENGLISH_PREVIEW = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-voice-preview.html",
);
const SOUNDTRACK_DECK = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "soundtrack.html",
);
const THAI_PREVIEW = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-voice-preview-th.html",
);
const SCRIPT_PATH = path.join(PRESENTATION_ROOT, "script.json");
const MANIFEST_PATH = path.join(PRESENTATION_ROOT, "manifest.json");
const CONTROLLER_PATH = path.join(PRESENTATION_ROOT, "controller.js");
const FONT_FILES = [
  "fonts/NotoSansThai-wdth-wght.ttf",
  "fonts/NotoSerifThai-wdth-wght.ttf",
  "fonts/OFL-Noto-Sans-Thai.txt",
  "fonts/OFL-Noto-Serif-Thai.txt",
];

const fail = (message) => {
  throw new Error(message);
};
const sha256Buffer = (buffer) =>
  createHash("sha256").update(buffer).digest("hex");
const sha256File = (file) => sha256Buffer(readFileSync(file));
const closeEnough = (a, b, tolerance) =>
  Math.abs(Number(a) - Number(b)) <= tolerance;
const gitBlob = (relativePath) =>
  execFileSync("git", ["show", `HEAD:${relativePath}`], {
    cwd: REPO_ROOT,
    maxBuffer: 16 * 1024 * 1024,
  });

for (const required of [
  ORIGINAL_DECK,
  ENGLISH_PREVIEW,
  SOUNDTRACK_DECK,
  THAI_PREVIEW,
  SCRIPT_PATH,
  MANIFEST_PATH,
  CONTROLLER_PATH,
  ...FONT_FILES.map((file) => path.join(PRESENTATION_ROOT, file)),
]) {
  if (!existsSync(required)) fail(`Required Thai preview artifact is missing: ${required}`);
}

for (const relativePath of [
  "public/presentations/beat-breeze.html",
  "public/presentations/beat-breeze-voice-preview.html",
  "public/presentations/soundtrack.html",
]) {
  const workingPath = path.join(REPO_ROOT, relativePath);
  if (sha256File(workingPath) !== sha256Buffer(gitBlob(relativePath))) {
    fail(`Protected presentation changed unexpectedly: ${relativePath}`);
  }
}

const thaiPreview = readFileSync(THAI_PREVIEW, "utf8");
const script = JSON.parse(readFileSync(SCRIPT_PATH, "utf8"));
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
const controller = readFileSync(CONTROLLER_PATH, "utf8");

if (
  !thaiPreview.includes('<html lang="th">') ||
  !thaiPreview.includes("NotoSansThai-wdth-wght.ttf") ||
  !thaiPreview.includes("NotoSerifThai-wdth-wght.ttf") ||
  !thaiPreview.includes("./narration/beat-breeze-voice-preview-th/controller.js")
) {
  fail("The Thai preview is missing its language, Thai fonts, or narration controller.");
}
if (thaiPreview.includes("./narration/beat-breeze-voice-preview/controller.js")) {
  fail("The Thai preview points to the English narration controller.");
}

if (
  sha256File(ORIGINAL_DECK) !== manifest.source.originalDeckSha256 ||
  sha256File(THAI_PREVIEW) !== manifest.source.previewDeckSha256 ||
  sha256File(SCRIPT_PATH) !== manifest.source.scriptSha256
) {
  fail("A source hash in the Thai narration manifest is stale.");
}

const templateMarker = '<script type="__bundler/template">';
const templateStart = thaiPreview.indexOf(templateMarker) + templateMarker.length;
const templateEnd = thaiPreview.indexOf("</script>", templateStart);
const template = JSON.parse(thaiPreview.slice(templateStart, templateEnd).trim());
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
  fail("Thai deck, script, and manifest slide labels or order do not match.");
}
if (!script.slides.every((slide) => /[\u0E00-\u0E7F]/.test(slide.text))) {
  fail("Every Thai narration slide must contain Thai presenter copy.");
}
if (
  manifest.ready !== true ||
  manifest.status !== "full-thai-voice-preview" ||
  manifest.slides.length !== 15 ||
  manifest.coverage.slideIndexes.join(",") !==
    Array.from({ length: 15 }, (_, index) => index + 1).join(",")
) {
  fail("The Thai narration manifest does not declare complete 15-slide coverage.");
}
const transcriptionQa = manifest.qualityAssurance?.transcription;
if (
  transcriptionQa?.model !== "gemini-3.5-transcribe" ||
  transcriptionQa?.languageCode !== "th-TH" ||
  transcriptionQa?.slidesPassing !== 15 ||
  transcriptionQa?.maximumCharacterErrorRate >
    transcriptionQa?.requiredMaximumCharacterErrorRate
) {
  fail("The Thai narration transcription quality gate is missing or failed.");
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
    fail(`Thai slide ${index + 1} is inconsistent across script and manifest.`);
  }
  if (!Array.isArray(scriptSlide.visualCoverage) || !scriptSlide.visualCoverage.length) {
    fail(`Thai slide ${index + 1} has no declared visual coverage.`);
  }

  const audioPath = path.join(PRESENTATION_ROOT, manifestSlide.src);
  if (sha256File(audioPath) !== manifestSlide.audioSha256) {
    fail(`Thai audio hash mismatch on slide ${index + 1}.`);
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
    fail(`Thai media probe mismatch on slide ${index + 1}.`);
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
    fail(`Thai audio loudness gate failed on slide ${index + 1}.`);
  }
  if (!controller.includes(manifestSlide.src)) {
    fail(`Thai local fallback is missing slide ${index + 1}.`);
  }
  durationTotal += manifestSlide.durationSeconds;
}

if (!closeEnough(durationTotal, manifest.totalDurationSeconds, 0.02)) {
  fail("Total Thai narration duration does not match the slide clips.");
}
if (!controller.includes("อยากให้เราพาชมไหม?")) {
  fail("The Thai narration invitation is missing.");
}
if (!controller.includes('visible: "เริ่มคำบรรยาย"')) {
  fail("The Thai initial narration action is not explicit.");
}

execFileSync(process.execPath, ["--check", CONTROLLER_PATH]);
execFileSync(process.execPath, ["--check", fileURLToPath(import.meta.url)]);

console.log("PASS: original Beat Breeze, English preview HTML, and Soundtrack deck are untouched.");
console.log("PASS: Thai deck preserves 15-slide structure with localized labels and Thai fonts.");
console.log(
  `PASS: ${manifest.slides.length} Thai Sulafat clips decode correctly (${manifest.totalDurationSeconds.toFixed(1)}s total).`,
);
console.log(
  `PASS: automated Thai speech fidelity passed all 15 slides (mean CER ${(transcriptionQa.meanCharacterErrorRate * 100).toFixed(1)}%, max ${(transcriptionQa.maximumCharacterErrorRate * 100).toFixed(1)}%).`,
);
console.log("PASS: Thai deck, script, manifest, audio hashes, labels, and local fallback agree.");
