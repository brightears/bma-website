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
  "beat-breeze-zh",
);
const ENGLISH_DECK = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze.html",
);
const REMOVED_ENGLISH_PREVIEW = path.join(
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
const THAI_OFFICIAL = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-th.html",
);
const CHINESE_OFFICIAL = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-zh.html",
);
const REMOVED_THAI_PREVIEW = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-voice-preview-th.html",
);
const SCRIPT_PATH = path.join(PRESENTATION_ROOT, "script.json");
const COPY_PATH = path.join(PRESENTATION_ROOT, "copy.json");
const MANIFEST_PATH = path.join(PRESENTATION_ROOT, "manifest.json");
const CONTROLLER_PATH = path.join(PRESENTATION_ROOT, "controller.js");
const FONT_FILES = [
  "fonts/NotoSansSC-subset.woff2",
  "fonts/NotoSerifSC-subset.woff2",
  "fonts/OFL-Noto-Sans-SC.txt",
  "fonts/OFL-Noto-Serif-SC.txt",
];

const fail = (message) => {
  throw new Error(message);
};
const sha256Buffer = (buffer) =>
  createHash("sha256").update(buffer).digest("hex");
const sha256File = (file) => sha256Buffer(readFileSync(file));
const closeEnough = (a, b, tolerance) =>
  Math.abs(Number(a) - Number(b)) <= tolerance;
const allowCoordinatedDeckUpdate = process.argv.includes(
  "--allow-coordinated-deck-update",
);
const gitBlob = (relativePath) =>
  execFileSync("git", ["show", `HEAD:${relativePath}`], {
    cwd: REPO_ROOT,
    maxBuffer: 16 * 1024 * 1024,
  });

for (const required of [
  ENGLISH_DECK,
  SOUNDTRACK_DECK,
  THAI_OFFICIAL,
  CHINESE_OFFICIAL,
  SCRIPT_PATH,
  COPY_PATH,
  MANIFEST_PATH,
  CONTROLLER_PATH,
  ...FONT_FILES.map((file) => path.join(PRESENTATION_ROOT, file)),
]) {
  if (!existsSync(required)) fail(`Required Chinese presentation artifact is missing: ${required}`);
}

if (existsSync(REMOVED_ENGLISH_PREVIEW) || existsSync(REMOVED_THAI_PREVIEW)) {
  fail("A retired Beat Breeze preview HTML route still exists.");
}

const protectedPresentations = allowCoordinatedDeckUpdate
  ? ["public/presentations/soundtrack.html"]
  : [
      "public/presentations/beat-breeze.html",
      "public/presentations/beat-breeze-th.html",
      "public/presentations/soundtrack.html",
    ];
for (const relativePath of protectedPresentations) {
  const workingPath = path.join(REPO_ROOT, relativePath);
  if (sha256File(workingPath) !== sha256Buffer(gitBlob(relativePath))) {
    fail(`Protected presentation changed unexpectedly: ${relativePath}`);
  }
}

const chineseOfficial = readFileSync(CHINESE_OFFICIAL, "utf8");
const script = JSON.parse(readFileSync(SCRIPT_PATH, "utf8"));
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
const controller = readFileSync(CONTROLLER_PATH, "utf8");

if (
  !chineseOfficial.includes('<html lang="zh-CN">') ||
  !chineseOfficial.includes("<title>Beat Breeze — 产品概览 2026（简体中文）</title>") ||
  !chineseOfficial.includes("NotoSansSC-subset.woff2") ||
  !chineseOfficial.includes("NotoSerifSC-subset.woff2") ||
  !chineseOfficial.includes("./narration/beat-breeze-zh/controller.js")
) {
  fail("The official Chinese presentation is missing its language, Chinese fonts, or narration controller.");
}
if (
  chineseOfficial.includes("./narration/beat-breeze-voice-preview/controller.js") ||
  chineseOfficial.includes("./narration/beat-breeze-voice-preview-th/controller.js")
) {
  fail("The official Chinese presentation points to an English or Thai narration controller.");
}
if (
  !chineseOfficial.includes("专业团队提供全天候支持") ||
  chineseOfficial.includes("คนจริง") ||
  /[\u0E00-\u0E7F]/.test(controller)
) {
  fail("The Chinese slide 14 support wording or controller localization is incorrect.");
}

