# Japan in Numbers — a national statistics portal

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/q1990032670/makefun-best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/q1990032670/makefun-best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An original, fully offline statistics portal for **Japan**, built as plain
static files — no build step, no framework, no network requests. Open
`app/index.html` through any static file server and it runs on desktop and
phone alike.

## What is inside

- **Overview dashboard** — eight headline indicators (population, GDP, life
  expectancy, unemployment, inflation, age structure and more), each printed
  with its source and year, plus a century-long population chart, an age
  donut and the largest prefectures.
- **Population** — the full 2020 census population pyramid by five-year age
  band and sex, the 1920–2024 population series, and fact cards on births,
  deaths, fertility, households and foreign residents.
- **Economy** — real GDP growth 2000–2024, unemployment since 1990, CPI
  inflation since 1990, and cards on trade, debt, wages and monetary policy.
- **Regions explorer** — all 47 prefectures with 2020 census population,
  land area and computed density: live search, five sort orders, a top-10
  chart that follows the selection, and a clickable detail panel with each
  prefecture's national ranks.
- **Trends explorer** — five long-run indicators (population, GDP growth,
  unemployment, inflation, life expectancy) scrubbed with a year slider;
  the readout always shows the exact published value for the chosen year.
- **Society & Sources** — education, health and environment indicators, and
  a full list of the publishers behind every figure.

All charts are inline SVG drawn by `app/charts.js` from the same inline data
tables in `app/data.js` that the text quotes, so a chart and its caption can
never disagree.

## Data sources

Statistics Bureau of Japan (Population Census 2020, population estimates,
Labour Force Survey, Consumer Price Index), Cabinet Office national
accounts, Ministry of Health, Labour and Welfare (vital statistics, life
tables), Ministry of Finance trade statistics, Bank of Japan, World Bank
World Development Indicators, IMF and OECD. Figures are rounded for
display; each card and chart names its source and year on the page.

## Layout of this repository

- `main.ts` — the hand-in program (Node 22, standard library only): copies
  `app/` and `screenshots/` to the output directory and writes
  `dossier.json` with the vendored library.
- `app/` — the site itself: `index.html`, `style.css`, `data.js` (all
  figures), `charts.js` (SVG chart builders), `views.js` (one renderer per
  section) and `main.js` (hash router and control wiring).
- `screenshots/` — real browser renders of the site, desktop and phone.
- `vendor/makefun-frontend.ts` — the make.fun dossier library, unchanged
  from the competition kit.

## Run it locally

```sh
# serve app/ with any static server, for example:
npx serve app
# or reproduce the hand-in output:
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.

<sub>Entered on [make.fun](https://make.fun/bounty/best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
