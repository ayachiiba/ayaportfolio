// ===== Dialogs, screenshots, copy email =====
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const cvModal = $("#cvModal");
  const shotModal = $("#shotModal");
  const shotImg = $("#shotImg");
  const shotMissing = $("#shotMissing");
  const shotCount = $("#shotCount");
  let opener = null;
  let shots = [];
  let index = 0;

  function openModal(modal, from) {
    opener = from || document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const close = modal.querySelector("[data-close]");
    if (close) close.focus();
  }
  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (opener && opener.focus) opener.focus();
  }

  // CV chooser
  document.querySelectorAll("[data-open-cv]").forEach((b) =>
    b.addEventListener("click", () => openModal(cvModal, b))
  );

  // Screenshots
  function showShot() {
    const file = shots[index];
    shotMissing.hidden = true;
    shotImg.hidden = false;
    shotImg.onerror = () => {
      shotImg.hidden = true;
      shotMissing.hidden = false;
      shotMissing.textContent = window.t("shot_missing").replace("{f}", file);
    };
    shotImg.src = "assets/" + file;
    shotCount.textContent = index + 1 + " / " + shots.length;
  }
  document.querySelectorAll("[data-shots]").forEach((b) =>
    b.addEventListener("click", () => {
      shots = b.dataset.shots.split(",").map((s) => s.trim()).filter(Boolean);
      index = 0;
      showShot();
      openModal(shotModal, b);
    })
  );
  $("#shotPrev").addEventListener("click", () => { index = (index - 1 + shots.length) % shots.length; showShot(); });
  $("#shotNext").addEventListener("click", () => { index = (index + 1) % shots.length; showShot(); });

  // Close with the button, the backdrop or Escape
  document.querySelectorAll(".modal").forEach((m) => {
    m.addEventListener("click", (e) => {
      if (e.target === m || e.target.closest("[data-close]")) closeModal(m);
    });
  });
  document.addEventListener("keydown", (e) => {
    const openOne = [cvModal, shotModal].find((m) => !m.hidden);
    if (!openOne) return;
    if (e.key === "Escape") closeModal(openOne);
    if (openOne === shotModal && e.key === "ArrowLeft") $("#shotPrev").click();
    if (openOne === shotModal && e.key === "ArrowRight") $("#shotNext").click();
  });

  // Copy email
  const copyBtn = $("#copyMail");
  copyBtn.addEventListener("click", async () => {
    const text = copyBtn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (err) {}
      ta.remove();
    }
    copyBtn.textContent = window.t("copied");
    setTimeout(() => (copyBtn.textContent = window.t("copy")), 1800);
  });
})();
