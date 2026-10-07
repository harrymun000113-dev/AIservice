// 비용 비교 화면: 탭·차트·KPI, 카드/상세 패널용 비용 도우미
const MONTHLY_TAB = "monthly";
const costState = { tab: "video", cur: "USD", qual: "basic", retry: 1, cat: "글쓰기" };

function fmtMoney(usd, cur) {
  cur = cur || costState.cur;
  if (cur === "KRW") return Math.round(usd * COST_FX.KRW).toLocaleString("ko-KR") + "원";
  if (usd < 0.01) return "$" + usd.toFixed(3);
  if (usd < 10) return "$" + usd.toFixed(2);
  return "$" + usd.toFixed(1).replace(/\.0$/, "");
}

function perMin(item, plan, mode) {
  return plan.usd * item.creditsPerMin[mode] / plan.credits;
}

function findCost(svc) {
  for (const g of COST_GROUPS) {
    const item = g.items.find(i => i.name === svc.name && i.category === svc.category);
    if (item) return { group: g, item };
  }
  return null;
}
function findService(name, category) {
  return SERVICES.find(s => s.name === name && s.category === category);
}

// 카드에 붙는 한 줄
window.cardCostText = function (svc) {
  const f = findCost(svc);
  if (!f) return null;
  const min = Math.min(...f.item.plans.map(p => perMin(f.item, p, "basic")));
  return "💸 " + f.group.unit + " ≈ " + fmtMoney(min) + "부터";
};

function svcHue(i) { return (i * 53 + 205) % 360; }

function barRow(o) {
  return el("div", { class: "bar-row" + (o.cheapest ? " cheapest" : ""), role: "listitem", style: "--h:" + o.hue },
    el("div", { class: "bar-label" },
      o.onOpen ? el("button", { type: "button", text: o.name, onclick: o.onOpen }) : el("strong", { text: o.name }),
      o.sub ? el("span", { text: o.sub }) : null),
    el("div", { class: "bar-track", "aria-hidden": "true" }, el("div", { class: "bar-fill", style: "width:" + Math.max(o.pct, 1.5) + "%" })),
    el("div", { class: "bar-val", text: o.val }));
}

// 상세 패널 안의 "1분 비용"
window.buildCostSection = function (svc) {
  const f = findCost(svc);
  if (!f) return null;
  const modes = Object.keys(f.group.modes);
  const wrap = el("div", { class: "p-sec" }, el("h3", { text: "💸 " + f.group.unit + " 만드는 데 드는 돈 (추정)" }));
  const all = [];
  modes.forEach(m => f.item.plans.forEach(p => all.push(perMin(f.item, p, m))));
  const max = Math.max(...all);
  modes.forEach(m => {
    const hasMode = modes.length > 1;
    if (hasMode) wrap.append(el("p", { class: "chart-group", text: f.group.modes[m] + " · " + f.item.basis[m] }));
    const chart = el("div", { class: "chart", role: "list" });
    f.item.plans.forEach(p => {
      const v = perMin(f.item, p, m);
      chart.append(barRow({ name: p.name, sub: "월 " + fmtMoney(p.usd) , pct: v / max * 100, val: fmtMoney(v), hue: hueOf(svc.category) }));
    });
    wrap.append(chart);
    if (!hasMode) wrap.append(el("p", { class: "p-note", text: "기준: " + f.item.basis[m] }));
  });
  wrap.append(el("p", { class: "p-note", text: "플랜 월 요금 × 1분당 크레딧 ÷ 월 제공 크레딧으로 계산한 추정치입니다. 재생성 횟수는 포함하지 않았어요." }));
  return wrap;
};

// ----- 메인 비교 화면 -----
const tabList = () => COST_GROUPS.map(g => ({ id: g.id, label: g.tab })).concat([{ id: MONTHLY_TAB, label: "월 구독료 (그 외)" }]);

