// report-broken.js — list broken local links in the scraped clone, grouped by target.
// A link is "broken" if it's a relative/local href|src whose resolved file doesn't exist.
// External (http/mailto/#/data/javascript) links are ignored. Writes broken-links.txt.
// Usage: node report-broken.js
import { readdir, stat, readFile, access, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, 'imas-archive');

async function walk(d) {
    const out = [];
    for (const name of await readdir(d)) {
        const p = path.join(d, name);
        if ((await stat(p)).isDirectory()) out.push(...await walk(p));
        else if (/\.html?$/i.test(name)) out.push(p);
    }
    return out;
}
const exists = (p) => access(p).then(() => true, () => false);
const label = (p) => path.relative(root, p).split(path.sep).join('/');

const byTarget = new Map();   // link-as-written -> Set(caller pages)
for (const page of await walk(root)) {
    const caller = label(page);
    for (const m of (await readFile(page, 'utf8')).matchAll(/(?:href|src)="([^"]+)"/g)) {
        const v = m[1];
        if (/^(https?:|mailto:|javascript:|tel:|#|data:)/i.test(v)) continue;
        const clean = v.split('#')[0].split('?')[0];
        if (!clean) continue;
        if (await exists(path.resolve(path.dirname(page), clean))) continue;
        if (!byTarget.has(v)) byTarget.set(v, new Set());
        byTarget.get(v).add(caller);
    }
}

const rows = [...byTarget.entries()].sort((a, b) => b[1].size - a[1].size);
const totalRefs = rows.reduce((s, [, c]) => s + c.size, 0);
const lines = [`${rows.length} unique broken targets, ${totalRefs} total broken refs\n`];
for (const [target, callers] of rows) {
    lines.push(`### ${target}  (${callers.size} callers)`);
    lines.push([...callers].sort().map((c) => '  ' + c).join('\n'));
}
const report = lines.join('\n') + '\n';
await writeFile(path.join(__dirname, 'broken-links.txt'), report);
console.log(report.split('\n').slice(0, 1).join('\n'));
console.log('wrote broken-links.txt');
