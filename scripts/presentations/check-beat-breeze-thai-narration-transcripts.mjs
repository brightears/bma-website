import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "../..");
const PRESENTATION = "beat-breeze-voice-preview-th";
const ROOT = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  PRESENTATION,
);
const SCRIPT_PATH = path.join(ROOT, "script.json");
const MANIFEST_PATH = path.join(ROOT, "manifest.json");
const MANIFEST_RELATIVE_PATH =
  "public/presentations/narration/beat-breeze-voice-preview-th/manifest.json";
const REPORT_PATH = path.join(
  REPO_ROOT,
  "tmp",
  "presentation-narration",
  PRESENTATION,
  "thai-transcript-qa.json",
);
const MODEL = "gemini-3.5-transcribe";
const ENDPOINT =
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const MAXIMUM_CER = 0.18;
const MINIMUM_LENGTH_RATIO = 0.84;
const MAXIMUM_LENGTH_RATIO = 1.12;

if (!process.argv.includes("--confirm-spend")) {
  throw new Error(
    "Pass --confirm-spend only for the bounded 15-clip Thai transcription QA run.",
  );
}

const apiKey =
  process.env.TUTORIAL_TTS_API_KEY || process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  throw new Error(
    "TUTORIAL_TTS_API_KEY or GOOGLE_AI_API_KEY is required in the process environment.",
  );
}

const script = JSON.parse(readFileSync(SCRIPT_PATH, "utf8"));
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = JSON.parse(
  execFileSync("git", ["show", `HEAD:${MANIFEST_RELATIVE_PATH}`], {
    cwd: REPO_ROOT,
    maxBuffer: 16 * 1024 * 1024,
  }).toString(),
);
if (script.slides.length !== 15 || manifest.slides.length !== 15) {
  throw new Error("Thai transcript QA requires all 15 narration clips.");
}
const previousQa = previousManifest.qualityAssurance?.transcription;
if (previousQa?.slidesPassing !== 15) {
  throw new Error(
    "The previous Thai narration release must have a passing 15-slide transcript QA result before any clips can be reused.",
  );
}
const previousSlidesById = new Map(
  previousManifest.slides.map((slide) => [slide.id, slide]),
);

const aliases = new Map([
  ["beat breeze", "บีตบรีซ"],
  ["beatbreeze", "บีตบรีซ"],
  ["บีทบรีซ", "บีตบรีซ"],
  ["music director", "มิวสิกไดเรกเตอร์"],
  ["compose", "คอมโพส"],
  ["content studio", "คอนเทนต์สตูดิโอ"],
  ["tv channels", "ทีวีแชนเนลส์"],
  ["chatgpt", "แชตจีพีที"],
  ["claude", "คลอด"],
  ["bmasia", "บีเอ็มเอเชีย"],
]);
const normalize = (value) => {
  let text = value.normalize("NFKC").toLowerCase();
  for (const [source, target] of aliases) text = text.replaceAll(source, target);
  return text.replace(/[^a-z0-9\u0E00-\u0E7F]/g, "");
};
const editDistance = (left, right) => {
  if (left.length < right.length) [left, right] = [right, left];
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row += 1) {
    const current = [row];
    for (let column = 1; column <= right.length; column += 1) {
      current.push(
        Math.min(
          current[column - 1] + 1,
          previous[column] + 1,
          previous[column - 1] +
            (left[row - 1] === right[column - 1] ? 0 : 1),
        ),
      );
    }
    previous = current;
  }
  return previous.at(-1);
};
const sha256 = (value) =>
  createHash("sha256").update(value).digest("hex");
const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const transcribe = async (audioPath) => {
  const audio = readFileSync(audioPath).toString("base64");
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  mimeType: "audio/mpeg",
                  data: audio,
                },
              },
            ],
          },
        ],
        generationConfig: {
          audioTranscriptionConfig: {
            languageCodes: ["th-TH"],
            customVocabulary: [
              "Beat Breeze",
              "BMAsia",
              "Music Director",
              "Compose",
              "Content Studio",
              "TV Channels",
              "Claude",
              "ChatGPT",
              "brand-lock",
              "PromptPay",
              "Norbert",
            ],
          },
        },
      }),
    });
    if (response.ok) {
      const payload = await response.json();
      const transcript = payload?.candidates?.[0]?.content?.parts
        ?.map((part) => part?.audioTranscription?.text || part?.text || "")
        .join("")
        .trim();
      if (!transcript) {
        throw new Error("Transcription response contained no text.");
      }
      return transcript;
    }
    let detail = "";
    try {
      const payload = await response.json();
      detail = payload?.error?.message ? `: ${payload.error.message}` : "";
    } catch {
      // Provider response bodies are never persisted.
    }
    lastError = new Error(
      `Gemini transcription failed with HTTP ${response.status}${detail}`,
    );
    if (![429, 500, 502, 503, 504].includes(response.status) || attempt === 3) {
      throw lastError;
    }
    await sleep(750 * attempt);
  }
  throw lastError;
};

