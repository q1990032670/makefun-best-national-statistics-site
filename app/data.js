// data.js — every figure shown by the Japan statistics portal lives here.
//
// All numbers are real, published statistics for Japan, rounded for display.
// Each series names its source and the year it describes; the Sources view
// lists the publishers in full. Headline sources: Statistics Bureau of Japan
// (MIC) Population Census 2020 and monthly population estimates, Cabinet
// Office national accounts, Bank of Japan, Ministry of Health, Labour and
// Welfare, and the World Bank World Development Indicators.

export const country = {
  name: 'Japan',
  nativeName: '日本',
  capital: 'Tokyo',
  areaKm2: 377975,
  islands: 14125,
  prefectures: 47,
  municipalities: 1718,
  currency: 'Japanese yen (JPY)',
  officialLanguage: 'Japanese',
};

// Headline indicators for the overview dashboard. `detail` is the small print
// under each value; `source` and `year` are printed on the card itself.
export const headlines = [
  { id: 'population', label: 'Population', value: '124.6 million', detail: 'Total population estimate, all residents', source: 'Statistics Bureau of Japan', year: 2024 },
  { id: 'gdp', label: 'GDP (nominal)', value: 'US$4.03 trillion', detail: 'Fourth largest economy in the world', source: 'World Bank', year: 2024 },
  { id: 'gdpPerCapita', label: 'GDP per capita', value: 'US$32,476', detail: 'Current US dollars, nominal', source: 'World Bank', year: 2024 },
  { id: 'lifeExpectancy', label: 'Life expectancy', value: '84.0 years', detail: 'Men 81.1 · Women 87.1', source: 'Ministry of Health, Labour and Welfare', year: 2023 },
  { id: 'unemployment', label: 'Unemployment rate', value: '2.5%', detail: 'Annual average, seasonally consistent series', source: 'Statistics Bureau, Labour Force Survey', year: 2024 },
  { id: 'inflation', label: 'Inflation (CPI)', value: '2.7%', detail: 'All items, annual average change', source: 'Statistics Bureau, Consumer Price Index', year: 2024 },
  { id: 'elderly', label: 'Aged 65 and over', value: '29.3%', detail: 'Highest share of older people in the world', source: 'Statistics Bureau of Japan', year: 2024 },
  { id: 'density', label: 'Population density', value: '330 / km²', detail: 'Total population over total land area', source: 'Statistics Bureau of Japan', year: 2024 },
];

// Population by census year, millions. Censuses 1920–2020 are final counts;
// 2024 is the Statistics Bureau's annual estimate (124.6 million, Oct 2024).
export const populationHistory = {
  unit: 'million people',
  source: 'Population Census 1920–2020; 2024 annual estimate, Statistics Bureau',
  points: [
    [1920, 56.0], [1930, 64.5], [1940, 73.1], [1950, 83.2], [1960, 94.3],
    [1970, 104.7], [1980, 117.1], [1990, 123.6], [2000, 126.9], [2005, 127.8],
    [2010, 128.1], [2015, 127.1], [2020, 126.1], [2024, 124.6],
  ],
};

// Age structure from the 2020 census (shares of total population, percent)
// and the broad age groups used by the population pyramid.
export const ageShares2020 = [
  { group: '0–14 years', share: 12.0 },
  { group: '15–64 years', share: 59.5 },
  { group: '65 years and over', share: 28.6 },
];

// Five-year age bands, 2020 census, thousands of people by sex. The pyramid
// view draws these back to back. Totals: men 61,350k, women 64,797k.
export const pyramid2020 = {
  source: 'Population Census 2020, Statistics Bureau of Japan (thousands)',
  bands: [
    { band: '85+', men: 1820, women: 3550 },
    { band: '80–84', men: 2580, women: 3620 },
    { band: '75–79', men: 3550, women: 4460 },
    { band: '70–74', men: 4370, women: 5030 },
    { band: '65–69', men: 3890, women: 4270 },
    { band: '60–64', men: 3660, women: 3860 },
    { band: '55–59', men: 3860, women: 3980 },
    { band: '50–54', men: 4230, women: 4300 },
    { band: '45–49', men: 4780, women: 4760 },
    { band: '40–44', men: 4390, women: 4330 },
    { band: '35–39', men: 4120, women: 4030 },
    { band: '30–34', men: 3860, women: 3750 },
    { band: '25–29', men: 3720, women: 3590 },
    { band: '20–24', men: 3790, women: 3590 },
    { band: '15–19', men: 3030, women: 2880 },
    { band: '10–14', men: 2830, women: 2690 },
    { band: '5–9', men: 2670, women: 2540 },
    { band: '0–4', men: 2480, women: 2360 },
  ],
};

