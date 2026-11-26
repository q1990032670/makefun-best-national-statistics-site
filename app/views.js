// views.js — one render function per section of the portal. Each returns the
// HTML for that section; controls that need wiring are bound in main.js after
// the HTML is in place. All figures come from data.js and every chart is
// drawn by charts.js from that same inline data.

import {
  country, headlines, populationHistory, ageShares2020, pyramid2020,
  vitalStats, gdpGrowth, unemploymentHistory, inflationHistory,
  lifeExpectancyHistory, economyFacts, prefectures, societyFacts, sources,
} from './data.js';
import { lineChart, hBarChart, donutChart, pyramidChart, columnChart, fmt } from './charts.js';

function sourceLine(source, year) {
  return `<p class="source-line">Source: ${source}${year ? ` · ${year}` : ''}</p>`;
}

function factCards(facts) {
  return `<div class="fact-grid">${facts.map((f) => `
    <article class="fact-card">
      <h3>${f.label}</h3>
      <p class="fact-value">${f.value}</p>
      <p class="fact-note">${f.note}</p>
      ${sourceLine(f.source, f.year)}
    </article>`).join('')}</div>`;
}

// ---------------------------------------------------------------- overview
export function overviewView() {
  const cards = headlines.map((k) => `
    <article class="kpi-card">
      <h3>${k.label}</h3>
      <p class="kpi-value">${k.value}</p>
      <p class="kpi-detail">${k.detail}</p>
      ${sourceLine(k.source, k.year)}
    </article>`).join('');

  const topPrefs = [...prefectures].sort((a, b) => b.pop - a.pop).slice(0, 8)
    .map((p) => ({ label: p.name, value: p.pop }));

  return `
  <section class="hero">
    <div class="hero-text">
      <p class="hero-kicker">National statistics portal</p>
      <h1>${country.name} <span class="native">${country.nativeName}</span> in numbers</h1>
      <p class="hero-lede">The essential figures for ${country.name} — its people, economy,
      regions and society — drawn from official statistics and set out with their
      sources and years, so every number on this page can be checked.</p>
      <ul class="hero-facts">
        <li><strong>Capital</strong> ${country.capital}</li>
        <li><strong>Land area</strong> ${fmt(country.areaKm2)} km²</li>
        <li><strong>Islands</strong> ${fmt(country.islands)}</li>
        <li><strong>Prefectures</strong> ${country.prefectures}</li>
        <li><strong>Municipalities</strong> ${fmt(country.municipalities)}</li>
        <li><strong>Currency</strong> ${country.currency}</li>
      </ul>
    </div>
    <div class="hero-chart card">
      <h2>Population, 1920–2024</h2>
      ${lineChart(populationHistory.points, { label: 'Population of Japan in millions, 1920 to 2024', color: '#b03a2e', digits: 0, unitSuffix: ' million' })}
      ${sourceLine(populationHistory.source)}
      <p class="chart-note">Japan's population peaked at 128.1 million in the 2010 census
      and has fallen every year since — the longest sustained decline of any large country.</p>
    </div>
  </section>

  <section>
    <h2 class="section-title">Headline indicators</h2>
    <div class="kpi-grid">${cards}</div>
  </section>

  <section class="two-col">
    <div class="card">
      <h2>Who lives in Japan? Age structure, 2020</h2>
      <div class="donut-wrap">
        ${donutChart(ageShares2020, { label: 'Age structure of Japan, 2020 census', centerTop: '126.1M', centerBottom: 'people, 2020' })}
        <ul class="legend">
          <li><span class="swatch" style="background:#b03a2e"></span>0–14 years — 12.0%</li>
          <li><span class="swatch" style="background:#1f5fa8"></span>15–64 years — 59.5%</li>
          <li><span class="swatch" style="background:#e8a33d"></span>65 and over — 28.6%</li>
        </ul>
      </div>
      ${sourceLine('Population Census 2020, Statistics Bureau of Japan')}
    </div>
    <div class="card">
      <h2>Largest prefectures, 2020 census</h2>
      ${hBarChart(topPrefs, { label: 'Population of the eight largest prefectures, thousands', format: (v) => `${fmt(v)}k` })}
      ${sourceLine('Population Census 2020, Statistics Bureau of Japan')}
      <p class="chart-note">Greater Tokyo (Tokyo, Kanagawa, Saitama and Chiba) holds about
      36.9 million people — more than the whole population of Canada.
      <a href="#/regions">Explore all 47 prefectures →</a></p>
    </div>
  </section>

  <section class="card">
    <h2>Life expectancy keeps rising</h2>
    ${lineChart(lifeExpectancyHistory.points, { label: 'Life expectancy at birth in Japan, 1960 to 2023', color: '#1f5fa8', min: 60, max: 88, digits: 0, unitSuffix: ' years' })}
    ${sourceLine(lifeExpectancyHistory.source)}
    <p class="chart-note">A child born in Japan in 2023 could expect to live 84.0 years —
    among the longest lives anywhere, and sixteen years longer than in 1960.
    <a href="#/trends">Open the trends explorer →</a></p>
  </section>`;
}

