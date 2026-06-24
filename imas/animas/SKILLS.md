# SKILLS — animas Design System

Faithful component inventory from **idolmaster-anime.jp** (real common.css /
products css). Semantic names map to real sources so **Claude Design** can build
anime-style product pages. Live catalog: `design-system.html`.

## Component catalog (semantic = real source)
| Semantic | Real source | Use |
|---|---|---|
| Heading lv3 | `.ds-h3` = `h3.png` | violet section heading |
| Heading lv4 | `.ds-h4` = `h4_star` | pink star-bullet subheading |
| Link + colour classes | `a`, `.red/.pink/.violet/.aqua` | real text colours |
| **Product row** | `.ds-product` | jacket + spec + price + buy buttons |
| Shop heading | `.ds-shop-h` = `h5.shop` | shop section bar |
| Subpage menu | `.ds-menu` | top link row |
| Information banner | `.ds-info-bnr` = `#information` | header promo banner |
| Promotional banner | `.ds-promo` | violet strip |
| Buy button | `.ds-btn` | `btnBuy` / `btnTokuten` png |
| **Page-title header** | `.ds-pagettl` = `titleNews.png` | serif word title remade in CSS |
| **News list** | `.ds-news-list` = `.newsTxt/.date/.new` | dated news rows + NEW flag |
| **Character summary** | `.ds-chara` = `.charaSummary` | portrait + name/CV/bio card |

## Homepage composition (index.html)
header (logo + info banner) → subpage menu → product rows (BD/DVD + CD) → shop → promo → footer.

## Behaviour (faithful.js)
Scroll reveal of product rows (IntersectionObserver), reduced-motion aware.

## How Claude Design uses this
Link `styles.css`; compose product pages from `.ds-h3` / `.ds-h4` / `.ds-product` inside
`#outContainer`. Real jackets/buttons in `assets/products/img/`.

## Dependencies
None (pure HTML/CSS/JS). No build step.
