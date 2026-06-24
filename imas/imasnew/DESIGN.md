# DESIGN — imasnew (faithful reconstruction)

Faithful remake of **idolmaster-official.jp** (THE IDOLM@STER 20th portal).

## Source
`imas-archive/idolmaster-official.jp/` — a Next.js portal (hashed `_next/static` CSS,
JS-rendered). Palette extracted from its CSS; layout rebuilt from the real assets + nav labels.

## Assets (real, in `assets/`)
`20th/logo-20th.png`, `20th/kv/logo-top-kv.png`, `20th/common/bnr/*` (portal / idol-list /
youtube / design banners) — the site's own banner imagery.

## Palette (extracted from real CSS)
| Token | Hex | Role |
|---|---|---|
| primary | `#ff74b9` | hot pink (most-used, 3621 hits) |
| secondary | `#3860be` | royal blue (1406 hits) |
| neutrals | `#d8d8d8 #e2e2e2` | UI lines |
| bg | `#fff` / `#222` footer | — |

## Type
Montserrat (latin display) + Noto Sans JP — matching the source's font usage.

## Layout (portal style)
sticky header (real 20th logo + nav) → KV hero → 20th promo strip → NEWS list →
PORTAL banner grid (real banners) → BRANDS chips → CTA → footer.

## Original animations, modernised
Scroll reveal (`.aos`, IntersectionObserver), hover lift on banners, gradient buttons.
Reduced-motion aware.

## Notes
The original is JS-rendered, so this is a faithful **portal-layout** reconstruction using the
real logo/banners + exact palette — not a DOM copy. Generic/short labels; no copyrighted
text reproduced. Fan archive.