function renderTabs() {
  $("costTabs").replaceChildren(...tabList().map(t =>
    el("button", { class: "tab", type: "button", role: "tab", "aria-selected": String(costState.tab === t.id), "data-tab": t.id, text: t.label })));
}

function renderKpis(list) {
  $("kpis").replaceChildren(...list.map(k => el("li", null,
    el("div", { class: "k-label", text: k[0] }), el("div", { class: "k-val", text: k[1] }), el("div", { class: "k-sub", text: k[2] }))));
}

function renderCostGroup(g) {
  const modeKeys = Object.keys(g.modes);
  const hasQual = modeKeys.length > 1;
  const mode = hasQual ? costState.qual : modeKeys[0];
  $("qualSeg").hidden = !hasQual;
  if (hasQual) {
    $("qualSeg").replaceChildren(...modeKeys.map(k => el("button", { type: "button", "aria-pressed": String(mode === k), "data-qual": k, text: g.modes[k] })));
  }
  $("retryWrap").hidden = !g.retryLabel;
  $("catPickWrap").hidden = true;
  if (g.retryLabel) { $("retryLabel").textContent = g.retryLabel; $("retryOut").textContent = costState.retry + "번"; }
  const retry = g.retryLabel ? costState.retry : 1;

  $("costLead").textContent = g.lead;
  const rows = [];
  g.items.forEach((item, idx) => item.plans.forEach(p => {
    rows.push({ item, plan: p, idx, v: perMin(item, p, mode) * retry });
  }));
  rows.sort((a, b) => a.v - b.v);
  const max = rows[rows.length - 1].v, min = rows[0].v;
  $("chart").replaceChildren(...rows.map((r, i) => barRow({
    name: r.item.name,
    sub: r.plan.name + " · 월 " + fmtMoney(r.plan.usd),
    pct: r.v / max * 100, val: fmtMoney(r.v), hue: svcHue(r.idx), cheapest: i === 0,
    onOpen: () => { const s = findService(r.item.name, r.item.category); if (s) openPanel(s, document.activeElement); }
  })));
  const a = rows[0], z = rows[rows.length - 1];
  renderKpis([
    ["가장 저렴한 조합", fmtMoney(min), a.item.name + " · " + a.plan.name],
    ["가장 비싼 조합", fmtMoney(max), z.item.name + " · " + z.plan.name],
    ["가격 차이", "약 " + (max / min >= 10 ? Math.round(max / min) : (max / min).toFixed(1)) + "배", "같은 1분인데 이만큼 달라요"]
  ]);
  const extra = [];
  if (g.retryLabel) extra.push(el("span", null, "※ 마음에 들 때까지 ", el("b", { text: retry + "번" }), " 생성한다고 가정한 값이에요. 슬라이더로 바꿔 보세요."));
  else extra.push(el("span", { text: "※ 월 제공 분량을 전부 쓴다고 가정한 값이에요." }));
  $("chartExtra").replaceChildren(...extra);

  // 계산 방법
  const tbody = g.items.map(i => el("tr", null, el("td", { text: i.name }), el("td", { text: hasQual ? i.basis[mode] : i.basis.basic })));
  const parts = [
    el("ul", null, g.notes.map(n => el("li", { text: n }))),
    el("table", null, el("thead", null, el("tr", null, el("th", { text: "서비스" }), el("th", { text: "계산 기준" }))), el("tbody", null, tbody))
  ];
  if (g.sources.length) parts.push(el("p", null, "출처: ", g.sources.flatMap((s, i) => [i ? " · " : "", el("a", { href: s[1], target: "_blank", rel: "noopener noreferrer", text: s[0] })])));
  $("notesBody").replaceChildren(...parts);
}

