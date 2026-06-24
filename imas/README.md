# iM@S Faithful Reconstructions + Design Systems

Six IDOLM@STER-related sites, scraped and **faithfully** rebuilt — real layout, real image
assets, real colours and fonts, original animations recreated in modern HTML/CSS/JS. For each
site the **internal components** are extracted and organised as a **Design System** (semantic
names: blog title, blog content, promotional title, news list, …) for **Claude Design** to
compose new pages, and reviewed via **Codex**.

Open `index.html` for the gallery hub (links each site + its Design System).

## Sites
| Folder | Reconstructs | Notes |
|---|---|---|
| `imasnew/` | idolmaster-official.jp (20th portal) | real 20th logo + portal banners |
| `imas/`    | idolmaster.jp (renew top) | gif buttons recreated as **HTML+CSS** (`:hover` rollovers) |
| `imasac/`  | idolmaster.jp/imas/archive (2005) | black/yellow/green, gif sidebar rollovers |
| `imas2/`   | columbia.jp/idolmaster/2010 | news ticker + CD jacket carousel (real jackets) |
| `imasac2/` | bandainamco-am.co.jp (TOURS) | fixed left nav + KV, AOS-style reveal |
| `animas/`  | idolmaster-anime.jp (products) | product rows (real jackets + buy buttons) |

## Per-site structure
```
<site>/
  index.html          ← faithful homepage (composes the components)
  design-system.html  ← component catalog: each internal component, named
  styles.css          ← faithful global + layout + DESIGN-SYSTEM components
  faithful.js         ← original behaviours, modernised (rollover/rotator/reveal)
  assets/             ← the site's real images (+ JS-referenced ones re-fetched from live)
  DESIGN.md           ← palette/fonts/metrics (extracted) + sources
  SKILLS.md           ← Design-System catalog: semantic name = real class/source
```

## Design-System convention
Every component is named **`semantic = real source`** so the original visual language is
preserved while staying readable:
- `.ds-blog-title` = `.card_date`, `.ds-blog-content` = `.card_comment`,
  `.ds-promo` = `.soon`, `.ds-news .row`, `.ds-product`, `.ds-disc`, `.ds-ticker`,
  `.ds-navbtn` / `.ds-sidebtn` (CSS button recreations), etc.
- Palettes, metrics and fonts are taken verbatim from each site's real CSS — see each
  `DESIGN.md` for the extracted hex tables.

## Faithfulness notes
- Colours/fonts/layout come from the **real** scraped CSS; imagery is each site's **own**
  assets (JS-referenced rollovers/banners re-fetched from the live servers).
- Original animations recreated: gif rollovers → `:hover` / JS `src` swap; `randomAdv()` →
  banner rotator; `carousel.js` → slider; AOS → IntersectionObserver. All reduced-motion aware.
- Inner links are stubbed (`#`); text is short factual labels / placeholders (no copyrighted
  long-form text reproduced). Fan-made, non-commercial. Trademarks belong to their owners.

## Dependencies
Per-site: none, or Google Fonts / GSAP via CDN where noted. No build step — open any
`index.html` or `design-system.html` in a browser.
