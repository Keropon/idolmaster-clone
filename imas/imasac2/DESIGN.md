# DESIGN — imasac2 (faithful reconstruction)

Faithful remake of **bandainamco-am.co.jp/am/vg/idolmaster-tours** (arcade special).

## Source
`imas-archive/bandainamco-am.co.jp/am/vg/idolmaster-tours/` — `css/pc.css` (minified),
swiper / AOS, webp imagery (240 image files).

## Assets (real, in `assets/`)
`images/` — `common/logo.png`, `top/kv/kv.webp` (hero key visual), series logos
(`cardlist/idol-master|cinderella|million|shiny|gakuen.png`), nav/loading chrome.

## Palette / layout (from real pc.css)
| Item | Value |
|---|---|
| primary | blue `#3860be` / `#6a91e1` |
| accent | cyan `#00cfff` |
| grey / lines | `#d8d8d8` |
| nav | fixed left, 21.25% width, `rgba(255,255,255,.85)` |
| loading | `#lovl` overlay `#d9f7ff` |
| fonts | Noto Sans JP / Meiryo stack |

## Layout (matches original)
fixed left nav (logo + menu) → hero key visual (`kv.webp`) → NEWS list → SERIES brand
card grid → SHOPS CTA → promo banner.

## Original animations, modernised
- **loading overlay** — real `#lovl` → fade-out on `load`.
- **AOS reveal** — original AOS library → `.aos` + IntersectionObserver, reduced-motion aware.

## Notes
Generic alt text; short factual labels only. Inner links stubbed. Fan archive; assets are
the site's own.
