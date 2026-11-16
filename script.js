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

  // Remove a flat studio backdrop (any color) by keying out pixels close to the
  // color sampled from the photo's corners, rather than assuming pure black
  function removeFlatBackground(img) {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.getImageData(0, 0, w, h);
      const d = imageData.data;

      const samplePoints = [
        [2, 2], [w - 3, 2], [2, h - 3], [w - 3, h - 3],
        [Math.floor(w / 2), 2], [2, Math.floor(h / 2)],
      ];
      let r = 0, g = 0, b = 0;
      samplePoints.forEach(([x, y]) => {
        const i = (y * w + x) * 4;
        r += d[i]; g += d[i + 1]; b += d[i + 2];
      });
      r /= samplePoints.length; g /= samplePoints.length; b /= samplePoints.length;

      const tolerance = 28;
      const feather = 25;
      for (let i = 0; i < d.length; i += 4) {
        const dr = d[i] - r, dg = d[i + 1] - g, db = d[i + 2] - b;
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);
        if (dist < tolerance) d[i + 3] = 0;
        else if (dist < tolerance + feather) d[i + 3] = Math.round(((dist - tolerance) / feather) * 255);
      }
      ctx.putImageData(imageData, 0, 0);
      img.src = canvas.toDataURL("image/png");
    } catch (e) {
      // Canvas access failed (e.g. file:// origin) — keep original photo
    }
  }

  document.querySelectorAll(".card-photo-flat-bg").forEach((img) => {
    if (img.complete) removeFlatBackground(img);
    else img.addEventListener("load", () => removeFlatBackground(img));
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