// -------------------------------------------------------------- population
export function populationView() {
  return `
  <section>
    <h1 class="page-title">Population</h1>
    <p class="page-lede">Japan counted 126,146,099 people in the 2020 census — its second
    straight census decline. The population peaked in 2010 and now falls by roughly
    800,000 a year, because deaths have outnumbered births since 2007.</p>
  </section>

  <section class="card">
    <h2>Population pyramid, 2020 census</h2>
    <p class="chart-note">Five-year age bands in thousands. The bulge at 70–74 is the
    post-war baby boom; the narrow base shows two generations of low birth rates.
    Women outnumber men at every age over 60.</p>
    ${pyramidChart(pyramid2020.bands)}
    ${sourceLine(pyramid2020.source)}
  </section>

  <section class="two-col">
    <div class="card">
      <h2>A century of growth, then decline</h2>
      ${lineChart(populationHistory.points, { label: 'Population of Japan in millions, 1920 to 2024', color: '#b03a2e', digits: 0, unitSuffix: ' million' })}
      ${sourceLine(populationHistory.source)}
    </div>
    <div class="card">
      <h2>Age structure, 2020</h2>
      ${hBarChart(ageShares2020.map((a) => ({ label: a.group, value: a.share })), { label: 'Share of population by broad age group, percent', format: (v) => `${v.toFixed(1)}%`, color: '#e8a33d', labelW: 130 })}
      ${sourceLine('Population Census 2020, Statistics Bureau of Japan')}
      <p class="chart-note">Fewer than one person in eight is a child; more than one in
      four is over 65. The old-age dependency ratio is the highest in the world.</p>
    </div>
  </section>

  <section>
    <h2 class="section-title">Births, deaths and households</h2>
    ${factCards(vitalStats)}
  </section>`;
}

// ---------------------------------------------------------------- economy
export function economyView() {
  return `
  <section>
    <h1 class="page-title">Economy</h1>
    <p class="page-lede">Japan is the world's fourth-largest economy, with a nominal GDP of
    about US$4.03 trillion in 2024. Three decades of near-zero inflation ended in 2022;
    the Bank of Japan has since raised its policy rate to 0.5%, the highest since 2008,
    while unemployment stays close to 2.5%.</p>
  </section>

  <section class="card">
    <h2>Real GDP growth, 2000–2024</h2>
    ${lineChart(gdpGrowth.points, { label: 'Real GDP growth of Japan, percent per year, 2000 to 2024', color: '#1f5fa8', digits: 1, unitSuffix: '%' })}
    ${sourceLine(gdpGrowth.source)}
    <p class="chart-note">The deep dips are the 2009 global financial crisis (−5.7%) and the
    2020 pandemic year (−4.2%). Growth in 2024 was slightly negative as consumption softened.</p>
  </section>

  <section class="two-col">
    <div class="card">
      <h2>Unemployment rate</h2>
      ${lineChart(unemploymentHistory.points, { label: 'Unemployment rate in Japan, percent, 1990 to 2024', color: '#2e7d4f', min: 0, max: 6, digits: 1, unitSuffix: '%' })}
      ${sourceLine(unemploymentHistory.source)}
      <p class="chart-note">Even at its 2002 peak of 5.4%, Japanese unemployment stayed far
      below US and European levels — firms adjust hours and bonuses before jobs.</p>
    </div>
    <div class="card">
      <h2>Consumer price inflation</h2>
      ${lineChart(inflationHistory.points, { label: 'Consumer price inflation in Japan, percent per year, 1990 to 2024', color: '#b03a2e', digits: 1, unitSuffix: '%' })}
      ${sourceLine(inflationHistory.source)}
      <p class="chart-note">Prices fell in most years between 1999 and 2012. The 2014 spike
      was a consumption-tax rise; the 2022–24 rise is the first sustained inflation in a generation.</p>
    </div>
  </section>

  <section>
    <h2 class="section-title">Structure, trade and public finances</h2>
    ${factCards(economyFacts)}
  </section>`;
}

