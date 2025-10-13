const MOTION_TOKENS = {
  duration: {
    short: 0.18,
    medium: 0.32,
    long: 0.48,
  },
  ease: {
    standard: "cubic-bezier(0.16, 1, 0.3, 1)",
    emphasized: "cubic-bezier(0.83, 0, 0.17, 1)",
  },
};

const MAGNETIC_SELECTOR = "[data-magnetic]";
const TILT_SELECTOR = "[data-tilt-card]";

const globalState = {
  initialised: false,
};

function createMediaQuery(query) {
  if (typeof window === "undefined") {
    return {
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    };
  }
  const media = window.matchMedia(query);
  if (typeof media.addEventListener !== "function") {
    media.addEventListener = (type, listener) => media.addListener(listener);
    media.removeEventListener = (type, listener) => media.removeListener(listener);
  }
  return media;
}

function setupMagneticInteraction(reducedMotionMedia) {
  const pointerFineMedia = createMediaQuery("(pointer: fine)");
  const activeHandlers = new WeakMap();

  const resetElement = (element) => {
    element.style.removeProperty("--btn-translate-x");
    element.style.removeProperty("--btn-translate-y");
  };

  const detach = (element) => {
    const cleanup = activeHandlers.get(element);
    if (cleanup) {
      cleanup();
      activeHandlers.delete(element);
    }
    resetElement(element);
  };

  const attach = (element) => {
    if (activeHandlers.has(element)) return;

    const move = (event) => {
      const rect = element.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const x = (offsetX - rect.width / 2) / rect.width;
      const y = (offsetY - rect.height / 2) / rect.height;
      const strength = Number.parseFloat(element.dataset.magneticStrength) || 6;
      element.style.setProperty("--btn-translate-x", `${x * strength}px`);
      element.style.setProperty("--btn-translate-y", `${y * strength}px`);
    };

    const leave = () => {
      element.style.setProperty("--btn-translate-x", "0px");
      element.style.setProperty("--btn-translate-y", "0px");
    };

    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    element.addEventListener("pointercancel", leave);

    activeHandlers.set(element, () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointercancel", leave);
    });
  };

  const refresh = () => {
    const shouldEnable = pointerFineMedia.matches && !reducedMotionMedia.matches;
    document.querySelectorAll(MAGNETIC_SELECTOR).forEach((element) => {
      if (shouldEnable) {
        attach(element);
      } else {
        detach(element);
      }
    });
  };

  refresh();
  pointerFineMedia.addEventListener("change", refresh);
  reducedMotionMedia.addEventListener("change", refresh);

  const observer = new MutationObserver((mutations) => {
    let needsRefresh = false;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement && (node.matches(MAGNETIC_SELECTOR) || node.querySelector(MAGNETIC_SELECTOR))) {
          needsRefresh = true;
        }
      });
      mutation.removedNodes.forEach((node) => {
        if (node instanceof HTMLElement && (node.matches(MAGNETIC_SELECTOR) || node.querySelector(MAGNETIC_SELECTOR))) {
          needsRefresh = true;
        }
      });
    });
    if (needsRefresh) refresh();
  });

  const rootNode = document.body || document.documentElement;
  observer.observe(rootNode, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    pointerFineMedia.removeEventListener("change", refresh);
    reducedMotionMedia.removeEventListener("change", refresh);
    document.querySelectorAll(MAGNETIC_SELECTOR).forEach(detach);
  };
}

function setupTiltInteraction(reducedMotionMedia) {
  const pointerFineMedia = createMediaQuery("(pointer: fine)");
  const activeHandlers = new WeakMap();

  const resetElement = (element) => {
    element.style.removeProperty("--card-rotate-x");
    element.style.removeProperty("--card-rotate-y");
  };

  const detach = (element) => {
    const cleanup = activeHandlers.get(element);
    if (cleanup) {
      cleanup();
      activeHandlers.delete(element);
    }
    resetElement(element);
  };

  const attach = (element) => {
    if (activeHandlers.has(element)) return;

    const move = (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateY = x * 10;
      const rotateX = -y * 10;
      element.style.setProperty("--card-rotate-y", `${rotateY}deg`);
      element.style.setProperty("--card-rotate-x", `${rotateX}deg`);
    };

    const leave = () => {
      element.style.setProperty("--card-rotate-x", "0deg");
      element.style.setProperty("--card-rotate-y", "0deg");
    };

    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    element.addEventListener("pointercancel", leave);

    activeHandlers.set(element, () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointercancel", leave);
    });
  };

  const refresh = () => {
    const shouldEnable = pointerFineMedia.matches && !reducedMotionMedia.matches;
    document.querySelectorAll(TILT_SELECTOR).forEach((element) => {
      if (shouldEnable) {
        attach(element);
      } else {
        detach(element);
      }
    });
  };

  refresh();
  pointerFineMedia.addEventListener("change", refresh);
  reducedMotionMedia.addEventListener("change", refresh);

  const observer = new MutationObserver((mutations) => {
    let needsRefresh = false;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement && (node.matches(TILT_SELECTOR) || node.querySelector(TILT_SELECTOR))) {
          needsRefresh = true;
        }
      });
      mutation.removedNodes.forEach((node) => {
        if (node instanceof HTMLElement && (node.matches(TILT_SELECTOR) || node.querySelector(TILT_SELECTOR))) {
          needsRefresh = true;
        }
      });
    });
    if (needsRefresh) refresh();
  });

  const rootNode = document.body || document.documentElement;
  observer.observe(rootNode, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    pointerFineMedia.removeEventListener("change", refresh);
    reducedMotionMedia.removeEventListener("change", refresh);
    document.querySelectorAll(TILT_SELECTOR).forEach(detach);
  };
}

export function initMotionSystem() {
  if (globalState.initialised || typeof document === "undefined") return;
  globalState.initialised = true;

  const root = document.documentElement;
  if ("startViewTransition" in document) {
    root.classList.add("supports-view-transitions");
  }

  const reducedMotionMedia = createMediaQuery("(prefers-reduced-motion: reduce)");

  const updateDataAttr = () => {
    root.dataset.reduceMotion = reducedMotionMedia.matches ? "true" : "false";
  };
  updateDataAttr();
  reducedMotionMedia.addEventListener("change", updateDataAttr);

  const disposers = [
    setupMagneticInteraction(reducedMotionMedia),
    setupTiltInteraction(reducedMotionMedia),
  ];

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      disposers.forEach((dispose) => dispose && dispose());
      reducedMotionMedia.removeEventListener("change", updateDataAttr);
      globalState.initialised = false;
    });
  }
}

export { MOTION_TOKENS };
