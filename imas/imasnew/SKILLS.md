# SKILLS — imasnew Design System

Faithful component inventory from **idolmaster-official.jp** (20th portal). Semantic names
map to the real palette/assets so **Claude Design** can build official-portal pages.
Live catalog: `design-system.html`.

## Component catalog (semantic = real source)
| Semantic | Real source | Use |
|---|---|---|
| Sticky header | `.ds-header` | 20th logo + nav, pink underline |
| Hero key visual | `.ds-hero` | KV logo on pink/blue wash |
| **Section / promotional title** | `.ds-title` | Montserrat heading + kicker |
| **News list** | `.ds-news .row` | date + tag + headline |
| **Portal banner grid** | `.ds-bnrgrid` / `.ds-bnr` | real banner tiles, hover lift |
| Brand chips | `.ds-brand` | per-brand colour pills |
| Button | `.ds-btn` | pink→blue gradient pill |
| Promotional banner | `.ds-promo` | gradient strip |
| Scroll reveal | `.aos` | IntersectionObserver fade |
| **Heading lv2** | `.ds-h2` | sub-section heading |
| **Side-banner list** | `.ds-sidebnr` | vertical banner column (real banners) |

## Homepage composition (index.html)
sticky header → KV hero → promo → NEWS → PORTAL banner grid → BRANDS → CTA → footer.

## Behaviour (faithful.js)
`.aos` scroll reveal (IntersectionObserver), reduced-motion aware.

## How Claude Design uses this
Link `styles.css`; compose portal pages from `.ds-title` / `.ds-news` / `.ds-bnrgrid`.
Real logo/banners in `assets/20th/`.

## Dependencies
Google Fonts (Montserrat, Noto Sans JP). Otherwise pure HTML/CSS/JS, no build step.
