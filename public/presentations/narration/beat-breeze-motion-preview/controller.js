(() => {
  "use strict";

  const VERSION = "2026-09-02-prototype-2";
  const PROTOTYPE_LABELS = new Set([
    "Title",
    "One platform, many jobs",
    "Your Music Director",
    "Studio & screens",
    "Built for operators",
  ]);

  // Semantic cues are deliberately expressed as a percentage of each audio
  // clip. Future languages can reuse the semantic keys with their own timing.
  const CUE_TIMELINES = {
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
    "Your Music Director": [
      { start: 0.08, end: 0.5, key: "recommendation" },
      { start: 0.5, end: 0.72, key: "learning" },
      { start: 0.72, end: 0.84, key: "seasonal" },
      { start: 0.84, end: 1.01, key: "proof" },
    ],
    "Studio & screens": [
      { start: 0.03, end: 0.43, key: "studio" },
      { start: 0.43, end: 0.67, key: "channels" },
      { start: 0.67, end: 1.01, key: "screens" },
    ],
    "Built for operators": [
      { start: 0.05, end: 0.65, key: "self-serve" },
      { start: 0.65, end: 1.01, key: "managed" },
    ],
  };

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
    } = {},
  ) => {
    if (!(element instanceof HTMLElement)) return;
    element.classList.add(
      "bbm-cue",
      surface ? "bbm-cue-surface" : "bbm-cue-text",
    );
    element.dataset.bbmCue = key;
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
    markCue(windowsPanel, "self-serve");
    markCue(managedPanel, "managed");
  };

  const setupSlide = (slide) => {
    const label = slide.getAttribute("data-label") || "";
    if (!PROTOTYPE_LABELS.has(label)) return;
    slide.dataset.bbmMotion = "prototype";
    slide.classList.add("bbm-motion-slide");

    if (label === "Title") setupTitle(slide);
    if (label === "One platform, many jobs") setupPlatformMap(slide);
    if (label === "Your Music Director") setupMusicDirector(slide);
    if (label === "Studio & screens") setupStudioScreens(slide);
    if (label === "Built for operators") setupOperators(slide);
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
    activeSlide()?.getAttribute("data-label") || "";

  const cueAtProgress = (label, progress) =>
    CUE_TIMELINES[label]?.find(
      (cue) => progress >= cue.start && progress < cue.end,
    )?.key || null;

  const syncNarrationCue = () => {
    const slide = activeSlide();
    if (!slide || !PROTOTYPE_LABELS.has(activeSlideLabel())) {
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
    if (document.querySelector("#beat-breeze-motion-preview-styles")) return;
    const style = document.createElement("style");
    style.id = "beat-breeze-motion-preview-styles";
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
        position: relative;
        transition:
          opacity 520ms cubic-bezier(.16, 1, .3, 1),
          transform 700ms cubic-bezier(.16, 1, .3, 1),
          filter 520ms cubic-bezier(.16, 1, .3, 1);
        transform-origin: center center;
      }

      deck-stage > section[data-bbm-motion] .bbm-cue-surface {
        isolation: isolate;
      }

      deck-stage > section[data-bbm-motion] .bbm-cue-surface::before {
        content: "";
        position: absolute;
        top: var(--bbm-focus-inset-y, -8px);
        right: var(--bbm-focus-inset-x, -8px);
        bottom: var(--bbm-focus-inset-y, -8px);
        left: var(--bbm-focus-inset-x, -8px);
        z-index: -1;
        pointer-events: none;
        border: 1px solid rgba(239, 166, 52, .58);
        border-radius: var(--bbm-focus-radius, 14px);
        background: rgba(239, 166, 52, .032);
        box-shadow:
          0 24px 56px -30px rgba(239, 166, 52, .68),
          inset 0 0 0 1px rgba(255, 255, 255, .025);
        opacity: 0;
        transform: scale(.99);
        transition:
          opacity 420ms cubic-bezier(.16, 1, .3, 1),
          transform 620ms cubic-bezier(.16, 1, .3, 1),
          border-color 420ms ease,
          box-shadow 620ms cubic-bezier(.16, 1, .3, 1);
      }

      deck-stage > section[data-bbm-motion][data-bbm-entered="true"][data-bbm-narrating="true"] .bbm-cue.bbm-is-soft {
        opacity: .78;
        filter: saturate(.82) brightness(.9);
        transform: scale(.992);
      }

      deck-stage > section[data-bbm-motion][data-bbm-entered="true"][data-bbm-narrating="true"] .bbm-cue.bbm-is-active {
        opacity: 1;
        filter: saturate(1.08) brightness(1.08);
        transform: translate3d(0, -10px, 0) scale(1.025);
        z-index: 4;
      }

      deck-stage > section[data-bbm-motion][data-bbm-entered="true"][data-bbm-narrating="true"] .bbm-cue-surface.bbm-is-active::before {
        opacity: 1;
        transform: scale(1);
      }

      deck-stage > section[data-bbm-motion][data-bbm-entered="true"][data-bbm-narrating="true"] .bbm-cue-text.bbm-is-active {
        filter:
          saturate(1.12)
          brightness(1.13)
          drop-shadow(0 12px 24px rgba(239, 166, 52, .18));
      }

      deck-stage > section[data-bbm-motion] .bbm-media {
        transform-origin: center center;
        transition: transform 1100ms cubic-bezier(.16, 1, .3, 1), filter 700ms ease;
        will-change: transform;
      }

      deck-stage > section[data-bbm-motion] .bbm-cue.bbm-is-active .bbm-media {
        transform: scale(1.07);
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

        deck-stage > section[data-bbm-motion] .bbm-cue-surface::before {
          animation: none !important;
          transition: none !important;
          transform: none !important;
        }

        deck-stage > section[data-bbm-motion] .bbm-cue-surface:not(.bbm-is-active)::before {
          opacity: 0 !important;
        }

        deck-stage > section[data-bbm-motion] .bbm-cue-surface.bbm-is-active::before {
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
      window.__beatBreezeMotionPreview = Object.freeze({
        version: VERSION,
        slides: [1, 2, 5, 7, 10],
        mode: "English prototype",
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
