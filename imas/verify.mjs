/* Verification: screenshot the REAL scraped pages (index + up to 10 adjacent) per site,
   and scan each for component signals, checking our design system (styles.css) maps them.
   Output: imas/verify/<site>/*.png  +  imas/verify/REPORT.md */
import puppeteer from 'puppeteer';
import { pathToFileURL } from 'url';
import { readFile, writeFile, mkdir, access } from 'fs/promises';
import path from 'path';

const ROOT = path.resolve('..');                 // repo root (imas-archive lives here)
const AR = path.join(ROOT, 'imas-archive');
const OUT = path.resolve('verify');

// real pages per site: [our-site, label, [absolute real-html paths...], our-styles.css]
const A = (p) => path.join(AR, p);
const sites = [
    ['imasac', 'archive', [
        A('www.idolmaster.jp/imas/archive/body.htm'),
        ...['01', '02', '03', '04', '06', '07', '08', '09', '10', '11'].map((n) => A(`www.idolmaster.jp/imas/archive/beyond/${n}.htm`)),
    ], 'imasac/styles.css'],
    ['imas', 'renew', [
        A('www.idolmaster.jp/imas/index.html'),
        ...['character/index.html', 'event/index.html', 'download/index.html', 'arcade/index.html', 'items/index.html', 'marketplace/index.html', 'info/idx_links.html', 'column/index.html', 'info/idx_info.html', 'info/idx_sapport.html'].map((p) => A('www.idolmaster.jp/imas/' + p)),
    ], 'imas/styles.css'],
    ['imas2', 'columbia', [
        A('columbia.jp/idolmaster/2010/index.html'),
        ...['COCX-36741', 'COCX-36742', 'COCX-36739', 'COCX-36740', 'COCX-36663', 'XT-3101', 'COXC-1027', 'COXC-1028', 'COCC-16442', 'COCC-16443'].map((c) => A('columbia.jp/idolmaster/2010/' + c + '.html')),
    ], 'imas2/styles.css'],
    ['animas', 'anime', [
        A('www.idolmaster-anime.jp/products/pac02.html'),
        ...['products/pac01.html', 'news/index.html', 'intro/index.html', 'yokoku/index.html', 'staff/index.html', 'onair/index.html', 'character/index.html', 'special/index.html', 'movie/index.html', 'illust/index.html'].map((p) => A('www.idolmaster-anime.jp/' + p)),
    ], 'animas/styles.css'],
    ['imasac2', 'tours', [
        A('bandainamco-am.co.jp/am/vg/idolmaster-tours/index.html'),
        ...['news/20260608.html', 'news/20260605.html', 'news/20260603.html', 'news/20260525.html'].map((p) => A('bandainamco-am.co.jp/am/vg/idolmaster-tours/' + p)),
    ], 'imasac2/styles.css'],
    ['imasnew', 'official', [
        A('idolmaster-official.jp/index.html'),
        ...['anime', 'book-comic', 'cinderellagirls', 'collab-campaign', 'enquete'].map((s) => A(`idolmaster-official.jp/${s}/index.html`)),
    ], 'imasnew/styles.css'],
];

// signal in real HTML  ->  our design-system class that should cover it
const SIGNALS = {
    imasac: [['titlelogo|button_top', 'ds-titlebar'], ['menu-\\w+\\.gif', 'ds-sidemenu / data-ro'], ['infosub', 'ds-newsitem'], ['<table', 'ds-table'], ['corner', 'ds-frame']],
    imas: [['hdm_0', 'ds-navbtn'], ['bt_chara|bt_download', 'ds-sidebtn'], ['card_date', 'ds-blog-title'], ['card_comment', 'ds-blog-content'], ['soon', 'ds-promo'], ['info_table', 'ds-info'], ['new_bt_more', 'ds-morebtn']],
    imas2: [['newsTicker', 'ds-ticker'], ['carousel', 'ds-carousel'], ['discoInfo', 'ds-disco-info'], ['lnkInfo', 'ds-link-panel'], ['<h2', 'ds-h2']],
    animas: [['h4_star|h4_bddvd|h4_cd', 'ds-h4'], ['h3\\.png|class="png"', 'ds-h3'], ['btnBuy|btnTokuten', 'ds-btn'], ['subpageMenu', 'ds-menu'], ['bg_shop', 'ds-shop-h']],
    imasac2: [['nav-pc', 'ds-nav'], ['kv', 'ds-hero'], ['aos', 'aos'], ['cardlist', 'ds-brands']],
    imasnew: [['logo-20th|20th', 'ds-header'], ['bnr', 'ds-bnrgrid / ds-bnr'], ['news', 'ds-news']],
};

await mkdir(OUT, { recursive: true });
const exists = (p) => access(p).then(() => 1, () => 0);
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const report = ['# Verification — real scraped pages vs. component system\n'];

for (const [site, label, pages, cssRel] of sites) {
    await mkdir(path.join(OUT, site), { recursive: true });
    const css = await readFile(path.resolve(cssRel), 'utf8');
    report.push(`\n## ${site} (${label})\n`);

    // --- screenshots of real pages ---
    let shot = 0, missing = 0;
    report.push(`**Real pages screenshotted:** index + ${pages.length - 1} adjacent`);
    for (let i = 0; i < pages.length; i++) {
        if (!await exists(pages[i])) { missing++; continue; }
        const p = await browser.newPage();
        await p.setViewport({ width: 1024, height: 900 });
        await p.goto(pathToFileURL(pages[i]).href, { waitUntil: 'networkidle2', timeout: 25000 }).catch(() => {});
        await new Promise((r) => setTimeout(r, 600));
        await p.screenshot({ path: path.join(OUT, site, `${String(i).padStart(2, '0')}-${path.basename(path.dirname(pages[i]))}-${path.basename(pages[i])}.png`) });
        await p.close(); shot++;
    }
    report.push(`screenshots saved: ${shot}${missing ? `, missing files: ${missing}` : ''}\n`);

    // --- coverage scan: do real component signals appear, and does our CSS map them? ---
    const realHtml = (await Promise.all(pages.map((f) => exists(f).then((e) => e ? readFile(f, 'utf8') : '')))).join('\n');
    report.push('| real signal | → component | in real pages | in our styles.css |');
    report.push('|---|---|---|---|');
    for (const [sig, comp] of SIGNALS[site]) {
        const inReal = new RegExp(sig, 'i').test(realHtml);
        const firstClass = comp.split(/[ /]/)[0];
        const inCss = css.includes('.' + firstClass) || css.includes(firstClass);
        report.push(`| \`${sig}\` | \`${comp}\` | ${inReal ? '✅' : '—'} | ${inCss ? '✅' : '❌'} |`);
    }
}

await browser.close();
await writeFile(path.join(OUT, 'REPORT.md'), report.join('\n') + '\n');
console.log(report.join('\n'));
console.log('\nwrote verify/REPORT.md + screenshots');
