import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "../..");
const PRESENTATION = "beat-breeze-ms";
const MODEL = "gemini-3.1-flash-tts-preview";
const VOICE = "Sulafat";
const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/interactions";
const API_REVISION = "2026-05-20";
const LOUDNESS_TARGET = -18;
const TRUE_PEAK_TARGET = -3;
const LOUDNESS_RANGE = 7;

if (!process.argv.includes("--confirm-spend")) {
  throw new Error(
    "Pass --confirm-spend only after the user has approved the bounded Google TTS generation run.",
  );
}

const PRESENTATION_ROOT = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  PRESENTATION,
);
const SCRIPT_PATH = path.join(PRESENTATION_ROOT, "script.json");
const COPY_PATH = path.join(PRESENTATION_ROOT, "copy.json");
const MANIFEST_PATH = path.join(PRESENTATION_ROOT, "manifest.json");
const AUDIO_ROOT = path.join(PRESENTATION_ROOT, "audio");
const WORK_DIR = path.join(
  REPO_ROOT,
  "tmp",
  "presentation-narration",
  PRESENTATION,
);
const CACHE_DIR = path.join(WORK_DIR, "cache");
const ENGLISH_DECK = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze.html",
);
const OFFICIAL_DECK = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-ms.html",
);
const CONTROLLER_PATH = path.join(PRESENTATION_ROOT, "controller.js");

const apiKey =
  process.env.TUTORIAL_TTS_API_KEY || process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  throw new Error(
    "TUTORIAL_TTS_API_KEY or GOOGLE_AI_API_KEY is required in the process environment.",
  );
}

for (const binary of ["ffmpeg", "ffprobe"]) {
  const result = spawnSync(binary, ["-version"], { stdio: "ignore" });
  if (result.status !== 0) {
    throw new Error(`${binary} is required to generate presentation narration.`);
  }
}

for (const required of [
  SCRIPT_PATH,
  COPY_PATH,
  ENGLISH_DECK,
  OFFICIAL_DECK,
  CONTROLLER_PATH,
]) {
  if (!existsSync(required)) {
    throw new Error(`Required file is missing: ${required}`);
  }
}

const script = JSON.parse(readFileSync(SCRIPT_PATH, "utf8"));
if (
  script.deck !== "beat-breeze" ||
  script.presentation !== PRESENTATION ||
  script.language !== "ms-MY" ||
  !Array.isArray(script.slides) ||
  script.slides.length !== 15
) {
  throw new Error("The Malaysian Malay narration script must contain all 15 Beat Breeze slides.");
}

const sourceHtml = readFileSync(ENGLISH_DECK, "utf8");
const previewHtml = readFileSync(OFFICIAL_DECK, "utf8");
const templateMarker = '<script type="__bundler/template">';
const templateStart = previewHtml.indexOf(templateMarker) + templateMarker.length;
const templateEnd = previewHtml.indexOf("</script>", templateStart);
if (templateStart < templateMarker.length || templateEnd < templateStart) {
  throw new Error("The bundled Beat Breeze slide template could not be found.");
}

const unpackedTemplate = JSON.parse(
  previewHtml.slice(templateStart, templateEnd).trim(),
);
const decodeLabel = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
const deckLabels = [
  ...unpackedTemplate.matchAll(/<section\b[^>]*data-label="([^"]+)"/g),
].map((match) => decodeLabel(match[1]));
const scriptLabels = script.slides.map((slide) => slide.label);
if (JSON.stringify(deckLabels) !== JSON.stringify(scriptLabels)) {
  throw new Error(
    "Narration labels or order no longer match the final Beat Breeze deck. Review script.json before synthesis.",
  );
}

const sha256Buffer = (buffer) =>
  createHash("sha256").update(buffer).digest("hex");