// Vital statistics and household figures (Statistics Bureau / MHLW).
export const vitalStats = [
  { label: 'Births', value: '720,988', year: 2024, source: 'MHLW vital statistics (preliminary)', note: 'Lowest since records began in 1899' },
  { label: 'Deaths', value: '1,605,298', year: 2024, source: 'MHLW vital statistics (preliminary)', note: 'Natural decrease of about 884,000 people' },
  { label: 'Total fertility rate', value: '1.20', year: 2023, source: 'MHLW vital statistics', note: 'Children per woman; Tokyo is lowest at 0.99' },
  { label: 'Marriages', value: '499,999', year: 2023, source: 'MHLW vital statistics', note: 'First year below 500,000 since the 1930s' },
  { label: 'Households', value: '55.7 million', year: 2020, source: 'Population Census 2020', note: 'Average household size 2.21 people' },
  { label: 'Foreign residents', value: '3.77 million', year: 2024, source: 'Immigration Services Agency', note: 'About 3.0% of the population, a record high' },
  { label: 'Median age', value: '49.9 years', year: 2024, source: 'Statistics Bureau estimate', note: 'Second highest in the world after Monaco' },
  { label: 'Centenarians', value: '95,119', year: 2024, source: 'MHLW, September 2024', note: '88% of them are women' },
];

// Real GDP growth, percent change on the previous year (Cabinet Office,
// national accounts; 2024 is the preliminary annual figure).
export const gdpGrowth = {
  unit: '% change on previous year',
  source: 'Cabinet Office, System of National Accounts',
  points: [
    [2000, 2.8], [2001, 0.4], [2002, 0.1], [2003, 1.7], [2004, 2.4],
    [2005, 2.0], [2006, 1.5], [2007, 1.7], [2008, -1.2], [2009, -5.7],
    [2010, 4.1], [2011, -0.1], [2012, 1.4], [2013, 2.0], [2014, 0.3],
    [2015, 1.6], [2016, 0.8], [2017, 1.7], [2018, 0.6], [2019, -0.2],
    [2020, -4.2], [2021, 2.7], [2022, 0.9], [2023, 1.5], [2024, -0.1],
  ],
};

// Unemployment rate, annual average percent (Labour Force Survey).
export const unemploymentHistory = {
  unit: '% of the labour force',
  source: 'Statistics Bureau, Labour Force Survey',
  points: [
    [1990, 2.1], [1995, 3.2], [2000, 4.7], [2002, 5.4], [2005, 4.4],
    [2009, 5.1], [2010, 5.1], [2012, 4.3], [2015, 3.4], [2018, 2.4],
    [2019, 2.4], [2020, 2.8], [2021, 2.8], [2022, 2.6], [2023, 2.6], [2024, 2.5],
  ],
};

// Consumer price inflation, all items, annual average percent change.
export const inflationHistory = {
  unit: '% change on previous year',
  source: 'Statistics Bureau, Consumer Price Index',
  points: [
    [1990, 3.1], [1995, -0.1], [2000, -0.7], [2005, -0.3], [2008, 1.4],
    [2009, -1.4], [2010, -0.7], [2014, 2.8], [2015, 0.8], [2019, 0.5],
    [2020, 0.0], [2021, -0.2], [2022, 2.5], [2023, 3.2], [2024, 2.7],
  ],
};

// Life expectancy at birth, years (abridged life tables, MHLW).
export const lifeExpectancyHistory = {
  unit: 'years',
  source: 'Ministry of Health, Labour and Welfare, life tables',
  points: [
    [1960, 68.0], [1970, 72.0], [1980, 76.1], [1990, 79.0], [2000, 81.0],
    [2010, 82.8], [2015, 83.7], [2019, 84.4], [2020, 84.6], [2021, 84.5],
    [2022, 84.0], [2023, 84.0],
  ],
};

