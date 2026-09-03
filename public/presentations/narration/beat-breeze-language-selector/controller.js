(() => {
  "use strict";

  const VERSION = "2026-09-03-1";
  const LOCALES = [
    { code: "en", name: "English", path: "beat-breeze.html", dir: "ltr" },
    { code: "th", name: "ไทย", path: "beat-breeze-th.html", dir: "ltr" },
    { code: "zh", name: "简体中文", path: "beat-breeze-zh.html", dir: "ltr" },
    { code: "vi", name: "Tiếng Việt", path: "beat-breeze-vi.html", dir: "ltr" },
    { code: "id", name: "Bahasa Indonesia", path: "beat-breeze-id.html", dir: "ltr" },
    { code: "ms", name: "Bahasa Melayu", path: "beat-breeze-ms.html", dir: "ltr" },
    { code: "ko", name: "한국어", path: "beat-breeze-ko.html", dir: "ltr" },
    { code: "ja", name: "日本語", path: "beat-breeze-ja.html", dir: "ltr" },
    { code: "ar", name: "العربية", path: "beat-breeze-ar.html", dir: "rtl" },
  ];
  const UI_COPY = {
    en: { button: "Language", menu: "Presentation language" },
    th: { button: "ภาษา", menu: "ภาษาของงานนำเสนอ" },
    zh: { button: "语言", menu: "演示语言" },
    vi: { button: "Ngôn ngữ", menu: "Ngôn ngữ trình bày" },
    id: { button: "Bahasa", menu: "Bahasa presentasi" },
    ms: { button: "Bahasa", menu: "Bahasa pembentangan" },
    ko: { button: "언어", menu: "프레젠테이션 언어" },
    ja: { button: "言語", menu: "プレゼンテーションの言語" },
    ar: { button: "اللغة", menu: "لغة العرض التقديمي" },
  };
  const GLOBE_ICON = `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7.2"></circle>
      <path d="M2.8 10h14.4M10 2.8c2 2 3.1 4.4 3.1 7.2S12 15.2 10 17.2C8 15.2 6.9 12.8 6.9 10S8 4.8 10 2.8Z"></path>
    </svg>`;

  const language = document.documentElement.lang.toLowerCase();
  const currentCode = LOCALES.some((locale) => language.startsWith(locale.code))
    ? LOCALES.find((locale) => language.startsWith(locale.code)).code
    : "en";
  const current = LOCALES.find((locale) => locale.code === currentCode);
  const copy = UI_COPY[currentCode] || UI_COPY.en;
  let stage;
  let root;
  let toolbar;
  let button;
  let menu;
  let open = false;

  const slideHash = () => {
    const match = window.location.hash.match(/^#(?:slide-)?(1[0-5]|[1-9])$/);
    return match ? `#${match[1]}` : "#1";
  };

  const destinationFor = (path) => {
    const url = new URL(path, window.location.href);
    url.hash = slideHash();
    return url.href;
  };

  const addStyles = () => {
    if (root.querySelector("#beat-breeze-language-selector-styles")) return;
    const style = document.createElement("style");
    style.id = "beat-breeze-language-selector-styles";
    style.dataset.version = VERSION;
    style.textContent = `
      .language-divider { opacity: .72; }
      .language-selector-toggle {
        width: auto !important;
        min-width: 126px;
        gap: 8px !important;
        padding-inline: 14px !important;
      }
      .language-selector-toggle[aria-expanded="true"] {
        color: #fff !important;
        background: rgba(255,255,255,.12) !important;
      }
      .language-selector-icon,
      .language-selector-chevron {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
      }
      .language-selector-icon svg {
        width: 18px !important;
        height: 18px !important;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .language-selector-chevron {
        font-size: 10px;
        opacity: .62;
        transform: translateY(-1px);
        transition: transform 160ms ease;
      }
      .language-selector-toggle[aria-expanded="true"] .language-selector-chevron {
        transform: translateY(1px) rotate(180deg);
      }
      .language-selector-label { white-space: nowrap; }
      .language-selector-menu[hidden] { display: none !important; }
      .language-selector-menu {
        position: fixed;
        z-index: 140;
        width: min(244px, calc(100vw - 28px));
        max-height: min(486px, calc(100vh - 116px));
        overflow-y: auto;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 14px;
        background: rgba(20,20,20,.97);
        box-shadow: 0 20px 52px rgba(0,0,0,.46);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        animation: language-selector-in 160ms ease-out both;
      }
      .language-selector-option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        min-height: 42px;
        box-sizing: border-box;
        padding: 9px 11px;
        border-radius: 9px;
        color: rgba(255,255,255,.74);
        text-decoration: none;
        font: 500 13px/1.25 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        transition: color 140ms ease, background 140ms ease;
      }
      .language-selector-option:hover,
      .language-selector-option:focus-visible {
        color: #fff;
        background: rgba(255,255,255,.08);
        outline: none;
      }
      .language-selector-option[aria-current="page"] {
        color: #fff;
        background: rgba(239,166,52,.12);
      }
      .language-selector-option[aria-current="page"]::after {
        content: "";
        width: 6px;
        height: 6px;
        flex: 0 0 auto;
        border-radius: 50%;
        background: #EFA634;
        box-shadow: 0 0 0 3px rgba(239,166,52,.12);
      }
      @keyframes language-selector-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @media (max-width: 720px) {
        .language-selector-toggle {
          width: 44px !important;
          min-width: 44px !important;
          padding-inline: 0 !important;
        }
        .language-selector-label,
        .language-selector-chevron { display: none; }
      }
      @media (max-width: 520px) {
        .language-divider { display: none !important; }
      }
      @media (prefers-reduced-motion: reduce) {
        .language-selector-menu { animation: none; }
        .language-selector-chevron { transition: none; }
      }
    `;
    root.append(style);
  };

  const placeMenu = () => {
    if (!button || !menu || menu.hidden) return;
    const buttonRect = button.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const edge = 14;
    const left = Math.min(
      window.innerWidth - menuRect.width - edge,
      Math.max(edge, buttonRect.right - menuRect.width),
    );
    const top = Math.max(edge, buttonRect.top - menuRect.height - 10);
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!open) return;
    open = false;
    button.setAttribute("aria-expanded", "false");
    menu.hidden = true;
    if (restoreFocus) button.focus();
  };

  const openMenu = () => {
    open = true;
    button.setAttribute("aria-expanded", "true");
    menu.hidden = false;
    placeMenu();
    menu.querySelector('[aria-current="page"]')?.focus();
  };

  const install = () => {
    stage = document.querySelector("deck-stage");
    root = stage?.shadowRoot;
    toolbar = root?.querySelector('[role="toolbar"]');
    if (!stage || !root || !toolbar) return false;
    if (root.querySelector("#beat-breeze-language-selector-toggle")) return true;

    addStyles();

    const divider = document.createElement("span");
    divider.className = "divider language-divider";
    divider.setAttribute("aria-hidden", "true");

    button = document.createElement("button");
    button.id = "beat-breeze-language-selector-toggle";
    button.className = "btn language-selector-toggle";
    button.type = "button";
    button.setAttribute("aria-haspopup", "menu");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", `${copy.button}: ${current.name}`);
    button.title = `${copy.button}: ${current.name}`;
    button.innerHTML = `
      <span class="language-selector-icon" aria-hidden="true">${GLOBE_ICON}</span>
      <span class="language-selector-label">${current.name}</span>
      <span class="language-selector-chevron" aria-hidden="true">⌃</span>
    `;

    menu = document.createElement("div");
    menu.id = "beat-breeze-language-selector-menu";
    menu.className = "language-selector-menu";
    menu.hidden = true;
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", copy.menu);
    menu.innerHTML = LOCALES.map(
      (locale) => `
        <a class="language-selector-option" role="menuitem" dir="${locale.dir}"
          lang="${locale.code}" href="${destinationFor(locale.path)}"
          ${locale.code === currentCode ? 'aria-current="page"' : ""}>
          <span>${locale.name}</span>
        </a>`,
    ).join("");

    toolbar.append(divider, button);
    root.append(menu);

    button.addEventListener("click", () => (open ? closeMenu() : openMenu()));
    menu.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (!link) return;
      try {
        window.localStorage.setItem(
          "beat-breeze-presentation-language",
          link.getAttribute("lang"),
        );
      } catch {
        // The selector remains fully functional without browser storage.
      }
    });
    document.addEventListener("pointerdown", (event) => {
      const path = event.composedPath();
      if (!open || path.includes(button) || path.includes(menu)) return;
      closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (!open) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
      }
    });
    window.addEventListener("resize", placeMenu, { passive: true });
    stage.addEventListener("slidechange", () => {
      for (const link of menu.querySelectorAll("a[href]")) {
        const locale = LOCALES.find((item) => item.code === link.lang);
        if (locale) link.href = destinationFor(locale.path);
      }
    });

    return true;
  };

  if (install()) return;
  const observer = new MutationObserver(() => {
    if (install()) {
      observer.disconnect();
      window.clearInterval(installPoll);
    }
  });
  const installPoll = window.setInterval(() => {
    if (install()) {
      window.clearInterval(installPoll);
      observer.disconnect();
    }
  }, 100);
  observer.observe(document, { childList: true, subtree: true });
  window.setTimeout(() => {
    observer.disconnect();
    window.clearInterval(installPoll);
  }, 10000);
})();