const results = [];
const failures = [];
for (const [index, scriptSlide] of script.slides.entries()) {
  const manifestSlide = manifest.slides[index];
  const audioPath = path.join(ROOT, manifestSlide.src);
  if (manifestSlide.reusedFromPreviousRelease) {
    const previousSlide = previousSlidesById.get(scriptSlide.id);
    if (
      !previousSlide ||
      previousSlide.transcriptSha256 !== manifestSlide.transcriptSha256 ||
      previousSlide.audioSha256 !== manifestSlide.audioSha256
    ) {
      throw new Error(
        `Slide ${scriptSlide.id} is marked as reused, but its transcript or audio hash differs from the previously verified release.`,
      );
    }
    const result = {
      index: index + 1,
      id: scriptSlide.id,
      source: "previous-release",
      transcriptSha256: manifestSlide.transcriptSha256,
      audioSha256: manifestSlide.audioSha256,
      pass: true,
    };
    results.push(result);
    console.log(
      `${String(index + 1).padStart(2, "0")}/15 ${scriptSlide.label} — reused from passing release ${previousManifest.releaseId}`,
    );
    continue;
  }
  const transcript = await transcribe(audioPath);
  const expected = normalize(scriptSlide.text);
  const actual = normalize(transcript);
  const characterErrorRate = editDistance(expected, actual) / Math.max(1, expected.length);
  const lengthRatio = actual.length / Math.max(1, expected.length);
  const result = {
    index: index + 1,
    id: scriptSlide.id,
    source: "fresh-transcription",
    transcript,
    transcriptSha256: sha256(Buffer.from(transcript)),
    characterErrorRate: Number(characterErrorRate.toFixed(4)),
    lengthRatio: Number(lengthRatio.toFixed(4)),
    pass:
      characterErrorRate <= MAXIMUM_CER &&
      lengthRatio >= MINIMUM_LENGTH_RATIO &&
      lengthRatio <= MAXIMUM_LENGTH_RATIO,
  };
  results.push(result);
  if (!result.pass) failures.push(result);
  console.log(
    `${String(index + 1).padStart(2, "0")}/15 ${scriptSlide.label} — CER ${(characterErrorRate * 100).toFixed(1)}%, length ${(lengthRatio * 100).toFixed(1)}%`,
  );
}

const measuredResults = results.filter(
  (result) => result.source === "fresh-transcription",
);
const reusedResults = results.filter(
  (result) => result.source === "previous-release",
);
if (!measuredResults.length) {
  throw new Error("Thai transcript QA expected at least one revised clip.");
}
const measuredFreshMeanCer =
  measuredResults.reduce(
    (sum, result) => sum + result.characterErrorRate,
    0,
  ) / measuredResults.length;
const observedMaximumCer = Math.max(
  previousQa.maximumCharacterErrorRate,
  ...measuredResults.map((result) => result.characterErrorRate),
);
const conservativeMeanCerUpperBound =
  (reusedResults.length * previousQa.maximumCharacterErrorRate +
    measuredResults.reduce(
      (sum, result) => sum + result.characterErrorRate,
      0,
    )) /
  results.length;
const report = {
  model: MODEL,
  languageCode: "th-TH",
  mode: "fresh-clips-plus-verified-previous-release-reuse",
  maximumCharacterErrorRate: MAXIMUM_CER,
  meanCharacterErrorRateUpperBound: Number(
    conservativeMeanCerUpperBound.toFixed(4),
  ),
  measuredFreshMeanCharacterErrorRate: Number(
    measuredFreshMeanCer.toFixed(4),
  ),
  observedMaximumCharacterErrorRate: Number(
    observedMaximumCer.toFixed(4),
  ),
  slidesPassing: results.filter((result) => result.pass).length,
  slidesTranscribed: measuredResults.length,
  slidesReusedFromPreviousQa: reusedResults.length,
  previousReleaseId: previousManifest.releaseId,
  slides: results,
};

mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
if (failures.length) {
  throw new Error(
    `Thai transcript QA failed on: ${failures.map((item) => item.id).join(", ")}`,
  );
}

manifest.qualityAssurance = {
  ...(manifest.qualityAssurance || {}),
  transcription: {
    provider: "google-gemini",
    model: MODEL,
    languageCode: "th-TH",
    meanCharacterErrorRate: report.meanCharacterErrorRateUpperBound,
    meanCharacterErrorRateScope: "conservative-upper-bound",
    measuredFreshMeanCharacterErrorRate:
      report.measuredFreshMeanCharacterErrorRate,
    maximumCharacterErrorRate: report.observedMaximumCharacterErrorRate,
    requiredMaximumCharacterErrorRate: MAXIMUM_CER,
    slidesPassing: report.slidesPassing,
    slidesTranscribed: report.slidesTranscribed,
    slidesReusedFromPreviousQa: report.slidesReusedFromPreviousQa,
    previousReleaseId: report.previousReleaseId,
  },
};
const pendingManifest = `${MANIFEST_PATH}.${process.pid}.tmp`;
try {
  writeFileSync(pendingManifest, `${JSON.stringify(manifest, null, 2)}\n`);
  renameSync(pendingManifest, MANIFEST_PATH);
} finally {
  rmSync(pendingManifest, { force: true });
}
console.log(
  `PASS: ${measuredResults.length} revised Thai clips transcribed with mean CER ${(measuredFreshMeanCer * 100).toFixed(1)}%; ${reusedResults.length} unchanged clips reused from passing release ${previousManifest.releaseId}. Conservative all-slide mean CER upper bound ${(conservativeMeanCerUpperBound * 100).toFixed(1)}%, maximum CER ${(observedMaximumCer * 100).toFixed(1)}%.`,
);
