const yearNodes = document.querySelectorAll("[data-current-year]");
const brandAvatarImages = document.querySelectorAll(".brand-avatar-img");
const revealItems = document.querySelectorAll(".reveal");

// === Theme toggle ===
const THEME_KEY = "fifthace_theme";
const MOON_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const SUN_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

function getStoredTheme() {
  try { return localStorage.getItem(THEME_KEY); } catch (_) { return null; }
}

function saveTheme(theme) {
  try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.innerHTML = theme === "dark" ? SUN_SVG : MOON_SVG;
    btn.setAttribute("aria-label", theme === "dark" ? "Włącz tryb jasny" : "Włącz tryb ciemny");
  }
  saveTheme(theme);
}

const themeToggleBtn = document.createElement("button");
themeToggleBtn.id = "themeToggle";
themeToggleBtn.type = "button";
themeToggleBtn.className = "theme-btn";

const navElement = document.querySelector(".nav");
if (navElement) {
  navElement.appendChild(themeToggleBtn);
}

themeToggleBtn.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
});

const initialTheme =
  getStoredTheme() ||
  (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
applyTheme(initialTheme);

yearNodes.forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

if (brandAvatarImages.length) {
  const markMissingAvatar = () => document.body.classList.add("no-brand-avatar");

  brandAvatarImages.forEach((image) => {
    image.addEventListener("error", markMissingAvatar);

    if (image.complete && image.naturalWidth === 0) {
      markMissingAvatar();
    }
  });
}

if (revealItems.length) {
  const showAllItems = () => {
    revealItems.forEach((item) => item.classList.add("visible"));
  };

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    showAllItems();
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }
}
