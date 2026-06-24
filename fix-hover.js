// fix-hover.js — download JS-rollover images website-scraper missed, rewrite paths to local.
// website-scraper ignores image URLs hidden in onmouseover="this.src='...'" JS strings.
// Run after index.js. Walks every scraped page; layout is filenameGenerator:'bySiteStructure'
// (imas-archive/<host>/<path>), so each page's real URL is recoverable from its location.
// ponytail: one-shot post-processor, re-run after each scrape.
import { readFile, writeFile, mkdir, readdir, stat, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, 'imas-archive');

// recursively collect every html/htm file
async function walk(d) {
    const out = [];
    for (const name of await readdir(d)) {
        const p = path.join(d, name);
        if ((await stat(p)).isDirectory()) out.push(...await walk(p));
        else if (/\.html?$|\.htm$/i.test(name)) out.push(p);
    }
    return out;
}

const exists = (p) => access(p).then(() => true, () => false);
const toPosix = (p) => p.split(path.sep).join('/');
// path from a page file to a target file, as a relative href (./ prefixed)
const rel2 = (page, target) => {
    const r = toPosix(path.relative(path.dirname(page), target));
    return r.startsWith('.') ? r : './' + r;
};

let downloaded = 0, rewritten = 0;
const pages = await walk(root);

for (const page of pages) {
    // page file -> its original URL. e.g. imas-archive/www.idolmaster.jp/imas/archive/intro/index.html
    const rel = toPosix(path.relative(root, page));      // www.idolmaster.jp/imas/archive/intro/index.html
    const pageBase = 'https://' + rel;                   // base for resolving relative this.src values
    let html = await readFile(page, 'utf8');
    const urls = [...new Set([...html.matchAll(/this\.src='([^']+)'/g)].map(m => m[1]))];
    if (!urls.length) continue;

    for (const url of urls) {
        const abs = new URL(url, pageBase);
        // local file mirrors bySiteStructure layout: imas-archive/<host>/<pathname>
        const local = path.join(root, abs.host, abs.pathname.replace(/^\//, ''));
        if (!await exists(local)) {
            const res = await fetch(abs);
            if (!res.ok) { console.error('FAIL', res.status, abs.href); continue; }
            await mkdir(path.dirname(local), { recursive: true });
            await writeFile(local, Buffer.from(await res.arrayBuffer()));
            downloaded++;
        }
        // rewrite the src to a path relative from THIS page to the image file
        html = html.replaceAll(`'${url}'`, `'${rel2(page, local)}'`);
        rewritten++;
    }

    // Fix absolute in-tree links website-scraper left (e.g. pages past maxRecursiveDepth):
    // href/src="/imas/..." -> relative path, but only when the target exists locally.
    const host = rel.split('/')[0];
    const absRefs = [...new Set([...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map(m => m[1]))];
    for (const ref of absRefs) {
        const local = path.join(root, host, ref.replace(/^\//, ''));
        if (!await exists(local)) {
            // not downloaded by the scraper (often JS-driven assets) — fetch it now
            const res = await fetch('https://' + host + ref);
            if (!res.ok) { console.error('FAIL', res.status, ref); continue; } // dead/external -> leave absolute
            await mkdir(path.dirname(local), { recursive: true });
            await writeFile(local, Buffer.from(await res.arrayBuffer()));
            downloaded++;
        }
        html = html.replaceAll(`"${ref}"`, `"${rel2(page, local)}"`);
        rewritten++;
    }

    await writeFile(page, html);
}

console.log(`done: ${pages.length} pages, ${downloaded} images downloaded, ${rewritten} refs rewritten`);
