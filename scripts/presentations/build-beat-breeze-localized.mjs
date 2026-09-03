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
const COMPLETE_COPY_SOURCE = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  "beat-breeze-ms",
  "copy.json",
);
const LOCALES = {
  ko: {
    language: "ko-KR",
    htmlLang: "ko",
    direction: "ltr",
    name: "Korean",
    output: "beat-breeze-ko.html",
    presentation: "beat-breeze-ko",
    title: "Beat Breeze — 제품 개요 2026 (한국어)",
    loading: "프레젠테이션을 준비하는 중…",
    javascript: "이 프레젠테이션을 보려면 JavaScript가 필요합니다.",
    labels: [
      "표지",
      "하나의 플랫폼, 다양한 기능",
      "스스로 운영되는 음악",
      "자동화",
      "Music Director",
      "Compose",
      "Studio와 스크린",
      "음성 안내",
      "Claude와 ChatGPT 연동",
      "운영팀을 위한 설계",
      "음악은 멈추지 않습니다",
      "왜 Beat Breeze인가",
      "요금",
      "Beat Breeze를 만드는 사람들",
      "시작하기",
    ],
    css: `
section {
  word-break: keep-all;
  overflow-wrap: break-word;
  hyphens: none;
}
`,
    fonts: {
      sans: "'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif",
      serif: "'Noto Serif KR','AppleMyungjo','Batang',serif",
      label: "'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif",
    },
  },
  ja: {
    language: "ja-JP",
    htmlLang: "ja",
    direction: "ltr",
    name: "Japanese",
    output: "beat-breeze-ja.html",
    presentation: "beat-breeze-ja",
    title: "Beat Breeze — 製品概要 2026（日本語）",
    loading: "プレゼンテーションを準備しています…",
    javascript: "このプレゼンテーションを表示するにはJavaScriptが必要です。",
    labels: [
      "表紙",
      "ひとつのプラットフォーム、多彩な機能",
      "自動で運用される音楽",
      "オートメーション",
      "Music Director",
      "Compose",
      "Studioとスクリーン",
      "音声アナウンス",
      "ClaudeとChatGPTとの連携",
      "運営チームのための設計",
      "音楽を止めない仕組み",
      "Beat Breezeが選ばれる理由",
      "料金",
      "Beat Breezeを支えるチーム",
      "はじめる",
    ],
    css: `
section {
  word-break: normal;
  overflow-wrap: anywhere;
  line-break: strict;
  hyphens: none;
}
`,
    fonts: {
      sans: "'Noto Sans JP','Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif",
      serif: "'Noto Serif JP','Hiragino Mincho ProN','Yu Mincho',serif",
      label: "'Noto Sans JP','Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif",
    },
  },
  ar: {
    language: "ar",
    htmlLang: "ar",
    direction: "rtl",
    name: "Arabic",
    output: "beat-breeze-ar.html",
    presentation: "beat-breeze-ar",
    title: "Beat Breeze — نظرة عامة على المنتج 2026 (العربية)",
    loading: "جارٍ إعداد العرض التقديمي…",
    javascript: "يتطلب هذا العرض التقديمي JavaScript لعرضه.",
    labels: [
      "الغلاف",
      "منصة واحدة، مهام متعددة",
      "موسيقى تدير نفسها",
      "الأتمتة",
      "Music Director الخاص بكم",
      "Compose",
      "الاستوديو والشاشات",
      "الإعلانات الصوتية",
      "يعمل مع Claude وChatGPT",
      "مصمم لفرق التشغيل",
      "الموسيقى لا تتوقف",
      "لماذا Beat Breeze",
      "الأسعار",
      "الفريق وراء Beat Breeze",
      "ابدأ الآن",
    ],
    css: `
section {
  direction: rtl;
  text-align: right;
  word-break: normal;
  overflow-wrap: break-word;
  hyphens: none;
}
section a,
section [data-ltr] {
  unicode-bidi: isolate;
}
section img,
section svg {
  direction: ltr;
}
`,
    fonts: {
      sans: "'Noto Sans Arabic','Geeza Pro','Segoe UI',Tahoma,Arial,sans-serif",
      serif: "'Noto Naskh Arabic','Geeza Pro','Traditional Arabic',serif",
      label: "'Noto Sans Arabic','Geeza Pro','Segoe UI',Tahoma,Arial,sans-serif",
    },
  },
};
const CANONICAL_LABELS = [
  "Title",
  "One platform, many jobs",
  "Music that runs itself",
  "Automations",
  "Your Music Director",
  "Compose",
  "Studio &amp; screens",
  "Announcements",
  "Works with Claude &amp; ChatGPT",
  "Built for operators",
  "Never go silent",
  "Why Beat Breeze",
  "Pricing",
  "Who's behind it",
  "Close",
];
const localeFlagIndex = process.argv.indexOf("--locale");
const localeCode =
  localeFlagIndex >= 0 ? process.argv[localeFlagIndex + 1] : null;
const locale = LOCALES[localeCode];
if (!locale) {
  throw new Error(
    `Pass --locale followed by one of: ${Object.keys(LOCALES).join(", ")}.`,
  );
}

const OUTPUT_PATH = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  locale.output,
);
const PRESENTATION_ROOT = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  locale.presentation,
);
const SCRIPT_PATH = path.join(PRESENTATION_ROOT, "script.json");
const COPY_PATH = path.join(PRESENTATION_ROOT, "copy.json");
const MANIFEST_PATH = path.join(PRESENTATION_ROOT, "manifest.json");
const ENGLISH_GUARD_SOURCE_PATTERN =
  /\n  <template id="beat-breeze-layout-guard-source"[\s\S]*?<\/template>/;
