function toggleNav() {
  const body = document.body;
  const hamburger = document.getElementById('js-gHeaderSpMenuBtn');

  //hamburger.addEventListener('click', function() {
  //  body.classList.toggle('is-spNavOpen');
  //});

  // BNXP 2026.03 - webアクセシビリティ対応 ==================================================
  const button = hamburger.querySelector(':scope > button');
  const g_navi = document.querySelector('.header_wrapper.header_nav');
  let menu_text = "ナビゲーションメニュー";

  if (!hamburger) return;
  if (!g_navi) return;

  let locked = false;
  const locked_timer = 500; //メニュー開閉をロックする時間

  hamburger.addEventListener('click', function() {
    if (locked) return;
    locked = true;

    body.classList.toggle('is-spNavOpen');
    
    if (body.classList.contains('is-spNavOpen')) {
      // menu open
      menu_text = "ナビゲーションメニューを閉じる";
      button.setAttribute('aria-expanded', 'true');
      button.querySelector(':scope > span').textContent = menu_text;
      button.querySelector(':scope > span').setAttribute('aria-label', menu_text);
      g_navi.querySelectorAll('.header_search, .header_nav_global, .header_nav_utility').forEach(el => {
        el.hidden = false;
      });
			
        /*
				// .set-focus-spの付いている要素のみtabindexループ
        const header = document.getElementById('common_page_header');
        if (!header) return;
				const roop_items = g_navi.querySelectorAll('.set-focus-sp');
				const roop_first = roop_items[0];
				const roop_last  = roop_items[roop_items.length - 1];

				roop_first.focus(); // ループ内の最初のフォーカスへ

        function onKeydownMenuTrap(e) {
          // Escapeでメニューを閉じる
          if (e.key === 'Escape' || e.key === 'Esc') {
            if (!locked) {
              locked = true;
              document.body.classList.remove('is-spNavOpen');
              g_navi.removeEventListener('keydown', onKeydownMenuTrap);

              if (g_navi) {
                button.setAttribute('aria-expanded', 'false');
                button.querySelector(':scope > span').textContent = menu_text;
                button.querySelector(':scope > span').setAttribute('aria-label', menu_text);
                g_navi.querySelectorAll('.header_search, .header_nav_global, .header_nav_utility').forEach(el => {
                  setTimeout(() => { el.hidden = true; }, locked_timer);
                });
                button.focus && button.focus();
              }
            }
            setTimeout(() => { locked = false; return; }, locked_timer);
          }

          // Tabキーでナビゲーションをループ
          if (e.key === 'Tab') {
            var active = document.activeElement;

            if (!e.shiftKey && active === roop_last) { // Shiftキーなし（次にフォーカス）
              e.preventDefault();
              roop_first.focus();
              return;
            }

            if (e.shiftKey && active === roop_first) { // Shiftキーあり（前にフォーカス）
              e.preventDefault();
              roop_last.focus();
              return;
            }
          }

        }
        g_navi.addEventListener('keydown', onKeydownMenuTrap);
        */

    } else {
      // menu close
      menu_text = "ナビゲーションメニューを開く";
      button.setAttribute('aria-expanded', 'false');
      button.querySelector(':scope > span').textContent = menu_text;
      button.querySelector(':scope > span').setAttribute('aria-label', menu_text);
      g_navi.querySelectorAll('.header_search, .header_nav_global, .header_nav_utility').forEach(el => {
        setTimeout(() => { el.hidden = true; }, locked_timer);
      });
    }

    setTimeout(() => { locked = false; }, locked_timer);
  });
  // ====================================================================================
}

toggleNav();