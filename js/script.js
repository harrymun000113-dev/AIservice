// 서비스 목록: 필터·검색·정렬·상세 패널·테마
const CAT_HUE = {
  "리서치": 215, "글쓰기": 255, "이미지 생성": 330, "영상": 5, "음성·음악": 30,
  "녹음·회의록": 160, "시각화·PPT": 190, "웹·UI/UX 디자인": 280, "AI 만화·스토리보드": 48, "업무 자동화": 130
};
const PRICE_FILTERS = [["", "전체"], ["무료", "무료"], ["무료+유료", "무료+유료"], ["유료", "유료"]];
const INTENTS = [
  { id: "report", label: "보고서·자료 조사", cat: "리서치" },
  { id: "paper", label: "논문 찾기", q: "논문" },
  { id: "write", label: "글쓰기·요약", cat: "글쓰기" },
  { id: "slide", label: "발표자료 만들기", cat: "시각화·PPT" },
  { id: "meet", label: "회의 내용 정리", cat: "녹음·회의록" },
  { id: "img", label: "이미지 만들기", cat: "이미지 생성" },
  { id: "vid", label: "영상 만들기", cat: "영상" },
  { id: "voice", label: "목소리·음악 만들기", cat: "음성·음악" },
  { id: "web", label: "웹사이트·앱 화면", cat: "웹·UI/UX 디자인" },
  { id: "auto", label: "반복 업무 자동화", cat: "업무 자동화" },
  { id: "kr", label: "한국어에 강한 도구", q: "한국어|국산|네이버" },
  { id: "free", label: "돈 안 들이고 시작", price: "무료" }
];

const state = { q: "", cat: "", price: "", sort: "no", intent: null };
let lastOpener = null;

function el(tag, props, ...kids) {
  const n = document.createElement(tag);
  Object.entries(props || {}).forEach(([k, v]) => {
    if (v == null || v === false) return;
    if (k === "class") n.className = v;
    else if (k === "text") n.textContent = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? "" : v);
  });
  kids.flat().forEach(c => { if (c != null && c !== false) n.append(c.nodeType ? c : document.createTextNode(c)); });
  return n;
}
const $ = id => document.getElementById(id);
const hueOf = cat => CAT_HUE[cat] != null ? CAT_HUE[cat] : 220;
const priceClass = p => (p === "무료" ? "free" : p === "유료" ? "paid" : "mix");
const initials = name => name.replace(/[^A-Za-z가-힣0-9]/g, "").charAt(0).toUpperCase() || "AI";
const discObserver = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => entries.forEach(entry => {
    entry.target.classList.toggle("is-visible", entry.isIntersecting);
    if (entry.isIntersecting) entry.target.classList.add("is-revealed");
  }), { threshold: 0.3 })
  : null;

function haystack(s) { return [s.name, s.category, s.desc, s.use].concat(s.pros).join(" ").toLowerCase(); }

function serviceLogo(s) {
  let src = "";
  try {
    const icon = new URL("https://www.google.com/s2/favicons");
    icon.searchParams.set("domain_url", new URL(s.url).origin);
    icon.searchParams.set("sz", "128");
    src = icon.href;
  } catch (e) { /* 잘못된 주소는 이니셜로 표시 */ }
  const logo = el("span", { class: "service-logo", "aria-hidden": "true" },
    src ? el("img", { src, alt: "", loading: "lazy", decoding: "async", referrerpolicy: "no-referrer" }) : null,
    el("span", { class: "logo-fallback", text: initials(s.name) }));
  const image = logo.querySelector("img");
  if (image) image.addEventListener("error", () => logo.classList.add("is-fallback"), { once: true });
  return logo;
}

function matches(s) {
  if (state.cat && s.category !== state.cat) return false;
  if (state.price && s.price !== state.price) return false;
  const q = state.q.trim().toLowerCase();
  if (q) {
    const h = haystack(s);
    const terms = q.split(/[|,]/).map(t => t.trim()).filter(Boolean);
    if (terms.length && !terms.some(t => h.includes(t))) return false;
  }
  return true;
}

