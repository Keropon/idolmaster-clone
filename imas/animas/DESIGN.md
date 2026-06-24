# DESIGN — animas (faithful reconstruction)

Faithful remake of **idolmaster-anime.jp** (TV anime — products page `pac02`).

## Source
`imas-archive/www.idolmaster-anime.jp/` — `css/common.css`, `products/css/css.css`,
real imagery (logo, jackets, buy buttons, h-headings).

## Assets (real, in `assets/`)
`img/` (logo_top, header_obi, menu_subpage, banners), `products/img/` (jk_pac02,
jk_pac02_sugatami, jk_gfy02 jackets; btnBuy / btnTokuten / btnShoptenkai; h4_star, bg_shop),
`css/`.

## Palette (from real CSS)
| Item | Value |
|---|---|
| body | `#666` text + `header_obi.jpg` top band, Hiragino |
| link | `#0099ff`, hover `#FF3366` |
| heading lv3 | violet `#6633CC` |
| heading lv4 / accents | pink `#FF3366` / `#FF6699` / `#ed5881` |
| price | `#D31D4F` |
| colour classes | `.red .pink .violet .aqua` (real) |
| container | 850px |

## Layout (matches original)
header (logo + information banner) → subpage menu → PRODUCTS h3 → Blu-ray/DVD + CD
product rows (jacket + spec + price + buy buttons) → 取扱店舗 shop heading → promo → footer.

## Original animation, modernised
Gentle scroll reveal of product rows (IntersectionObserver), reduced-motion aware.

## Notes
Real jacket/button art shown for archival fidelity; alt text generic; only short factual
labels. Inner links stubbed. Fan archive; assets are the site's own.
