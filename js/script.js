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

function haystack(s) { return [s.name, s.desc, s.use].concat(s.pros).join(" ").toLowerCase(); }

function matches(s) {
  if (state.cat && s.category !== state.cat) return false;
  if (state.price && s.price !== state.price) return false;
  const q = state.q.trim().toLowerCase();
  if (q) {
    const h = haystack(s);
    if (!q.split("|").some(t => t.trim() && h.includes(t.trim()))) return false;
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
  const btn = el("button", { class: "card", type: "button", style: "--h:" + hueOf(s.category), "aria-label": s.name + " 자세히 보기" },
    el("span", { class: "card-top" },
      el("span", { class: "avatar", "aria-hidden": "true", text: s.name.replace(/[^A-Za-z가-힣0-9]/g, "").charAt(0).toUpperCase() }),
      el("span", { class: "card-name", text: s.name })),
    el("span", { class: "card-tags" },
      el("span", { class: "tag", text: s.category }),
      el("span", { class: "badge " + priceClass(s.price), text: s.price })),
    el("span", { class: "card-desc", text: s.desc }),
    s.pros[0] ? el("span", { class: "card-pro", text: s.pros[0] }) : null,
    cost ? el("span", { class: "card-cost", text: cost }) : null);
  btn.addEventListener("click", () => openPanel(s, btn));
  return el("li", { class: "card-wrap" }, btn, window.stackToggleButton ? window.stackToggleButton(s) : null);
}

function renderGrid() {
  const list = currentList();
  const grid = $("grid");
  grid.replaceChildren(...list.map(card));
  $("empty").hidden = list.length > 0;
  $("resultLine").textContent = list.length + "개 서비스" + (list.length !== SERVICES.length ? " (전체 " + SERVICES.length + "개 중)" : "");
}

function renderCats() {
  const counts = {};
  SERVICES.forEach(s => { counts[s.category] = (counts[s.category] || 0) + 1; });
  const mk = (val, label, n) => el("button", { class: "chip", type: "button", "aria-pressed": String(state.cat === val), "data-cat": val },
    label, el("span", { class: "n", text: n }));
  $("cats").replaceChildren(mk("", "전체", SERVICES.length), ...CATEGORIES.map(c => mk(c, c, counts[c])));
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
      el("span", { class: "avatar", "aria-hidden": "true", text: s.name.replace(/[^A-Za-z가-힣0-9]/g, "").charAt(0).toUpperCase() }),
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
  $("scrim").addEventListener("click", closePanel);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("panel").hidden) closePanel(); trapTab(e); });
}
document.addEventListener("DOMContentLoaded", init);
