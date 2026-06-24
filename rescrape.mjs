// Targeted re-scrape: explicit URL lists per site (recursive OFF -> bounded, no balloon).
// Each listed page + its own assets are downloaded; no link crawling. Saved bySiteStructure
// into ./imas-archive-more, then merge into imas-archive with: cp -r imas-archive-more/* imas-archive/
import scrape from 'website-scraper';
import path from 'path';
import { fileURLToPath } from 'url';
import { rm } from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, 'imas-archive-more');
await rm(OUT, { recursive: true, force: true });

const C = 'https://columbia.jp/idolmaster/2010/';
const AN = 'https://www.idolmaster-anime.jp/';
const IM = 'https://www.idolmaster.jp/imas/';
const TO = 'https://bandainamco-am.co.jp/am/vg/idolmaster-tours/';

const URLS = [
    ...['COCX-36741', 'COCX-36742', 'COCX-36739', 'COCX-36740', 'COCX-36663', 'XT-3101', 'COXC-1027', 'COXC-1028', 'COCC-16442', 'COCC-16443'].map((c) => C + c + '.html'),
    ...['products/pac01.html', 'news/index.html', 'intro/index.html', 'yokoku/index.html', 'staff/index.html', 'onair/index.html', 'character/index.html', 'special/index.html', 'movie/index.html', 'illust/index.html'].map((p) => AN + p),
    ...['character/index.html', 'event/index.html', 'download/index.html', 'arcade/index.html', 'items/index.html', 'marketplace/index.html', 'info/idx_links.html', 'column/index.html', 'info/idx_info.html', 'info/idx_sapport.html'].map((p) => IM + p),
    ...['news/20260608.html', 'news/20260605.html', 'news/20260603.html', 'news/20260525.html'].map((p) => TO + p),
];

const HOSTS = new Set(['columbia.jp', 'www.idolmaster-anime.jp', 'www.idolmaster.jp', 'bandainamco-am.co.jp']);

let done = 0;
await scrape({
    urls: URLS,
    directory: OUT,
    recursive: false,                         // no crawling — only these pages + their assets
    filenameGenerator: 'bySiteStructure',
    requestConcurrency: 4,
    urlFilter: (u) => { try { return HOSTS.has(new URL(u).host); } catch { return false; } },
    plugins: [{ apply(register) { register('afterResponse', async ({ response }) => {
        if (response?.request?.href?.endsWith('.html')) console.log('  page', ++done, response.request.href);
        return response.body;
    }); } }],
}).catch((e) => console.error('scrape error:', e.message));

console.log(`\nscraped into ${OUT}. Merge: cp -r imas-archive-more/* imas-archive/`);
