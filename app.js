/* ============================================================
   Instagram-style portfolio — rendering + interactions
   Content edit karna ho to data.js kholo, ye file mat chhedo.
   ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const heartSvg = filled =>
  `<svg viewBox="0 0 24 24" ${filled ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2"'}><path d="M12 21C7 16.6 4 13.4 4 9.9 4 7.2 6.1 5 8.8 5c1.6 0 2.7.9 3.2 1.7C12.5 5.9 13.6 5 15.2 5 17.9 5 20 7.2 20 9.9c0 3.5-3 6.7-8 11.1z"/></svg>`;
const commentSvg = () =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12c0 4.1-4 7.5-9 7.5-1 0-2-.1-2.9-.4L4 21l1.2-3.8C4 15.8 3 14 3 12c0-4.1 4-7.5 9-7.5s9 3.4 9 7.5z"/></svg>`;

/* ---------------- profile ---------------- */
function renderProfile() {
  document.title = `${PROFILE.fullName} (@${PROFILE.username}) • Portfolio`;
  $$(".js-username").forEach(el => (el.textContent = PROFILE.username));
  $("#fullName").textContent = PROFILE.fullName;

  const cat = $("#categoryLine");
  if (PROFILE.category) cat.textContent = PROFILE.category;
  else cat.remove();

  const bio = $("#bioLines");
  PROFILE.bioLines.forEach(line => {
    const div = document.createElement("div");
    div.textContent = line;
    bio.appendChild(div);
  });

  const link = $("#bioLink");
  link.href = PROFILE.website;
  $("span", link).textContent = PROFILE.website.replace(/^https?:\/\//, "");

  $$(".js-avatar").forEach(img => {
    img.addEventListener("error", () => {
      const fb = document.createElement("div");
      fb.className = "avatar-fallback";
      fb.textContent = (PROFILE.fullName[0] || "S").toUpperCase();
      img.replaceWith(fb);
    });
    img.src = PROFILE.avatar;
  });

  $$(".js-stat-posts").forEach(el => (el.textContent = PROJECTS.length));
  $$(".js-stat-followers").forEach(el => (el.textContent = PROFILE.stats.followers));
  $$(".js-stat-following").forEach(el => (el.textContent = PROFILE.stats.following));

  if (!PROFILE.verified) $$(".badge").forEach(b => b.remove());
  const msg = $("#msgBtn");
  if (PROFILE.whatsapp) {
    msg.href = PROFILE.whatsapp;
    msg.target = "_blank";
    msg.rel = "noopener";
  } else {
    msg.href = `mailto:${PROFILE.email}`;
  }
  $("#year").textContent = new Date().getFullYear();

  $("#followBtn").addEventListener("click", e => {
    const b = e.currentTarget;
    const on = b.classList.toggle("following");
    b.textContent = on ? "Following ✓" : "Follow";
  });
}

/* ---------------- story highlights ---------------- */
function renderHighlights() {
  const wrap = $("#highlights");
  HIGHLIGHTS.forEach((h, i) => {
    const btn = document.createElement("button");
    btn.className = "highlight";
    btn.innerHTML =
      `<span class="highlight-ring"><span class="highlight-circle">${h.emoji}</span></span>` +
      `<span class="highlight-name">${h.name}</span>`;
    btn.addEventListener("click", () => openStory(i));
    wrap.appendChild(btn);
  });
}

/* ---------------- posts grid ---------------- */
function renderGrid() {
  const grid = $("#postsSection");
  grid.innerHTML = "";
  PROJECTS.forEach((p, i) => {
    const tile = document.createElement("button");
    tile.className = "tile hero-tile";
    tile.style.background = p.gradient;
    tile.setAttribute("aria-label", p.title);

    let domain = "shubhangi.dev";
    if (p.link) {
      domain = p.link.replace(/^https?:\/\//, '').replace(/\/$/, '').toLowerCase();
    } else {
      domain = p.title.toLowerCase().replace(/[^a-z0-9]/g, '') + ".com";
    }

    const videoBgHTML = p.video ? `<video class="tile-video-bg" autoplay loop muted playsinline src="${p.video}"></video>` : '';

    tile.innerHTML = `
      ${videoBgHTML}
      <div class="tile-hero-card">
        <div class="tile-browser-bar">
          <span class="browser-dots"><i></i><i></i><i></i></span>
          <span class="browser-url">https://${domain}</span>
        </div>
        <div class="tile-hero-content">
          <span class="tile-hero-badge">${p.emoji} ${p.tags[0] || 'Showcase'}</span>
          <h3 class="tile-hero-title">${p.title}</h3>
          <p class="tile-hero-tagline">${p.tagline}</p>
          <span class="tile-hero-cta">${p.video ? '▶ Play Video Reel ➔' : 'View Hero Showcase ➔'}</span>
        </div>
      </div>
      <span class="tile-overlay">
        <span>${heartSvg(true)} ${p.likes}</span>
        <span>${commentSvg()} ${p.comments.length}</span>
      </span>`;
    tile.addEventListener("click", () => openPost(i));
    grid.appendChild(tile);
  });
}

/* ---------------- skills tab ---------------- */
function renderSkills() {
  const wrap = $("#skillGroups");
  SKILL_GROUPS.forEach(g => {
    const sec = document.createElement("div");
    sec.className = "skill-group";
    sec.innerHTML =
      `<h3>${g.emoji} ${g.name}</h3>` +
      `<div class="chips">${g.skills.map(s => `<span class="chip">${s}</span>`).join("")}</div>`;
    wrap.appendChild(sec);
  });
}

/* ---------------- contact tab ---------------- */
function renderContact() {
  const wrap = $("#contactCards");
  const items = [
    { emoji: "📧", label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  ];
  if (PROFILE.whatsapp) {
    items.push({ emoji: "💬", label: "WhatsApp", value: PROFILE.whatsappDisplay || "Send Message", href: PROFILE.whatsapp });
  }
  items.push({ emoji: "🌐", label: "Website", value: PROFILE.website.replace(/^https?:\/\//, ""), href: PROFILE.website });
  if (PROFILE.address) {
    items.push({ emoji: "📍", label: "Address", value: PROFILE.address, href: "javascript:void(0)" });
  }
  if (PROFILE.github) {
    items.push({ emoji: "🐙", label: "GitHub", value: PROFILE.github.replace(/^https?:\/\//, ""), href: PROFILE.github });
  }
  if (PROFILE.telegram) {
    items.push({ emoji: "✈️", label: "Telegram", value: PROFILE.telegram.replace("https://t.me/", "@"), href: PROFILE.telegram });
  }
  items.forEach(it => {
    const a = document.createElement("a");
    a.className = "contact-card";
    a.href = it.href;
    if (!it.href.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noopener"; }
    a.innerHTML =
      `<span class="cc-emoji">${it.emoji}</span>` +
      `<span class="cc-info"><b>${it.label}</b><span>${it.value}</span></span>`;
    wrap.appendChild(a);
  });
}

/* ---------------- tabs ---------------- */
const SECTIONS = { posts: "#postsSection", skills: "#skillsSection", contact: "#contactSection" };
function showTab(name) {
  $$(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === name));
  Object.entries(SECTIONS).forEach(([k, sel]) => ($(sel).hidden = k !== name));
}
$$(".tab").forEach(t => t.addEventListener("click", () => showTab(t.dataset.tab)));

/* ---------------- post modal ---------------- */
let curPost = null;
let liked = false;
const postModal = $("#postModal");

/* scroll lock — overlay khulne pe page apni jagah frozen rahe,
   band hone pe wahi scroll position wapas (top-jump fix) */
let lockedY = 0;
function lockScroll() {
  if (document.body.classList.contains("no-scroll")) return;
  lockedY = window.scrollY;
  document.body.style.top = `-${lockedY}px`;
  document.body.classList.add("no-scroll");
}
function unlockScroll() {
  if (!postModal.hidden || !$("#storyViewer").hidden) return; // koi overlay abhi bhi khula hai
  if (!document.body.classList.contains("no-scroll")) return;
  document.body.classList.remove("no-scroll");
  document.body.style.top = "";
  window.scrollTo({ top: lockedY, behavior: "instant" });
}

let pmOpenedAt = 0;

function openPost(i) {
  curPost = PROJECTS[i];
  liked = false;
  pmOpenedAt = Date.now();

  const cover = $("#pmCover");
  if (curPost.video) {
    cover.style.background = "#000";
    cover.innerHTML = `
      <video class="post-cover-video" id="pmVideo" autoplay loop controls playsinline src="${curPost.video}"></video>
      <button class="sound-toggle-btn" id="pmSoundBtn" aria-label="Toggle Sound">🔊 Sound ON</button>
      <div class="post-cover-overlay-title">🎬 ${curPost.title}</div>`;

    const video = $("#pmVideo");
    const soundBtn = $("#pmSoundBtn");

    if (video) {
      video.muted = false;
      video.volume = 1.0;

      const updateSoundBtn = () => {
        if (soundBtn) {
          soundBtn.innerHTML = video.muted ? "🔇 Muted" : "🔊 Sound ON";
          soundBtn.classList.toggle("muted", video.muted);
        }
      };

      if (soundBtn) {
        soundBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          video.muted = !video.muted;
          updateSoundBtn();
        });
      }

      video.play().catch(err => {
        console.log("Autoplay unmuted was prevented by browser, playing muted", err);
        video.muted = true;
        updateSoundBtn();
        video.play().catch(() => { });
      });
    }
  } else {
    cover.style.background = curPost.gradient;
    cover.innerHTML = `
      <div class="post-cover-emoji" id="pmCoverEmoji">${curPost.emoji}</div>
      <div class="post-cover-title" id="pmCoverTitle">${curPost.title}</div>`;
  }

  $("#pmCaption").textContent = `${curPost.tagline} — ${curPost.desc}`;
  $("#pmTags").innerHTML = curPost.tags.map(t => `<span>#${t}</span>`).join("");

  const links = $("#pmLinks");
  links.innerHTML = "";
  if (curPost.link) links.innerHTML += `<a class="btn btn-primary" href="${curPost.link}" target="_blank" rel="noopener">🌐 View Live Site</a>`;
  if (curPost.socialLink) links.innerHTML += `<a class="btn btn-secondary" href="${curPost.socialLink}" target="_blank" rel="noopener">📱 Social Media</a>`;
  if (curPost.repo) links.innerHTML += `<a class="btn btn-secondary" href="${curPost.repo}" target="_blank" rel="noopener">GitHub repo</a>`;

  $("#pmComments").innerHTML = curPost.comments
    .map(c => `<div class="comment"><b>${c.user}</b>${c.text}</div>`)
    .join("");

  updateLikeUI();
  postModal.hidden = false;
  lockScroll();
}

function updateLikeUI() {
  $("#pmHeart").classList.toggle("liked", liked);
  $("#pmLikes").textContent = (curPost.likes + (liked ? 1 : 0)).toLocaleString("en-IN");
}

function toggleLike() { liked = !liked; updateLikeUI(); }

function heartPop() {
  const pop = document.createElement("span");
  pop.className = "heart-pop";
  pop.innerHTML = heartSvg(true);
  $("#pmCover").appendChild(pop);
  pop.addEventListener("animationend", () => pop.remove());
}

function closePost() {
  const video = $("#pmCover video");
  if (video) {
    video.pause();
    video.removeAttribute("src");
    video.load();
  }
  $("#pmCover").innerHTML = "";
  postModal.hidden = true;
  unlockScroll();
}

$("#pmHeart").addEventListener("click", toggleLike);
$("#pmCover").addEventListener("dblclick", () => { if (!liked) toggleLike(); heartPop(); });
$$("#pmClose, #pmCloseCard").forEach(btn => btn?.addEventListener("click", closePost));
postModal.addEventListener("click", e => {
  if (e.target === postModal && Date.now() - pmOpenedAt > 200) closePost();
});

/* ---------------- story viewer ---------------- */
const storyViewer = $("#storyViewer");
const story = { h: 0, s: 0, timer: null };
const SLIDE_MS = 5000;

let svOpenedAt = 0;

function openStory(h) {
  story.h = h;
  story.s = 0;
  svOpenedAt = Date.now();
  storyViewer.hidden = false;
  lockScroll();
  renderSlide();
}

function renderSlide() {
  clearTimeout(story.timer);
  const H = HIGHLIGHTS[story.h];
  const S = H.slides[story.s];

  $("#svCard").style.background = H.bg;
  $("#svAva").textContent = H.emoji;
  $("#svName").textContent = H.name;
  $("#svIcon").textContent = S.emoji;
  $("#svTitle").textContent = S.title;
  $("#svText").textContent = S.text;

  const prog = $("#svProgress");
  prog.innerHTML = H.slides.map(() => `<span class="pbar"><span class="pfill"></span></span>`).join("");
  const fills = $$(".pfill", prog);
  fills.forEach((f, i) => { if (i < story.s) f.style.width = "100%"; });
  const cur = fills[story.s];
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      cur.style.transition = `width ${SLIDE_MS}ms linear`;
      cur.style.width = "100%";
    })
  );

  story.timer = setTimeout(nextSlide, SLIDE_MS);
}

function nextSlide() {
  const H = HIGHLIGHTS[story.h];
  if (story.s + 1 < H.slides.length) { story.s++; renderSlide(); }
  else if (story.h + 1 < HIGHLIGHTS.length) { story.h++; story.s = 0; renderSlide(); }
  else closeStory();
}

function prevSlide() {
  if (story.s > 0) story.s--;
  else if (story.h > 0) { story.h--; story.s = HIGHLIGHTS[story.h].slides.length - 1; }
  renderSlide();
}

function closeStory() {
  clearTimeout(story.timer);
  storyViewer.hidden = true;
  unlockScroll();
}

$("#svNext").addEventListener("click", nextSlide);
$("#svPrev").addEventListener("click", prevSlide);
$("#svClose").addEventListener("click", closeStory);
storyViewer.addEventListener("click", e => {
  if (e.target === storyViewer && Date.now() - svOpenedAt > 200) closeStory();
});

/* ---------------- keyboard ---------------- */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (!postModal.hidden) closePost();
    if (!storyViewer.hidden) closeStory();
  }
  if (!storyViewer.hidden) {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  }
});

/* ---------------- theme toggle ---------------- */
const themeBtn = $("#themeBtn");
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
}
applyTheme(localStorage.getItem("ig-theme") || "light");
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("ig-theme", next);
  applyTheme(next);
});

/* ---------------- nav ---------------- */
const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
$("#homeBtn").addEventListener("click", scrollTop);
$("#logoBtn").addEventListener("click", e => { e.preventDefault(); scrollTop(); });
$("#navHeart").addEventListener("click", e => {
  const b = e.currentTarget;
  b.classList.remove("pulse");
  void b.offsetWidth; // animation restart
  b.classList.add("pulse");
});
$$(".bottomnav button").forEach(b =>
  b.addEventListener("click", () => {
    const nav = b.dataset.nav;
    if (nav === "home" || nav === "profile") scrollTop();
    else {
      showTab(nav);
      $(".tabs").scrollIntoView({ behavior: "smooth" });
    }
  })
);

/* ---------------- splash (loading) screen ---------------- */
const splash = $("#splash");
if (splash) {
  setTimeout(() => {
    splash.classList.add("hide");
    setTimeout(() => splash.remove(), 600);
  }, 1800);
}

/* ---------------- init ---------------- */
renderProfile();
renderHighlights();
renderGrid();
renderSkills();
renderContact();