function sortKey(s) {
  if (s.price === "무료" && s.minPaidUSD == null) return -1;
  return s.minPaidUSD == null ? 1e9 : s.minPaidUSD;
}

function currentList() {
  const list = SERVICES.filter(matches);
  if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "ko"));
  else if (state.sort === "price") list.sort((a, b) => sortKey(a) - sortKey(b) || a.no - b.no);
  else list.sort((a, b) => a.no - b.no);
  return list;
}

function card(s) {
  const cost = window.cardCostText ? window.cardCostText(s) : null;
  const btn = el("button", { class: "disc-card", type: "button", style: "--h:" + hueOf(s.category), "aria-label": s.name + " 상세 정보 보기" },
    el("span", { class: "disc-stage", "aria-hidden": "true" },
      el("span", { class: "disc-disc" },
        el("span", { class: "disc-rotor" },
          el("span", { class: "disc-sheen" }),
          el("span", { class: "disc-label" }, serviceLogo(s), el("span", { class: "disc-number", text: String(s.no).padStart(2, "0") })),
          el("span", { class: "disc-hole" })))),
    el("span", { class: "disc-info" },
      el("span", { class: "disc-name", text: s.name }),
      el("span", { class: "disc-tags" },
      el("span", { class: "tag", text: s.category }),
      el("span", { class: "badge " + priceClass(s.price), text: s.price })),
      el("span", { class: "disc-desc", text: s.desc }),
      cost ? el("span", { class: "card-cost", text: cost }) : null));
  btn.addEventListener("click", () => openPanel(s, btn));
  return el("li", { class: "card-wrap" }, btn, window.stackToggleButton ? window.stackToggleButton(s) : null);
}

function setDiscFocus(current, discs) {
  if (!discs.length) {
    $("discPosition").textContent = "0 / 0";
    $("discPrev").disabled = true;
    $("discNext").disabled = true;
    return;
  }
  current = Math.max(0, Math.min(discs.length - 1, current));
  discs.forEach((disc, index) => {
    disc.classList.toggle("is-current", index === current);
    disc.classList.toggle("is-prev", index === current - 1);
    disc.classList.toggle("is-next", index === current + 1);
  });
  $("discPosition").textContent = String(current + 1).padStart(2, "0") + " / " + String(discs.length).padStart(2, "0");
  $("discPrev").disabled = current === 0;
  $("discNext").disabled = current === discs.length - 1;
}

function syncDiscFocus() {
  const discs = [...$("grid").querySelectorAll(".disc-card")];
  if (!discs.length) { setDiscFocus(0, discs); return; }
  const center = $("grid").getBoundingClientRect().left + $("grid").clientWidth / 2;
  let current = 0;
  let nearest = Infinity;
  discs.forEach((disc, index) => {
    const rect = disc.getBoundingClientRect();
    const distance = Math.abs(rect.left + rect.width / 2 - center);
    if (distance < nearest) { nearest = distance; current = index; }
  });
  setDiscFocus(current, discs);
}

function navigateDisc(direction) {
  const discs = [...$("grid").querySelectorAll(".disc-card")];
  if (!discs.length) return;
  const current = Math.max(0, discs.findIndex(disc => disc.classList.contains("is-current")));
  const next = Math.min(discs.length - 1, Math.max(0, current + direction));
  discs[next].scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
  setDiscFocus(next, discs);
}

function renderGrid() {
  const list = currentList();
  const grid = $("grid");
  if (discObserver) grid.querySelectorAll(".disc-card").forEach(disc => discObserver.unobserve(disc));
  grid.replaceChildren(...list.map(card));
  grid.scrollLeft = 0;
  const initialDisc = grid.querySelectorAll(".disc-card")[Math.min(1, list.length - 1)];
  if (initialDisc) initialDisc.scrollIntoView({ behavior: "instant", block: "nearest", inline: "center" });
  if (discObserver) grid.querySelectorAll(".disc-card").forEach(disc => discObserver.observe(disc));
  syncDiscFocus();
  $("empty").hidden = list.length > 0;
  $("resultLine").textContent = list.length + "개 서비스" + (list.length !== SERVICES.length ? " (전체 " + SERVICES.length + "개 중)" : "");
}

