// main.js — hash router and control wiring for the Japan statistics portal.
//
// Routes: #/ (overview), #/population, #/economy, #/regions, #/trends,
// #/society, #/sources. Each view is rendered from views.js into <main>;
// section-specific controls are bound right after their view renders.

import {
  overviewView, populationView, economyView, regionsView, societyView,
  sourcesView, trendsView, trendSeries, trendChartWithMarker, nearestPoint,
  renderRegionRows, renderRegionChart, renderRegionDetail, densityOf,
} from './views.js';
import { prefectures } from './data.js';
import { fmt } from './charts.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.nav-link')];

const routes = {
  '': overviewView,
  population: populationView,
  economy: economyView,
  regions: regionsView,
  trends: trendsView,
  society: societyView,
  sources: sourcesView,
};

function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, '');
  return Object.prototype.hasOwnProperty.call(routes, hash) ? hash : '';
}

function render() {
  const route = currentRoute();
  app.innerHTML = routes[route]();
  navLinks.forEach((a) => {
    const target = a.getAttribute('href').replace(/^#\/?/, '');
    a.classList.toggle('active', target === route);
    if (target === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
  if (route === 'regions') bindRegions();
  if (route === 'trends') bindTrends();
}

// ------------------------------------------------------------- regions UI
function bindRegions() {
  const search = document.getElementById('region-search');
  const sort = document.getElementById('region-sort');
  const rowsEl = document.getElementById('region-rows');
  const chartEl = document.getElementById('region-chart');
  const chartTitle = document.getElementById('region-chart-title');
  const countEl = document.getElementById('region-count');
  const detailEl = document.getElementById('region-detail');
  let selected = 'Tokyo';

  const sorters = {
    'pop-desc': (a, b) => b.pop - a.pop,
    'pop-asc': (a, b) => a.pop - b.pop,
    'density-desc': (a, b) => densityOf(b) - densityOf(a),
    'area-desc': (a, b) => b.area - a.area,
    'name-asc': (a, b) => a.name.localeCompare(b.name),
  };

  function refresh() {
    const q = search.value.trim().toLowerCase();
    const filtered = prefectures.filter((p) =>
      !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
    const list = [...filtered].sort(sorters[sort.value]);
    rowsEl.innerHTML = renderRegionRows(list);
    chartEl.innerHTML = renderRegionChart(list, sort.value);
    chartTitle.textContent = sort.value === 'density-desc'
      ? 'Densest prefectures in view' : 'Most populous prefectures in view';
    countEl.textContent = `Showing ${list.length} of 47 prefectures`;
    const current = prefectures.find((p) => p.name === selected) ?? list[0];
    if (current) {
      detailEl.innerHTML = renderRegionDetail(current);
      rowsEl.querySelectorAll('tr').forEach((tr) => {
        tr.classList.toggle('selected', tr.dataset.name === current.name);
      });
    }
    rowsEl.querySelectorAll('tr[data-name]').forEach((tr) => {
      const pick = () => { selected = tr.dataset.name; refresh(); };
      tr.addEventListener('click', pick);
      tr.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    });
  }

  search.addEventListener('input', refresh);
  sort.addEventListener('change', refresh);
  refresh();
}

// -------------------------------------------------------------- trends UI
function bindTrends() {
  const select = document.getElementById('trend-select');
  const slider = document.getElementById('trend-slider');
  const yearLabel = document.getElementById('trend-year-label');
  const valueEl = document.getElementById('trend-value');
  const blurbEl = document.getElementById('trend-blurb');
  const chartEl = document.getElementById('trend-chart');
  const sourceEl = document.getElementById('trend-source');

  function series() {
    return trendSeries.find((s) => s.id === select.value) ?? trendSeries[0];
  }

  function setupSlider() {
    const s = series();
    const years = s.points.map((p) => p[0]);
    slider.min = Math.min(...years);
    slider.max = Math.max(...years);
    slider.value = slider.max;
    draw();
  }

  function draw() {
    const s = series();
    const point = nearestPoint(s, Number(slider.value));
    yearLabel.textContent = point[0];
    slider.value = point[0];
    const unit = s.unit === '%' ? '%' : ` ${s.unit}`;
    valueEl.textContent = `${s.title} in ${point[0]}: ${fmt(point[1], s.digits)}${unit}`;
    blurbEl.textContent = s.blurb;
    chartEl.innerHTML = trendChartWithMarker(s, point[0]);
    sourceEl.textContent = `Source: ${s.source}`;
  }

  select.addEventListener('change', setupSlider);
  slider.addEventListener('input', draw);
  setupSlider();
}

window.addEventListener('hashchange', render);
render();
