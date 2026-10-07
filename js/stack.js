// 내 AI 스택: 쓰고 싶은 서비스를 담으면 월 구독료 합계·분야 커버리지·겹치는 구독을 계산
const STACK_KEY = "ai-stack";
let stack = []; // [{ id, paid }]

const svcById = id => SERVICES.find(s => s.id === id);
const inStack = id => stack.some(x => x.id === id);

function saveStack() {
  try { localStorage.setItem(STACK_KEY, JSON.stringify(stack)); } catch (e) { /* 저장 불가여도 동작 */ }
}
function loadStack() {
  const h = location.hash;
  if (h.startsWith("#stack=")) {
    stack = h.slice(7).split(",").map(t => {
      const [id, f] = t.split("~");
      return svcById(id) ? { id, paid: f !== "free" } : null;
    }).filter(Boolean);
    return true;
  }
  try {
    const raw = JSON.parse(localStorage.getItem(STACK_KEY) || "[]");
    stack = raw.filter(x => x && svcById(x.id));
  } catch (e) { stack = []; }
  return false;
}

// 한 서비스의 월 비용(달러). 무료 플랜만 쓰면 0, 가격을 모르면 null
function monthlyCost(entry) {
  const s = svcById(entry.id);
  if (!entry.paid) return 0;
  if (s.price === "무료" && s.minPaidUSD == null) return 0;
  return s.minPaidUSD;
}

// 같은 서비스(group)가 여러 분야에 담겨도 구독은 한 번만 계산
function stackTotals() {
  const byGroup = new Map();
  let unknown = 0;
  stack.forEach(e => {
    const s = svcById(e.id), c = monthlyCost(e);
    if (c == null) { unknown++; return; }
    byGroup.set(s.group, Math.max(byGroup.get(s.group) || 0, c));
  });
  const total = [...byGroup.values()].reduce((a, b) => a + b, 0);
  return { total, unknown };
}

function overlaps() {
  const out = [];
  CATEGORIES.forEach(cat => {
    const paid = stack.map(e => ({ s: svcById(e.id), c: monthlyCost(e) }))
      .filter(x => x.s.category === cat && x.c != null && x.c > 0);
    if (paid.length >= 2) {
      const sum = paid.reduce((a, x) => a + x.c, 0);
      const cheapest = paid.reduce((a, x) => (x.c < a.c ? x : a));
      out.push({ cat, names: paid.map(x => x.s.name), save: sum - cheapest.c, keep: cheapest.s.name });
    }
  });
  return out;
}

// ----- 카드·패널에 붙는 버튼 -----
window.stackToggleButton = function (s) {
  const b = el("button", { class: "stack-btn", type: "button", "data-id": s.id });
  paintToggle(b, inStack(s.id), s.name);
  b.addEventListener("click", e => { e.stopPropagation(); toggleStack(s.id); });
  return b;
};
function paintToggle(b, on, name) {
  b.textContent = on ? "✓" : "＋";
  b.setAttribute("aria-pressed", String(on));
  b.setAttribute("aria-label", name + (on ? " 내 스택에서 빼기" : " 내 스택에 담기"));
  b.title = on ? "내 스택에서 빼기" : "내 스택에 담기";
}
window.stackPanelButton = function (s) {
  const b = el("button", { class: "btn ghost", type: "button", "data-pid": s.id });
  const paint = () => { b.textContent = inStack(s.id) ? "✓ 내 스택에 담김 (빼기)" : "＋ 내 스택에 담기"; };
  paint();
  b.addEventListener("click", () => { toggleStack(s.id); paint(); });
  return b;
};

function toggleStack(id) {
  if (inStack(id)) stack = stack.filter(x => x.id !== id);
  else stack.push({ id, paid: true });
  refreshStackUI();
}