function renderCats() {
  const counts = {};
  SERVICES.forEach(s => { counts[s.category] = (counts[s.category] || 0) + 1; });
  const mk = (val, label, n) => el("button", { class: "chip", type: "button", "aria-pressed": String(state.cat === val), "data-cat": val },
    label, el("span", { class: "n", text: n }));
  $("cats").replaceChildren(mk("", "전체", SERVICES.length), ...CATEGORIES.map(c => mk(c, c, counts[c])));
  const select = $("categorySelect");
  select.replaceChildren(el("option", { value: "", text: "모든 분야 (" + SERVICES.length + ")" }),
    ...CATEGORIES.map(c => el("option", { value: c, text: c + " (" + counts[c] + ")" })));
  select.value = state.cat;
}

function renderPriceSeg() {
  $("priceSeg").replaceChildren(...PRICE_FILTERS.map(([v, l]) =>
    el("button", { type: "button", "aria-pressed": String(state.price === v), "data-price": v, text: l })));
}

function renderIntents() {
  $("intents").replaceChildren(...INTENTS.map(i =>
    el("button", { class: "chip intent", type: "button", "aria-pressed": String(state.intent === i.id), "data-intent": i.id, text: i.label })));
}

function syncControls() {
  renderCats(); renderPriceSeg(); renderIntents();
  $("q").value = state.intent ? "" : state.q;
  renderGrid();
}

function applyIntent(id) {
  if (state.intent === id) { resetFilters(); return; }
  const i = INTENTS.find(x => x.id === id);
  state.intent = id; state.cat = i.cat || ""; state.price = i.price || ""; state.q = i.q || "";
  syncControls();
}

function resetFilters() {
  Object.assign(state, { q: "", cat: "", price: "", intent: null });
  $("q").value = "";
  syncControls();
}

// ----- 상세 패널 -----
function listBlock(title, items, cls) {
  if (!items || !items.length) return null;
  return el("div", { class: "p-sec" }, el("h3", { text: title }), el("ul", { class: "p-list " + (cls || "") }, items.map(t => el("li", { text: t }))));
}

function openPanel(s, opener) {
  lastOpener = opener || document.activeElement;
  delete $("panel").dataset.mode;
  const others = SERVICES.filter(o => o.group === s.group && o.id !== s.id);
  const costSec = window.buildCostSection ? window.buildCostSection(s) : null;
  const body = $("panelBody");
  body.replaceChildren(
    el("button", { class: "panel-close", type: "button", "aria-label": "닫기", text: "✕", onclick: closePanel }),
    el("div", { class: "p-head", style: "--h:" + hueOf(s.category) },
      serviceLogo(s),
      el("div", null,
        el("h2", { id: "panelTitle", text: s.name }),
        el("div", { class: "p-tags" },
          el("span", { class: "tag", text: s.category }),
          el("span", { class: "badge " + priceClass(s.price), text: s.priceDetail || s.price })))),
    el("p", { class: "p-desc", text: s.desc }),
    listBlock("장점", s.pros),
    listBlock("단점", s.cons, "cons"),
    s.use ? el("div", { class: "p-sec" }, el("h3", { text: "이런 용도에 좋아요" }), el("p", { text: s.use })) : null,
    (s.plans.length || s.priceNotes.length) ? el("div", { class: "p-sec" }, el("h3", { text: "요금 플랜" }),
      el("ul", { class: "plan-list" }, s.plans.map(t => el("li", { text: t }))),
      s.priceNotes.map(t => el("p", { class: "p-note", text: "※ " + t }))) : null,
    costSec,
    others.length ? el("div", { class: "p-sec" }, el("h3", { text: "다른 분야에서도 소개돼요" }),
      el("div", { class: "also" }, others.map(o => el("button", { type: "button", text: o.category + " 평가 보기", onclick: () => openPanel(o, lastOpener) })))) : null,
    el("div", { class: "p-go" },
      el("a", { class: "btn", href: s.url, target: "_blank", rel: "noopener noreferrer", text: "사이트 바로가기 ↗" }),
      window.stackPanelButton ? window.stackPanelButton(s) : null,
      el("button", { class: "btn ghost", type: "button", text: "닫기", onclick: closePanel }))
  );
  $("scrim").hidden = false; $("panel").hidden = false;
  document.body.style.overflow = "hidden";
  $("panel").scrollTop = 0;
  $("panel").focus();
}

