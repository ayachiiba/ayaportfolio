// ===== Two cute games =====
//  1. Catch the stars — move the bunny, collect stars and hearts, dodge storm clouds.
//  2. Memory match   — flip cards and find the pairs.
(function () {
  const $ = (s) => document.querySelector(s);
  const T = (k) => window.t(k);
  const load = (k) => { try { return parseFloat(localStorage.getItem(k)) || 0; } catch (e) { return 0; } };
  const save = (k, v) => { try { localStorage.setItem(k, String(v)); } catch (e) {} };
  let active = null;

  // ------------------------------------------------------------------
  // 1. Catch the stars
  // ------------------------------------------------------------------
  const Stars = (function () {
    const cv = $("#starCanvas"), ctx = cv.getContext("2d"), ov = $("#starOverlay");
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    const W = 720, H = 320, GROUND = H - 34, BW = 46;
    const scoreEl = $("#starScore"), livesEl = $("#starLives"), bestEl = $("#starBest");
    let run = false, raf = 0, last = 0, mode = "start";
    let bx = W / 2, target = null, keys = {}, items = [], score = 0, lives = 3, spawnT = 0, elapsed = 0;
    let best = load("aya_stars_best");

    function hud() {
      scoreEl.textContent = T("g_score") + ": " + score;
      livesEl.textContent = T("g_lives") + ": " + "♥".repeat(Math.max(lives, 0)) + "♡".repeat(Math.max(3 - lives, 0));
      bestEl.textContent = T("g_best") + ": " + best;
    }

    function overlay(m) {
      mode = m;
      ov.hidden = false;
      ov.querySelector(".ov-title").textContent = m === "over" ? T("g_over_stars") : T("g_ready");
      ov.querySelector(".ov-text").textContent = m === "over" ? T("g_stars_text").replace("{n}", score) : "";
      ov.querySelector("button").textContent = m === "over" ? T("btn_again") : T("btn_start");
    }

    function start() {
      bx = W / 2; target = null; keys = {}; items = []; score = 0; lives = 3; spawnT = 0; elapsed = 0;
      run = true; ov.hidden = true; active = api;
      last = performance.now();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
      hud();
    }

    function stop() {
      run = false; cancelAnimationFrame(raf);
      items = []; score = 0; lives = 3; bx = W / 2;
      overlay("start"); hud(); draw();
    }

    function end() {
      run = false; cancelAnimationFrame(raf);
      if (score > best) { best = score; save("aya_stars_best", best); }
      hud(); draw(); overlay("over");
    }

    function spawn() {
      const r = Math.random();
      const type = r < 0.62 ? "star" : r < 0.72 ? "heart" : "cloud";
      items.push({ type, x: 24 + Math.random() * (W - 48), y: -24, v: 1.6 + Math.random() * 0.9 + Math.min(elapsed / 40, 1.8), rot: Math.random() * 6 });
    }

    function frame(ts) {
      if (!run) return;
      const dt = Math.min(ts - last, 50);
      last = ts;
      const k = dt / 16.667;
      elapsed += dt / 1000;

      // Move the bunny
      const speed = 6.2 * k;
      if (keys.left) bx -= speed;
      if (keys.right) bx += speed;
      if (target !== null) bx += Math.max(-speed * 1.6, Math.min(speed * 1.6, target - bx));
      bx = Math.max(BW / 2, Math.min(W - BW / 2, bx));

      // Spawn and move items
      spawnT -= dt;
      if (spawnT <= 0) { spawn(); spawnT = Math.max(320, 760 - elapsed * 9); }
      items.forEach((it) => { it.y += it.v * k; it.rot += 0.03 * k; });

      items = items.filter((it) => {
        const hit = it.y > GROUND - 40 && it.y < GROUND + 6 && Math.abs(it.x - bx) < BW / 2 + 12;
        if (hit) {
          if (it.type === "star") score += 1;
          else if (it.type === "heart") { if (lives < 3) lives++; else score += 3; }
          else lives--;
          hud();
          if (lives <= 0) { end(); return false; }
          return false;
        }
        return it.y < H + 30;
      });
      if (!run) return;
      draw();
      raf = requestAnimationFrame(frame);
    }

    function starPath(x, y, r) {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r;
        ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
      }
      ctx.closePath();
    }

    function drawItem(it) {
      if (it.type === "star") {
        starPath(it.x, it.y, 15); ctx.fillStyle = "#F2C14E"; ctx.fill(); ctx.strokeStyle = "#B88A1B"; ctx.lineWidth = 2; ctx.stroke();
      } else if (it.type === "heart") {
        ctx.font = "30px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = "#D6578A"; ctx.fillText("♥", it.x, it.y);
      } else {
        ctx.fillStyle = "#6F6A86";
        ctx.beginPath(); ctx.arc(it.x - 10, it.y + 3, 10, 0, Math.PI * 2); ctx.arc(it.x + 2, it.y - 5, 13, 0, Math.PI * 2); ctx.arc(it.x + 14, it.y + 3, 10, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#F2C14E"; ctx.lineWidth = 2.5; ctx.lineJoin = "round";
        ctx.beginPath(); ctx.moveTo(it.x + 1, it.y + 12); ctx.lineTo(it.x - 4, it.y + 21); ctx.lineTo(it.x + 3, it.y + 21); ctx.lineTo(it.x - 2, it.y + 30); ctx.stroke();
      }
    }

    function drawBunny(x) {
      const y = GROUND - 30;
      ctx.fillStyle = "#fff"; ctx.strokeStyle = "#3A2A2E"; ctx.lineWidth = 2;
      // ears
      [[-9, -10], [9, -10]].forEach(([dx]) => {
        ctx.beginPath(); ctx.ellipse(x + dx, y - 22, 6, 17, dx < 0 ? -0.15 : 0.15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#F2B6CB"; ctx.beginPath(); ctx.ellipse(x + dx, y - 21, 2.6, 11, dx < 0 ? -0.15 : 0.15, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#fff";
      });
      // body
      ctx.beginPath(); ctx.ellipse(x, y + 6, 23, 21, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // face
      ctx.fillStyle = "#3A2A2E"; ctx.beginPath(); ctx.arc(x - 8, y + 1, 2.4, 0, Math.PI * 2); ctx.arc(x + 8, y + 1, 2.4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#F2B6CB"; ctx.beginPath(); ctx.ellipse(x, y + 9, 3, 2.2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x - 14, y + 8, 3.5, 0, Math.PI * 2); ctx.arc(x + 14, y + 8, 3.5, 0, Math.PI * 2); ctx.globalAlpha = 0.6; ctx.fill(); ctx.globalAlpha = 1;
    }

    function draw() {
      const p = window.getPalette();
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#F7D6E1"); g.addColorStop(1, "#E4EBE3");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      // soft clouds
      ctx.fillStyle = "rgba(255,255,255,.7)";
      [[120, 60, 1], [430, 38, 0.8], [620, 90, 1.1]].forEach(([cx, cy, s]) => {
        ctx.beginPath(); ctx.arc(cx, cy, 16 * s, 0, 7); ctx.arc(cx + 18 * s, cy - 8 * s, 20 * s, 0, 7); ctx.arc(cx + 38 * s, cy, 16 * s, 0, 7); ctx.fill();
      });
      // ground
      ctx.fillStyle = p.sage; ctx.fillRect(0, GROUND, W, H - GROUND);
      ctx.fillStyle = "rgba(255,255,255,.35)";
      for (let x = 0; x < W; x += 24) ctx.fillRect(x, GROUND, 12, 3);

      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      items.forEach(drawItem);
      drawBunny(bx);
    }

    // Controls
    function key(e, down) {
      if (e.code === "ArrowLeft" || e.code === "KeyA") { keys.left = down; if (down) target = null; }
      if (e.code === "ArrowRight" || e.code === "KeyD") { keys.right = down; if (down) target = null; }
    }
    function pointerX(e) {
      const r = cv.getBoundingClientRect();
      return ((e.clientX - r.left) / r.width) * W;
    }
    cv.addEventListener("pointerdown", (e) => { if (run) { target = pointerX(e); cv.setPointerCapture(e.pointerId); } });
    cv.addEventListener("pointermove", (e) => { if (run && e.buttons) target = pointerX(e); });
    ["pointerup", "pointercancel"].forEach((ev) => cv.addEventListener(ev, () => (target = null)));
    $("#starStart").addEventListener("click", start);

    const api = { isRunning: () => run, stop, key, refresh() { hud(); if (!run) overlay(mode); draw(); } };
    overlay("start"); hud(); draw();
    return api;
  })();

  // ------------------------------------------------------------------
  // 2. Memory match
  // ------------------------------------------------------------------
  const Memory = (function () {
    const grid = $("#memGrid"), movesEl = $("#memMoves"), timeEl = $("#memTime"), bestEl = $("#memBest"), msgEl = $("#memMsg");
    const SYMBOLS = ["★", "♡", "☾", "✿", "♪", "❀", "✦", "☁"];
    let cards = [], first = null, lock = false, moves = 0, found = 0, startT = 0, timer = 0, secs = 0;
    let best = load("aya_mem_best");

    function hud() {
      movesEl.textContent = T("g_moves") + ": " + moves;
      timeEl.textContent = T("g_time") + ": " + secs + " s";
      bestEl.textContent = T("g_best") + ": " + (best ? best : T("g_none"));
    }

    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      return a;
    }

    function newGame() {
      clearInterval(timer);
      moves = 0; found = 0; first = null; lock = false; secs = 0; startT = 0; msgEl.textContent = "";
      cards = shuffle(SYMBOLS.concat(SYMBOLS));
      grid.innerHTML = "";
      cards.forEach((sym, i) => {
        const b = document.createElement("button");
        b.className = "mcard"; b.type = "button"; b.dataset.i = i; b.setAttribute("aria-label", "Card " + (i + 1));
        b.innerHTML = '<span class="mface mfront">♡</span><span class="mface mback">' + sym + "</span>";
        b.addEventListener("click", () => flip(b));
        grid.appendChild(b);
      });
      hud();
    }

    function flip(b) {
      if (lock || b.classList.contains("open") || b.classList.contains("done")) return;
      if (!startT) { startT = Date.now(); timer = setInterval(() => { secs = Math.floor((Date.now() - startT) / 1000); hud(); }, 500); }
      b.classList.add("open");
      if (!first) { first = b; return; }
      moves++;
      const a = first; first = null;
      if (cards[a.dataset.i] === cards[b.dataset.i]) {
        a.classList.replace("open", "done"); b.classList.replace("open", "done");
        found++;
        if (found === SYMBOLS.length) win();
      } else {
        lock = true;
        setTimeout(() => { a.classList.remove("open"); b.classList.remove("open"); lock = false; }, 800);
      }
      hud();
    }

    function win() {
      clearInterval(timer);
      secs = Math.floor((Date.now() - startT) / 1000);
      let text = T("g_pairs_win").replace("{m}", moves);
      if (!best || moves < best) { best = moves; save("aya_mem_best", best); text += " " + T("g_pairs_new"); }
      msgEl.textContent = text;
      hud();
    }

    $("#memNew").addEventListener("click", newGame);
    newGame();

    return { isRunning: () => false, stop() { clearInterval(timer); }, key() {}, refresh() { hud(); } };
  })();

  // ------------------------------------------------------------------
  // Tabs, keyboard, visibility
  // ------------------------------------------------------------------
  document.querySelectorAll(".tab").forEach((tab) =>
    tab.addEventListener("click", () => {
      Stars.stop(); active = null;
      document.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      $("#panelStars").hidden = tab.dataset.game !== "stars";
      $("#panelMemory").hidden = tab.dataset.game !== "memory";
    })
  );

  const gameKeys = ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  document.addEventListener("keydown", (e) => {
    if (!active || !active.isRunning()) return;
    if (gameKeys.includes(e.code)) e.preventDefault();
    active.key(e, true);
  });
  document.addEventListener("keyup", (e) => { if (active && active.isRunning()) active.key(e, false); });

  // Pause the stars game when the section leaves the screen
  new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting && active && active.isRunning()) { active.stop(); active = null; }
  }, { threshold: 0.05 }).observe($("#play"));

  window.addEventListener("themechange", () => { Stars.refresh(); Memory.refresh(); });
  window.addEventListener("langchange", () => { Stars.refresh(); Memory.refresh(); });
})();
