# DESIGN — imas (faithful reconstruction)

Faithful remake of **idolmaster.jp/imas** renew top page — real layout, real assets,
real colours/fonts, original animations. Not a reimagining.

## Source
`imas-archive/www.idolmaster.jp/imas/index.html` + `common/base_renew.css`.
Original = legacy table layout, gif imagery, `randomAdv()` banner rotator, gif rollovers.

## Assets (real, in `assets/`)
Copied from the scrape + the JS-referenced ones re-fetched from live:
`common/images/` (header + 8-button nav gifs + `_o` rollovers),
`images/` (22 `img_main_l4udlc*.jpg` rotator banners),
`img_renew/top|common/` (news box, game menu, footer gifs + rollovers).

## Palette / metrics (from the real `base_renew.css`)
| Token | Value |
|---|---|
| body bg | `#b2dded` + `base_bg.gif` repeat-x |
| text | `#222`, 12px / 18px |
| main frame | `#5080ce`, border `#8aafc0` |
| news box | `#cbdbf0` / white inner, date `#113f9d`, link `#234ea5` |
| game panel | `#eaf7ff` |
| container | 754px, centred |

## Fonts
Original OS stack preserved: メイリオ / Meiryo / ヒラギノ角ゴ ProN / MS PGothic.

## Layout (matches original)
header (枠 + title + BNG logo) → 8-gif global nav → rotating main banner (736×252) →
更新情報 news box + ゲーム紹介 menu + キャラ/DL/グッズ/マーケット button column → footer
(注意 / サポート / © 窪岡俊之 2003 2007 NBGI / official logo).

## Original animations, modernised
- **gif rollover** — original `onmouseover this.src='..._o.gif'` → `faithful.js` swaps
  `foo.gif`↔`foo_o.gif` on `pointerenter/leave` (preloaded).
- **banner rotator** — original `randomAdv()` → sequential crossfade of the 22 real banners
  (CSS opacity, reduced-motion aware).

## Notes
Inner links are stubbed (`#`); this reproduces the front page faithfully, not the whole site.
Fan archive; all assets are the site's own.