// ---------------------------------------------------------------- regions
// The regions explorer: search box, sort picker and a detail panel are wired
// in main.js (bindRegions). The table body and chart are re-rendered by
// renderRegionRows / renderRegionChart below so the controls stay live.
export function regionsView() {
  return `
  <section>
    <h1 class="page-title">Regions explorer — 47 prefectures</h1>
    <p class="page-lede">Every prefecture with its 2020 census population, land area and
    density. Search by prefecture or capital, sort the table, and pick any row to see
    that prefecture in detail.</p>
  </section>

  <section class="controls card">
    <label class="control">
      <span>Search prefectures</span>
      <input id="region-search" type="search" placeholder="Try “Osaka” or “Naha”…" autocomplete="off">
    </label>
    <label class="control">
      <span>Sort by</span>
      <select id="region-sort">
        <option value="pop-desc">Population, largest first</option>
        <option value="pop-asc">Population, smallest first</option>
        <option value="density-desc">Density, highest first</option>
        <option value="area-desc">Land area, largest first</option>
        <option value="name-asc">Name, A–Z</option>
      </select>
    </label>
    <p class="control-note" id="region-count"></p>
  </section>

  <section class="two-col regions-layout">
    <div class="card">
      <h2 id="region-chart-title">Most populous prefectures</h2>
      <div id="region-chart"></div>
      ${sourceLine('Population Census 2020, Statistics Bureau of Japan')}
    </div>
    <div class="card detail-card" id="region-detail" aria-live="polite"></div>
  </section>

  <section class="card">
    <div class="table-wrap">
      <table class="data-table" id="region-table">
        <thead><tr><th>Prefecture</th><th>Capital</th><th>Population (2020)</th><th>Area (km²)</th><th>Density (/km²)</th><th>Share of Japan</th></tr></thead>
        <tbody id="region-rows"></tbody>
      </table>
    </div>
    ${sourceLine('Population Census 2020 final counts; areas, Geospatial Information Authority of Japan')}
  </section>`;
}

export function densityOf(p) {
  return p.pop * 1000 / p.area;
}

export function renderRegionRows(list) {
  const total = prefectures.reduce((s, p) => s + p.pop, 0);
  if (!list.length) return `<tr><td colspan="6" class="empty-row">No prefecture matches that search. Try a shorter name.</td></tr>`;
  return list.map((p) => `
    <tr data-name="${p.name}" tabindex="0" title="Show ${p.name} in detail">
      <td><strong>${p.name}</strong></td>
      <td>${p.capital}</td>
      <td class="num">${fmt(p.pop * 1000)}</td>
      <td class="num">${fmt(p.area)}</td>
      <td class="num">${fmt(Math.round(densityOf(p)))}</td>
      <td class="num">${(p.pop / total * 100).toFixed(1)}%</td>
    </tr>`).join('');
}

export function renderRegionChart(list, sortKey) {
  const byDensity = sortKey === 'density-desc';
  const top = [...list].sort((a, b) => byDensity ? densityOf(b) - densityOf(a) : b.pop - a.pop).slice(0, 10);
  return hBarChart(top.map((p) => ({
    label: p.name,
    value: byDensity ? Math.round(densityOf(p)) : p.pop,
  })), {
    label: byDensity ? 'Ten densest prefectures in the current selection' : 'Ten most populous prefectures in the current selection',
    format: (v) => byDensity ? fmt(v) : `${fmt(v)}k`,
    color: byDensity ? '#2e7d4f' : '#1f5fa8',
  });
}