function closePanel() {
  $("panel").hidden = true; $("scrim").hidden = true;
  document.body.style.overflow = "";
  if (lastOpener && document.contains(lastOpener)) lastOpener.focus();
}

function trapTab(e) {
  if (e.key !== "Tab" || $("panel").hidden) return;
  const f = [...$("panel").querySelectorAll("button,a[href],input,select")].filter(n => !n.disabled);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && (document.activeElement === first || document.activeElement === $("panel"))) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

// ----- 테마 -----
function applyTheme(t) {
  if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme");
}
function initTheme() {
  try { const t = localStorage.getItem("ai-theme"); if (t) applyTheme(t); } catch (e) { /* 저장 불가여도 동작 */ }
  $("themeBtn").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("ai-theme", next); } catch (e) { /* 무시 */ }
  });
}

function initStats() {
  const groups = new Set(SERVICES.map(s => s.group));
  const freeStart = new Set(SERVICES.filter(s => s.price !== "유료").map(s => s.group));
  const rows = [[groups.size, "AI 서비스"], [CATEGORIES.length, "분야"], [freeStart.size, "무료로 시작 가능"], [SERVICES.length, "분야별 평가"]];
  $("stats").replaceChildren(...rows.map(([n, l]) => el("li", null, el("strong", { text: String(n) }), el("span", { text: l }))));
}

function init() {
  initTheme(); initStats(); syncControls();
  $("q").addEventListener("input", e => { state.q = e.target.value; state.intent = null; renderIntents(); renderGrid(); });
  $("sort").addEventListener("change", e => { state.sort = e.target.value; renderGrid(); });
  $("categorySelect").addEventListener("change", e => { state.cat = e.target.value; state.intent = null; syncControls(); });
  $("cats").addEventListener("click", e => {
    const b = e.target.closest("button[data-cat]"); if (!b) return;
    state.cat = b.dataset.cat; state.intent = null; syncControls();
  });
  $("priceSeg").addEventListener("click", e => {
    const b = e.target.closest("button[data-price]"); if (!b) return;
    state.price = b.dataset.price; state.intent = null; syncControls();
  });
  $("intents").addEventListener("click", e => {
    const b = e.target.closest("button[data-intent]"); if (b) applyIntent(b.dataset.intent);
  });
  $("resetBtn").addEventListener("click", resetFilters);
  $("discPrev").addEventListener("click", () => navigateDisc(-1));
  $("discNext").addEventListener("click", () => navigateDisc(1));
  $("grid").addEventListener("scroll", syncDiscFocus, { passive: true });
  window.addEventListener("resize", syncDiscFocus, { passive: true });
  $("grid").addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault(); navigateDisc(e.key === "ArrowRight" ? 1 : -1);
    }
  });
  let lastWheelNavigation = 0;
  $("grid").addEventListener("wheel", e => {
    if (e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX) || $("grid").scrollWidth <= $("grid").clientWidth) return;
    e.preventDefault();
    const now = performance.now();
    if (now - lastWheelNavigation < 360) return;
    lastWheelNavigation = now;
    navigateDisc(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });
  $("scrim").addEventListener("click", closePanel);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("panel").hidden) closePanel(); trapTab(e); });
}
document.addEventListener("DOMContentLoaded", init);