const sha256File = (file) => sha256Buffer(readFileSync(file));
const englishDeckSha256 = sha256File(ENGLISH_DECK);
const officialDeckSha256 = sha256File(OFFICIAL_DECK);
const scriptSha256 = sha256File(SCRIPT_PATH);
const copySha256 = sha256File(COPY_PATH);
const generatedAt = new Date().toISOString();
const releaseContentHash = sha256Buffer(
  Buffer.from(
    JSON.stringify({
      englishDeckSha256,
      officialDeckSha256,
      scriptSha256,
      copySha256,
      model: MODEL,
      voice: VOICE,
      apiRevision: API_REVISION,
      profile: script.voice.performance,
    }),
  ),
);
const releaseId = `${generatedAt.slice(0, 10).replaceAll("-", "")}-${releaseContentHash.slice(0, 12)}`;
const stagingAudioDir = path.join(WORK_DIR, `release-${releaseId}`);
const releaseAudioDir = path.join(AUDIO_ROOT, releaseId);

mkdirSync(AUDIO_ROOT, { recursive: true });
mkdirSync(CACHE_DIR, { recursive: true });
rmSync(stagingAudioDir, { recursive: true, force: true });
mkdirSync(stagingAudioDir, { recursive: true });

const naturalPrompt = (text, profile) => `# AUDIO PROFILE: ${profile.name}
${profile.name} is ${profile.role}.

# SCENE
${profile.name} is in ${profile.scene}. This is a normal working conversation, not a commercial voice-over or a formal stage performance.

# DIRECTOR'S NOTES
Style: ${profile.style}
Pacing: ${profile.pacing}

# TRANSCRIPT
${text}`;

const extractAudio = (payload) => {
  const output = payload?.output_audio?.data
    ? payload.output_audio
    : (payload?.outputs?.find?.((item) => item?.type === "audio") ??
      payload?.output?.find?.((item) => item?.type === "audio") ??
      payload?.steps
        ?.flatMap?.((item) => (Array.isArray(item?.content) ? item.content : []))
        ?.find?.((item) => item?.type === "audio"));

  if (!output?.data) {
    throw new Error("Gemini response contained no audio block.");
  }

  return {
    data: Buffer.from(output.data, "base64"),
    mimeType:
      output.mime_type ||
      output.mimeType ||
      "audio/L16;codec=pcm;rate=24000",
    sampleRate: Number(output.sample_rate || output.sampleRate || 24000),
    channels: Number(output.channels || 1),
  };
};

const synthesizeSource = async ({ text, profile, cacheFile }) => {
  if (existsSync(cacheFile)) return { cached: true };

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      model: MODEL,
      input: naturalPrompt(text, profile),
      response_format: { type: "audio" },
      generation_config: { speech_config: [{ voice: VOICE }] },
    }),
  });

  if (!response.ok) {
    let detail = "";
    try {
      const payload = await response.json();
      const message =
        payload?.error?.message ||
        payload?.message ||
        payload?.error?.details?.[0]?.reason;
      const fieldDetails = payload?.error?.details
        ? ` (${JSON.stringify(payload.error.details)})`
        : "";
      detail = message ? `: ${message}${fieldDetails}` : fieldDetails;
    } catch {
      // Provider response bodies are never persisted.
    }
    throw new Error(`Gemini TTS failed with HTTP ${response.status}${detail}`);
  }

  const audio = extractAudio(await response.json());
  const providerFile = `${cacheFile}.provider`;
  writeFileSync(providerFile, audio.data);
  try {
    const inputArgs = /wav|mpeg|mp3|ogg/i.test(audio.mimeType)
      ? ["-i", providerFile]
      : [
          "-f",
          "s16le",
          "-ar",
          String(audio.sampleRate),
          "-ac",
          String(audio.channels),
          "-i",
          providerFile,
        ];
    execFileSync("ffmpeg", [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      ...inputArgs,
      "-ar",
      "48000",
      "-ac",
      "1",
      "-c:a",
      "pcm_s24le",
      cacheFile,
    ]);
  } finally {
    rmSync(providerFile, { force: true });
  }
  return { cached: false };
};