function refreshStackUI() {
  saveStack();
  document.querySelectorAll(".stack-btn").forEach(b => {
    const s = svcById(b.dataset.id); if (s) paintToggle(b, inStack(s.id), s.name);
  });
  const bar = $("stackBar");
  bar.hidden = stack.length === 0;
  if (stack.length) {
    const t = stackTotals();
    $("stackBarText").textContent = "내 AI 스택 " + stack.length + "개 · 월 " + fmtMoney(t.total) + (t.unknown ? " +α" : "");
  }
  if (!$("panel").hidden && $("panel").dataset.mode === "stack") renderStackPanel();
}

// ----- 스택 패널 -----
function budgetVal() {
  const v = Number(lsGet("ai-budget"));
  return isFinite(v) && v > 0 ? v : 0;
}
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* 무시 */ } }

function stackText() {
  const t = stackTotals();
  const lines = stack.map(e => {
    const s = svcById(e.id), c = monthlyCost(e);
    return "· " + s.name + " (" + s.category + ") " + (c === 0 ? "무료" : c == null ? "가격 미확인" : "월 " + fmtMoney(c));
  });
  return "[내 AI 스택]\n" + lines.join("\n") + "\n월 합계 " + fmtMoney(t.total) + " · 연 " + fmtMoney(t.total * 12);
}
function shareUrl() {
  return location.origin + location.pathname + "#stack=" + stack.map(e => e.id + (e.paid ? "" : "~free")).join(",");
}
function copy(text, btn, done) {
  const ok = () => { const old = btn.textContent; btn.textContent = done; setTimeout(() => { btn.textContent = old; }, 1500); };
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(ok, () => { btn.textContent = "복사 실패 — 직접 선택해 주세요"; });
  else btn.textContent = "이 브라우저는 복사를 지원하지 않아요";
}

