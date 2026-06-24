# Verification — real scraped pages vs. component system


## imasac (archive)

**Real pages screenshotted:** index + 10 adjacent
screenshots saved: 11

| real signal | → component | in real pages | in our styles.css |
|---|---|---|---|
| `titlelogo|button_top` | `ds-titlebar` | ✅ | ✅ |
| `menu-\w+\.gif` | `ds-sidemenu / data-ro` | ✅ | ✅ |
| `infosub` | `ds-newsitem` | ✅ | ✅ |
| `<table` | `ds-table` | ✅ | ✅ |
| `corner` | `ds-frame` | ✅ | ✅ |

## imas (renew)

**Real pages screenshotted:** index + 10 adjacent
screenshots saved: 11

| real signal | → component | in real pages | in our styles.css |
|---|---|---|---|
| `hdm_0` | `ds-navbtn` | ✅ | ✅ |
| `bt_chara|bt_download` | `ds-sidebtn` | ✅ | ✅ |
| `card_date` | `ds-blog-title` | ✅ | ✅ |
| `card_comment` | `ds-blog-content` | ✅ | ✅ |
| `soon` | `ds-promo` | — | ✅ |
| `info_table` | `ds-info` | ✅ | ✅ |
| `new_bt_more` | `ds-morebtn` | ✅ | ✅ |

## imas2 (columbia)

**Real pages screenshotted:** index + 10 adjacent
screenshots saved: 11

| real signal | → component | in real pages | in our styles.css |
|---|---|---|---|
| `newsTicker` | `ds-ticker` | ✅ | ✅ |
| `carousel` | `ds-carousel` | ✅ | ✅ |
| `discoInfo` | `ds-disco-info` | ✅ | ✅ |
| `lnkInfo` | `ds-link-panel` | ✅ | ✅ |
| `<h2` | `ds-h2` | ✅ | ✅ |

## animas (anime)

**Real pages screenshotted:** index + 10 adjacent
screenshots saved: 11

| real signal | → component | in real pages | in our styles.css |
|---|---|---|---|
| `h4_star|h4_bddvd|h4_cd` | `ds-h4` | ✅ | ✅ |
| `h3\.png|class="png"` | `ds-h3` | ✅ | ✅ |
| `btnBuy|btnTokuten` | `ds-btn` | ✅ | ✅ |
| `subpageMenu` | `ds-menu` | ✅ | ✅ |
| `bg_shop` | `ds-shop-h` | — | ✅ |

## imasac2 (tours)

**Real pages screenshotted:** index + 4 adjacent
screenshots saved: 5

| real signal | → component | in real pages | in our styles.css |
|---|---|---|---|
| `nav-pc` | `ds-nav` | ✅ | ✅ |
| `kv` | `ds-hero` | ✅ | ✅ |
| `aos` | `aos` | ✅ | ✅ |
| `cardlist` | `ds-brands` | ✅ | ✅ |

## imasnew (official)

**Real pages screenshotted:** index + 5 adjacent
screenshots saved: 6

| real signal | → component | in real pages | in our styles.css |
|---|---|---|---|
| `logo-20th|20th` | `ds-header` | ✅ | ✅ |
| `bnr` | `ds-bnrgrid / ds-bnr` | ✅ | ✅ |
| `news` | `ds-news` | ✅ | ✅ |
