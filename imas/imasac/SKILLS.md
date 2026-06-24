# SKILLS — imasac Design System

Faithful component inventory from **idolmaster.jp/imas/archive** (real style01/02.css +
218 internal pages). Semantic names map to the site's real classes/structure so
**Claude Design** can build new archive-style pages. Live catalog: `design-system.html`.

## Component catalog (semantic = real source)
| Semantic | Real source | Use |
|---|---|---|
| Link | `a` | `#ffff66` bold, hover `#fff` |
| **Section / promotional title** | `.ds-title` | yellow heading, green left bar |
| **News / update item** | `.ds-newsitem` = `.infosub` | `#333` row, hover `#555` |
| **Promotional banner** | `.ds-promo` | green-framed centered strip |
| **Content / body copy** | `.ds-content` | 14px/170% text block |
| Frame box | `.ds-frame` | green-bordered box (corner-gif look) |
| Data / spec table | `.ds-table` | profile/spec table, green rules |
| Sidebar menu | `.ds-sidemenu` | left gif menu column |
| Rollover button | `img[data-ro]` | `menu-x.gif`↔`menu-x2.gif` swap |
| gif button | `.ds-btn` | `button_top` / `button_map` etc |
| **Corner-gif frame** | `.ds-cornerframe` = `corner1-4.gif` | rounded green box, remade in CSS |
| **Idol name-plate** | `.ds-nameplate` = `*_title01_l.gif` | name header remade in CSS |
| **Prev/next pager** | `.ds-pager` = `priv_h_b/next_h_b.gif` | pagination buttons in CSS |

## Homepage composition (index.html)
title logo bar → sidebar rollover menu → main (title + `.infosub` news + promo).

## Behaviour (faithful.js)
gif rollover with the archive's "2" convention (insert `2` before extension), preloaded;
optional `data-over="path"` to override.

## How Claude Design uses this
Link `styles.css`, compose with `.ds-title` / `.ds-newsitem` / `.ds-content` / `.ds-table`
inside the `title-bar + sidebar + main` shell. Real chrome assets in `assets/img/`.

## Dependencies
None (pure HTML/CSS/JS). No build step.
