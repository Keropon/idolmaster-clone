# SKILLS — imasac2 Design System

Faithful component inventory from **idolmaster-tours** (real pc.css + structure).
Semantic names map to real sources so **Claude Design** can build tours-style arcade
pages. Live catalog: `design-system.html`.

## Component catalog (semantic = real source)
| Semantic | Real source | Use |
|---|---|---|
| Fixed side nav | `.ds-nav` = `nav#nav-pc` | left logo + menu column (21.25%) |
| Hero key visual | `.ds-hero` = `top/kv` | full-width KV image |
| **Section / promotional title** | `.ds-title` | blue heading + kicker |
| **News list** | `.ds-news .row` | date + tag + text rows |
| **Brand card grid** | `.ds-brands` / `.ds-brand` | series-logo cards |
| Button | `.ds-btn` | gradient pill |
| Promotional banner | `.ds-promo` | blue→cyan strip |
| Scroll reveal | `.aos` | IntersectionObserver fade (orig. AOS) |
| Loading overlay | `#lovl` | intro splash, fades on load |
| **News article** | `.ds-article` | date + title + body (news pages) |
| **Sparkle background** | `.ds-kira` = `bg_kira_*.png` | animated star bg remade in CSS |

## Behaviours (faithful.js)
- Loading overlay fade-out on `load` (real `#lovl`).
- `.aos` scroll reveal via IntersectionObserver, reduced-motion aware.

## How Claude Design uses this
Link `styles.css`; lay out inside `.ds-nav` + `.main`; compose with `.ds-title` /
`.ds-news` / `.ds-brands`. Real logos + KV in `assets/images/`.

## Dependencies
None (pure HTML/CSS/JS). No build step.
