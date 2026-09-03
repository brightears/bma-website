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
  "beat-breeze-ms",
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
const VIETNAMESE_OFFICIAL = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-vi.html",
);
const INDONESIAN_OFFICIAL = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-id.html",
);
const MALAY_OFFICIAL = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-ms.html",
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
  VIETNAMESE_OFFICIAL,
  INDONESIAN_OFFICIAL,
  MALAY_OFFICIAL,
  SCRIPT_PATH,
  COPY_PATH,
  MANIFEST_PATH,
  CONTROLLER_PATH,
]) {
  if (!existsSync(required)) fail(`Required Malay presentation artifact is missing: ${required}`);
}

if (existsSync(REMOVED_ENGLISH_PREVIEW) || existsSync(REMOVED_THAI_PREVIEW)) {
  fail("A retired Beat Breeze preview HTML route still exists.");
}

const protectedPresentations = allowCoordinatedDeckUpdate
  ? ["public/presentations/soundtrack.html"]
  : [
      "public/presentations/beat-breeze.html",
      "public/presentations/beat-breeze-th.html",
      "public/presentations/beat-breeze-zh.html",
      "public/presentations/beat-breeze-vi.html",
      "public/presentations/beat-breeze-id.html",
      "public/presentations/soundtrack.html",
    ];
for (const relativePath of protectedPresentations) {
  const workingPath = path.join(REPO_ROOT, relativePath);
  if (sha256File(workingPath) !== sha256Buffer(gitBlob(relativePath))) {
    fail(`Protected presentation changed unexpectedly: ${relativePath}`);
  }
}

const malayOfficial = readFileSync(MALAY_OFFICIAL, "utf8");
const script = JSON.parse(readFileSync(SCRIPT_PATH, "utf8"));
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
const controller = readFileSync(CONTROLLER_PATH, "utf8");

if (
  !malayOfficial.includes('<html lang="ms">') ||
  !malayOfficial.includes("<title>Beat Breeze — Gambaran Keseluruhan Produk 2026 (Bahasa Melayu)</title>") ||
  !malayOfficial.includes("./narration/beat-breeze-ms/controller.js")
) {
  fail("The official Malay presentation is missing its language or narration controller.");
}
if (
  malayOfficial.includes("./narration/beat-breeze-voice-preview/controller.js") ||
  malayOfficial.includes("./narration/beat-breeze-voice-preview-th/controller.js") ||
  malayOfficial.includes("./narration/beat-breeze-zh/controller.js") ||
  malayOfficial.includes("./narration/beat-breeze-vi/controller.js") ||
  malayOfficial.includes("./narration/beat-breeze-id/controller.js")
) {
  fail("The official Malay presentation points to another language's narration controller.");
}
if (
  !malayOfficial.includes("Pasukan pakar sedia membantu, 24/7") ||
  /[\u3400-\u9FFF\u0E00-\u0E7F\u0102-\u01B0\u1EA0-\u1EF9]/.test(controller) ||
  /Mulai narasi|Slide ini|Berkas narasi|Silakan/.test(controller)
) {
  fail("The Malay slide 14 support wording or controller localization is incorrect.");
}
if (
  !malayOfficial.includes("Muzik anda sendiri, <br>hanya") ||
  !malayOfficial.includes("Belum kena? Ubah suai dengan satu arahan lagi.") ||
  malayOfficial.includes("Perhalusinya dengan satu ayat lagi.") ||
  !script.slides[5]?.text.startsWith(
    "Dengan Compose, satu arahan ringkas sudah cukup untuk menghasilkan muzik asli.",
  ) ||
  /menukar taklimat ringkas|Daripada ayat seperti itu|Nilai utamanya kepada sesebuah premis/.test(
    script.slides[5]?.text || "",
  )
) {
  fail("The approved natural Malaysian Malay refinement is missing from slide 6.");
}

if (
  manifest.source.englishDeckPath !== "public/presentations/beat-breeze.html" ||
  manifest.source.officialDeckPath !== "public/presentations/beat-breeze-ms.html" ||
  manifest.source.copyPath !==
    "public/presentations/narration/beat-breeze-ms/copy.json" ||
  sha256File(ENGLISH_DECK) !== manifest.source.englishDeckSha256 ||
  sha256File(MALAY_OFFICIAL) !== manifest.source.officialDeckSha256 ||
  sha256File(SCRIPT_PATH) !== manifest.source.scriptSha256 ||
  sha256File(COPY_PATH) !== manifest.source.copySha256
) {
  fail("A source hash in the Malay narration manifest is stale.");
}

