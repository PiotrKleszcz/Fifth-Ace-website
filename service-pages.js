const yearNodes = document.querySelectorAll("[data-current-year]");
const brandAvatarImages = document.querySelectorAll(".brand-avatar-img");
const revealItems = document.querySelectorAll(".reveal");

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