const probe = (file) => {
  const payload = JSON.parse(
    execFileSync("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration:stream=codec_name,sample_rate,channels,bit_rate",
      "-of",
      "json",
      file,
    ]).toString(),
  );
  const stream = payload.streams?.[0] || {};
  return {
    durationSeconds: Number(Number(payload.format?.duration).toFixed(3)),
    codec: stream.codec_name,
    sampleRateHz: Number(stream.sample_rate),
    channels: Number(stream.channels),
    bitRate: Number(stream.bit_rate || 0),
  };
};

const measureLoudness = (file, { highpass = false } = {}) => {
  const filterPrefix = highpass ? "highpass=f=65," : "";
  const result = spawnSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-nostats",
      "-i",
      file,
      "-af",
      `${filterPrefix}loudnorm=I=${LOUDNESS_TARGET}:TP=${TRUE_PEAK_TARGET}:LRA=${LOUDNESS_RANGE}:print_format=json`,
      "-f",
      "null",
      "-",
    ],
    { encoding: "utf8" },
  );
  if (result.status !== 0) {
    throw new Error(`Loudness analysis failed for ${path.basename(file)}.`);
  }
  const match = `${result.stdout}\n${result.stderr}`.match(
    /\{[\s\S]*?"target_offset"[\s\S]*?\}/,
  );
  if (!match) {
    throw new Error(`No loudness result returned for ${path.basename(file)}.`);
  }
  const value = JSON.parse(match[0]);
  return {
    integratedLufs: Number(value.input_i),
    truePeakDbtp: Number(value.input_tp),
    loudnessRangeLu: Number(value.input_lra),
    thresholdLufs: Number(value.input_thresh),
    targetOffsetLu: Number(value.target_offset),
  };
};

const profile = script.voice.performance;
const slides = [];

