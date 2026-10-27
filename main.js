// ===== Theme, menu, active link, palette for canvas =====
(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeBtn");

  let palette = null;
  window.getPalette = function () {
    if (!palette) {
      const s = getComputedStyle(root);
      const g = (n) => s.getPropertyValue(n).trim();
      palette = { berry: g("--berry"), rose: g("--rose"), sage: g("--sage"), olive: g("--olive"), cocoa: g("--cocoa"), paper: g("--paper") };
    }
    return palette;
  };

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeBtn.setAttribute("aria-pressed", String(theme === "dark"));
    try { localStorage.setItem("aya_theme", theme); } catch (e) {}
    palette = null;
    window.dispatchEvent(new Event("themechange"));
  }

  let saved = null;
  try { saved = localStorage.getItem("aya_theme"); } catch (e) {}
  setTheme(saved || "light");
  themeBtn.addEventListener("click", () =>
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark")
  );

  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    })
  );

  // Current section in the nav
  const links = {};
  navLinks.querySelectorAll("a").forEach((a) => (links[a.getAttribute("href").slice(1)] = a));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && links[e.target.id]) {
          Object.values(links).forEach((l) => l.removeAttribute("aria-current"));
          links[e.target.id].setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );
  document.querySelectorAll(".page[id]").forEach((s) => io.observe(s));
})();
