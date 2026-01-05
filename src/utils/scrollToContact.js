export function scrollToContactSection() {
  if (typeof document === "undefined") return;
  const target = document.querySelector("#contact");
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
