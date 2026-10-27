/* ============================================================
   drag.js — har element draggable 🖐️
   Click = normal kaam (modal/story/link), Drag = position move.
   Mobile pe: element ko 0.35s hold karke drag karo.
   Layout localStorage me save hota hai — "Reset" button se wapas.
   ============================================================ */

(() => {
  const SELECTORS = [
    ".logo-wrap", ".searchbox", ".nav-icons .icon-btn",
    ".avatar-ring.big", ".username", ".profile-row1 .badge", ".profile-btns .btn",
    ".stats-desktop li", ".stats-mobile li", ".fullname-row", ".category",
    "#bioLines div", ".bio-link",
    ".highlight", ".tab", ".tile",
    ".skill-group h3", ".chip",
    ".contact h2", ".contact p", ".contact-card",
    ".footer", ".bottomnav button",
  ];
  const KEY = "ig-layout-v3"; // v3: purani accidental positions discard
  const HOLD_MS = 350;  // sirf TOUCH pe: itna hold karke drag (scroll se clash na ho)
  const SNAP_BACK = 24; // isse chhota drag = accidental — element wapas apni jagah
  const QUICK_MS = 180; // isse tez press-release = click hi tha, position save nahi hoti

  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { saved = {}; }
  localStorage.removeItem("ig-layout");    // purane versions ki saaf-safai
  localStorage.removeItem("ig-layout-v2");
  const els = [];
  let topZ = 500;
  let drag = null;
  let suppressUntil = 0;

  const setPos = (el, x, y) => {
    el.dataset.dx = x; el.dataset.dy = y;
    el.style.transform = (x || y) ? `translate(${x}px, ${y}px)` : "";
  };
  const getPos = el => [parseFloat(el.dataset.dx) || 0, parseFloat(el.dataset.dy) || 0];

  /* ---- reset button ---- */
  const resetBtn = document.createElement("button");
  resetBtn.id = "resetLayout";
  resetBtn.textContent = "↺ Layout reset";
  resetBtn.hidden = true;
  document.body.appendChild(resetBtn);
  resetBtn.addEventListener("click", () => {
    saved = {};
    localStorage.removeItem(KEY);
    els.forEach(el => { setPos(el, 0, 0); el.style.zIndex = ""; });
    resetBtn.hidden = true;
  });
  const showReset = () => { resetBtn.hidden = false; };

  /* ---- pehli baar ka tip ---- */
  if (!localStorage.getItem("ig-drag-tip3")) {
    const tip = document.createElement("div");
    tip.id = "dragTip";
    tip.textContent = "🖐️ Har element drag karke kahin bhi rakh do! (Mobile: hold karke drag)";
    document.body.appendChild(tip);
    setTimeout(() => tip.classList.add("show"), 2400); // splash ke baad
    setTimeout(() => { tip.classList.remove("show"); setTimeout(() => tip.remove(), 500); }, 8500);
    localStorage.setItem("ig-drag-tip3", "1");
  }

  /* ---- init: sab elements draggable banao ---- */
  SELECTORS.forEach((sel, si) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      const id = si + "-" + i;
      el.dataset.dragId = id;
      el.classList.add("draggable");
      els.push(el);
      const p = saved[id];
      if (p) { setPos(el, p[0], p[1]); el.style.zIndex = ++topZ; }
      el.addEventListener("pointerdown", onDown);
    });
  });
  if (Object.keys(saved).length) showReset();

  function onDown(e) {
    if (e.button !== 0 || drag) return;
    const el = e.currentTarget;
    e.stopPropagation();
    if (e.pointerType === "mouse") e.preventDefault(); // text-select na ho
    const [bx, by] = getPos(el);
    drag = {
      el, id: el.dataset.dragId, pid: e.pointerId,
      sx: e.clientX, sy: e.clientY, bx, by, t0: Date.now(),
      active: false, touch: e.pointerType !== "mouse", timer: null,
    };
    if (drag.touch) drag.timer = setTimeout(() => drag && start(), HOLD_MS);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
  }

  function start() {
    drag.active = true;
    drag.el.classList.add("dragging");
    drag.el.style.zIndex = ++topZ; // aakhri wala sabse upar
    document.body.classList.add("drag-active");
    try { drag.el.setPointerCapture(drag.pid); } catch {}
  }

  function onMove(e) {
    if (!drag || e.pointerId !== drag.pid) return;
    const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
    if (!drag.active) {
      const far = Math.hypot(dx, dy) > 6;
      if (drag.touch) { if (far) cancelPending(); return; } // touch: move = scroll hai
      if (!far) return;  // mouse: chhota jitter ignore
      start();           // mouse: turant drag (pehle jaisa)
    }
    setPos(drag.el, drag.bx + dx, drag.by + dy);
  }

  function onUp(e) {
    if (!drag || e.pointerId !== drag.pid) return;
    if (drag.active) {
      drag.el.classList.remove("dragging");
      const [x, y] = getPos(drag.el);
      const dist = Math.hypot(x - drag.bx, y - drag.by);
      const quick = Date.now() - drag.t0 < QUICK_MS;
      if (quick || dist < SNAP_BACK) {
        // accidental tha (tez flick ya halka sa move) — element spring-back
        // se wapas apni jagah, aur click normal chalega
        snapBack(drag.el, drag.bx, drag.by);
      } else {
        saved[drag.id] = [Math.round(x), Math.round(y)];
        localStorage.setItem(KEY, JSON.stringify(saved));
        suppressUntil = Date.now() + 350; // drop ke baad wala click rok do
        showReset();
      }
    }
    cleanup();
  }

  function snapBack(el, x, y) {
    el.style.transition = "transform .18s ease";
    setPos(el, x, y);
    setTimeout(() => { el.style.transition = ""; }, 220);
  }

  function onCancel(e) {
    if (!drag || e.pointerId !== drag.pid) return;
    if (drag.active) drag.el.classList.remove("dragging");
    cleanup();
  }

  function cancelPending() { cleanup(); }

  function cleanup() {
    if (drag) clearTimeout(drag.timer);
    document.body.classList.remove("drag-active");
    drag = null;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onCancel);
  }

  /* drag khatam hote hi jo click aata hai use rok do
     (warna tile chhodte hi modal khul jata) */
  window.addEventListener("click", e => {
    if (Date.now() < suppressUntil) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  /* touch-drag ke waqt page scroll na ho */
  document.addEventListener("touchmove", e => {
    if (drag && drag.active) e.preventDefault();
  }, { passive: false });

  /* browser ka native image/link drag band */
  document.addEventListener("dragstart", e => e.preventDefault());
})();
