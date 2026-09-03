(() => {
  "use strict";

  const VERSION = "2026-09-03-official-4";
  const LOCALE = (() => {
    const language = document.documentElement.lang.toLowerCase();
    if (language.startsWith("th")) return "th";
    if (language.startsWith("zh")) return "zh";
    if (language.startsWith("vi")) return "vi";
    if (language.startsWith("id")) return "id";
    if (language.startsWith("ms")) return "ms";
    return "en";
  })();
  const CANONICAL_LABELS = {
    "หน้าปก": "Title",
    "แพลตฟอร์มเดียว หลายหน้าที่": "One platform, many jobs",
    "เพลงที่ทำงานได้เอง": "Music that runs itself",
    "ระบบอัตโนมัติ": "Automations",
    "Music Director ของคุณ": "Your Music Director",
    "Studio และหน้าจอ": "Studio & screens",
    "ประกาศ": "Announcements",
    "ใช้งานร่วมกับ Claude และ ChatGPT": "Works with Claude & ChatGPT",
    "สร้างมาเพื่อผู้ดูแลสถานที่": "Built for operators",
    "ออกแบบมาให้เพลงไม่หยุด": "Never go silent",
    "ทำไมต้อง Beat Breeze": "Why Beat Breeze",
    "ราคา": "Pricing",
    "ทีมที่อยู่เบื้องหลัง": "Who's behind it",
    "เริ่มต้นใช้งาน": "Close",
    "封面": "Title",
    "一个平台，多种任务": "One platform, many jobs",
    "自动运行的音乐": "Music that runs itself",
    "自动化": "Automations",
    "您的 Music Director": "Your Music Director",
    "Studio 与屏幕": "Studio & screens",
    "语音通知": "Announcements",
    "连接 Claude 与 ChatGPT": "Works with Claude & ChatGPT",
    "为运营团队而设计": "Built for operators",
    "让音乐持续播放": "Never go silent",
    "为什么选择 Beat Breeze": "Why Beat Breeze",
    "价格": "Pricing",
    "背后的团队": "Who's behind it",
    "开始使用": "Close",
    "Trang bìa": "Title",
    "Một nền tảng, nhiều chức năng": "One platform, many jobs",
    "Âm nhạc tự vận hành": "Music that runs itself",
    "Tự động hóa": "Automations",
    "Music Director của quý khách": "Your Music Director",
    "Studio và màn hình": "Studio & screens",
    "Thông báo bằng giọng nói": "Announcements",
    "Kết nối với Claude và ChatGPT": "Works with Claude & ChatGPT",
    "Dành cho đội ngũ vận hành": "Built for operators",
    "Âm nhạc luôn tiếp diễn": "Never go silent",
    "Vì sao chọn Beat Breeze": "Why Beat Breeze",
    "Bảng giá": "Pricing",
    "Đội ngũ phía sau": "Who's behind it",
    "Bắt đầu": "Close",
    "Sampul": "Title",
    "Satu platform, banyak fungsi": "One platform, many jobs",
    "Musik yang berjalan otomatis": "Music that runs itself",
    "Otomatisasi": "Automations",
    "Music Director Anda": "Your Music Director",
    "Studio dan layar": "Studio & screens",
    "Terhubung dengan Claude dan ChatGPT": "Works with Claude & ChatGPT",
    "Dibuat untuk tim operasional": "Built for operators",
    "Musik tak pernah terhenti": "Never go silent",
    "Harga": "Pricing",
    "Tim di balik Beat Breeze": "Who's behind it",
    "Mulai": "Close",
    "Muka hadapan": "Title",
    "Satu platform, pelbagai fungsi": "One platform, many jobs",
    "Muzik yang berjalan sendiri": "Music that runs itself",
    "Automasi": "Automations",
    "Music Director anda": "Your Music Director",
    "Studio dan skrin": "Studio & screens",
    "Pengumuman suara": "Announcements",
    "Berfungsi dengan Claude dan ChatGPT": "Works with Claude & ChatGPT",
    "Dibina untuk pasukan operasi": "Built for operators",
    "Muzik tidak pernah terhenti": "Never go silent",
    "Mengapa Beat Breeze": "Why Beat Breeze",
    "Pasukan di sebalik Beat Breeze": "Who's behind it",
    "Mulakan": "Close",
  };
  const canonicalLabel = (label) => CANONICAL_LABELS[label] || label;
  const MOTION_LABELS = new Set([
    "Title",
    "One platform, many jobs",
    "Music that runs itself",
    "Automations",
    "Your Music Director",
    "Compose",
    "Studio & screens",
    "Announcements",
    "Works with Claude & ChatGPT",
    "Built for operators",
    "Never go silent",
    "Why Beat Breeze",
    "Pricing",
    "Who's behind it",
    "Close",
  ]);

  // Semantic cues are deliberately expressed as a percentage of each audio
  // clip. Each language follows the same cue order with localized timing.
  const ENGLISH_CUE_TIMELINES = {
    Title: [
      { start: 0.02, end: 0.3, key: "promise" },
      { start: 0.3, end: 0.67, key: "platform" },
      { start: 0.67, end: 1.01, key: "experience" },
    ],
    "One platform, many jobs": [
      { start: 0.11, end: 0.37, key: "music" },
      { start: 0.37, end: 0.66, key: "content" },
      { start: 0.66, end: 0.91, key: "operations" },
    ],
    "Music that runs itself": [
      { start: 0.06, end: 0.32, key: "zones" },
      { start: 0.32, end: 0.53, key: "dayparts" },
      { start: 0.53, end: 0.77, key: "library" },
      { start: 0.77, end: 0.96, key: "offline" },
    ],
    Automations: [
      { start: 0.12, end: 0.34, key: "time" },
      { start: 0.34, end: 0.52, key: "climate" },
      { start: 0.52, end: 0.64, key: "busy" },
      { start: 0.64, end: 0.84, key: "calendar" },
      { start: 0.84, end: 0.97, key: "custom" },
    ],
    "Your Music Director": [
      { start: 0.08, end: 0.5, key: "recommendation" },
      { start: 0.5, end: 0.72, key: "learning" },
      { start: 0.72, end: 0.84, key: "seasonal" },
      { start: 0.84, end: 1.01, key: "proof" },
    ],
    Compose: [
      { start: 0.06, end: 0.5, key: "brief" },
      { start: 0.5, end: 0.68, key: "results" },
      { start: 0.68, end: 0.95, key: "signature" },
    ],
    "Studio & screens": [
      { start: 0.03, end: 0.43, key: "studio" },
      { start: 0.43, end: 0.67, key: "channels" },
      { start: 0.67, end: 1.01, key: "screens" },
    ],
    Announcements: [
      { start: 0.08, end: 0.56, key: "venue" },
      { start: 0.56, end: 0.82, key: "phone" },
      { start: 0.82, end: 0.96, key: "one-place" },
    ],
    "Works with Claude & ChatGPT": [
      { start: 0.05, end: 0.56, key: "plain-language" },
      { start: 0.56, end: 0.94, key: "control" },
    ],
    "Built for operators": [
      { start: 0.05, end: 0.65, key: "self-serve" },
      { start: 0.65, end: 1.01, key: "managed" },
    ],
    "Never go silent": [
      { start: 0.12, end: 0.36, key: "offline" },
      { start: 0.36, end: 0.54, key: "recovery" },
      { start: 0.54, end: 0.73, key: "receipts" },
      { start: 0.73, end: 0.88, key: "licence" },
    ],
    "Why Beat Breeze": [
      { start: 0.08, end: 0.31, key: "foundation" },
      { start: 0.31, end: 0.75, key: "difference" },
      { start: 0.75, end: 0.97, key: "one-platform" },
    ],
    Pricing: [
      { start: 0.04, end: 0.48, key: "self-serve" },
      { start: 0.48, end: 0.78, key: "managed" },
      { start: 0.78, end: 0.97, key: "enterprise" },
    ],
    "Who's behind it": [
      { start: 0.06, end: 0.36, key: "heritage" },
      { start: 0.36, end: 0.68, key: "designers" },
      { start: 0.68, end: 0.95, key: "support" },
    ],
    Close: [
      { start: 0.04, end: 0.45, key: "breadth" },
      { start: 0.45, end: 0.74, key: "included" },
      { start: 0.74, end: 0.96, key: "action" },
    ],
  };

  const THAI_CUE_TIMELINES = {
    Title: [
      { start: 0.02, end: 0.28, key: "promise" },
      { start: 0.28, end: 0.67, key: "platform" },
      { start: 0.67, end: 0.98, key: "experience" },
    ],
    "One platform, many jobs": [
      { start: 0.08, end: 0.36, key: "music" },
      { start: 0.36, end: 0.7, key: "content" },
      { start: 0.7, end: 0.93, key: "operations" },
    ],
    "Music that runs itself": [
      { start: 0.07, end: 0.35, key: "zones" },
      { start: 0.35, end: 0.58, key: "dayparts" },
      { start: 0.58, end: 0.82, key: "library" },
      { start: 0.82, end: 0.98, key: "offline" },
    ],
    Automations: [
      { start: 0.1, end: 0.36, key: "time" },
      { start: 0.36, end: 0.52, key: "climate" },
      { start: 0.52, end: 0.66, key: "busy" },
      { start: 0.66, end: 0.84, key: "calendar" },
      { start: 0.84, end: 0.98, key: "custom" },
    ],
    "Your Music Director": [
      { start: 0.06, end: 0.54, key: "recommendation" },
      { start: 0.54, end: 0.74, key: "learning" },
      { start: 0.74, end: 0.84, key: "seasonal" },
      { start: 0.84, end: 0.99, key: "proof" },
    ],
    Compose: [
      { start: 0.05, end: 0.49, key: "brief" },
      { start: 0.49, end: 0.67, key: "results" },
      { start: 0.67, end: 0.97, key: "signature" },
    ],
    "Studio & screens": [
      { start: 0.04, end: 0.39, key: "studio" },
      { start: 0.39, end: 0.61, key: "channels" },
      { start: 0.61, end: 0.98, key: "screens" },
    ],
    Announcements: [
      { start: 0.06, end: 0.55, key: "venue" },
      { start: 0.55, end: 0.8, key: "phone" },
      { start: 0.8, end: 0.98, key: "one-place" },
    ],
    "Works with Claude & ChatGPT": [
      { start: 0.05, end: 0.52, key: "plain-language" },
      { start: 0.52, end: 0.95, key: "control" },
    ],
    "Built for operators": [
      { start: 0.04, end: 0.62, key: "self-serve" },
      { start: 0.62, end: 0.99, key: "managed" },
    ],
    "Never go silent": [
      { start: 0.08, end: 0.36, key: "offline" },
      { start: 0.36, end: 0.52, key: "recovery" },
      { start: 0.52, end: 0.7, key: "receipts" },
      { start: 0.7, end: 0.87, key: "licence" },
    ],
    "Why Beat Breeze": [
      { start: 0.06, end: 0.29, key: "foundation" },
      { start: 0.29, end: 0.74, key: "difference" },
      { start: 0.74, end: 0.98, key: "one-platform" },
    ],
    Pricing: [
      { start: 0.03, end: 0.44, key: "self-serve" },
      { start: 0.44, end: 0.73, key: "managed" },
      { start: 0.73, end: 0.98, key: "enterprise" },
    ],
    "Who's behind it": [
      { start: 0.04, end: 0.39, key: "heritage" },
      { start: 0.39, end: 0.65, key: "designers" },
      { start: 0.65, end: 0.97, key: "support" },
    ],
    Close: [
      { start: 0.03, end: 0.36, key: "breadth" },
      { start: 0.36, end: 0.7, key: "included" },
      { start: 0.7, end: 0.98, key: "action" },
    ],
  };

  const CHINESE_CUE_TIMELINES = {
    Title: [
      { start: 0.02, end: 0.29, key: "promise" },
      { start: 0.29, end: 0.64, key: "platform" },
      { start: 0.64, end: 0.98, key: "experience" },
    ],
    "One platform, many jobs": [
      { start: 0.08, end: 0.34, key: "music" },
      { start: 0.34, end: 0.68, key: "content" },
      { start: 0.68, end: 0.92, key: "operations" },
    ],
    "Music that runs itself": [
      { start: 0.06, end: 0.34, key: "zones" },
      { start: 0.34, end: 0.59, key: "dayparts" },
      { start: 0.59, end: 0.82, key: "library" },
      { start: 0.82, end: 0.98, key: "offline" },
    ],
    Automations: [
      { start: 0.08, end: 0.34, key: "time" },
      { start: 0.34, end: 0.51, key: "climate" },
      { start: 0.51, end: 0.64, key: "busy" },
      { start: 0.64, end: 0.83, key: "calendar" },
      { start: 0.83, end: 0.97, key: "custom" },
    ],
    "Your Music Director": [
      { start: 0.06, end: 0.52, key: "recommendation" },
      { start: 0.52, end: 0.72, key: "learning" },
      { start: 0.72, end: 0.82, key: "seasonal" },
      { start: 0.82, end: 0.98, key: "proof" },
    ],
    Compose: [
      { start: 0.05, end: 0.48, key: "brief" },
      { start: 0.48, end: 0.66, key: "results" },
      { start: 0.66, end: 0.97, key: "signature" },
    ],
    "Studio & screens": [
      { start: 0.04, end: 0.38, key: "studio" },
      { start: 0.38, end: 0.6, key: "channels" },
      { start: 0.6, end: 0.98, key: "screens" },
    ],
    Announcements: [
      { start: 0.06, end: 0.56, key: "venue" },
      { start: 0.56, end: 0.79, key: "phone" },
      { start: 0.79, end: 0.97, key: "one-place" },
    ],
    "Works with Claude & ChatGPT": [
      { start: 0.05, end: 0.5, key: "plain-language" },
      { start: 0.5, end: 0.95, key: "control" },
    ],
    "Built for operators": [
      { start: 0.04, end: 0.61, key: "self-serve" },
      { start: 0.61, end: 0.99, key: "managed" },
    ],
    "Never go silent": [
      { start: 0.08, end: 0.36, key: "offline" },
      { start: 0.36, end: 0.53, key: "recovery" },
      { start: 0.53, end: 0.7, key: "receipts" },
      { start: 0.7, end: 0.88, key: "licence" },
    ],
    "Why Beat Breeze": [
      { start: 0.06, end: 0.28, key: "foundation" },
      { start: 0.28, end: 0.73, key: "difference" },
      { start: 0.73, end: 0.98, key: "one-platform" },
    ],
    Pricing: [
      { start: 0.03, end: 0.44, key: "self-serve" },
      { start: 0.44, end: 0.72, key: "managed" },
      { start: 0.72, end: 0.97, key: "enterprise" },
    ],
    "Who's behind it": [
      { start: 0.04, end: 0.37, key: "heritage" },
      { start: 0.37, end: 0.66, key: "designers" },
      { start: 0.66, end: 0.97, key: "support" },
    ],
    Close: [
      { start: 0.03, end: 0.36, key: "breadth" },
      { start: 0.36, end: 0.68, key: "included" },
      { start: 0.68, end: 0.98, key: "action" },
    ],
  };

  // The Vietnamese presenter script follows the same semantic order and
  // conversational cadence as the Thai edition. Keep a separate cue object
  // so timings can be tuned independently after native-speaker feedback.
  const VIETNAMESE_CUE_TIMELINES = Object.fromEntries(
    Object.entries(THAI_CUE_TIMELINES).map(([label, cues]) => [
      label,
      cues.map((cue) => ({ ...cue })),
    ]),
  );

  // The Indonesian presenter script follows the same semantic order and
  // conversational cadence as the Vietnamese edition. Keep a separate cue
  // object so timings can be tuned independently after native-speaker review.
  const INDONESIAN_CUE_TIMELINES = Object.fromEntries(
    Object.entries(VIETNAMESE_CUE_TIMELINES).map(([label, cues]) => [
      label,
      cues.map((cue) => ({ ...cue })),
    ]),
  );

  // The Malaysian Malay presenter script preserves the same semantic order.
  // Keep its cues separate so native-speaker feedback can refine timing later.
  const MALAY_CUE_TIMELINES = Object.fromEntries(
    Object.entries(INDONESIAN_CUE_TIMELINES).map(([label, cues]) => [
      label,
      cues.map((cue) => ({ ...cue })),
    ]),
  );

  const CUE_TIMELINES_BY_LOCALE = {
    en: ENGLISH_CUE_TIMELINES,
    th: THAI_CUE_TIMELINES,
    zh: CHINESE_CUE_TIMELINES,
    vi: VIETNAMESE_CUE_TIMELINES,
    id: INDONESIAN_CUE_TIMELINES,
    ms: MALAY_CUE_TIMELINES,
  };
  for (const [locale, timelines] of Object.entries(CUE_TIMELINES_BY_LOCALE)) {
    for (const label of MOTION_LABELS) {
      const cues = timelines[label];
      if (!Array.isArray(cues) || cues.length === 0) {
        throw new Error(`Missing ${locale} motion cues for ${label}.`);
      }
      const expectedKeys = ENGLISH_CUE_TIMELINES[label]
        .map((cue) => cue.key)
        .join("|");
      const actualKeys = cues.map((cue) => cue.key).join("|");
      if (actualKeys !== expectedKeys) {
        throw new Error(`Cue order mismatch for ${locale}: ${label}.`);
      }
    }
  }
  const CUE_TIMELINES = CUE_TIMELINES_BY_LOCALE[LOCALE];

  let stage;
  let narrationButton;
  let narrationObserver;
  let installPoll;
  let entranceFrameA;
  let entranceFrameB;

  const px = (value) => `${Number(value) || 0}px`;

  const directChildren = (element) =>
    element ? [...element.children].filter((child) => child instanceof HTMLElement) : [];

  const markEntrance = (
    element,
    { delay = 0, x = 0, y = 24, scale = 0.985, blur = 8 } = {},
  ) => {
    if (!(element instanceof HTMLElement)) return;
    element.classList.add("bbm-reveal");
    element.style.setProperty("--bbm-delay", `${delay}ms`);
    element.style.setProperty("--bbm-x", px(x));
    element.style.setProperty("--bbm-y", px(y));
    element.style.setProperty("--bbm-scale", String(scale));
    element.style.setProperty("--bbm-blur", px(blur));
  };

  const markMedia = (element) => {
    if (element instanceof HTMLElement) element.classList.add("bbm-media");
  };

  const markCue = (
    element,
    key,
    {
      surface = true,
      focusPaddingX = 8,
      focusPaddingY = 8,
      focusRadius = 14,
      strength = "standard",
    } = {},
  ) => {
    if (!(element instanceof HTMLElement)) return;
    element.classList.add(
      "bbm-cue",
      surface ? "bbm-cue-surface" : "bbm-cue-text",
    );
    element.dataset.bbmCue = key;
    element.dataset.bbmCueStrength = strength;
    if (surface) {
      element.style.setProperty("--bbm-focus-inset-x", px(-focusPaddingX));
      element.style.setProperty("--bbm-focus-inset-y", px(-focusPaddingY));
      element.style.setProperty("--bbm-focus-radius", px(focusRadius));
    }
  };

  const setupTitle = (slide) => {
    const [halo, masthead, hero, footer] = directChildren(slide);
    halo?.classList.add("bbm-atmosphere");
    markEntrance(masthead, { delay: 40, y: -18, blur: 6 });
    const heroItems = directChildren(hero);
    heroItems.forEach((item, index) =>
      markEntrance(item, {
        delay: 150 + index * 120,
        y: index === 1 ? 38 : 24,
        scale: index === 1 ? 0.94 : 0.985,
        blur: index === 1 ? 12 : 8,
      }),
    );
    markEntrance(footer, { delay: 670, y: 16, blur: 4 });

    markCue(hero?.querySelector("h1"), "promise", { surface: false });
    const paragraphs = hero?.querySelectorAll(":scope > p") || [];
    markCue(paragraphs[0], "platform", { surface: false });
    markCue(paragraphs[1], "experience", { surface: false });
  };

  const setupPlatformMap = (slide) => {
    const children = directChildren(slide);
    const eyebrow = children[1];
    const headline = children[2];
    const lead = children[3];
    const grid = children[4];
    markEntrance(eyebrow, { delay: 30, y: 14, blur: 4 });
    markEntrance(headline, { delay: 110, y: 28, scale: 0.975 });
    markEntrance(lead, { delay: 210, y: 20, blur: 5 });

    const cards = directChildren(grid);
    const keys = ["music", "content", "operations"];
    cards.forEach((card, index) => {
      markEntrance(card, {
        delay: 330 + index * 130,
        y: 42,
        scale: 0.955,
        blur: 10,
      });
      markCue(card, keys[index]);
      markMedia(card.firstElementChild);
    });
  };

  const setupMusicAutomation = (slide) => {
    const [header, grid] = directChildren(slide);
    const headerItems = directChildren(header);
    markEntrance(headerItems[0], { delay: 40, x: -24, y: 10, blur: 6 });
    markEntrance(headerItems[1], { delay: 180, y: 20, blur: 5 });

    const cards = directChildren(grid);
    cards.forEach((card, index) => {
      markEntrance(card, {
        delay: 300 + index * 82,
        y: 30,
        scale: 0.972,
        blur: 7,
      });
      markMedia(card.firstElementChild);
    });

    const quietText = { surface: false, strength: "quiet" };
    markCue(cards[0], "zones", quietText);
    markCue(cards[1], "dayparts", quietText);
    markCue(cards[2], "offline", quietText);
    cards.slice(3).forEach((card) => markCue(card, "library", quietText));
  };

  const setupAutomations = (slide) => {
    const [halo, header, grid, footer] = directChildren(slide);
    halo?.classList.add("bbm-atmosphere");
    const headerItems = directChildren(header);
    markEntrance(headerItems[0], { delay: 40, x: -22, y: 10, blur: 6 });
    markEntrance(headerItems[1], { delay: 170, y: 18, blur: 5 });

    const cards = directChildren(grid);
    cards.forEach((card, index) => {
      markEntrance(card, {
        delay: 290 + (index % 4) * 72 + Math.floor(index / 4) * 110,
        y: 26,
        scale: 0.975,
        blur: 7,
      });
      markMedia(card.firstElementChild);
    });
    markEntrance(footer, { delay: 760, y: 18, blur: 4 });

    const quietText = { surface: false, strength: "quiet" };
    [cards[0], cards[1]].forEach((card) => markCue(card, "time", quietText));
    [cards[2], cards[3]].forEach((card) =>
      markCue(card, "climate", quietText),
    );
    markCue(cards[4], "busy", quietText);
    [cards[5], cards[6], cards[7]].forEach((card) =>
      markCue(card, "calendar", quietText),
    );
    markCue(footer, "custom", quietText);
  };

  const setupMusicDirector = (slide) => {
    const grid = directChildren(slide)[1];
    const [copy, recommendation] = directChildren(grid);
    const copyItems = directChildren(copy);

    copyItems.slice(0, 3).forEach((item, index) =>
      markEntrance(item, {
        delay: 50 + index * 90,
        y: 20 + index * 4,
        blur: 6,
      }),
    );
    copyItems.slice(3).forEach((item, index) =>
      markEntrance(item, {
        delay: 320 + index * 90,
        x: -18,
        y: 8,
        blur: 4,
      }),
    );
    markEntrance(recommendation, {
      delay: 220,
      x: 46,
      y: 0,
      scale: 0.94,
      blur: 11,
    });

    markCue(recommendation, "recommendation");
    const featureFocus = {
      focusPaddingX: 18,
      focusPaddingY: 6,
      focusRadius: 8,
    };
    markCue(copyItems[3], "learning", featureFocus);
    markCue(copyItems[4], "seasonal", featureFocus);
    markCue(copyItems[5], "proof", featureFocus);
  };

  const setupCompose = (slide) => {
    const [halo, grid] = directChildren(slide);
    halo?.classList.add("bbm-atmosphere");
    const [copy, creation] = directChildren(grid);
    const copyItems = directChildren(copy);
    const creationItems = directChildren(creation);

    copyItems.forEach((item, index) =>
      markEntrance(item, {
        delay: 60 + index * 92,
        x: -26,
        y: 10,
        blur: 6,
      }),
    );
    creationItems.forEach((item, index) =>
      markEntrance(item, {
        delay: 230 + index * 105,
        x: 34,
        y: 8,
        scale: index === 1 ? 0.965 : 0.985,
        blur: 8,
      }),
    );

    markCue(creationItems[1], "brief", {
      focusPaddingX: 12,
      focusPaddingY: 10,
      focusRadius: 12,
    });
    markCue(creationItems[3], "results", {
      surface: false,
      strength: "quiet",
    });
    directChildren(creationItems[3]).forEach(markMedia);
    markCue(copyItems[3], "signature", {
      surface: false,
      strength: "quiet",
    });
  };

  const setupStudioScreens = (slide) => {
    const [eyebrow, headline, grid] = directChildren(slide);
    const [capabilities, showcase] = directChildren(grid);
    const capabilityItems = directChildren(capabilities);
    const showcaseItems = directChildren(showcase);

    markEntrance(eyebrow, { delay: 20, y: 14, blur: 4 });
    markEntrance(headline, { delay: 110, y: 28, scale: 0.975 });
    markEntrance(capabilityItems[0], { delay: 260, x: -28, y: 8, blur: 7 });
    markEntrance(capabilityItems[2], { delay: 390, x: -28, y: 8, blur: 7 });
    markEntrance(capabilityItems[3], { delay: 520, y: 14, blur: 5 });
    markEntrance(showcaseItems[0], {
      delay: 260,
      x: 34,
      y: 4,
      scale: 0.92,
      blur: 12,
    });

    const thumbnailGrid = showcaseItems[1];
    directChildren(thumbnailGrid).forEach((thumbnail, index) => {
      markEntrance(thumbnail, {
        delay: 460 + index * 90,
        y: 30,
        scale: 0.9,
        blur: 9,
      });
      markMedia(thumbnail.firstElementChild);
    });

    markCue(capabilityItems[0], "studio");
    markCue(capabilityItems[2], "channels");
    markCue(showcase, "screens");
    markMedia(showcaseItems[0]?.firstElementChild);
  };

  const setupAnnouncements = (slide) => {
    const [halo, grid] = directChildren(slide);
    halo?.classList.add("bbm-atmosphere");
    const [copy, examples] = directChildren(grid);
    const copyItems = directChildren(copy);
    const exampleCards = directChildren(examples);

    copyItems.forEach((item, index) =>
      markEntrance(item, {
        delay: 60 + index * 100,
        x: -24,
        y: 10,
        blur: 6,
      }),
    );
    exampleCards.forEach((card, index) => {
      markEntrance(card, {
        delay: 260 + index * 130,
        x: 34,
        y: 14,
        scale: 0.97,
        blur: 8,
      });
      markMedia(card);
    });

    const quietText = { surface: false, strength: "quiet" };
    [exampleCards[0], exampleCards[1]].forEach((card) =>
      markCue(card, "venue", quietText),
    );
    markCue(exampleCards[2], "phone", quietText);
    markCue(copyItems[3], "phone", quietText);
    markCue(copyItems[1], "one-place", quietText);
  };

  const setupAiAssistants = (slide) => {
    const [halo, grid] = directChildren(slide);
    halo?.classList.add("bbm-atmosphere");
    const [copy, chat] = directChildren(grid);
    const copyItems = directChildren(copy);
    const chatItems = directChildren(chat);

    copyItems.forEach((item, index) =>
      markEntrance(item, {
        delay: 50 + index * 86,
        x: -26,
        y: 9,
        blur: 6,
      }),
    );
    markEntrance(chatItems[0], { delay: 210, x: 32, y: 8, blur: 7 });
    chatItems.slice(1).forEach((message, index) =>
      markEntrance(message, {
        delay: 300 + index * 82,
        x: index % 2 === 0 ? 28 : -18,
        y: 10,
        scale: 0.982,
        blur: 6,
      }),
    );

    markCue(chat, "plain-language", {
      surface: false,
      strength: "quiet",
    });
    markCue(copyItems[3], "control", {
      surface: false,
      strength: "quiet",
    });
  };

  const setupOperators = (slide) => {
    const [eyebrow, headline, selfServeGrid, windowsPanel, managedPanel] =
      directChildren(slide);
    markEntrance(eyebrow, { delay: 20, y: 14, blur: 4 });
    markEntrance(headline, { delay: 110, y: 28, scale: 0.975 });

    directChildren(selfServeGrid).forEach((item, index) =>
      markEntrance(item, {
        delay: 250 + index * 80,
        y: 24,
        blur: 5,
      }),
    );
    markEntrance(windowsPanel, { delay: 560, y: 28, scale: 0.985, blur: 6 });
    markEntrance(managedPanel, { delay: 680, y: 34, scale: 0.97, blur: 8 });

    markCue(selfServeGrid, "self-serve");
    markCue(windowsPanel, "self-serve", {
      surface: false,
      strength: "quiet",
    });
    markCue(managedPanel, "managed");
  };

  const setupReliability = (slide) => {
    const [header, grid] = directChildren(slide);
    const headerItems = directChildren(header);
    markEntrance(headerItems[0], { delay: 50, x: -24, y: 10, blur: 6 });
    markEntrance(headerItems[1], { delay: 180, y: 20, blur: 5 });

    const cards = directChildren(grid);
    const keys = ["offline", "recovery", "receipts", "licence"];
    cards.forEach((card, index) => {
      markEntrance(card, {
        delay: 300 + index * 120,
        y: 34,
        scale: 0.965,
        blur: 8,
      });
      markMedia(card.firstElementChild);
      markCue(card, keys[index], {
        surface: false,
        strength: "quiet",
      });
    });
  };

  const setupDifference = (slide) => {
    const [header, table, conclusion] = directChildren(slide);
    markEntrance(header, { delay: 50, x: -24, y: 10, blur: 6 });
    markEntrance(table, { delay: 240, y: 34, scale: 0.975, blur: 9 });
    markEntrance(conclusion, { delay: 620, y: 20, blur: 5 });

    const tableParts = directChildren(table);
    const rows = directChildren(tableParts[1]);
    const markTableCue = (row, key) => {
      markCue(row, key, {
        surface: false,
        strength: "quiet",
      });
      row.style.setProperty("--bbm-soft-scale", "1");
      row.style.setProperty("--bbm-active-y", "0px");
      row.style.setProperty("--bbm-active-scale", "1");
    };
    rows.slice(0, 2).forEach((row) => markTableCue(row, "foundation"));
    rows.slice(2).forEach((row) => markTableCue(row, "difference"));
    markCue(conclusion, "one-platform", {
      surface: false,
      strength: "quiet",
    });
  };

  const setupPricing = (slide) => {
    const [eyebrow, headline, cards, footer] = directChildren(slide);
    markEntrance(eyebrow, { delay: 30, y: 14, blur: 4 });
    markEntrance(headline, { delay: 120, y: 28, scale: 0.975, blur: 7 });
    const priceCards = directChildren(cards);
    priceCards.forEach((card, index) =>
      markEntrance(card, {
        delay: 300 + index * 150,
        x: index === 0 ? -30 : 30,
        y: 14,
        scale: 0.955,
        blur: 10,
      }),
    );
    markEntrance(footer, { delay: 650, y: 22, blur: 5 });

    markCue(priceCards[0], "self-serve");
    markCue(priceCards[1], "managed");
    markCue(footer, "enterprise", {
      surface: false,
      strength: "quiet",
    });
  };

  const setupPeople = (slide) => {
    const [halo, logo, motto, grid] = directChildren(slide);
    halo?.classList.add("bbm-atmosphere");
    markEntrance(logo, { delay: 30, x: -20, y: -10, blur: 5 });
    markEntrance(motto, { delay: 90, x: 20, y: -10, blur: 5 });
    const [copy, proof] = directChildren(grid);
    markEntrance(copy, { delay: 190, x: -34, y: 12, blur: 8 });
    const proofRows = directChildren(proof);
    proofRows.forEach((row, index) =>
      markEntrance(row, {
        delay: 320 + index * 120,
        x: 34,
        y: 8,
        blur: 6,
      }),
    );

    const quietText = { surface: false, strength: "quiet" };
    markCue(copy, "heritage", quietText);
    markCue(proofRows[0], "heritage", quietText);
    markCue(proofRows[1], "designers", quietText);
    markCue(proofRows[2], "support", quietText);
  };

  const setupClose = (slide) => {
    const [halo, logo, hero, actionRow] = directChildren(slide);
    halo?.classList.add("bbm-atmosphere");
    markEntrance(logo, { delay: 30, x: -18, y: -10, blur: 5 });
    const heroItems = directChildren(hero);
    heroItems.forEach((item, index) =>
      markEntrance(item, {
        delay: 170 + index * 120,
        x: -26,
        y: 12,
        blur: 7,
      }),
    );
    markEntrance(actionRow, { delay: 570, y: 28, scale: 0.975, blur: 7 });

    const quietText = { surface: false, strength: "quiet" };
    markCue(heroItems[1], "breadth", quietText);
    markCue(heroItems[2], "included", quietText);
    markCue(actionRow, "action", quietText);
  };

  const setupSlide = (slide) => {
    const label = canonicalLabel(slide.getAttribute("data-label") || "");
    if (!MOTION_LABELS.has(label)) return;
    slide.dataset.bbmMotion = "full-deck";
    slide.classList.add("bbm-motion-slide");

    if (label === "Title") setupTitle(slide);
    if (label === "One platform, many jobs") setupPlatformMap(slide);
    if (label === "Music that runs itself") setupMusicAutomation(slide);
    if (label === "Automations") setupAutomations(slide);
    if (label === "Your Music Director") setupMusicDirector(slide);
    if (label === "Compose") setupCompose(slide);
    if (label === "Studio & screens") setupStudioScreens(slide);
    if (label === "Announcements") setupAnnouncements(slide);
    if (label === "Works with Claude & ChatGPT") setupAiAssistants(slide);
    if (label === "Built for operators") setupOperators(slide);
    if (label === "Never go silent") setupReliability(slide);
    if (label === "Why Beat Breeze") setupDifference(slide);
    if (label === "Pricing") setupPricing(slide);
    if (label === "Who's behind it") setupPeople(slide);
    if (label === "Close") setupClose(slide);
  };

  const clearCue = (slide) => {
    if (!(slide instanceof HTMLElement)) return;
    slide.removeAttribute("data-bbm-narrating");
    slide.removeAttribute("data-bbm-current-cue");
    slide.querySelectorAll(".bbm-cue").forEach((element) =>
      element.classList.remove("bbm-is-active", "bbm-is-soft"),
    );
  };

  const clearAllCues = () => {
    stage
      ?.querySelectorAll(":scope > section[data-bbm-motion]")
      .forEach(clearCue);
  };

  const applyCue = (slide, key) => {
    if (!(slide instanceof HTMLElement)) return;
    const cueElements = [...slide.querySelectorAll(".bbm-cue")];
    if (!key) {
      clearCue(slide);
      return;
    }
    slide.dataset.bbmNarrating = "true";
    slide.dataset.bbmCurrentCue = key;
    cueElements.forEach((element) => {
      const active = element.dataset.bbmCue === key;
      element.classList.toggle("bbm-is-active", active);
      element.classList.toggle("bbm-is-soft", !active);
    });
  };

  const activeSlide = () =>
    stage?.querySelector(":scope > section[data-deck-active]") || null;

  const activeSlideLabel = () =>
    canonicalLabel(activeSlide()?.getAttribute("data-label") || "");

  const cueAtProgress = (label, progress) =>
    CUE_TIMELINES[label]?.find(
      (cue) => progress >= cue.start && progress < cue.end,
    )?.key || null;

  const syncNarrationCue = () => {
    const slide = activeSlide();
    if (!slide || !MOTION_LABELS.has(activeSlideLabel())) {
      clearAllCues();
      return;
    }
    if (narrationButton?.dataset.state !== "playing") {
      clearCue(slide);
      return;
    }
    const raw = narrationButton.style.getPropertyValue(
      "--narration-progress",
    );
    const progress = Math.min(1, Math.max(0, parseFloat(raw) / 100 || 0));
    applyCue(slide, cueAtProgress(activeSlideLabel(), progress));
  };

  const bindNarration = () => {
    if (narrationButton?.isConnected) return true;
    const root = stage?.shadowRoot;
    const button = root?.querySelector("#beat-breeze-narration-toggle");
    if (!(button instanceof HTMLButtonElement)) return false;
    narrationButton = button;
    narrationObserver?.disconnect();
    narrationObserver = new MutationObserver(syncNarrationCue);
    narrationObserver.observe(narrationButton, {
      attributes: true,
      attributeFilter: ["data-state", "style"],
    });
    syncNarrationCue();
    return true;
  };

  const replayEntrance = (slide) => {
    window.cancelAnimationFrame(entranceFrameA);
    window.cancelAnimationFrame(entranceFrameB);
    if (!(slide instanceof HTMLElement) || !slide.dataset.bbmMotion) return;
    slide.removeAttribute("data-bbmEntered");
    clearCue(slide);
    entranceFrameA = window.requestAnimationFrame(() => {
      entranceFrameB = window.requestAnimationFrame(() => {
        slide.dataset.bbmEntered = "true";
        syncNarrationCue();
      });
    });
  };

  const addStyles = () => {
    if (document.querySelector("#beat-breeze-motion-styles")) return;
    const style = document.createElement("style");
    style.id = "beat-breeze-motion-styles";
    style.textContent = `
      deck-stage > section[data-bbm-motion] .bbm-reveal {
        opacity: 0;
        transform: translate3d(var(--bbm-x, 0), var(--bbm-y, 24px), 0)
          scale(var(--bbm-scale, .985));
        filter: blur(var(--bbm-blur, 8px));
        transform-origin: center center;
        transition:
          opacity 720ms cubic-bezier(.16, 1, .3, 1),
          transform 920ms cubic-bezier(.16, 1, .3, 1),
          filter 860ms cubic-bezier(.16, 1, .3, 1);
        transition-delay: 0ms;
        will-change: transform, opacity, filter;
      }

      deck-stage > section[data-bbm-motion][data-bbm-entered="true"] .bbm-reveal {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
        filter: blur(0);
        transition-delay: var(--bbm-delay, 0ms);
      }

      deck-stage > section[data-bbm-motion] .bbm-atmosphere {
        transform-origin: center center;
        animation: bbm-atmosphere-breathe 8s ease-in-out infinite;
      }

      deck-stage > section[data-bbm-motion]:not([data-deck-active]) .bbm-atmosphere {
        animation-play-state: paused;
      }

      deck-stage > section[data-bbm-motion] .bbm-cue {
        --bbm-soft-opacity: .78;
        --bbm-soft-saturation: .82;
        --bbm-soft-brightness: .9;
        --bbm-soft-scale: .992;
        --bbm-active-y: -10px;
        --bbm-active-scale: 1.025;
        --bbm-active-saturation: 1.08;
        --bbm-active-brightness: 1.08;
        --bbm-text-active-saturation: 1.12;
        --bbm-text-active-brightness: 1.13;
        position: relative;
        transition:
          opacity 520ms cubic-bezier(.16, 1, .3, 1),
          transform 700ms cubic-bezier(.16, 1, .3, 1),
          filter 520ms cubic-bezier(.16, 1, .3, 1);
        transform-origin: center center;
      }

      deck-stage > section[data-bbm-motion] .bbm-cue[data-bbm-cue-strength="quiet"] {
        --bbm-soft-opacity: .88;
        --bbm-soft-saturation: .92;
        --bbm-soft-brightness: .95;
        --bbm-soft-scale: .997;
        --bbm-active-y: -4px;
        --bbm-active-scale: 1.012;
        --bbm-active-saturation: 1.035;
        --bbm-active-brightness: 1.045;
        --bbm-text-active-saturation: 1.06;
        --bbm-text-active-brightness: 1.07;
      }

      deck-stage > section[data-bbm-motion][data-bbm-entered="true"][data-bbm-narrating="true"] .bbm-cue.bbm-is-soft {
        opacity: var(--bbm-soft-opacity);
        filter:
          saturate(var(--bbm-soft-saturation))
          brightness(var(--bbm-soft-brightness));
        transform: scale(var(--bbm-soft-scale));
      }

      deck-stage > section[data-bbm-motion][data-bbm-entered="true"][data-bbm-narrating="true"] .bbm-cue.bbm-is-active {
        opacity: 1;
        filter:
          saturate(var(--bbm-active-saturation))
          brightness(var(--bbm-active-brightness));
        transform:
          translate3d(0, var(--bbm-active-y), 0)
          scale(var(--bbm-active-scale));
        z-index: 4;
      }

      deck-stage > section[data-bbm-motion][data-bbm-entered="true"][data-bbm-narrating="true"] .bbm-cue-text.bbm-is-active {
        filter:
          saturate(var(--bbm-text-active-saturation))
          brightness(var(--bbm-text-active-brightness));
      }

      deck-stage > section[data-bbm-motion] .bbm-media {
        transform-origin: center center;
        transition: transform 1100ms cubic-bezier(.16, 1, .3, 1), filter 700ms ease;
        will-change: transform;
      }

      deck-stage > section[data-bbm-motion] .bbm-cue.bbm-is-active .bbm-media {
        transform: scale(1.07);
      }

      deck-stage > section[data-bbm-motion] .bbm-cue[data-bbm-cue-strength="quiet"].bbm-is-active .bbm-media {
        transform: scale(1.025);
      }

      @keyframes bbm-atmosphere-breathe {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: .88; }
        50% { transform: translate3d(-18px, 16px, 0) scale(1.06); opacity: 1; }
      }

      @media (prefers-reduced-motion: reduce) {
        deck-stage > section[data-bbm-motion] .bbm-reveal,
        deck-stage > section[data-bbm-motion][data-bbm-entered="true"] .bbm-reveal,
        deck-stage > section[data-bbm-motion] .bbm-cue,
        deck-stage > section[data-bbm-motion] .bbm-cue.bbm-is-active,
        deck-stage > section[data-bbm-motion] .bbm-cue.bbm-is-soft,
        deck-stage > section[data-bbm-motion] .bbm-media,
        deck-stage > section[data-bbm-motion] .bbm-atmosphere {
          animation: none !important;
          transition: none !important;
          transform: none !important;
          filter: none !important;
          opacity: 1 !important;
        }

      }
    `;
    document.head.append(style);
  };

  const install = () => {
    stage = document.querySelector("deck-stage");
    if (!stage?.shadowRoot) return false;
    if (!stage.dataset.bbmMotionInstalled) {
      addStyles();
      stage
        .querySelectorAll(":scope > section")
        .forEach((slide) => setupSlide(slide));
      stage.dataset.bbmMotionInstalled = VERSION;
      stage.addEventListener("slidechange", () => {
        clearAllCues();
        replayEntrance(activeSlide());
        window.setTimeout(bindNarration, 0);
      });
      replayEntrance(activeSlide());
      window.__beatBreezeMotion = Object.freeze({
        version: VERSION,
        locale: LOCALE,
        slides: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        focusStyle: "subtle lift and brightness",
        mode: "official full-deck motion",
      });
    }
    bindNarration();
    return true;
  };

  if (install()) {
    installPoll = window.setInterval(() => {
      if (bindNarration()) window.clearInterval(installPoll);
    }, 100);
    window.setTimeout(() => window.clearInterval(installPoll), 10000);
    return;
  }

  const observer = new MutationObserver(() => {
    if (install()) {
      observer.disconnect();
      window.clearInterval(installPoll);
      installPoll = window.setInterval(() => {
        if (bindNarration()) window.clearInterval(installPoll);
      }, 100);
      window.setTimeout(() => window.clearInterval(installPoll), 10000);
    }
  });
  installPoll = window.setInterval(install, 100);
  observer.observe(document, { childList: true, subtree: true });
  window.setTimeout(() => {
    observer.disconnect();
    window.clearInterval(installPoll);
  }, 10000);
})();