try {
  for (const [index, slide] of script.slides.entries()) {
    if (!slide.id || !slide.label || !slide.text) {
      throw new Error(`Slide ${index + 1} is missing id, label, or narration text.`);
    }

    const cacheKey = sha256Buffer(
      Buffer.from(
        JSON.stringify({
          provider: "google-gemini",
          model: MODEL,
          voice: VOICE,
          apiRevision: API_REVISION,
          text: slide.text,
          profile,
        }),
      ),
    );
    const cacheFile = path.join(CACHE_DIR, `${cacheKey}.wav`);
    const outputFile = path.join(stagingAudioDir, `${slide.id}.mp3`);

    const synthesis = await synthesizeSource({
      text: slide.text,
      profile,
      cacheFile,
    });

    const sourceLoudness = measureLoudness(cacheFile, { highpass: true });
    const normalizationFilter = [
      "highpass=f=65",
      [
        `loudnorm=I=${LOUDNESS_TARGET}`,
        `TP=${TRUE_PEAK_TARGET}`,
        `LRA=${LOUDNESS_RANGE}`,
        `measured_I=${sourceLoudness.integratedLufs}`,
        `measured_TP=${sourceLoudness.truePeakDbtp}`,
        `measured_LRA=${sourceLoudness.loudnessRangeLu}`,
        `measured_thresh=${sourceLoudness.thresholdLufs}`,
        `offset=${sourceLoudness.targetOffsetLu}`,
        "linear=true",
        "print_format=summary",
      ].join(":"),
    ].join(",");

    execFileSync("ffmpeg", [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-i",
      cacheFile,
      "-af",
      normalizationFilter,
      "-ar",
      "48000",
      "-ac",
      "1",
      "-c:a",
      "libmp3lame",
      "-b:a",
      "128k",
      outputFile,
    ]);

    const media = probe(outputFile);
    const loudness = measureLoudness(outputFile);
    if (
      Math.abs(loudness.integratedLufs - LOUDNESS_TARGET) > 1.5 ||
      loudness.truePeakDbtp > -1.5
    ) {
      throw new Error(
        `${slide.id} failed audio QA: ${loudness.integratedLufs} LUFS, ${loudness.truePeakDbtp} dBTP.`,
      );
    }

    slides.push({
      index: index + 1,
      id: slide.id,
      label: slide.label,
      src: `audio/${releaseId}/${slide.id}.mp3`,
      text: slide.text,
      visualCoverage: slide.visualCoverage,
      transcriptSha256: sha256Buffer(Buffer.from(slide.text)),
      audioSha256: sha256File(outputFile),
      ...media,
      ...loudness,
      cached: synthesis.cached,
    });

    console.log(
      `${String(index + 1).padStart(2, "0")}/15 ${slide.label} — ${media.durationSeconds.toFixed(1)}s${synthesis.cached ? " (cached voice)" : ""}`,
    );
  }

  const manifest = {
    version: 2,
    deck: "beat-breeze",
    presentation: PRESENTATION,
    status: "official-malaysian-malay-narrated-presentation",
    ready: true,
    generatedAt,
    releaseId,
    publicationStatus:
      "Official unlinked, noindex Malaysian Malay Beat Breeze presentation with complete slide-linked Malay narration.",
    coverage: {
      slideIndexes: slides.map((slide) => slide.index),
      behaviorAfterLastClip: "replay-from-start",
      manualNavigation: "restart-current-slide-when-narration-is-on",
    },
    source: {
      englishDeckPath: "public/presentations/beat-breeze.html",
      englishDeckSha256,
      officialDeckPath: "public/presentations/beat-breeze-ms.html",
      officialDeckSha256,
      scriptPath:
        "public/presentations/narration/beat-breeze-ms/script.json",
      scriptSha256,
      copyPath: "public/presentations/narration/beat-breeze-ms/copy.json",
      copySha256,
    },
    voice: {
      provider: "google-gemini",
      model: MODEL,
      name: VOICE,
      apiRevision: API_REVISION,
      performance: profile,
    },
    processing: {
      highpassHz: 65,
      loudnessTargetLufs: LOUDNESS_TARGET,
      truePeakTargetDbtp: TRUE_PEAK_TARGET,
      sampleRateHz: 48000,
      channels: 1,
      format: "MP3",
      bitRateKbps: 128,
    },
    totalDurationSeconds: Number(
      slides.reduce((sum, slide) => sum + slide.durationSeconds, 0).toFixed(3),
    ),
    slides,
  };

  if (existsSync(releaseAudioDir)) {
    throw new Error(`Narration release already exists: ${releaseId}`);
  }
  renameSync(stagingAudioDir, releaseAudioDir);

  const controller = readFileSync(CONTROLLER_PATH, "utf8");
  let updatedController = controller;
  for (const slide of slides) {
    const pattern = new RegExp(
      `src: "audio/[^\"]+/${slide.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.mp3"`,
    );
    if (!pattern.test(updatedController)) {
      throw new Error(`Controller fallback is missing ${slide.id}.`);
    }
    updatedController = updatedController.replace(pattern, `src: "${slide.src}"`);
  }

  const pendingManifestPath = `${MANIFEST_PATH}.${process.pid}.tmp`;
  const pendingControllerPath = `${CONTROLLER_PATH}.${process.pid}.tmp`;
  try {
    writeFileSync(pendingManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    writeFileSync(pendingControllerPath, updatedController);
    renameSync(pendingManifestPath, MANIFEST_PATH);
    renameSync(pendingControllerPath, CONTROLLER_PATH);
  } finally {
    rmSync(pendingManifestPath, { force: true });
    rmSync(pendingControllerPath, { force: true });
  }
  console.log(
    `Narration ready: ${slides.length} clips, ${manifest.totalDurationSeconds.toFixed(1)} seconds total.`,
  );
} catch (error) {
  rmSync(stagingAudioDir, { recursive: true, force: true });
  throw error;
}