if (
  manifest.source.englishDeckPath !== "public/presentations/beat-breeze.html" ||
  manifest.source.officialDeckPath !== "public/presentations/beat-breeze-zh.html" ||
  manifest.source.copyPath !==
    "public/presentations/narration/beat-breeze-zh/copy.json" ||
  sha256File(ENGLISH_DECK) !== manifest.source.englishDeckSha256 ||
  sha256File(CHINESE_OFFICIAL) !== manifest.source.officialDeckSha256 ||
  sha256File(SCRIPT_PATH) !== manifest.source.scriptSha256 ||
  sha256File(COPY_PATH) !== manifest.source.copySha256
) {
  fail("A source hash in the Chinese narration manifest is stale.");
}

const templateMarker = '<script type="__bundler/template">';
const templateStart = chineseOfficial.indexOf(templateMarker) + templateMarker.length;
const templateEnd = chineseOfficial.indexOf("</script>", templateStart);
const template = JSON.parse(chineseOfficial.slice(templateStart, templateEnd).trim());
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
  fail("Chinese deck, script, and manifest slide labels or order do not match.");
}
if (
  script.language !== "zh-CN" ||
  !script.slides.every((slide) => /[\u3400-\u9FFF]/.test(slide.text))
) {
  fail("Every Chinese narration slide must contain Simplified Chinese presenter copy.");
}
if (
  manifest.ready !== true ||
  manifest.status !== "official-simplified-chinese-narrated-presentation" ||
  manifest.slides.length !== 15 ||
  manifest.coverage.slideIndexes.join(",") !==
    Array.from({ length: 15 }, (_, index) => index + 1).join(",")
) {
  fail("The Chinese narration manifest does not declare complete 15-slide coverage.");
}
const transcriptionQa = manifest.qualityAssurance?.transcription;
if (
  transcriptionQa?.model !== "gemini-3.5-transcribe" ||
  transcriptionQa?.languageCode !== "zh-CN" ||
  transcriptionQa?.slidesPassing !== 15 ||
  transcriptionQa?.maximumCharacterErrorRate >
    transcriptionQa?.requiredMaximumCharacterErrorRate
) {
  fail("The Chinese narration transcription quality gate is missing or failed.");
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
    fail(`Chinese slide ${index + 1} is inconsistent across script and manifest.`);
  }
  if (!Array.isArray(scriptSlide.visualCoverage) || !scriptSlide.visualCoverage.length) {
    fail(`Chinese slide ${index + 1} has no declared visual coverage.`);
  }

  const audioPath = path.join(PRESENTATION_ROOT, manifestSlide.src);
  if (sha256File(audioPath) !== manifestSlide.audioSha256) {
    fail(`Chinese audio hash mismatch on slide ${index + 1}.`);
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
    fail(`Chinese media probe mismatch on slide ${index + 1}.`);
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
    fail(`Chinese audio loudness gate failed on slide ${index + 1}.`);
  }
  if (!controller.includes(manifestSlide.src)) {
    fail(`Chinese local fallback is missing slide ${index + 1}.`);
  }
  durationTotal += manifestSlide.durationSeconds;
}

if (!closeEnough(durationTotal, manifest.totalDurationSeconds, 0.02)) {
  fail("Total Chinese narration duration does not match the slide clips.");
}
if (!controller.includes("想听讲解版吗？")) {
  fail("The Chinese narration invitation is missing.");
}
if (!controller.includes('visible: "开始讲解"')) {
  fail("The Chinese initial narration action is not explicit.");
}

execFileSync(process.execPath, ["--check", CONTROLLER_PATH]);
execFileSync(process.execPath, ["--check", fileURLToPath(import.meta.url)]);

console.log("PASS: English official and Soundtrack decks are present; both preview HTML routes are removed.");
console.log("PASS: Chinese deck preserves 15-slide structure with localized labels and embedded Chinese fonts.");
console.log(
  `PASS: ${manifest.slides.length} Mandarin Sulafat clips decode correctly (${manifest.totalDurationSeconds.toFixed(1)}s total).`,
);
console.log(
  `PASS: automated Mandarin speech fidelity passed all 15 slides (mean CER ${(transcriptionQa.meanCharacterErrorRate * 100).toFixed(1)}%, max ${(transcriptionQa.maximumCharacterErrorRate * 100).toFixed(1)}%).`,
);
console.log("PASS: Chinese deck, script, manifest, audio hashes, labels, and local fallback agree.");
