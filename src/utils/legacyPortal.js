const SELECTOR = ".scrolly-portal, .portal-layer, .scene, .progress-rail, .progress-bar";

const purgeLegacySections = () => {
  if (typeof document === "undefined") return false;

  const sections = Array.from(document.querySelectorAll("section"));
  let removedSomething = false;

  sections.forEach((section) => {
    const hasLegacy = section.querySelector(SELECTOR);
    if (!hasLegacy) return;

    if (section.id && !/portal|scrolly/i.test(section.id)) return;

    section.remove();
    removedSomething = true;
  });

  Array.from(document.querySelectorAll(SELECTOR)).forEach((node) => {
    node.remove();
    removedSomething = true;
  });

  return removedSomething;
};

export const stripLegacyScrollyPortal = () => {
  if (typeof document === "undefined") return () => {};

  purgeLegacySections();

  if (typeof MutationObserver === "undefined") {
    return () => {};
  }

  const target = document.body;
  if (!target) return () => {};

  const observer = new MutationObserver(() => {
    purgeLegacySections();
  });

  observer.observe(target, { childList: true, subtree: true });

  return () => observer.disconnect();
};
