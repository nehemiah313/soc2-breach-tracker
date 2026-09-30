"use strict";

const state = {
  breaches: [],
  benchmarks: [],
  criteriaById: {},
  query: "",
  year: "",
  sort: "cost_desc"
};

function fmtUSD(n) {
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2).replace(/\.00$/, "") + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(0) + "K";
  return "$" + n;
}

function fmtRecords(n) {
  if (n == null) return null;
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return String(n);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function tagTitle(id) {
  const c = state.criteriaById[id];
  return c ? (id + ": " + c.title) : id;
}

function matches(b) {
  if (state.year && String(b.year) !== state.year) return false;
  if (!state.query) return true;
  const q = state.query.toLowerCase();
  return [b.company, b.sector, b.what_happened, b.cost_type, b.source_name]
    .join(" ").toLowerCase().includes(q);
}

function sortBreaches(list) {
  const arr = list.slice();
  switch (state.sort) {
    case "cost_asc": arr.sort((a, b) => a.cost_usd - b.cost_usd); break;
    case "year_desc": arr.sort((a, b) => b.year - a.year); break;
    case "year_asc": arr.sort((a, b) => a.year - b.year); break;
    case "company_asc": arr.sort((a, b) => a.company.localeCompare(b.company)); break;
    default: arr.sort((a, b) => b.cost_usd - a.cost_usd);
  }
  return arr;
}

function render() {
  const filtered = sortBreaches(state.breaches.filter(matches));
  const list = document.getElementById("breachList");

  const total = filtered.reduce((s, b) => s + b.cost_usd, 0);
  document.getElementById("runningTotal").textContent = fmtUSD(total);
  document.getElementById("incidentCount").textContent = filtered.length;

  if (!filtered.length) {
    list.innerHTML = '<div class="empty">No incidents match your filters.</div>';
    return;
  }

  list.innerHTML = filtered.map(b => {
    const rec = b.records_affected != null
      ? '<div class="records">Records affected: <strong>' + fmtRecords(b.records_affected) + '</strong>' +
        (b.records_note ? ' <span>(' + escapeHtml(b.records_note) + ')</span>' : '') + '</div>'
      : (b.records_note ? '<div class="records">' + escapeHtml(b.records_note) + '</div>' : '');
    const tags = b.related_criteria.map(id =>
      '<span class="tag" title="' + escapeHtml(tagTitle(id)) + '">' + escapeHtml(id) + '</span>'
    ).join("");
    return '<article class="breach">' +
      '<div class="breach-head">' +
        '<h3>' + escapeHtml(b.company) + '</h3>' +
        '<span class="badge">' + b.year + '</span>' +
        '<span class="badge">' + escapeHtml(b.sector) + '</span>' +
        '<span class="breach-cost">' + escapeHtml(b.cost_label) +
          '<small>' + escapeHtml(b.cost_type) + '</small></span>' +
      '</div>' +
      '<p>' + escapeHtml(b.what_happened) + '</p>' +
      rec +
      '<div class="tags" aria-label="Related SOC 2 criteria">' + tags + '</div>' +
      '<div class="source">Source: <a href="' + escapeHtml(b.source_url) + '" target="_blank" rel="noopener">' +
        escapeHtml(b.source_name) + '</a></div>' +
    '</article>';
  }).join("");
}

function renderBenchmarks() {
  const el = document.getElementById("benchmarkList");
  el.innerHTML = state.benchmarks.map(b =>
    '<div class="benchmark">' +
      '<div class="b-stat">' + escapeHtml(b.statistic) + '</div>' +
      '<div class="b-value">' + escapeHtml(b.value) + '</div>' +
      '<div class="b-detail">' + escapeHtml(b.detail) + '</div>' +
      '<a href="' + escapeHtml(b.source_url) + '" target="_blank" rel="noopener">' +
        escapeHtml(b.source_name) + '</a>' +
    '</div>'
  ).join("");

  const g = state.benchmarks.find(b => b.statistic.indexOf("Global average") === 0);
  if (g) {
    document.getElementById("benchmarkValue").textContent = g.value;
    document.getElementById("benchmarkNote").textContent = g.report + ", global average";
  }
}

function renderYears() {
  const sel = document.getElementById("yearFilter");
  const years = [...new Set(state.breaches.map(b => b.year))].sort((a, b) => b - a);
  years.forEach(y => {
    const opt = document.createElement("option");
    opt.value = String(y);
    opt.textContent = String(y);
    sel.appendChild(opt);
  });
}

async function init() {
  const [breachRes, tscRes] = await Promise.all([
    fetch("data/breaches.json"),
    fetch("data/tsc.json")
  ]);
  const breachData = await breachRes.json();
  const tscData = await tscRes.json();
  state.breaches = breachData.breaches;
  state.benchmarks = breachData.benchmarks;
  tscData.criteria.forEach(c => { state.criteriaById[c.id] = c; });

  renderBenchmarks();
  renderYears();

  document.getElementById("searchBox").addEventListener("input", e => {
    state.query = e.target.value.trim();
    render();
  });
  document.getElementById("yearFilter").addEventListener("change", e => {
    state.year = e.target.value;
    render();
  });
  document.getElementById("sortBy").addEventListener("change", e => {
    state.sort = e.target.value;
    render();
  });

  render();
}

document.addEventListener("DOMContentLoaded", init);
