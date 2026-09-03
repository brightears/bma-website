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
  "beat-breeze-zh.html",
);
const PRESENTATION_ROOT = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  "beat-breeze-zh",
);
const SCRIPT_PATH = path.join(PRESENTATION_ROOT, "script.json");
const COPY_PATH = path.join(PRESENTATION_ROOT, "copy.json");
const MANIFEST_PATH = path.join(PRESENTATION_ROOT, "manifest.json");
const FONT_ROOT = path.join(PRESENTATION_ROOT, "fonts");
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
  path.join(FONT_ROOT, "NotoSansSC-subset.woff2"),
  path.join(FONT_ROOT, "NotoSerifSC-subset.woff2"),
  path.join(FONT_ROOT, "OFL-Noto-Sans-SC.txt"),
  path.join(FONT_ROOT, "OFL-Noto-Serif-SC.txt"),
];
for (const required of requiredFiles) {
  if (!existsSync(required)) {
    throw new Error(`Required Chinese presentation source is missing: ${required}`);
  }
}

const SLIDE_LABELS = new Map([
  ["Title", "封面"],
  ["One platform, many jobs", "一个平台，多种任务"],
  ["Music that runs itself", "自动运行的音乐"],
  ["Automations", "自动化"],
  ["Your Music Director", "您的 Music Director"],
  ["Compose", "Compose"],
  ["Studio &amp; screens", "Studio 与屏幕"],
  ["Announcements", "语音通知"],
  ["Works with Claude &amp; ChatGPT", "连接 Claude 与 ChatGPT"],
  ["Built for operators", "为运营团队而设计"],
  ["Never go silent", "让音乐持续播放"],
  ["Why Beat Breeze", "为什么选择 Beat Breeze"],
  ["Pricing", "价格"],
  ["Who's behind it", "背后的团队"],
  ["Close", "开始使用"],
]);

const CHINESE_FONT_CSS = `
@font-face {
  font-family: 'Noto Sans SC Deck';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('./narration/beat-breeze-zh/fonts/NotoSansSC-subset.woff2') format('woff2');
}
@font-face {
  font-family: 'Noto Serif SC Deck';
  font-style: normal;
  font-weight: 200 900;
  font-display: swap;
  src: url('./narration/beat-breeze-zh/fonts/NotoSerifSC-subset.woff2') format('woff2');
}
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
  script.presentation !== "beat-breeze-zh" ||
  script.language !== "zh-CN" ||
  !Array.isArray(script.slides) ||
  script.slides.length !== 15
) {
  throw new Error("The Chinese presenter script must contain all 15 Beat Breeze slides.");
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
  const chineseLabel = SLIDE_LABELS.get(englishLabel);
  const scriptSlide = script.slides[index];
  if (!chineseLabel || scriptSlide.label !== chineseLabel) {
    throw new Error(`Chinese label mismatch on slide ${index + 1}: ${englishLabel}.`);
  }

  let section = match[0]
    .replace(`data-label="${englishLabel}"`, `data-label="${chineseLabel}"`)
    .replace(
      /data-speaker-notes="[^"]*"/,
      `data-speaker-notes="${escapeAttribute(scriptSlide.text)}"`,
    )
    .replace(
      "<section ",
      '<section class="slide" data-zone="slide" data-layout_box_budget="1920x1080-approved-layout-safe-nav-top-940" data-mechanical_layout_preflight="simplified-chinese-font-copy-and-line-break-check-required" ',
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
  .replace("<html>", '<html lang="zh-CN">')
  .replace(
    "<title>Beat Breeze — Product Overview 2026</title>",
    "<title>Beat Breeze — 产品概览 2026</title>",
  )
  .replace("<style>", `<style>${CHINESE_FONT_CSS}`)
  .replaceAll("'DM Sans',sans-serif", "'DM Sans','Noto Sans SC Deck',sans-serif")
  .replaceAll("'Libre Caslon Text',serif", "'Libre Caslon Text','Noto Serif SC Deck',serif")
  .replaceAll("'Space Grotesk',monospace", "'Space Grotesk','Noto Sans SC Deck',sans-serif")
  .replaceAll("'DM Sans', sans-serif", "'DM Sans','Noto Sans SC Deck',sans-serif")
  .replaceAll("'Libre Caslon Text', serif", "'Libre Caslon Text','Noto Serif SC Deck',serif")
  .replaceAll("'Space Grotesk', monospace", "'Space Grotesk','Noto Sans SC Deck',sans-serif")
  .replaceAll("line-height:0.95", "line-height:1.02")
  .replace(/letter-spacing:\s*-?[\d.]+em/g, "letter-spacing:0");

const allowedNonChinese = new Set([
  "Beat",
  "Breeze",
  "Beat Breeze",
  "Compose",
  "Content Studio",
  "Content Studio · TV Channels",
  "TV Channels",
  "Claude",
  "ChatGPT",
  "EN",
  "JA",
  "TH",
  "2:41",
  "3:08",
  "2:55",
  "$12",
  "$260",
  "✓",
  "✕",
  "norbert@bmasiamusic.com",
  "beatbreeze.io →",
  "「まもなくラストオーダーです。」",
  "“ขอบคุณที่โทรมา สักครู่นะคะ…”",
]);
const remainingText = [
  ...template.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g),
].flatMap((sectionMatch) =>
  [...sectionMatch[0].matchAll(/>([^<>]+)</g)]
    .map((item) => normalizeNode(item[1]))
    .filter(Boolean),
);
const suspicious = remainingText.filter(
  (value) =>
    /[A-Za-z]{3,}/.test(value) &&
    !/[\u3400-\u9FFF]/.test(value) &&
    !allowedNonChinese.has(value),
);
if (suspicious.length) {
  throw new Error(
    `Untranslated English-only slide text remains:\n${[
      ...new Set(suspicious),
    ].join("\n")}`,
  );
}

let output = source
  .replace("<html>", '<html lang="zh-CN">')
  .replace(
    "<title>Beat Breeze — Product Overview 2026</title>",
    "<title>Beat Breeze — 产品概览 2026（简体中文）</title>",
  )
  .replace("Unpacking...", "正在准备演示…")
  .replace("This page requires JavaScript to display.", "此演示需要启用 JavaScript 才能显示。")
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
    `\n  <template id="beat-breeze-chinese-layout-guard-source" aria-hidden="true">\n${[
      ...template.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g),
    ]
      .map((match) => match[0])
      .join("\n")}\n  </template>\n</body>`,
  )
  .replace(
    "\n</body>",
    `\n  <script src="./narration/beat-breeze-zh/controller.js" defer></script>\n${MOTION_SCRIPT}\n${LANGUAGE_SELECTOR_SCRIPT}\n</body>`,
  )
  .replace(/[ \t]+$/gm, "");

writeFileSync(OUTPUT_PATH, output);
if (existsSync(MANIFEST_PATH)) {
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
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
  `Chinese presentation built: 15 slides, ${translatedNodeCount} localized text nodes, ${path.relative(
    REPO_ROOT,
    OUTPUT_PATH,
  )}.`,
);
