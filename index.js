// index.js
import scrape from 'website-scraper';
import PuppeteerPlugin from 'website-scraper-puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ARCHIVE = 'https://www.idolmaster.jp/imas/archive/';

// Extra standalone pages: captured WITH their assets, but their external sites are
// NOT crawled (no following <a> links) — only the archive recurses.
const EXTRA = [
    'https://columbia.jp/idolmaster/2010/index.html',
    'https://www.idolmaster-anime.jp/products/pac02.html',
    'https://www.idolmaster.jp/imas/index.html',
    'https://bandainamco-am.co.jp/am/vg/idolmaster-tours/',
    'https://idolmaster-official.jp/',
];
const EXTRA_HOSTS = new Set(EXTRA.map((u) => new URL(u).host));
// extra sites: download only these asset types, never follow page links (avoids crawling whole sites)
const ASSET = /\.(?:css|js|gif|jpe?g|png|webp|svg|ico|woff2?|ttf|otf|eot|mp4|webm|swf)(?:[?#]|$)/i;

scrape({
    urls: [ARCHIVE + 'body.htm', ...EXTRA],
    directory: path.resolve(__dirname, 'imas-archive'),
    recursive: true,
    maxRecursiveDepth: 5,
    // mirror the URL path layout so inner-page links resolve locally
    filenameGenerator: 'bySiteStructure',
    urlFilter: (url) => {
        if (url.startsWith(ARCHIVE)) return true;       // archive: full recursion
        if (EXTRA.includes(url)) return true;           // the extra entry pages themselves
        // for extra sites: allow their assets only (no page crawling)
        try { return EXTRA_HOSTS.has(new URL(url).host) && ASSET.test(url); }
        catch { return false; }
    },
    plugins: [
        new PuppeteerPlugin({
            launchOptions: { headless: true }, /* optional */
            scrollToBottom: { timeout: 10000, viewportN: 10 } /* optional */
        })
    ]
});
