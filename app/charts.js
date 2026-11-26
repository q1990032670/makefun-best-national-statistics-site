// charts.js — small inline-SVG chart builders. Every chart is drawn from the
// inline data in data.js; there are no images and no chart library, so the
// page works fully offline. Each builder returns an SVG string.

const NS = 'http://www.w3.org/2000/svg';

export function fmt(n, digits = 0) {
  return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

// A line (or area) chart for a [year, value] series. Negative values are
// supported: the zero line is drawn and labelled. `color` is a CSS colour.
export function lineChart(points, opts = {}) {
  const w = opts.width ?? 640;
  const h = opts.height ?? 260;
  const padL = 46, padR = 12, padT = 14, padB = 28;
  const values = points.map((p) => p[1]);
  let min = Math.min(...values, 0);
  let max = Math.max(...values, 0);
  if (opts.min !== undefined) min = opts.min;
  if (opts.max !== undefined) max = opts.max;
  const span = max - min || 1;
  min -= span * 0.06; max += span * 0.06;
  const years = points.map((p) => p[0]);
  const x0 = Math.min(...years), x1 = Math.max(...years);
  const X = (yr) => padL + ((yr - x0) / (x1 - x0 || 1)) * (w - padL - padR);
  const Y = (v) => padT + (1 - (v - min) / (max - min)) * (h - padT - padB);
  const color = opts.color ?? '#b03a2e';

  let grid = '';
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = min + ((max - min) * i) / steps;
    const y = Y(v);
    grid += `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" class="grid"/>`;
    grid += `<text x="${padL - 6}" y="${y + 4}" class="axis-num" text-anchor="end">${fmt(v, opts.digits ?? 0)}</text>`;
  }
  const zeroY = Y(0);
  const zeroLine = min < 0 ? `<line x1="${padL}" y1="${zeroY}" x2="${w - padR}" y2="${zeroY}" class="zero"/>` : '';

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(' ');
  const area = `${path} L${X(x1).toFixed(1)},${zeroY.toFixed(1)} L${X(x0).toFixed(1)},${zeroY.toFixed(1)} Z`;
  const dots = points.map((p) => `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="3" class="dot" fill="${color}"><title>${p[0]}: ${fmt(p[1], opts.digits ?? 1)}${opts.unitSuffix ?? ''}</title></circle>`).join('');
  const firstYear = points[0][0], lastYear = points[points.length - 1][0];
  const midYear = points[Math.floor(points.length / 2)][0];

  return `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="${opts.label ?? 'line chart'}">`
    + grid + zeroLine
    + `<path d="${area}" fill="${color}" opacity="0.12"/>`
    + `<path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>`
    + dots
    + `<text x="${X(firstYear)}" y="${h - 8}" class="axis-num" text-anchor="middle">${firstYear}</text>`
    + `<text x="${X(midYear)}" y="${h - 8}" class="axis-num" text-anchor="middle">${midYear}</text>`
    + `<text x="${X(lastYear)}" y="${h - 8}" class="axis-num" text-anchor="middle">${lastYear}</text>`
    + `</svg>`;
}