function renderMonthly() {
  $("qualSeg").hidden = true; $("retryWrap").hidden = true; $("catPickWrap").hidden = false;
  const sel = $("catPick");
  if (!sel.options.length) CATEGORIES.forEach(c => sel.add(new Option(c, c)));
  sel.value = costState.cat;
  $("costLead").textContent = "시간·분량 기준을 쓸 수 없는 서비스(글쓰기·디자인·자동화 등)는 '가장 저렴한 유료 플랜의 월 요금'으로 비교합니다.";
  const inCat = SERVICES.filter(s => s.category === costState.cat);
  const paid = inCat.filter(s => s.minPaidUSD != null).sort((a, b) => a.minPaidUSD - b.minPaidUSD);
  const free = inCat.filter(s => s.minPaidUSD == null && s.price === "무료");
  const unknown = inCat.filter(s => s.minPaidUSD == null && s.price !== "무료");
  const max = paid.length ? paid[paid.length - 1].minPaidUSD : 1;
  $("chart").replaceChildren(...paid.map((s, i) => barRow({
    name: s.name, sub: (s.plans[0] || "").slice(0, 46), pct: s.minPaidUSD / max * 100,
    val: "월 " + fmtMoney(s.minPaidUSD), hue: svcHue(CATEGORIES.indexOf(s.category) + i), cheapest: i === 0,
    onOpen: () => openPanel(s, document.activeElement)
  })));
  if (!paid.length) $("chart").replaceChildren(el("p", { class: "chart-extra", text: "이 분야는 월 요금이 확인된 서비스가 없어요." }));
  if (paid.length) {
    renderKpis([
      ["가장 저렴한 유료", "월 " + fmtMoney(paid[0].minPaidUSD), paid[0].name],
      ["가장 비싼 시작 요금", "월 " + fmtMoney(max), paid[paid.length - 1].name],
      ["무료로 쓸 수 있는", free.length + "개", free.map(s => s.name).join(", ") || "이 분야에는 없어요"]
    ]);
  } else renderKpis([]);
  const extra = [];
  if (free.length) extra.push(el("div", null, el("b", { text: "무료: " }), free.map(s => el("button", { class: "chip-lite", type: "button", text: s.name, onclick: () => openPanel(s, document.activeElement) }))));
  if (unknown.length) extra.push(el("div", null, el("b", { text: "가격 미공개·미확인: " }), unknown.map(s => el("span", { class: "chip-lite", text: s.name }))));
  $("chartExtra").replaceChildren(...extra);
  $("notesBody").replaceChildren(el("ul", null, [
    "각 서비스의 '가장 먼저 나오는 유료 플랜' 월 요금이며, 연 결제 할인이 섞여 있을 수 있어요.",
    "원화·유로 요금은 달러로 환산했고(1달러=1,400원, 1유로=1.08달러 가정), 환산 값은 대략치입니다.",
    "플랜마다 제공량이 달라 '싸다 = 더 좋다'는 뜻은 아닙니다."
  ].map(t => el("li", { text: t }))));
}

function renderCost() {
  renderTabs();
  const g = COST_GROUPS.find(x => x.id === costState.tab);
  if (g) renderCostGroup(g); else renderMonthly();
}

function initCost() {
  renderCost();
  $("costTabs").addEventListener("click", e => {
    const b = e.target.closest("button[data-tab]"); if (!b) return;
    costState.tab = b.dataset.tab; renderCost();
  });
  $("curSeg").addEventListener("click", e => {
    const b = e.target.closest("button[data-cur]"); if (!b) return;
    costState.cur = b.dataset.cur;
    $("curSeg").querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    renderCost();
    if (window.renderGrid) renderGrid();
    if (window.refreshStackUI) refreshStackUI();
  });
  $("qualSeg").addEventListener("click", e => {
    const b = e.target.closest("button[data-qual]"); if (!b) return;
    costState.qual = b.dataset.qual; renderCost();
  });
  $("retry").addEventListener("input", e => { costState.retry = Number(e.target.value); renderCost(); });
  $("catPick").addEventListener("change", e => { costState.cat = e.target.value; renderCost(); });
}
document.addEventListener("DOMContentLoaded", initCost);