const MOTION_SCRIPT =
  '  <script src="./narration/beat-breeze-motion/controller.js?v=2026-09-03-5" defer></script>';
const LANGUAGE_SELECTOR_SCRIPT =
  '  <script src="./narration/beat-breeze-language-selector/controller.js?v=2026-09-03-1" defer></script>';
const MOTION_SCRIPT_PATTERN =
  /\n\s*<script src="\.\/narration\/beat-breeze-motion(?:-preview)?\/controller\.js(?:\?v=[^"]+)?" defer><\/script>/g;
const LANGUAGE_SELECTOR_SCRIPT_PATTERN =
  /\n\s*<script src="\.\/narration\/beat-breeze-language-selector\/controller\.js(?:\?v=[^"]+)?" defer><\/script>/g;

for (const required of [
  SOURCE_PATH,
  COMPLETE_COPY_SOURCE,
  SCRIPT_PATH,
  COPY_PATH,
]) {
  if (!existsSync(required)) {
    throw new Error(`Required ${locale.name} source is missing: ${required}`);
  }
}

const normalizeNode = (value) => value.replace(/\s+/g, " ").trim();
const escapeAttribute = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const script = JSON.parse(readFileSync(SCRIPT_PATH, "utf8"));
const copyObject = JSON.parse(readFileSync(COPY_PATH, "utf8"));
const completeCopy = JSON.parse(readFileSync(COMPLETE_COPY_SOURCE, "utf8"));
const copy = new Map(Object.entries(copyObject));
const missingCopyKeys = Object.keys(completeCopy).filter(
  (key) => !Object.hasOwn(copyObject, key),
);
const extraCopyKeys = Object.keys(copyObject).filter(
  (key) => !Object.hasOwn(completeCopy, key),
);
if (missingCopyKeys.length || extraCopyKeys.length) {
  throw new Error(
    `${locale.name} copy inventory mismatch. Missing: ${missingCopyKeys.join(
      " | ",
    ) || "none"}. Extra: ${extraCopyKeys.join(" | ") || "none"}.`,
  );
}
if (
  script.deck !== "beat-breeze" ||
  script.presentation !== locale.presentation ||
  script.language !== locale.language ||
  !Array.isArray(script.slides) ||
  script.slides.length !== 15
) {
  throw new Error(
    `The ${locale.name} presenter script must contain all 15 Beat Breeze slides.`,
  );
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
  if (englishLabel !== CANONICAL_LABELS[index]) {
    throw new Error(`Unexpected source label on slide ${index + 1}: ${englishLabel}.`);
  }
  const localizedLabel = locale.labels[index];
  const scriptSlide = script.slides[index];
  if (scriptSlide.label !== localizedLabel) {
    throw new Error(`${locale.name} label mismatch on slide ${index + 1}.`);
  }

  let section = match[0]
    .replace(`data-label="${englishLabel}"`, `data-label="${localizedLabel}"`)
    .replace(
      /data-speaker-notes="[^"]*"/,
      `data-speaker-notes="${escapeAttribute(scriptSlide.text)}"`,
    )
    .replace(
      "<section ",
      `<section class="slide" data-zone="slide" data-layout_box_budget="1920x1080-approved-layout-safe-nav-top-940" data-mechanical_layout_preflight="${localeCode}-copy-direction-and-line-break-check-required" `,
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
  .replace("<html>", `<html lang="${locale.htmlLang}" dir="${locale.direction}">`)
  .replace(
    "<title>Beat Breeze — Product Overview 2026</title>",
    `<title>${locale.title.replace(/ \([^)]*\)$/, "")}</title>`,
  )
  .replace("<style>", `<style>${locale.css}`)
  .replaceAll("'DM Sans',sans-serif", locale.fonts.sans)
  .replaceAll("'Libre Caslon Text',serif", locale.fonts.serif)
  .replaceAll("'Space Grotesk',monospace", locale.fonts.label);

const remainingTranslatable = [
  ...template.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g),
].flatMap((sectionMatch) =>
  [...sectionMatch[0].matchAll(/>([^<>]+)</g)]
    .map((item) => normalizeNode(item[1]))
    .filter((value) => copy.has(value) && copy.get(value) !== value),
);
if (remainingTranslatable.length) {
  throw new Error(
    `Untranslated ${locale.name} slide text remains:\n${[
      ...new Set(remainingTranslatable),
    ].join("\n")}`,
  );
}
if (translatedNodeCount < 225) {
  throw new Error(
    `Only ${translatedNodeCount} ${locale.name} text nodes were localized; expected at least 225.`,
  );
}

let output = source
  .replace("<html>", `<html lang="${locale.htmlLang}" dir="${locale.direction}">`)
  .replace(
    "<title>Beat Breeze — Product Overview 2026</title>",
    `<title>${locale.title}</title>`,
  )
  .replace("Unpacking...", locale.loading)
  .replace(
    "This page requires JavaScript to display.",
    locale.javascript,
  )
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
    `\n  <template id="${locale.presentation}-layout-guard-source" aria-hidden="true">\n${[
      ...template.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g),
    ]
      .map((match) => match[0])
      .join("\n")}\n  </template>\n</body>`,
  )
  .replace(
    "\n</body>",
    `\n  <script src="./narration/beat-breeze-localized/controller.js?v=2026-09-03-1" defer></script>\n${MOTION_SCRIPT}\n${LANGUAGE_SELECTOR_SCRIPT}\n</body>`,
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
  `${locale.name} presentation built: 15 slides, ${translatedNodeCount} localized text nodes, ${path.relative(
    REPO_ROOT,
    OUTPUT_PATH,
  )}.`,
);