// Horizontal bars for ranked categories: [{label, value}] with the value
// printed at the end of each bar.
export function hBarChart(rows, opts = {}) {
  const w = opts.width ?? 640;
  const rowH = opts.rowH ?? 30;
  const labelW = opts.labelW ?? 150;
  const h = rows.length * rowH + 8;
  const max = Math.max(...rows.map((r) => r.value)) || 1;
  const color = opts.color ?? '#1f5fa8';
  const bars = rows.map((r, i) => {
    const y = i * rowH + 4;
    const bw = Math.max(2, (r.value / max) * (w - labelW - 86));
    return `<text x="${labelW - 8}" y="${y + rowH / 2 + 4}" class="bar-label" text-anchor="end">${r.label}</text>`
      + `<rect x="${labelW}" y="${y + 5}" width="${bw}" height="${rowH - 12}" rx="3" fill="${r.color ?? color}"/>`
      + `<text x="${labelW + bw + 7}" y="${y + rowH / 2 + 4}" class="bar-value">${opts.format ? opts.format(r.value) : fmt(r.value)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="${opts.label ?? 'bar chart'}">${bars}</svg>`;
}

// A donut for share data: [{group, share}] with a legend-friendly layout.
export function donutChart(parts, opts = {}) {
  const size = opts.size ?? 240;
  const cx = size / 2, cy = size / 2, r = size / 2 - 8, inner = r * 0.58;
  const colors = opts.colors ?? ['#b03a2e', '#1f5fa8', '#e8a33d'];
  let angle = -Math.PI / 2;
  const total = parts.reduce((s, p) => s + p.share, 0) || 1;
  const arcs = parts.map((p, i) => {
    const frac = p.share / total;
    const a0 = angle, a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"><title>${p.group}: ${p.share}%</title></path>`;
  }).join('');
  return `<svg viewBox="0 0 ${size} ${size}" class="chart donut" role="img" aria-label="${opts.label ?? 'donut chart'}">${arcs}`
    + `<text x="${cx}" y="${cy - 2}" class="donut-mid" text-anchor="middle">${opts.centerTop ?? ''}</text>`
    + `<text x="${cx}" y="${cy + 16}" class="donut-sub" text-anchor="middle">${opts.centerBottom ?? ''}</text></svg>`;
}

// A population pyramid: rows of {band, men, women}, oldest band first.
// Men extend left (blue), women right (red), values in thousands.
export function pyramidChart(bands, opts = {}) {
  const w = opts.width ?? 660;
  const rowH = 21;
  const midX = w / 2;
  const labelW = 52;
  const maxHalf = w / 2 - labelW - 58;
  const h = bands.length * rowH + 30;
  const max = Math.max(...bands.map((b) => Math.max(b.men, b.women))) || 1;
  const rows = bands.map((b, i) => {
    const y = i * rowH + 6;
    const mw = (b.men / max) * maxHalf;
    const ww = (b.women / max) * maxHalf;
    return `<rect x="${(midX - labelW / 2 - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="${rowH - 5}" class="pyr-men"><title>Men ${b.band}: ${fmt(b.men)}k</title></rect>`
      + `<rect x="${(midX + labelW / 2).toFixed(1)}" y="${y}" width="${ww.toFixed(1)}" height="${rowH - 5}" class="pyr-women"><title>Women ${b.band}: ${fmt(b.women)}k</title></rect>`
      + `<text x="${midX}" y="${y + rowH - 9}" class="pyr-band" text-anchor="middle">${b.band}</text>`
      + `<text x="${(midX - labelW / 2 - mw - 6).toFixed(1)}" y="${y + rowH - 9}" class="axis-num" text-anchor="end">${fmt(b.men)}</text>`
      + `<text x="${(midX + labelW / 2 + ww + 6).toFixed(1)}" y="${y + rowH - 9}" class="axis-num">${fmt(b.women)}</text>`;
  }).join('');
  const footY = bands.length * rowH + 22;
  return `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="Population pyramid, thousands by age band and sex">${rows}`
    + `<text x="${midX - labelW}" y="${footY}" class="pyr-head" text-anchor="end" fill="#1f5fa8">◀ Men (thousands)</text>`
    + `<text x="${midX + labelW}" y="${footY}" class="pyr-head" fill="#b03a2e">Women (thousands) ▶</text></svg>`;
}

// Vertical columns for a [year, value] series (used for births/deaths style
// data and prefecture populations).
export function columnChart(points, opts = {}) {
  const w = opts.width ?? 640;
  const h = opts.height ?? 250;
  const padL = 46, padR = 10, padT = 14, padB = 26;
  const values = points.map((p) => p[1]);
  const max = Math.max(...values) * 1.08 || 1;
  const Y = (v) => padT + (1 - v / max) * (h - padT - padB);
  const slot = (w - padL - padR) / points.length;
  const color = opts.color ?? '#1f5fa8';
  let grid = '';
  for (let i = 0; i <= 4; i++) {
    const v = (max * i) / 4;
    grid += `<line x1="${padL}" y1="${Y(v)}" x2="${w - padR}" y2="${Y(v)}" class="grid"/>`
      + `<text x="${padL - 6}" y="${Y(v) + 4}" class="axis-num" text-anchor="end">${fmt(v, opts.digits ?? 0)}</text>`;
  }
  const bars = points.map((p, i) => {
    const x = padL + i * slot + slot * 0.14;
    const bw = slot * 0.72;
    const label = i % (opts.labelEvery ?? 1) === 0 || i === points.length - 1
      ? `<text x="${x + bw / 2}" y="${h - 8}" class="axis-num" text-anchor="middle">${p[0]}</text>` : '';
    return `<rect x="${x.toFixed(1)}" y="${Y(p[1]).toFixed(1)}" width="${bw.toFixed(1)}" height="${(Y(0) - Y(p[1])).toFixed(1)}" rx="2" fill="${color}"><title>${p[0]}: ${fmt(p[1], opts.digits ?? 0)}${opts.unitSuffix ?? ''}</title></rect>${label}`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="${opts.label ?? 'column chart'}">${grid}${bars}</svg>`;
}
