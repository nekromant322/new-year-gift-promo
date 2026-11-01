(function () {
  const cfg = window.SITE_CONFIG || {};

  // Prices
  document.querySelectorAll("#price").forEach((el) => {
    el.textContent = cfg.price;
  });
  document.querySelectorAll("#price-wholesale, #price-main, #hero-price").forEach((el) => {
    el.textContent = cfg.priceWholesale;
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

  // MAX button
  const maxBtn = document.getElementById("max-btn");
  if (maxBtn && cfg.maxUrl) maxBtn.href = cfg.maxUrl;

  // Remove near-black backgrounds from product photos shot on a black backdrop
  function removeBlackBackground(img) {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      const darkIn = 12;
      const darkOut = 45;
      for (let i = 0; i < d.length; i += 4) {
        const l = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        if (l < darkIn) d[i + 3] = 0;
        else if (l < darkOut) d[i + 3] = Math.round(((l - darkIn) / (darkOut - darkIn)) * 255);
      }
      ctx.putImageData(imageData, 0, 0);
      img.src = canvas.toDataURL("image/png");
    } catch (e) {
      // Canvas access failed (e.g. file:// origin) — keep original photo
    }
  }

  document.querySelectorAll(".card-photo-black-bg").forEach((img) => {
    if (img.complete) removeBlackBackground(img);
    else img.addEventListener("load", () => removeBlackBackground(img));
  });

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