// Structure of the economy and public finances (latest published figures).
export const economyFacts = [
  { label: 'GDP by sector — services', value: '69.9%', year: 2023, source: 'World Bank', note: 'Share of gross value added' },
  { label: 'GDP by sector — industry', value: '28.9%', year: 2023, source: 'World Bank', note: 'Including manufacturing at about 19%' },
  { label: 'GDP by sector — agriculture', value: '1.1%', year: 2023, source: 'World Bank', note: 'Yet rice self-sufficiency is near 100%' },
  { label: 'Exports of goods', value: 'US$785 billion', year: 2024, source: 'Ministry of Finance, trade statistics', note: 'Cars and parts are the largest category' },
  { label: 'Imports of goods', value: 'US$838 billion', year: 2024, source: 'Ministry of Finance, trade statistics', note: 'Energy is roughly a quarter of imports' },
  { label: 'Largest export market', value: 'United States', year: 2024, source: 'Ministry of Finance', note: 'About 20% of exports; China is second' },
  { label: 'Government gross debt', value: '255% of GDP', year: 2024, source: 'IMF World Economic Outlook', note: 'Highest among advanced economies' },
  { label: 'Policy interest rate', value: '0.5%', year: 2025, source: 'Bank of Japan', note: 'Raised in January 2025, the highest since 2008' },
  { label: 'Employed people', value: '67.8 million', year: 2024, source: 'Labour Force Survey', note: 'Women are 45% of all workers' },
  { label: 'Average monthly wage', value: '¥330,400', year: 2024, source: 'MHLW, Monthly Labour Survey', note: 'Scheduled plus overtime cash earnings' },
];

// All 47 prefectures: 2020 census population (thousands), land area (km²)
// and the prefectural capital. Density is computed by the regions view.
// Source: Population Census 2020 final counts, Statistics Bureau of Japan;
// areas from the Geospatial Information Authority of Japan.
export const prefectures = [
  { name: 'Hokkaido', capital: 'Sapporo', pop: 5224, area: 83424 },
  { name: 'Aomori', capital: 'Aomori', pop: 1238, area: 9646 },
  { name: 'Iwate', capital: 'Morioka', pop: 1211, area: 15275 },
  { name: 'Miyagi', capital: 'Sendai', pop: 2302, area: 7282 },
  { name: 'Akita', capital: 'Akita', pop: 960, area: 11638 },
  { name: 'Yamagata', capital: 'Yamagata', pop: 1068, area: 9323 },
  { name: 'Fukushima', capital: 'Fukushima', pop: 1834, area: 13784 },
  { name: 'Ibaraki', capital: 'Mito', pop: 2867, area: 6097 },
  { name: 'Tochigi', capital: 'Utsunomiya', pop: 1933, area: 6408 },
  { name: 'Gunma', capital: 'Maebashi', pop: 1939, area: 6362 },
  { name: 'Saitama', capital: 'Saitama', pop: 7345, area: 3798 },
  { name: 'Chiba', capital: 'Chiba', pop: 6284, area: 5158 },
  { name: 'Tokyo', capital: 'Tokyo (Shinjuku)', pop: 14065, area: 2194 },
  { name: 'Kanagawa', capital: 'Yokohama', pop: 9237, area: 2416 },
  { name: 'Niigata', capital: 'Niigata', pop: 2201, area: 12584 },
  { name: 'Toyama', capital: 'Toyama', pop: 1035, area: 4248 },
  { name: 'Ishikawa', capital: 'Kanazawa', pop: 1133, area: 4186 },
  { name: 'Fukui', capital: 'Fukui', pop: 767, area: 4191 },
  { name: 'Yamanashi', capital: 'Kofu', pop: 810, area: 4465 },
  { name: 'Nagano', capital: 'Nagano', pop: 2049, area: 13562 },
  { name: 'Gifu', capital: 'Gifu', pop: 1979, area: 10621 },
  { name: 'Shizuoka', capital: 'Shizuoka', pop: 3633, area: 7777 },
  { name: 'Aichi', capital: 'Nagoya', pop: 7542, area: 5173 },
  { name: 'Mie', capital: 'Tsu', pop: 1770, area: 5774 },
  { name: 'Shiga', capital: 'Otsu', pop: 1414, area: 4017 },
  { name: 'Kyoto', capital: 'Kyoto', pop: 2578, area: 4612 },
  { name: 'Osaka', capital: 'Osaka', pop: 8838, area: 1905 },
  { name: 'Hyogo', capital: 'Kobe', pop: 5465, area: 8401 },
  { name: 'Nara', capital: 'Nara', pop: 1325, area: 3691 },
  { name: 'Wakayama', capital: 'Wakayama', pop: 923, area: 4725 },
  { name: 'Tottori', capital: 'Tottori', pop: 553, area: 3507 },
  { name: 'Shimane', capital: 'Matsue', pop: 671, area: 6708 },
  { name: 'Okayama', capital: 'Okayama', pop: 1888, area: 7115 },
  { name: 'Hiroshima', capital: 'Hiroshima', pop: 2800, area: 8479 },
  { name: 'Yamaguchi', capital: 'Yamaguchi', pop: 1342, area: 6113 },
  { name: 'Tokushima', capital: 'Tokushima', pop: 720, area: 4147 },
  { name: 'Kagawa', capital: 'Takamatsu', pop: 950, area: 1877 },
  { name: 'Ehime', capital: 'Matsuyama', pop: 1335, area: 5676 },
  { name: 'Kochi', capital: 'Kochi', pop: 692, area: 7104 },
  { name: 'Fukuoka', capital: 'Fukuoka', pop: 5135, area: 4987 },
  { name: 'Saga', capital: 'Saga', pop: 811, area: 2440 },
  { name: 'Nagasaki', capital: 'Nagasaki', pop: 1312, area: 4131 },
  { name: 'Kumamoto', capital: 'Kumamoto', pop: 1739, area: 7409 },
  { name: 'Oita', capital: 'Oita', pop: 1124, area: 6341 },
  { name: 'Miyazaki', capital: 'Miyazaki', pop: 1070, area: 7735 },
  { name: 'Kagoshima', capital: 'Kagoshima', pop: 1588, area: 9187 },
  { name: 'Okinawa', capital: 'Naha', pop: 1467, area: 2281 },
];

