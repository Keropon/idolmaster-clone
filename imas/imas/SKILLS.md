# SKILLS — imas Design System

Faithful component inventory extracted from **idolmaster.jp/imas** (real `base_renew.css`
+ homepage markup). Semantic names map to the site's real classes so **Claude Design** can
compose new pages in the original visual language. Browse them live in `design-system.html`.

## Component catalog (semantic name = real class)
| Semantic | Real class | Use |
|---|---|---|
| Link | `a` | inline link — pink `#e86ea9`, hover red `#f00` |
| Menu link | `.ds-menu-link` = `.pt-menu` | bulleted nav link |
| External link | `.ds-menu-link--out` = `.pt-menu_out` | outbound link (out icon) |
| NEW flag | `.ds-new` = `.txt_new` | red "NEW" label |
| Blog/News card | `.ds-card` = `.card_table` | bordered card container |
| **Blog title** | `.ds-blog-title` = `.card_date` | dated headline (blue, underline) |
| **Blog content** | `.ds-blog-content` = `.card_comment` | body copy (grey, dotted rule) |
| **Promotional title/notice** | `.ds-promo` = `.soon` | pink "coming soon" strip |
| Info table | `.ds-info` = `.info_table` | data table (`#eaf7ff`) |
| Frame box | `.ds-frame` = `.waku` | generic bordered box |
| Type scale | `.fs-09 / 10 / 12 / 14` | font sizes from the real CSS |
| Rollover button | `img[data-ro]` | gif `_o` swap on hover (`faithful.js`) |
| **Page-title header** | `.ds-page-title` = `title_*.gif` | gif header remade in CSS (JP + EN + rule) |
| **Local section menu** | `.ds-localmenu` = `.menu-top/.menu-spc/.menu-txt` | left section nav |
| **Green theme variant** | `.theme-green` = `common/base.css` | same components, green palette |

## CSS button / header recreations (no images)
`.ds-navbtn` (8 nav tabs), `.ds-sidebtn` (side buttons JP+EN+arrow), `.ds-morebtn`,
`.ds-page-title` (section header) — all `:hover` rollovers, recreated from the gifs.

## Two palettes
- **blue renew** (`base_renew.css`) — default tokens.
- **green** (`base.css`) — wrap any block in `.theme-green`.

## Homepage composition (index.html)
header (frame + title gifs + BNG) → 8-gif rollover nav → main banner rotator →
更新情報 news box (`.new-date`/`.news-txt`) + ゲーム紹介 menu + side buttons → footer.

## Behaviours (faithful.js)
- `img[data-ro]` rollover — swaps `foo.gif`↔`foo_o.gif` (preloaded), the original
  `onmouseover this.src` technique.
- Banner rotator — sequential crossfade of the 22 real `img_main_l4udlc*.jpg` (the
  original `randomAdv()`), reduced-motion aware.

## How Claude Design uses this
1. Link `styles.css`.
2. Pick semantic classes (`.ds-blog-title`, `.ds-blog-content`, `.ds-promo`, …) to lay out
   a new internal page — output matches idolmaster.jp's real look.
3. Real assets live in `assets/` (header/nav/footer gifs, bullet icons, banners).

## Dependencies
GSAP 3.12.5 (CDN) for optional motion; otherwise pure HTML/CSS/JS. No build step.
