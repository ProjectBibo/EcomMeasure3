const TRANSITION_FLAG = "__ecomViewTransitionActive";

const getWindow = () => (typeof window !== "undefined" ? window : undefined);
const getDocument = () => (typeof document !== "undefined" ? document : undefined);

const reduceMotionQuery = "(prefers-reduced-motion: reduce)";

export const isViewTransitionSupported = () => {
  const doc = getDocument();
  if (!doc || typeof doc.startViewTransition !== "function") {
    return false;
  }

  const win = getWindow();
  if (!win || typeof win.matchMedia !== "function") {
    return true;
  }

  return !win.matchMedia(reduceMotionQuery).matches;
};

export const markViewTransitionState = (isActive) => {
  const win = getWindow();
  if (!win) return;
  win[TRANSITION_FLAG] = Boolean(isActive);
};

export const isViewTransitionActive = () => {
  const win = getWindow();
  return win ? Boolean(win[TRANSITION_FLAG]) : false;
};

export const resetPageView = () => {
  const win = getWindow();
  const doc = getDocument();
  if (!win || !doc) return;

  win.scrollTo({ top: 0, left: 0, behavior: "auto" });

  const focusTarget = doc.querySelector("[data-focus-target]");
  if (focusTarget instanceof HTMLElement) {
    focusTarget.focus({ preventScroll: true });
  }
};

export const runViewTransition = (updateDom) => {
  const doc = getDocument();
  if (!doc) {
    updateDom();
    return null;
  }

  if (!isViewTransitionSupported()) {
    updateDom();
    return null;
  }

  markViewTransitionState(true);
  let transition;
  try {
    transition = doc.startViewTransition(() => {
      updateDom();
    });
  } catch (error) {
    markViewTransitionState(false);
    updateDom();
    return null;
  }

  transition.finished.finally(() => {
    markViewTransitionState(false);
  });

  return transition;
};