function renderStackPanel() {
  const body = $("panelBody");
  const t = stackTotals();
  const budget = budgetVal();
  const covered = new Set(stack.map(e => svcById(e.id).category));
  const ov = overlaps();

  const rows = stack.map(e => {
    const s = svcById(e.id), c = monthlyCost(e);
    const canFree = s.price !== "유료";
    const canPaid = s.minPaidUSD != null;
    return el("li", { class: "st-row", style: "--h:" + hueOf(s.category) },
      el("div", { class: "st-main" },
        el("button", { class: "linklike", type: "button", text: s.name, onclick: () => openPanel(s, lastOpener) }),
        el("span", { class: "tag", text: s.category })),
      el("div", { class: "st-ctl" },
        (canFree && canPaid) ? el("div", { class: "seg small", role: "group", "aria-label": s.name + " 사용 방식" },
          el("button", { type: "button", "aria-pressed": String(!e.paid), text: "무료로", onclick: () => { e.paid = false; refreshStackUI(); } }),
          el("button", { type: "button", "aria-pressed": String(e.paid), text: "유료로", onclick: () => { e.paid = true; refreshStackUI(); } })) : null,
        el("strong", { class: "st-cost", text: c === 0 ? "무료" : c == null ? "미확인" : fmtMoney(c) }),
        el("button", { class: "mini-x", type: "button", "aria-label": s.name + " 빼기", text: "✕", onclick: () => toggleStack(s.id) })));
  });

  const budgetInput = el("input", { id: "budgetIn", type: "number", min: "0", step: "1", inputmode: "decimal", placeholder: "예: 30", value: budget || "" });
  budgetInput.addEventListener("change", () => { lsSet("ai-budget", budgetInput.value || "0"); renderStackPanel(); });

  let budgetMsg = null;
  if (budget) {
    const bw = costState.cur === "KRW" ? budget / COST_FX.KRW : budget;
    const diff = bw - t.total;
    budgetMsg = el("p", { class: "st-msg " + (diff >= 0 ? "ok" : "bad"),
      text: diff >= 0 ? "예산 안이에요. 월 " + fmtMoney(diff) + " 여유가 있어요." : "예산을 월 " + fmtMoney(-diff) + " 초과했어요." });
  }

  body.replaceChildren(
    el("button", { class: "panel-close", type: "button", "aria-label": "닫기", text: "✕", onclick: closePanel }),
    el("h2", { id: "panelTitle", class: "st-title", text: "내 AI 스택" }),
    el("p", { class: "p-desc", text: "쓰고 싶은 서비스를 담으면 한 달에 얼마가 드는지, 겹치는 구독은 없는지 알려드려요." }),
    stack.length ? el("div", null,
      el("div", { class: "st-total" },
        el("div", null, el("span", { class: "k-label", text: "월 합계" }), el("strong", { text: fmtMoney(t.total) })),
        el("div", null, el("span", { class: "k-label", text: "1년이면" }), el("strong", { text: fmtMoney(t.total * 12) }))),
      t.unknown ? el("p", { class: "p-note", text: "※ 가격을 확인하지 못한 서비스 " + t.unknown + "개는 합계에 넣지 않았어요." }) : null,
      el("label", { class: "st-budget" }, el("span", { text: "월 예산 (" + (costState.cur === "KRW" ? "원" : "달러") + ")" }), budgetInput),
      budgetMsg,
      el("div", { class: "p-sec" }, el("h3", { text: "담은 서비스 " + stack.length + "개" }), el("ul", { class: "st-list" }, rows)),
      ov.length ? el("div", { class: "p-sec" }, el("h3", { text: "겹치는 구독이 있어요" }),
        ov.map(o => el("p", { class: "st-warn", text: o.cat + "에 유료 " + o.names.length + "개 (" + o.names.join(", ") + ") — 가장 저렴한 " + o.keep + "만 남기면 월 " + fmtMoney(o.save) + " 줄어요." }))) : null,
      el("div", { class: "p-sec" }, el("h3", { text: "분야 커버리지 " + covered.size + "/" + CATEGORIES.length }),
        el("div", { class: "also" }, CATEGORIES.map(c => el("span", { class: "chip-lite" + (covered.has(c) ? " on" : ""), text: (covered.has(c) ? "✓ " : "") + c })))),
      el("p", { class: "p-note", text: "‘유료로’는 가장 저렴한 유료 플랜 기준 월 요금이에요. 같은 서비스를 여러 분야에 담아도 한 번만 계산합니다." }),
      el("div", { class: "p-go" },
        el("button", { class: "btn", type: "button", text: "링크로 공유하기", onclick: e => copy(shareUrl(), e.currentTarget, "링크 복사됨 ✓") }),
        el("button", { class: "btn ghost", type: "button", text: "텍스트로 복사 (카톡용)", onclick: e => copy(stackText(), e.currentTarget, "복사됨 ✓") }),
        el("button", { class: "btn ghost", type: "button", text: "모두 비우기", onclick: () => { stack = []; refreshStackUI(); closePanel(); } }))
    ) : el("div", { class: "empty" }, el("p", { class: "empty-title", text: "아직 담은 서비스가 없어요" }),
      el("p", { class: "p-note", text: "카드 오른쪽 위의 ＋ 버튼을 눌러 담아 보세요." }))
  );
}

function openStack(opener) {
  lastOpener = opener || document.activeElement;
  $("panel").dataset.mode = "stack";
  renderStackPanel();
  $("scrim").hidden = false; $("panel").hidden = false;
  document.body.style.overflow = "hidden";
  $("panel").scrollTop = 0; $("panel").focus();
}

function initStack() {
  const fromHash = loadStack();
  $("stackBarBtn").addEventListener("click", e => openStack(e.currentTarget));
  refreshStackUI();
  renderGrid();
  if (fromHash && stack.length) openStack($("stackBarBtn"));
  // 패널이 닫히면 모드 초기화
  new MutationObserver(() => { if ($("panel").hidden) delete $("panel").dataset.mode; })
    .observe($("panel"), { attributes: true, attributeFilter: ["hidden"] });
}
document.addEventListener("DOMContentLoaded", initStack);