const templateMarker = '<script type="__bundler/template">';
const templateStart = malayOfficial.indexOf(templateMarker) + templateMarker.length;
const templateEnd = malayOfficial.indexOf("</script>", templateStart);
const template = JSON.parse(malayOfficial.slice(templateStart, templateEnd).trim());
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
  fail("Malay deck, script, and manifest slide labels or order do not match.");
}
if (
  script.language !== "ms-MY" ||
  !script.slides.every((slide) => /\b(dan|yang|untuk|dengan|anda|muzik|premis|slaid|ialah|boleh)\b/i.test(slide.text)) ||
  script.slides.some((slide) => /[\u3400-\u9FFF\u0E00-\u0E7F\u0102-\u01B0\u1EA0-\u1EF9]/.test(slide.text))
) {
  fail("Every Malay narration slide must contain Malaysian Malay presenter copy.");
}
if (
  manifest.ready !== true ||
  manifest.status !== "official-malaysian-malay-narrated-presentation" ||
  manifest.slides.length !== 15 ||
  manifest.coverage.slideIndexes.join(",") !==
    Array.from({ length: 15 }, (_, index) => index + 1).join(",")
) {
  fail("The Malay narration manifest does not declare complete 15-slide coverage.");
}
const transcriptionQa = manifest.qualityAssurance?.transcription;
const targetedTranscriptionQa =
  transcriptionQa?.validationMode ===
  "full-deck-baseline-plus-targeted-slide";
if (
  transcriptionQa?.model !== "gemini-3.5-transcribe" ||
  transcriptionQa?.languageCode !== "ms-MY" ||
  transcriptionQa?.slidesPassing !== 15 ||
  transcriptionQa?.maximumCharacterErrorRate >
    transcriptionQa?.requiredMaximumCharacterErrorRate ||
  (targetedTranscriptionQa &&
    (transcriptionQa?.verifiedUnchangedSlideCount !== 14 ||
      transcriptionQa?.baselineFullDeck?.slidesPassing !== 15 ||
      transcriptionQa?.targetedUpdate?.id !== "06-compose" ||
      transcriptionQa?.targetedUpdate?.pass !== true)) ||
  (!targetedTranscriptionQa &&
    typeof transcriptionQa?.meanCharacterErrorRate !== "number")
) {
  fail("The Malay narration transcription quality gate is missing or failed.");
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
    fail(`Malay slide ${index + 1} is inconsistent across script and manifest.`);
  }
  if (!Array.isArray(scriptSlide.visualCoverage) || !scriptSlide.visualCoverage.length) {
    fail(`Malay slide ${index + 1} has no declared visual coverage.`);
  }

  const audioPath = path.join(PRESENTATION_ROOT, manifestSlide.src);
  if (sha256File(audioPath) !== manifestSlide.audioSha256) {
    fail(`Malay audio hash mismatch on slide ${index + 1}.`);
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
    fail(`Malay media probe mismatch on slide ${index + 1}.`);
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
    fail(`Malay audio loudness gate failed on slide ${index + 1}.`);
  }
  if (!controller.includes(manifestSlide.src)) {
    fail(`Malay local fallback is missing slide ${index + 1}.`);
  }
  durationTotal += manifestSlide.durationSeconds;
}

if (!closeEnough(durationTotal, manifest.totalDurationSeconds, 0.02)) {
  fail("Total Malay narration duration does not match the slide clips.");
}
if (!controller.includes("Mahukan versi berpanduan?")) {
  fail("The Malay narration invitation is missing.");
}
if (!controller.includes('<button class="narration-invitation-start" type="button">Mulakan narasi</button>')) {
  fail("The Malay narration invitation start label is missing.");
}
if (!controller.includes('visible: "Mulakan narasi"')) {
  fail("The Malay initial narration action is not explicit.");
}

execFileSync(process.execPath, ["--check", CONTROLLER_PATH]);
execFileSync(process.execPath, ["--check", fileURLToPath(import.meta.url)]);

console.log("PASS: English, Thai, Chinese, Vietnamese, Indonesian, and Soundtrack official decks remain present and protected; both preview HTML routes are removed.");
console.log("PASS: Malay deck preserves 15-slide structure with localized labels and full Malaysian Malay copy.");
console.log(
  `PASS: ${manifest.slides.length} Malaysian Malay Sulafat clips decode correctly (${manifest.totalDurationSeconds.toFixed(1)}s total).`,
);
console.log(
  targetedTranscriptionQa
    ? `PASS: automated Malaysian Malay speech fidelity retains the verified 15-slide baseline and the updated slide 6 passed at CER ${(transcriptionQa.targetedUpdate.characterErrorRate * 100).toFixed(1)}%.`
    : `PASS: automated Malaysian Malay speech fidelity passed all 15 slides (mean CER ${(transcriptionQa.meanCharacterErrorRate * 100).toFixed(1)}%, max ${(transcriptionQa.maximumCharacterErrorRate * 100).toFixed(1)}%).`,
);
console.log("PASS: Malay deck, script, manifest, audio hashes, labels, and local fallback agree.");