export function renderRegionDetail(p) {
  const total = prefectures.reduce((s, q) => s + q.pop, 0);
  const rank = [...prefectures].sort((a, b) => b.pop - a.pop).findIndex((q) => q.name === p.name) + 1;
  const densityRank = [...prefectures].sort((a, b) => densityOf(b) - densityOf(a)).findIndex((q) => q.name === p.name) + 1;
  return `
    <h2>${p.name} prefecture</h2>
    <dl class="detail-list">
      <div><dt>Capital</dt><dd>${p.capital}</dd></div>
      <div><dt>Population (2020 census)</dt><dd>${fmt(p.pop * 1000)} — rank ${rank} of 47</dd></div>
      <div><dt>Share of Japan</dt><dd>${(p.pop / total * 100).toFixed(2)}% of the national population</dd></div>
      <div><dt>Land area</dt><dd>${fmt(p.area)} km²</dd></div>
      <div><dt>Population density</dt><dd>${fmt(Math.round(densityOf(p)))} people / km² — rank ${densityRank} of 47</dd></div>
      <div><dt>Compared with the national average</dt><dd>${densityOf(p) >= 334 ? 'Denser' : 'Less dense'} than Japan as a whole (334 / km²)</dd></div>
    </dl>
    ${sourceLine('Population Census 2020; Geospatial Information Authority of Japan')}`;
}

// ----------------------------------------------------------------- trends
// The trends explorer: an indicator picker plus a year slider. The slider
// scrubs through the chosen series; the readout and the marker on the chart
// follow it. Series metadata lives here so main.js can wire it generically.
export const trendSeries = [
  { id: 'population', title: 'Population', unit: 'million', digits: 1, color: '#b03a2e', points: populationHistory.points, source: populationHistory.source, blurb: 'Census counts to 2020, then the 2024 estimate. The peak was 128.1 million in 2010.' },
  { id: 'growth', title: 'Real GDP growth', unit: '%', digits: 1, color: '#1f5fa8', points: gdpGrowth.points, source: gdpGrowth.source, blurb: 'Annual real growth. The economy shrank in 2008–09, 2011, 2019–20 and 2024.' },
  { id: 'unemployment', title: 'Unemployment rate', unit: '%', digits: 1, color: '#2e7d4f', points: unemploymentHistory.points, source: unemploymentHistory.source, blurb: 'Annual average. The rate doubled in the 1990s, then halved again by 2018.' },
  { id: 'inflation', title: 'Inflation (CPI)', unit: '%', digits: 1, color: '#b03a2e', points: inflationHistory.points, source: inflationHistory.source, blurb: 'All-items consumer prices. Negative readings were normal between 1999 and 2012.' },
  { id: 'life', title: 'Life expectancy', unit: 'years', digits: 1, color: '#1f5fa8', min: 60, max: 88, points: lifeExpectancyHistory.points, source: lifeExpectancyHistory.source, blurb: 'Years of life expected at birth. Japan has led the world for decades.' },
];

export function trendsView() {
  const options = trendSeries.map((s) => `<option value="${s.id}">${s.title}</option>`).join('');
  return `
  <section>
    <h1 class="page-title">Trends explorer</h1>
    <p class="page-lede">Pick an indicator, then drag the year slider (or use the arrow keys)
    to travel through the series. The readout gives the exact published value for the
    year you land on.</p>
  </section>

  <section class="controls card">
    <label class="control">
      <span>Indicator</span>
      <select id="trend-select">${options}</select>
    </label>
    <label class="control grow">
      <span>Year: <strong id="trend-year-label"></strong></span>
      <input id="trend-slider" type="range" step="1">
    </label>
  </section>

  <section class="card">
    <div class="trend-readout">
      <p class="trend-value" id="trend-value"></p>
      <p class="trend-blurb" id="trend-blurb"></p>
    </div>
    <div id="trend-chart"></div>
    <p class="source-line" id="trend-source"></p>
  </section>

  <section class="card">
    <h2>How the big stories connect</h2>
    <p>Japan's statistics tell one connected story. The population peaked in 2010, yet life
    expectancy kept climbing to 84 years, so the share of older people — already 29.3% —
    rises every year. A shrinking workforce helps explain both the very low unemployment
    rate (employers hoard labour) and the long fight against deflation: prices fell for
    most of 1999–2012, and only the post-2022 global price shock pushed inflation above
    the Bank of Japan's 2% target for a sustained period. GDP growth has averaged under
    1% a year since 2000, but GDP per person has held up better than the headline,
    because the population itself is shrinking.</p>
  </section>`;
}

