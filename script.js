(function () {
  const cfg = window.SITE_CONFIG || {};

  // Price
  document.querySelectorAll("#price, #hero-price").forEach((el) => {
    el.textContent = cfg.price;
  });

  // Telegram button
  const tgBtn = document.getElementById("tg-btn");
  if (tgBtn && cfg.telegramUrl) tgBtn.href = cfg.telegramUrl;

  // Bulk order Telegram button (with prefilled message)
  const bulkBtn = document.getElementById("bulk-btn");
  if (bulkBtn && cfg.telegramUrl) {
    const text = cfg.telegramBulkMessage ? `?text=${encodeURIComponent(cfg.telegramBulkMessage)}` : "";
    bulkBtn.href = `${cfg.telegramUrl}${text}`;
  }

  // Phone button
  const phoneBtn = document.getElementById("phone-btn");
  const phoneLabel = document.getElementById("phone-label");
  if (phoneBtn && cfg.phoneHref) phoneBtn.href = cfg.phoneHref;
  if (phoneLabel && cfg.phoneDisplay) phoneLabel.textContent = cfg.phoneDisplay;

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Snow effect
  const snow = document.getElementById("snow");
  if (snow) {
    const count = window.innerWidth < 600 ? 28 : 46;
    for (let i = 0; i < count; i++) {
      const flake = document.createElement("span");
      const size = 3 + Math.random() * 6;
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.left = `${Math.random() * 100}vw`;
      flake.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
      flake.style.animationDuration = `${8 + Math.random() * 10}s`;
      flake.style.animationDelay = `${Math.random() * 10}s`;
      snow.appendChild(flake);
    }
  }
})();
