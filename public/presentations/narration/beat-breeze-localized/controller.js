(() => {
  "use strict";

  const CONTROLLER_URL =
    document.currentScript?.src ||
    new URL(
      "./narration/beat-breeze-localized/controller.js",
      window.location.href,
    ).href;
  const LANGUAGE = document.documentElement.lang.toLowerCase();
  const LOCALE = LANGUAGE.startsWith("ko")
    ? "ko"
    : LANGUAGE.startsWith("ja")
      ? "ja"
      : "ar";
  const MANIFEST_URL = new URL(
    `../beat-breeze-${LOCALE}/manifest.json`,
    CONTROLLER_URL,
  ).href;
  const DISCOVERY_MS = 9500;
  const INVITATION_MS = 9000;
  const INVITATION_SESSION_KEY =
    `beat-breeze-narration-invitation-seen-${LOCALE}`;
  const ADVANCE_DELAY_MS = 650;
  const LOCAL_FALLBACK_MANIFEST = {
    deck: "beat-breeze",
    ready: false,
    slides: [],
  };
  const COPY = {
    ko: {
      loading: ["내레이션 불러오는 중", "불러오는 중", "내레이션을 불러오는 중입니다"],
      pending: ["음성 준비 중", "준비 중", "내레이션 음성을 준비하고 있습니다"],
      idle: ["내레이션 시작", "시작", "내레이션 시작"],
      playing: ["내레이션 켜짐", "음성 켜짐", "내레이션 음소거"],
      muted: ["내레이션 계속", "계속", "내레이션 계속 재생"],
      replay: ["다시 재생", "다시", "내레이션 프레젠테이션 다시 재생"],
      error: ["오디오 다시 시도", "다시 시도", "내레이션 오디오 다시 시도"],
      unavailable: ["음성 없음", "없음", "이 슬라이드에는 내레이션이 없습니다"],
      preparing: "내레이션 음성을 준비하고 있습니다.",
      unavailableSentence: "이 슬라이드에는 내레이션이 없습니다.",
      playingSentence: (slide) => `${slide}번 슬라이드 내레이션을 재생합니다.`,
      failed: "내레이션을 재생할 수 없습니다. 다시 시도해 주세요.",
      off: "내레이션을 껐습니다.",
      complete: "내레이션 프레젠테이션이 끝났습니다.",
      audioFailed: "내레이션 오디오를 불러올 수 없습니다.",
      toolbar: "프레젠테이션 제어",
      narration: "내레이션",
      voice: "음성",
      invitationLabel: "내레이션 시작 안내",
      invitation: "설명과 함께 보시겠어요?",
      invitationStart: "내레이션 시작",
      invitationDismiss: "내레이션 안내 닫기",
      ready: "내레이션을 재생할 수 있습니다.",
      manifestFailed: "Beat Breeze 내레이션 파일을 불러오지 못했습니다",
      retry: "내레이션을 불러올 수 없습니다. 다시 시도해 주세요.",
    },
    ja: {
      loading: ["ナレーション読込中", "読込中", "ナレーションを読み込んでいます"],
      pending: ["音声準備中", "準備中", "ナレーション音声を準備しています"],
      idle: ["ナレーション開始", "開始", "ナレーションを開始"],
      playing: ["ナレーション再生中", "音声オン", "ナレーションをミュート"],
      muted: ["ナレーション再開", "再開", "ナレーションを再開"],
      replay: ["もう一度再生", "再生", "ナレーション付きプレゼンテーションをもう一度再生"],
      error: ["音声を再試行", "再試行", "ナレーション音声を再試行"],
      unavailable: ["音声なし", "利用不可", "このスライドにはナレーションがありません"],
      preparing: "ナレーション音声を準備しています。",
      unavailableSentence: "このスライドにはナレーションがありません。",
      playingSentence: (slide) => `${slide}枚目のナレーションを再生しています。`,
      failed: "ナレーションを再生できませんでした。もう一度お試しください。",
      off: "ナレーションを停止しました。",
      complete: "ナレーション付きプレゼンテーションが終了しました。",
      audioFailed: "ナレーション音声を読み込めませんでした。",
      toolbar: "プレゼンテーション操作",
      narration: "ナレーション",
      voice: "音声",
      invitationLabel: "ナレーション開始の案内",
      invitation: "解説付きでご覧になりますか？",
      invitationStart: "ナレーション開始",
      invitationDismiss: "ナレーションの案内を閉じる",
      ready: "ナレーションを再生できます。",
      manifestFailed: "Beat Breezeのナレーションファイルを読み込めませんでした",
      retry: "ナレーションを読み込めません。もう一度お試しください。",
    },
    ar: {
      loading: ["جارٍ تحميل السرد", "جارٍ التحميل", "جارٍ تحميل السرد الصوتي"],
      pending: ["الصوت قيد الإعداد", "قيد الإعداد", "جارٍ إعداد السرد الصوتي"],
      idle: ["ابدأ السرد", "ابدأ", "بدء السرد الصوتي"],
      playing: ["السرد يعمل", "الصوت يعمل", "كتم السرد الصوتي"],
      muted: ["استئناف السرد", "استئناف", "استئناف السرد الصوتي"],
      replay: ["إعادة التشغيل", "إعادة", "إعادة العرض التقديمي مع السرد"],
      error: ["إعادة محاولة الصوت", "إعادة المحاولة", "إعادة محاولة تحميل السرد"],
      unavailable: ["الصوت غير متاح", "غير متاح", "لا يتوفر سرد لهذه الشريحة"],
      preparing: "جارٍ إعداد السرد الصوتي.",
      unavailableSentence: "لا يتوفر سرد لهذه الشريحة.",
      playingSentence: (slide) => `يعمل الآن سرد الشريحة ${slide}.`,
      failed: "تعذر تشغيل السرد. يرجى المحاولة مرة أخرى.",
      off: "تم إيقاف السرد.",
      complete: "اكتمل العرض التقديمي المصحوب بالسرد.",
      audioFailed: "تعذر تحميل ملف السرد الصوتي.",
      toolbar: "عناصر التحكم في العرض",
      narration: "السرد",
      voice: "الصوت",
      invitationLabel: "دعوة لبدء السرد",
      invitation: "هل تفضلون النسخة المصحوبة بالشرح؟",
      invitationStart: "ابدأ السرد",
      invitationDismiss: "إغلاق دعوة السرد",
      ready: "السرد جاهز للتشغيل.",
      manifestFailed: "تعذر تحميل ملفات سرد Beat Breeze",
      retry: "تعذر تحميل السرد. حاولوا مرة أخرى.",
    },
  }[LOCALE];

  const ICONS = {
    idle: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3.5 8h3l3.6-3v10l-3.6-3h-3z" fill="currentColor"></path>
        <path d="M13 7.1a4 4 0 0 1 0 5.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
        <path d="m14.3 4.5 3.2 2-3.2 2z" fill="#EFA634"></path>
      </svg>`,
    playing: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3 8h3l3.8-3.1v10.2L6 12H3z" fill="currentColor"></path>
        <path d="M12.7 7.2a4 4 0 0 1 0 5.6M15 5a7 7 0 0 1 0 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
      </svg>`,
    muted: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3 8h3l3.8-3.1v10.2L6 12H3z" fill="currentColor"></path>
        <path d="m13.1 7.2 4.1 4.1m0-4.1-4.1 4.1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
      </svg>`,
    loading: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="25 13"></circle>
      </svg>`,
    replay: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M5.1 6.7A6 6 0 1 1 4 11.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
        <path d="M2.7 4.6v4h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>`,
  };

  const audio = new Audio();
  audio.preload = "metadata";
  audio.setAttribute("playsinline", "");

  let stage;
  let toolbar;
  let button;
  let icon;
  let label;
  let shortLabel;
  let liveRegion;
  let invitation;
  let invitationTimer;
  let manifest;
  let manifestPromise;
  let currentIndex = 0;
  let narrationEnabled = false;
  let narrationStarted = false;
  let completed = false;
  let advanceTimer;
  let pausedForVisibility = false;
  let playbackRequest = 0;

  const clearAdvanceTimer = () => {
    window.clearTimeout(advanceTimer);
    advanceTimer = undefined;
  };

  const dismissInvitation = ({ remember = true } = {}) => {
    window.clearTimeout(invitationTimer);
    invitationTimer = undefined;
    if (invitation) invitation.hidden = true;
    if (remember) {
      try {
        window.sessionStorage.setItem(INVITATION_SESSION_KEY, "1");
      } catch {
        // The invitation still works when browser storage is unavailable.
      }
    }
  };

  const showInvitation = () => {
    if (!invitation) return;
    try {
      if (window.sessionStorage.getItem(INVITATION_SESSION_KEY) === "1") return;
    } catch {
      // Show once for this page load when browser storage is unavailable.
    }
    invitation.hidden = false;
    toolbar.classList.add("narration-discovery");
    invitationTimer = window.setTimeout(
      () => dismissInvitation(),
      INVITATION_MS,
    );
  };

  const activeSlideIndex = () => {
    const slides = [...stage.querySelectorAll(":scope > section")];
    const index = slides.findIndex((slide) =>
      slide.hasAttribute("data-deck-active"),
    );
    return Math.max(0, index);
  };

  const announce = (message) => {
    if (liveRegion) liveRegion.textContent = message;
  };

  const setProgress = (value) => {
    if (!button) return;
    const clamped = Math.min(1, Math.max(0, Number(value) || 0));
    button.style.setProperty(
      "--narration-progress",
      `${(clamped * 100).toFixed(2)}%`,
    );
  };

  const setButtonState = (stateName) => {
    if (!button) return;

    const states = {
      loading: {
        icon: ICONS.loading,
        visible: COPY.loading[0],
        short: COPY.loading[1],
        pressed: "false",
        label: COPY.loading[2],
        disabled: true,
      },
      unavailable: {
        icon: ICONS.muted,
        visible: COPY.pending[0],
        short: COPY.pending[1],
        pressed: "false",
        label: COPY.pending[2],
        disabled: true,
      },
      idle: {
        icon: ICONS.muted,
        visible: COPY.idle[0],
        short: COPY.idle[1],
        pressed: "false",
        label: COPY.idle[2],
        disabled: false,
      },
      playing: {
        icon: ICONS.playing,
        visible: COPY.playing[0],
        short: COPY.playing[1],
        pressed: "true",
        label: COPY.playing[2],
        disabled: false,
      },
      muted: {
        icon: ICONS.muted,
        visible: COPY.muted[0],
        short: COPY.muted[1],
        pressed: "false",
        label: COPY.muted[2],
        disabled: false,
      },
      replay: {
        icon: ICONS.replay,
        visible: COPY.replay[0],
        short: COPY.replay[1],
        pressed: "false",
        label: COPY.replay[2],
        disabled: false,
      },
      error: {
        icon: ICONS.muted,
        visible: COPY.error[0],
        short: COPY.error[1],
        pressed: "false",
        label: COPY.error[2],
        disabled: false,
      },
    };

    const state = states[stateName];
    button.dataset.state = stateName;
    button.disabled = state.disabled;
    button.setAttribute("aria-pressed", state.pressed);
    button.setAttribute("aria-label", state.label);
    button.setAttribute(
      "aria-busy",
      stateName === "loading" ? "true" : "false",
    );
    button.title = state.label;
    icon.innerHTML = state.icon;
    label.textContent = state.visible;
    shortLabel.textContent = state.short;
  };

  const loadManifest = async () => {
    if (manifest) return manifest;
    if (window.location.protocol === "file:") {
      manifest = LOCAL_FALLBACK_MANIFEST;
      return manifest;
    }
    if (!manifestPromise) {
      manifestPromise = fetch(MANIFEST_URL, { cache: "no-store" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Narration manifest returned ${response.status}`);
          }
          return response.json();
        })
        .then((value) => {
          if (!value || value.deck !== "beat-breeze") {
            throw new Error("Narration manifest does not match this deck");
          }
          manifest = value;
          return value;
        })
        .catch((error) => {
          manifestPromise = undefined;
          throw error;
        });
    }
    return manifestPromise;
  };

  const slideAudio = (index) =>
    manifest?.slides?.find((slide) => slide.index === index + 1);

  const isFinalNarratedSlide = (index) => {
    const indexes = manifest?.slides
      ?.map((slide) => Number(slide.index) - 1)
      .filter(Number.isInteger);
    return indexes?.length ? index === Math.max(...indexes) : true;
  };

  const setNarrationUnavailable = () => {
    setButtonState("unavailable");
    label.textContent = COPY.unavailable[0];
    shortLabel.textContent = COPY.unavailable[1];
    button.setAttribute(
      "aria-label",
      COPY.unavailable[2],
    );
    button.title = COPY.unavailable[2];
  };

  const failPlayback = (message) => {
    clearAdvanceTimer();
    playbackRequest += 1;
    narrationEnabled = false;
    audio.pause();
    setButtonState("error");
    announce(message);
  };

  const playCurrentSlide = async ({ restart = false } = {}) => {
    clearAdvanceTimer();
    const request = ++playbackRequest;
    const requestedIndex = currentIndex;

    try {
      const data = await loadManifest();
      if (request !== playbackRequest || requestedIndex !== currentIndex) return;
      if (!data.ready || !Array.isArray(data.slides) || !data.slides.length) {
        narrationEnabled = false;
        setButtonState("unavailable");
        announce(COPY.preparing);
        return;
      }

      const slide = slideAudio(requestedIndex);
      if (!slide?.src) {
        narrationEnabled = false;
        setNarrationUnavailable();
        announce(COPY.unavailableSentence);
        return;
      }

      const nextSource = new URL(slide.src, MANIFEST_URL).href;
      const sourceChanged = audio.src !== nextSource;
      if (sourceChanged) {
        audio.src = nextSource;
        audio.load();
      } else if (restart) {
        audio.currentTime = 0;
      }

      narrationEnabled = true;
      narrationStarted = true;
      completed = false;
      setButtonState("playing");
      announce(COPY.playingSentence(currentIndex + 1));
      await audio.play();
    } catch (error) {
      if (request !== playbackRequest || error?.name === "AbortError") return;
      console.error("Beat Breeze narration playback failed", error);
      failPlayback(COPY.failed);
    }
  };

  const turnNarrationOff = () => {
    clearAdvanceTimer();
    playbackRequest += 1;
    narrationEnabled = false;
    audio.pause();
    setButtonState("muted");
    announce(COPY.off);
  };

  const handleToggle = async () => {
    dismissInvitation();
    toolbar.classList.remove("narration-discovery");

    if (completed) {
      narrationEnabled = true;
      completed = false;
      setButtonState("playing");
      if (currentIndex === 0) {
        await playCurrentSlide({ restart: true });
      } else {
        stage.goTo(0);
      }
      return;
    }

    if (narrationEnabled) {
      turnNarrationOff();
      return;
    }

    await playCurrentSlide({ restart: true });
  };

  const handleSlideChange = (event) => {
    clearAdvanceTimer();
    currentIndex = Number.isInteger(event.detail?.index)
      ? event.detail.index
      : activeSlideIndex();
    completed = false;
    setProgress(0);

    const hasNarration = Boolean(slideAudio(currentIndex)?.src);

    if (narrationEnabled && hasNarration) {
      void playCurrentSlide({ restart: true });
    } else {
      if (narrationEnabled) {
        playbackRequest += 1;
        narrationEnabled = false;
      }
      audio.pause();
      audio.removeAttribute("src");
      audio.load();

      if (!hasNarration) {
        setNarrationUnavailable();
        announce(COPY.unavailableSentence);
      } else {
        setButtonState(narrationStarted ? "muted" : "idle");
      }
    }
  };

  const addStyles = (root) => {
    if (root.querySelector("#beat-breeze-narration-styles")) return;
    const style = document.createElement("style");
    style.id = "beat-breeze-narration-styles";
    style.textContent = `
      .overlay.narration-discovery {
        opacity: 1;
        pointer-events: auto;
        transform: translate(-50%, 0) scale(1);
        filter: blur(0);
      }

      .overlay:focus-within {
        opacity: 1;
        pointer-events: auto;
        transform: translate(-50%, 0) scale(1);
        filter: blur(0);
      }

      .narration-toggle {
        --narration-progress: 0%;
        position: relative;
        width: 140px;
        min-width: 140px;
        padding: 0 10px !important;
        gap: 7px;
        overflow: hidden;
        cursor: pointer !important;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: rgba(255,255,255,0.82) !important;
      }

      .narration-toggle::after {
        content: "";
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 2px;
        height: 1px;
        border-radius: 999px;
        background: linear-gradient(
          90deg,
          #EFA634 0 var(--narration-progress),
          rgba(255,255,255,0.12) var(--narration-progress) 100%
        );
        opacity: 0;
        transition: opacity 160ms ease;
      }

      .narration-toggle[data-state="idle"] {
        background: rgba(239,166,52,0.16);
        color: #fff !important;
      }

      .narration-toggle[data-state="playing"] {
        background: rgba(239,166,52,0.2);
        color: #EFA634 !important;
        box-shadow: inset 0 0 0 1px rgba(239,166,52,0.28);
      }

      .narration-toggle[data-state="playing"]::after {
        opacity: 1;
      }

      .narration-toggle[data-state="loading"] .narration-icon svg {
        animation: narration-spin 900ms linear infinite;
      }

      .narration-toggle[data-state="unavailable"] {
        cursor: default !important;
        opacity: 0.56;
      }

      .narration-toggle[data-state="error"] {
        background: rgba(255,255,255,0.1);
      }

      .narration-toggle:focus-visible {
        outline: 2px solid #EFA634 !important;
        outline-offset: 2px !important;
      }

      .narration-icon {
        position: relative;
        width: 18px;
        min-width: 18px;
        height: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .narration-icon svg {
        width: 18px !important;
        height: 18px !important;
      }

      .narration-toggle[data-state="playing"] .narration-icon::after {
        content: "";
        position: absolute;
        top: -1px;
        right: -1px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #EFA634;
        box-shadow: 0 0 0 3px rgba(239,166,52,0.12);
      }

      .narration-label {
        white-space: nowrap;
      }

      .narration-label-short { display: none; }

      .narration-invitation[hidden] { display: none !important; }

      .narration-invitation {
        position: fixed;
        left: 50%;
        bottom: 84px;
        z-index: 120;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: min(430px, calc(100vw - 28px));
        padding: 12px 14px 12px 18px;
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 14px;
        background: rgba(20,20,20,0.96);
        box-shadow: 0 18px 44px rgba(0,0,0,0.38);
        color: rgba(255,255,255,0.82);
        font: 500 13px/1.35 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        animation: narration-invitation-in 240ms ease-out both;
      }

      .narration-invitation::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -6px;
        width: 10px;
        height: 10px;
        transform: translateX(-50%) rotate(45deg);
        border-right: 1px solid rgba(255,255,255,0.14);
        border-bottom: 1px solid rgba(255,255,255,0.14);
        background: rgba(20,20,20,0.96);
      }

      .narration-invitation-copy { white-space: nowrap; }

      .narration-invitation-start {
        appearance: none;
        border: 0;
        border-radius: 999px;
        padding: 8px 12px;
        background: #EFA634;
        color: #111;
        cursor: pointer;
        font: 700 12px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        white-space: nowrap;
      }

      .narration-invitation-start:focus-visible,
      .narration-invitation-dismiss:focus-visible {
        outline: 2px solid #EFA634;
        outline-offset: 2px;
      }

      .narration-invitation-dismiss {
        appearance: none;
        width: 28px;
        min-width: 28px;
        height: 28px;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: rgba(255,255,255,0.58);
        cursor: pointer;
        font: 400 18px/1 sans-serif;
      }

      .narration-sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }

      @keyframes narration-spin {
        to { transform: rotate(360deg); }
      }

      @keyframes narration-invitation-in {
        from { opacity: 0; transform: translate(-50%, 8px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }

      @media (max-width: 520px) {
        .btn.reset,
        .reset-divider { display: none !important; }
        .narration-invitation {
          width: calc(100vw - 28px);
          bottom: 88px;
          gap: 8px;
          padding-left: 14px;
          box-sizing: border-box;
        }
        .narration-invitation-copy { white-space: nowrap; }
      }

      @media (max-width: 360px) {
        .narration-toggle {
          width: 96px;
          min-width: 96px;
        }
        .narration-label { display: none; }
        .narration-label-short { display: inline; white-space: nowrap; }
        .narration-invitation {
          gap: 6px;
          padding: 10px 12px;
        }
        .narration-invitation-copy { font-size: 12px; }
        .narration-invitation-start { padding: 7px 10px; }
      }

      @media (pointer: coarse) {
        .overlay {
          bottom: max(22px, env(safe-area-inset-bottom));
        }
        .narration-toggle {
          height: 44px;
          width: 140px;
          min-width: 140px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .narration-toggle[data-state="loading"] .narration-icon svg {
          animation: none;
        }
        .narration-invitation { animation: none; }
      }
    `;
    root.append(style);
  };

  const install = () => {
    stage = document.querySelector("deck-stage");
    const root = stage?.shadowRoot;
    toolbar = root?.querySelector('[role="toolbar"]');
    if (!stage || !root || !toolbar) return false;
    if (root.querySelector("#beat-breeze-narration-toggle")) return true;

    addStyles(root);
    toolbar.setAttribute("aria-label", COPY.toolbar);

    const divider = document.createElement("span");
    divider.className = "divider narration-divider";
    divider.setAttribute("aria-hidden", "true");

    button = document.createElement("button");
    button.id = "beat-breeze-narration-toggle";
    button.className = "btn narration-toggle";
    button.type = "button";
    button.setAttribute("aria-keyshortcuts", "M");
    button.innerHTML = `
      <span class="narration-icon" aria-hidden="true"></span>
      <span class="narration-label">${COPY.narration}</span>
      <span class="narration-label-short">${COPY.voice}</span>
    `;
    icon = button.querySelector(".narration-icon");
    label = button.querySelector(".narration-label");
    shortLabel = button.querySelector(".narration-label-short");

    const resetButton = toolbar.querySelector(".btn.reset");
    if (resetButton?.previousElementSibling?.classList.contains("divider")) {
      resetButton.previousElementSibling.classList.add("reset-divider");
    }

    liveRegion = document.createElement("span");
    liveRegion.className = "narration-sr-only";
    liveRegion.setAttribute("role", "status");
    liveRegion.setAttribute("aria-live", "polite");

    toolbar.append(divider, button, liveRegion);

    invitation = document.createElement("div");
    invitation.className = "narration-invitation";
    invitation.hidden = true;
    invitation.setAttribute("role", "group");
    invitation.setAttribute("aria-label", COPY.invitationLabel);
    invitation.innerHTML = `
      <span class="narration-invitation-copy">${COPY.invitation}</span>
      <button class="narration-invitation-start" type="button">${COPY.invitationStart}</button>
      <button class="narration-invitation-dismiss" type="button" aria-label="${COPY.invitationDismiss}">×</button>
    `;
    root.append(invitation);
    setButtonState("loading");
    currentIndex = activeSlideIndex();

    button.addEventListener("click", () => void handleToggle());
    invitation
      .querySelector(".narration-invitation-start")
      ?.addEventListener("click", () => void handleToggle());
    invitation
      .querySelector(".narration-invitation-dismiss")
      ?.addEventListener("click", () => dismissInvitation());
    stage.addEventListener("slidechange", handleSlideChange);
    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      if (!isTyping && event.key.toLowerCase() === "m" && !button.disabled) {
        event.preventDefault();
        void handleToggle();
      } else if (!isTyping && event.key === "Escape" && !invitation.hidden) {
        event.preventDefault();
        dismissInvitation();
      }
    });

    audio.addEventListener("timeupdate", () => {
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    });
    audio.addEventListener("ended", () => {
      setProgress(1);
      if (!narrationEnabled) return;
      const nextSlideHasNarration = Boolean(slideAudio(currentIndex + 1)?.src);
      if (!isFinalNarratedSlide(currentIndex) && nextSlideHasNarration) {
        advanceTimer = window.setTimeout(() => stage.next(), ADVANCE_DELAY_MS);
      } else {
        narrationEnabled = false;
        completed = true;
        setButtonState("replay");
        announce(COPY.complete);
      }
    });
    audio.addEventListener("error", () => {
      if (audio.getAttribute("src")) {
        failPlayback(COPY.audioFailed);
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && narrationEnabled && !audio.paused) {
        pausedForVisibility = true;
        audio.pause();
      } else if (!document.hidden && pausedForVisibility && narrationEnabled) {
        pausedForVisibility = false;
        void audio.play().catch(() => turnNarrationOff());
      }
    });

    void loadManifest()
      .then((data) => {
        if (!data.ready || !Array.isArray(data.slides) || !data.slides.length) {
          setButtonState("unavailable");
          return;
        }
        if (slideAudio(currentIndex)?.src) {
          setButtonState("idle");
          announce(COPY.ready);
        } else {
          setNarrationUnavailable();
          announce(COPY.unavailableSentence);
        }
        toolbar.classList.add("narration-discovery");
        showInvitation();
        window.setTimeout(
          () => toolbar.classList.remove("narration-discovery"),
          DISCOVERY_MS,
        );
      })
      .catch((error) => {
        console.error(COPY.manifestFailed, error);
        setButtonState("error");
        announce(COPY.retry);
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
