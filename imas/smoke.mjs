// smoke test: load every faithful page + design-system catalog headless,
// report broken images and real (non-CDN) failed requests.
import puppeteer from 'puppeteer';
import { pathToFileURL } from 'url';
import path from 'path';

const sites = ['imasnew', 'imas', 'imasac', 'imas2', 'imasac2', 'animas'];
const pages = [['hub', 'index.html']];
for (const s of sites) { pages.push([s, `${s}/index.html`], [`${s}/ds`, `${s}/design-system.html`]); }

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
let fail = 0;
for (const [name, rel] of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 800 });
    const bad = [];
    page.on('requestfailed', (r) => bad.push(r.url()));
    page.on('response', (r) => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
    await page.goto(pathToFileURL(path.resolve(rel)).href, { waitUntil: 'networkidle2', timeout: 30000 })
        .catch((e) => bad.push('GOTO ' + e.message));
    await new Promise((r) => setTimeout(r, 500));
    const broken = await page.$$eval('img', (is) => is.filter((i) => !i.complete || i.naturalWidth === 0).length);
    const realFail = bad.filter((u) => !/cdnjs|fonts\.g|gtm|googletag|cookielaw/.test(u));
    const ok = broken === 0 && realFail.length === 0;
    if (!ok) fail++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(12)} broken-img:${broken} ${realFail.length ? '| ' + realFail.slice(0, 4).join(' || ') : ''}`);
    await page.close();
}
await browser.close();
console.log(fail ? `\n${fail} page(s) failed` : '\nall pages ok');
process.exit(fail ? 1 : 0);
