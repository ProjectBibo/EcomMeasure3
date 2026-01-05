export function scrollToContactSection(attempt = 0) {
  if (typeof document === "undefined") return;
  const target = document.querySelector("#contact");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (attempt >= 10) return;

  window.requestAnimationFrame(() => {
    scrollToContactSection(attempt + 1);
  });
}
