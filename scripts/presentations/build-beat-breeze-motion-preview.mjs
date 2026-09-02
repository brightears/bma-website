import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
  "beat-breeze-motion-preview.html",
);
const QA_DIR = path.join(REPO_ROOT, "outputs", "beat-breeze-motion-preview");
const QA_HTML_PATH = path.join(QA_DIR, "index.html");
const MANIFEST_PATH = path.join(QA_DIR, "deck-manifest.json");

const MOTION_SCRIPT =
  '  <script src="./narration/beat-breeze-motion-preview/controller.js" defer></script>';
const MOTION_SCRIPT_PATTERN =
  /\n\s*<script src="\.\/narration\/beat-breeze-motion-preview\/controller\.js" defer><\/script>/g;

let output = readFileSync(SOURCE_PATH, "utf8")
  .replace(MOTION_SCRIPT_PATTERN, "")
  .replaceAll(
    "Beat Breeze — Product Overview 2026",
    "Beat Breeze — Motion Prototype 2026",
  );

const narrationScript =
  '  <script src="./narration/beat-breeze-voice-preview/controller.js" defer></script>';
if (!output.includes(narrationScript)) {
  throw new Error("The official English narration controller was not found.");
}

output = output.replace(narrationScript, `${narrationScript}\n${MOTION_SCRIPT}`);

mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, output);

mkdirSync(QA_DIR, { recursive: true });
writeFileSync(QA_HTML_PATH, output);
writeFileSync(
  MANIFEST_PATH,
  `${JSON.stringify(
    {
      title: "Beat Breeze — Motion Prototype 2026",
      createdAt: new Date().toISOString(),
      source: "public/presentations/beat-breeze.html",
      activeDesignDna: {
        name: "Beat Breeze cinematic depth",
        thesis:
          "Soft arrival, selective scale, and narration-linked semantic focus without changing the existing slide design.",
        motionIntensity: 46,
        reference: "https://beatbreeze.io/",
      },
      prototypeSlides: [1, 2, 5, 7, 10],
      outputFiles: [
        "public/presentations/beat-breeze-motion-preview.html",
        "public/presentations/narration/beat-breeze-motion-preview/controller.js",
      ],
      preserved: [
        "all English slide content",
        "all 15 narration clips and narration behavior",
        "slide order and navigation",
        "official English and translated presentation files",
      ],
      knownLimitations: [
        "Narration-linked motion is intentionally timed only for slides 1, 2, 5, 7, and 10.",
        "Timing is tuned to the current English narration release.",
      ],
    },
    null,
    2,
  )}\n`,
);

console.log(
  "Beat Breeze English motion prototype built for slides 1, 2, 5, 7, and 10.",
);
