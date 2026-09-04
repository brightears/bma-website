import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "../..");
const PRESENTATION = "beat-breeze-ms";
const ROOT = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  PRESENTATION,
);
const SCRIPT_PATH = path.join(ROOT, "script.json");
const MANIFEST_PATH = path.join(ROOT, "manifest.json");
const REPORT_PATH = path.join(
  REPO_ROOT,
  "tmp",
  "presentation-narration",
  PRESENTATION,
  "malay-transcript-qa.json",
);
const MODEL = "gemini-3.5-transcribe";
const ENDPOINT =
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const MAXIMUM_CER = 0.18;
const MINIMUM_LENGTH_RATIO = 0.84;
const MAXIMUM_LENGTH_RATIO = 1.12;
const slideIdFlagIndexes = process.argv.flatMap((argument, index) =>
  argument === "--slide-id" ? [index] : [],
);
const TARGET_SLIDE_IDS = slideIdFlagIndexes.map((index) => process.argv[index + 1]);
if (TARGET_SLIDE_IDS.some((slideId) => !slideId || slideId.startsWith("--"))) {
  throw new Error("Pass a slide id after every --slide-id.");
}
if (new Set(TARGET_SLIDE_IDS).size !== TARGET_SLIDE_IDS.length) {
  throw new Error("Each targeted slide id may be passed only once.");
}
const TARGET_SLIDE_ID_SET = new Set(TARGET_SLIDE_IDS);
const IS_TARGETED_CHECK = TARGET_SLIDE_IDS.length > 0;

if (!process.argv.includes("--confirm-spend")) {
  throw new Error(
    "Pass --confirm-spend only for the bounded Malaysian Malay transcription QA run.",
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
if (script.slides.length !== 15 || manifest.slides.length !== 15) {
  throw new Error("Malaysian Malay transcript QA requires all 15 narration clips.");
}
for (const targetSlideId of TARGET_SLIDE_IDS) {
  if (!script.slides.some((slide) => slide.id === targetSlideId)) {
    throw new Error(`Unknown Malaysian Malay narration slide: ${targetSlideId}.`);
  }
}
const baselineFullDeck = IS_TARGETED_CHECK
  ? manifest.qualityAssurance?.transcription?.baselineFullDeck
  : null;
if (
  IS_TARGETED_CHECK &&
  (manifest.qualityAssurance?.transcription?.status !==
    "pending-targeted-slides-update" ||
    JSON.stringify(manifest.qualityAssurance?.transcription?.targetSlideIds) !==
      JSON.stringify(TARGET_SLIDE_IDS) ||
    baselineFullDeck?.slidesPassing !== 15)
) {
  throw new Error(
    "Targeted transcript QA requires the preserved full-deck baseline from generation.",
  );
}

const aliases = new Map([
  ["beat breeze", "beatbreeze"],
  ["bit breeze", "beatbreeze"],
  ["beat bris", "beatbreeze"],
  ["bit bris", "beatbreeze"],
  ["beat briz", "beatbreeze"],
  ["bit briz", "beatbreeze"],
  ["music director", "musicdirector"],
  ["content studio", "contentstudio"],
  ["tv channels", "tvchannels"],
  ["chat gpt", "chatgpt"],
  ["b m asia", "bmasia"],
]);
const normalize = (value) => {
  let text = value.normalize("NFKC").toLowerCase();
  for (const [source, target] of aliases) text = text.replaceAll(source, target);
  return text.replace(/[^\p{Letter}\p{Number}]/gu, "");
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
            languageCodes: ["ms-MY"],
            customVocabulary: [
              "Beat Breeze",
              "BMAsia",
              "Music Director",
              "Compose",
              "Content Studio",
              "TV Channels",
              "Claude",
              "ChatGPT",
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
const selectedSlides = script.slides
  .map((scriptSlide, index) => ({ index, scriptSlide }))
  .filter(({ scriptSlide }) =>
    IS_TARGETED_CHECK ? TARGET_SLIDE_ID_SET.has(scriptSlide.id) : true,
  );
for (const { index, scriptSlide } of selectedSlides) {
  const manifestSlide = manifest.slides[index];
  const audioPath = path.join(ROOT, manifestSlide.src);
  const transcript = await transcribe(audioPath);
  const expected = normalize(scriptSlide.text);
  const actual = normalize(transcript);
  const characterErrorRate = editDistance(expected, actual) / Math.max(1, expected.length);
  const lengthRatio = actual.length / Math.max(1, expected.length);
  const result = {
    index: index + 1,
    id: scriptSlide.id,
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

const meanCer =
  results.reduce((sum, result) => sum + result.characterErrorRate, 0) /
  results.length;
const maximumCer = Math.max(...results.map((result) => result.characterErrorRate));
const report = {
  model: MODEL,
  languageCode: "ms-MY",
  mode: IS_TARGETED_CHECK ? "targeted-slides-update" : "verbatim-default",
  ...(IS_TARGETED_CHECK ? { targetSlideIds: TARGET_SLIDE_IDS } : {}),
  maximumCharacterErrorRate: MAXIMUM_CER,
  meanCharacterErrorRate: Number(meanCer.toFixed(4)),
  observedMaximumCharacterErrorRate: Number(maximumCer.toFixed(4)),
  slidesPassing: results.filter((result) => result.pass).length,
  slides: results,
};

mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
if (failures.length) {
  throw new Error(
    `Malaysian Malay transcript QA failed on: ${failures.map((item) => item.id).join(", ")}`,
  );
}

manifest.qualityAssurance = {
  ...(manifest.qualityAssurance || {}),
  transcription: IS_TARGETED_CHECK
    ? {
        provider: "google-gemini",
        model: MODEL,
        languageCode: "ms-MY",
        validationMode: "full-deck-baseline-plus-targeted-slides",
        maximumCharacterErrorRate: Math.max(
          baselineFullDeck.maximumCharacterErrorRate,
          ...results.map((result) => result.characterErrorRate),
        ),
        requiredMaximumCharacterErrorRate: MAXIMUM_CER,
        slidesPassing: 15,
        verifiedUnchangedSlideCount: script.slides.length - results.length,
        baselineFullDeck,
        targetedUpdates: results.map((result) => ({
          index: result.index,
          id: result.id,
          transcriptSha256: result.transcriptSha256,
          characterErrorRate: result.characterErrorRate,
          lengthRatio: result.lengthRatio,
          pass: result.pass,
        })),
      }
    : {
        provider: "google-gemini",
        model: MODEL,
        languageCode: "ms-MY",
        meanCharacterErrorRate: report.meanCharacterErrorRate,
        maximumCharacterErrorRate: report.observedMaximumCharacterErrorRate,
        requiredMaximumCharacterErrorRate: MAXIMUM_CER,
        slidesPassing: report.slidesPassing,
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
  IS_TARGETED_CHECK
    ? `PASS: ${results.length} targeted slides transcribed with mean CER ${(meanCer * 100).toFixed(1)}% and maximum CER ${(maximumCer * 100).toFixed(1)}%; ${script.slides.length - results.length} unchanged clips retain the verified full-deck baseline.`
    : `PASS: 15 Malaysian Malay clips transcribed with mean CER ${(meanCer * 100).toFixed(1)}% and maximum CER ${(maximumCer * 100).toFixed(1)}%.`,
);