// Render the trend chart with a marker on the selected year. Returns SVG via
// the line chart builder, with an extra marker group appended by main.js —
// instead we rebuild here with the marker baked in for a single render pass.
export function trendChartWithMarker(series, year) {
  const base = lineChart(series.points, {
    label: `${series.title} over time`, color: series.color, digits: series.digits,
    unitSuffix: series.unit === '%' ? '%' : '',
    min: series.min, max: series.max,
  });
  const point = nearestPoint(series, year);
  if (!point) return base;
  // Recompute the marker position with the same geometry as charts.lineChart,
  // honouring the same explicit axis range when the series declares one.
  const w = 640, h = 260, padL = 46, padR = 12, padT = 14, padB = 28;
  const values = series.points.map((p) => p[1]);
  let min = Math.min(...values, 0), max = Math.max(...values, 0);
  if (series.min !== undefined) min = series.min;
  if (series.max !== undefined) max = series.max;
  const span = max - min || 1; min -= span * 0.06; max += span * 0.06;
  const years = series.points.map((p) => p[0]);
  const x = padL + ((point[0] - Math.min(...years)) / (Math.max(...years) - Math.min(...years) || 1)) * (w - padL - padR);
  const y = padT + (1 - (point[1] - min) / (max - min)) * (h - padT - padB);
  const marker = `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="none" stroke="#111" stroke-width="2"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#111"/>`;
  return base.replace('</svg>', `${marker}</svg>`);
}

export function nearestPoint(series, year) {
  let best = null;
  for (const p of series.points) {
    if (!best || Math.abs(p[0] - year) < Math.abs(best[0] - year)) best = p;
  }
  return best;
}

// ---------------------------------------------------------------- society
export function societyView() {
  return `
  <section>
    <h1 class="page-title">Society, health &amp; environment</h1>
    <p class="page-lede">Beyond people and money: how Japan learns, heals, travels and
    powers itself. Each card names the publisher of the figure and its year.</p>
  </section>
  <section>
    ${factCards(societyFacts)}
  </section>
  <section class="card">
    <h2>Reading these numbers</h2>
    <p>Japan pairs world-leading outcomes — the longest lives, near-universal literacy,
    very low violent crime — with structural strains the same statistics make plain:
    a fertility rate of 1.20, government debt of about 255% of GDP, and carbon emissions
    that, while down 23% from 2013, still exceed one billion tonnes a year. Two-thirds
    of the land is forest because the islands are steep: most people live on the narrow
    coastal plains, which is why Tokyo's density (about 6,400 people per km²) is twenty
    times the national average.</p>
  </section>`;
}

// ---------------------------------------------------------------- sources
export function sourcesView() {
  return `
  <section>
    <h1 class="page-title">Sources &amp; method</h1>
    <p class="page-lede">Every figure on this site comes from a published official or
    international statistical series. Figures are rounded for display; where a series
    is revised after publication, the value shown is the one current when this site
    was compiled in November 2026.</p>
  </section>
  <section class="card">
    <ul class="source-list">
      ${sources.map((s) => `<li><strong>${s.name}.</strong> ${s.what}</li>`).join('')}
    </ul>
  </section>
  <section class="card">
    <h2>About this site</h2>
    <p>“Japan in Numbers” is an independent statistics portal built for browsing: it is
    not affiliated with the Government of Japan or any statistical agency. The site is
    a set of static files — it makes no network requests, sets no cookies and collects
    nothing about its visitors. Charts are drawn from the same inline data tables that
    the text quotes, so a chart and its caption can never disagree.</p>
    <p>Known simplifications: prefecture populations are the 2020 census final counts
    (the most recent complete count for all 47 prefectures); the 2024 national total is
    an estimate. GDP in US dollars moves with the yen exchange rate as well as with the
    real economy.</p>
  </section>`;
}
