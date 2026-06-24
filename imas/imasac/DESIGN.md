# DESIGN — imasac (faithful reconstruction)

Faithful remake of **idolmaster.jp/imas/archive** (2005 arcade-era site) — real layout,
real assets, real colours, original gif rollovers.

## Source
`imas-archive/www.idolmaster.jp/imas/archive/` — `style01.css`, `style02.css`, `body.htm`
and 218 internal pages (idol profiles, intro story, Q&A, notices).

## Assets (real, in `assets/`)
`img/` (title logo, sidebar `menu-*` gifs + `menu-*2` rollovers re-fetched from live,
`button_*`, corners, `tablegrade.gif`), `images/`, plus original `style01/02.css`.

## Palette / metrics (verbatim from style01/02.css)
| Item | Value |
|---|---|
| body bg | `#000000` (style02 inner: `#404040`) |
| text | `#ffffff`, 14px / 140% |
| link | `#ffff66` bold, hover `#ffffff` |
| scrollbar / rules | green `#00ff00` / `#009900` |
| news item `.infosub` | bg `#333333`, hover `#555555` |
| container | 780px |

## Fonts
MS PGothic / Hiragino stack (original used OS gothic).

## Layout (matches original)
title logo bar (`titlelogo.jpg` + 初めに/サイトマップ/TOP buttons) → 150px left sidebar
gif menu (とは？/アイドル/Q&A/お知らせ/家庭用/ケータイ/スタッフ, rollover) → main content
(title + 更新情報 `.infosub` items + promo strip).

## Original animation, modernised
gif rollover — original `onmouseover this.src='menu-x2.gif'` → `faithful.js` swaps
`menu-x.gif`↔`menu-x2.gif` on hover (preloaded).

## Notes
Internal text is short factual labels / placeholders — no copyrighted bios/story reproduced.
Inner links stubbed (`#`). Fan archive; assets are the site's own.
