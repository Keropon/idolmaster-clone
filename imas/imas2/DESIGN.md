# DESIGN — imas2 (faithful reconstruction)

Faithful remake of **columbia.jp/idolmaster/2010** (Nippon Columbia music special).

## Source
`imas-archive/columbia.jp/idolmaster/2010/` — `css/base.css`, `css/carousel.css`,
`js/carousel.js`, real CD jacket images in `img/`. Template chrome re-fetched from live.

## Assets (real, in `assets/`)
`img/` (34 real CD jacket images), `template/` (bg.jpg, btn_prev/next.png, newsTicker.png,
disco/link panel pngs), `css/`.

## Palette / metrics (from real base.css / carousel.css)
| Item | Value |
|---|---|
| body | `#fff` + `template/bg.jpg` repeat-y, Hiragino stack |
| link | `#0097ff`, hover `#ff00a2` |
| h2 | `#ff65c7`, 160% |
| container | 990px |
| ticker | 982×79 (`newsTicker.png`) |
| carousel | 982×330, jackets 150px, border `#b1b1b1` |

## Layout (matches original)
news ticker → DISCOGRAPHY h2 → CD jacket carousel (prev/next) → discography info +
link panels → promo banner.

## Original animations, modernised
- **carousel** — original `carousel.js` → `faithful.js` translateX slider, prev/next + auto.
- **news ticker** — continuous horizontal scroll (rAF), reduced-motion aware.

## Notes
Real jacket art is shown for archival fidelity; alt text is generic; no lyrics/long text
reproduced. Inner links stubbed. Fan archive.
