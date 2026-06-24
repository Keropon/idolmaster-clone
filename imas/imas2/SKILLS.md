# SKILLS — imas2 Design System

Faithful component inventory from **columbia.jp/idolmaster/2010** (real base.css /
carousel.css). Semantic names map to real sources so **Claude Design** can build
columbia-style music pages. Live catalog: `design-system.html`.

## Component catalog (semantic = real source)
| Semantic | Real source | Use |
|---|---|---|
| Heading lv1 / lv2 | `.ds-h1` / `.ds-h2` = `h1` / `h2` | cyan / pink headings |
| Link | `a` | `#0097ff`, hover `#ff00a2` |
| **News ticker** | `.ds-ticker` = `.newsTickerBg` | scrolling headline bar |
| **CD carousel** | `.ds-carousel` = `#carousel` | sliding jacket strip |
| **CD jacket card** | `.ds-disc` = `ul.column li` | jacket + code/caption |
| Discography info panel | `.ds-disco-info` = `.discoInfo` | release panel |
| Link panel | `.ds-link-panel` = `.lnkInfo` | bulleted link row |
| Promotional banner | `.ds-promo` | magenta strip |
| Button | `.ds-btn` | `btn_prev/next.png` |
| **Detail header** | `.ds-detail-head` = `#discoTitle` | product title h1/h2/h3 (from COCX-* pages) |
| **Track listing** | `.ds-tracklist` = `#discIndex` | numbered track list |
| **Audio-format button** | `.ds-fmt` / `.ds-fmt--ra` | WMA/RealAudio icons remade in CSS |

## Behaviours (faithful.js)
- Carousel — translateX slider, prev/next + auto (original `carousel.js`).
- News ticker — continuous rAF scroll, reduced-motion aware.

## How Claude Design uses this
Link `styles.css`; compose music/discography pages from `.ds-h2` + `.ds-carousel` /
`.ds-disc` + `.ds-disco-info`. Real jackets + chrome in `assets/`.

## Dependencies
None (pure HTML/CSS/JS). No build step.