// Society, education, health and environment indicators.
export const societyFacts = [
  { label: 'University enrolment', value: '59.8%', year: 2024, source: 'MEXT School Basic Survey', note: 'Share advancing to university, a record high' },
  { label: 'Literacy', value: '99%', year: 2023, source: 'UNESCO / CIA World Factbook', note: 'Adult literacy, effectively universal' },
  { label: 'Hospital beds', value: '12.6 per 1,000', year: 2022, source: 'OECD Health Statistics', note: 'Most hospital beds per person in the OECD' },
  { label: 'Doctors', value: '2.6 per 1,000', year: 2022, source: 'OECD Health Statistics', note: 'Below the OECD average of about 3.7' },
  { label: 'Health spending', value: '11.4% of GDP', year: 2022, source: 'OECD Health Statistics', note: 'Universal coverage since 1961' },
  { label: 'Forest cover', value: '67% of land', year: 2023, source: 'Forestry Agency of Japan', note: 'Two-thirds of the country is forested' },
  { label: 'CO₂ emissions', value: '1.03 billion tonnes', year: 2023, source: 'Ministry of the Environment', note: 'Down about 23% from the 2013 peak' },
  { label: 'Renewable electricity', value: '22.9%', year: 2023, source: 'Agency for Natural Resources and Energy', note: 'Solar alone supplies about 11%' },
  { label: 'Internet use', value: '84.9%', year: 2023, source: 'MIC Communications Usage Survey', note: 'Smartphone ownership above 90% of households' },
  { label: 'Rail passengers', value: '24.5 billion / year', year: 2023, source: 'Ministry of Land, Infrastructure, Transport and Tourism', note: 'Shinjuku is the world\u2019s busiest station' },
  { label: 'Crime rate', value: '0.2 homicides / 100k', year: 2022, source: 'National Police Agency / UNODC', note: 'Among the lowest recorded anywhere' },
  { label: 'Life satisfaction rank', value: '51st of 143', year: 2024, source: 'World Happiness Report 2024', note: 'Score 6.06 out of 10' },
];

// Named, citable sources for the Sources view.
export const sources = [
  { name: 'Statistics Bureau of Japan (MIC)', what: 'Population Census 2020, monthly population estimates, Labour Force Survey, Consumer Price Index, Family Income and Expenditure Survey.' },
  { name: 'Cabinet Office, Government of Japan', what: 'System of National Accounts: GDP and its growth, quarterly and annual.' },
  { name: 'Ministry of Health, Labour and Welfare', what: 'Vital statistics (births, deaths, marriages, fertility), abridged life tables, Monthly Labour Survey wages.' },
  { name: 'Ministry of Finance / Bank of Japan', what: 'Trade statistics of Japan; monetary policy and the policy interest rate.' },
  { name: 'World Bank, World Development Indicators', what: 'Nominal GDP and GDP per capita in current US dollars, sector shares of value added.' },
  { name: 'IMF World Economic Outlook', what: 'General government gross debt as a share of GDP.' },
  { name: 'OECD Health Statistics', what: 'Hospital beds, doctors and health spending comparisons.' },
  { name: 'Immigration Services Agency of Japan', what: 'Number of mid- to long-term and special permanent foreign residents.' },
];
