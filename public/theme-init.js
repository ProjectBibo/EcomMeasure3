(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = stored ? stored === "dark" : prefersDark;
    var root = document.documentElement;
    root.classList.toggle("dark", dark);

    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", dark ? "#0f172a" : "#fafaf7");
  } catch (error) {
    console.warn("Theme initialisation failed", error);
  }
})();
