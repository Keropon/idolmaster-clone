/**
 *
 *	FUNCTION JS
 *	/rn17/js/common/function.js
 *
 */

if(typeof util === 'undefined') var util = {};
(function () {
	"use strict;"

	$(function(){
		new Load();
	})

	// スライド切り替え時間設定（単位：秒）
	var MAIN_AUTO_PLAY_SPEED = 6; // メインイメージ
	var ITEM_AUTO_PLAY_SPEED = 6; // 商品情報リスト

	/**
	 * @class Load
	 * @sumally page load function
	 */
	var Load = (function(){
		/**
		 * @constructor
		 */
		function construct() {
			var _this = this;

			_this.checkBrowser();
			_this.setNaviShow();
			_this.setRelaseSlide();
			_this.setMovieShow();
			_this.setMainSlide();
			_this.setTopicsSlide();
			_this.setSpMenu();
			_this.setSpSearchMenu();
			_this.setPcSnavSearch();
			_this.setPcLnavFixed();
			_this.setToggleBtn();
			_this.setTabContents();
			_this.setSortLists();
			_this.setSpCol2box();
			_this.imgLazyLoad();
			_this.setItemModule();

			_this.setPcLnavFixed();
			$(window).scroll(function () {
				_this.setPcLnavFixed();
			});

			winWidth = $(window).width();
			$(window).resize(function(){
				winWidth = $(window).width();
			});

			// スムーススクロール
			$('.js-btn-pagetop').rjs_scrollbtn({speed: 600});		//ページトップ用

			// ヘッダ検索窓プレースホルダー IE9対応
			$('.is-ie9 .search-input').placeholder();

			// 高さ揃え - jquery.matchHeight
			$('.js-height-elm').matchHeight();

		};


		/**
		 * @sumally ブラウザ判別Class
		 */
		construct.prototype.checkBrowser = function () {

			var _this = this;

			var bp = 768;
			var bpFlg;
			var resizeTimer;

			// User Agent Class
			if(rjs.checkUA.iOS) {
				$('body').addClass('ua-ios');

				if(rjs.checkUA.iPhone) {
					$('body').addClass('ua-sp');
				} else if (rjs.checkUA.iPad) {
					$('body').addClass('ua-tablet');
				}
			} else if(rjs.checkUA.android) {
				$('body').addClass('ua-android');

				if(rjs.checkUA.androidTablet) {
					$('body').addClass('ua-tablet');
				} else {
					$('body').addClass('ua-sp');
				}
			} else {
				$('body').addClass('ua-pc');
			}

			// Browser Class
			if(rjs.checkUA.ie){
				$('body').addClass('is-ie');
			}
			if(rjs.checkUA.ie8){
				$('body').addClass('is-ie8');
			}
			else if(rjs.checkUA.ie9){
				$('body').addClass('is-ie9');
			}
			else if(rjs.checkUA.firefox){
				$('body').addClass('is-firefox');
			}

			if(rjs.checkUA.widthPC){
				bpFlg = 'pc';
			} else {
				bpFlg = 'sp';
			}

			// Device Width Class
			var _setCheckBrowser = function () {
				var w = window.innerWidth ? window.innerWidth: $(window).width();
				$('body').removeClass('w-pc').removeClass('w-sp');
				if (w < bp) {
					$('body').addClass('w-sp');
					if (bpFlg != 'sp') {
						// SP
					}
					bpFlg = 'sp';
				} else {
					$('body').addClass('w-pc');
					if (bpFlg != 'pc') {
						// PC
					}
					bpFlg = 'pc';
				}
			}

			// Device MusicPlayer Class
			// 対応環境
			// - iOS9以上
			// - android5.1以上
			// - IE11以上
			if ((rjs.checkUA.iOS && !rjs.checkUA.iOSver9) ||
				(rjs.checkUA.android && !rjs.checkUA.androidver5) ||
				(rjs.checkUA.ie) ) {
				$('body').addClass('incompati-player');
				$('.js-action-try, .js-play-music').addClass('incompatible').removeClass('ga-play-music');
			}

			_setCheckBrowser();
			$(window).resize(function() {

				if (resizeTimer !== false) {
					clearTimeout(resizeTimer);
				}
				resizeTimer = setTimeout(function() {
					_setCheckBrowser();
				}, 200);

			});

		};

		/**
		 * @sumally ローカルナビ固定
		 */
		construct.prototype.setPcLnavFixed = function (expandSpeed) {

			if (rjs.checkUA.widthPC) {

				var _this = this;

				var $headerarea = $('#header');
				var $ttlmain = $('.mod-ttl-main');
				var $mainvisual = $('.wrp-main-visual');
				var fixedclass = 'pos-fix';
				var $contents = $('.contents-area');
				var fixeH = $headerarea.height() + $ttlmain.outerHeight(true) + $mainvisual.height();

				var scrollVal = $(window).scrollTop();

				// ローカルナビ固定位置
				if (scrollVal > fixeH) {
					$contents.addClass(fixedclass);
				} else {
					$contents.removeClass(fixedclass);
				}

			}

		};

		/**
		 * @sumally ヘッダ検索窓 プレースホルダー
		 */
		construct.prototype.setPcSnavSearch = function (expandSpeed) {

			if (rjs.checkUA.widthPC) {
				$('.search-input').focus(function(){
					$('.txt-placeholder').hide();
				}).blur(function(){
					if ($('.search-input').val() === '') {
						$('.txt-placeholder').show();
					}
				});
			}

		};

		/**
		 * @sumally トグル機能
		 */
		construct.prototype.setToggleBtn = function (expandSpeed) {
			expandSpeed || (expandSpeed = 500);
			var exceptFlg = false;
			var $expand_btn = $('.js-toggle-btn');
			var $except_btn = $('.js-toggle-except');
			$expand_btn.on('click',
				function(e){
					if (!exceptFlg) {
						var $expandClass = $(this).closest('.js-toggle-group').attr('class');
						if($expandClass.indexOf('js-toggle-open') === -1){
							$(this).closest('.js-toggle-group').find('.js-toggle-area').slideDown(expandSpeed,
								function(){
									$(this).closest('.js-toggle-group').addClass('js-toggle-open').removeClass('js-toggle-close');
								}
							);
						}else{
							$(this).closest('.js-toggle-group').find('.js-toggle-area').slideUp(expandSpeed,
								function(){
									$(this).closest('.js-toggle-group').removeClass('js-toggle-open').addClass('js-toggle-close');
								}
							);
						}
						e.preventDefault();
					}
					exceptFlg = false;
				}
			);
			$except_btn.on('click', function() {
				exceptFlg = true;
			});

		};

		/**
		 * @sumally SPメニュー開閉
		 */
		construct.prototype.setSpMenu = function (expandSpeed) {

			expandSpeed || (expandSpeed = 500);
			var $spmenu = $('.js-spmenu');
			var $spmenu_btn = $('.js-spmenu a');
			var $spclosemenu_btn = $('.js-spmenu-close');

			// メニュー クリック
			$spmenu_btn.off('click');
			$spmenu_btn.on('click', function(e){
				var cls = $('.js-header-gnav').attr('class');
				if(cls.indexOf('gnav-open') === -1){
					$spmenu.addClass('btn-close');
					$('.js-header-gnav').addClass('gnav-open');

					var cls2 = $('.js-header-snav').attr('class');
					if(cls2.indexOf('snav-open') === -1){
					} else {
						$('.js-spsearch').removeClass('btn-close');
						$('.js-header-snav').removeClass('snav-open');
					}
				} else {
					$spmenu.removeClass('btn-close');
					$('.js-header-gnav').removeClass('gnav-opened').removeClass('gnav-open');
				}
				e.preventDefault();
			});
			var $headerGnav = document.getElementById('headerGnav');

			// 閉じる クリック
			$spclosemenu_btn.off('click');
			$spclosemenu_btn.on('click', function(e){
				$spmenu.removeClass('btn-close');
				$('.js-header-gnav').removeClass('gnav-opened').removeClass('gnav-open');
				$('body,html').animate({ scrollTop: 0 }, expandSpeed, 'easeOutCubic');
				e.preventDefault();
			});

		};

		/**
		 * @sumally SP検索エリア開閉
		 */
		construct.prototype.setSpSearchMenu = function (expandSpeed) {

			expandSpeed || (expandSpeed = 500);
			var $spmenu = $('.js-spsearch');
			var $spmenu_btn = $('.js-spsearch a');
			var $spclosemenu_btn = $('.js-spsearch-close');

			// メニュー クリック
			$spmenu_btn.off('click');
			$spmenu_btn.on('click', function(e){
				var cls = $('.js-header-snav').attr('class');
				if(cls.indexOf('snav-open') === -1){
					$spmenu.addClass('btn-close');
					$('.js-header-snav').addClass('snav-open');

					var cls2 = $('.js-header-gnav').attr('class');
					if(cls2.indexOf('gnav-open') === -1){
					} else {
						$('.js-spmenu').removeClass('btn-close');
						$('.js-header-gnav').removeClass('gnav-opened').removeClass('gnav-open');
					}
				} else {
					$spmenu.removeClass('btn-close');
					$('.js-header-snav').removeClass('snav-open');
				}
				e.preventDefault();
			});
			// 閉じる クリック
			$spclosemenu_btn.off('click');
			$spclosemenu_btn.on('click', function(e){
				$spmenu.removeClass('btn-close');
				$('.js-header-snav').removeClass('snav-open');
				$('body,html').animate({ scrollTop: 0 }, expandSpeed, 'easeOutCubic');
				e.preventDefault();
			});

		};


		/**
		 * @sumally グロナビ/ローカルナビ 子要素開閉
		 */
		construct.prototype.setNaviShow = function () {

			var $gnavmore = $('.js-gnav-more');
			var $gnavmorea = $('.js-gnav-more > a');
			var $lnavmore = $('.js-lnav-more');
			var $lnavmorea = $('.js-lnav-more > a');


			if (rjs.checkUA.widthPC) {
				$gnavmore.on({
					'mouseenter':function(e){
						var _this = $(this);
						var _tgt = _this.find('.gnav-list-lower');

						_tgt.addClass('lower-open');
					},
					'mouseleave':function(e){
						var _this = $(this);
						var _tgt = _this.find('.gnav-list-lower');

						_tgt.removeClass('lower-open');
					}
				});
			} else {
				$gnavmorea.on('click',
					function(e){
						var $expandClass = $(this).closest('.js-gnav-more').attr('class');
						if($expandClass.indexOf('lower-open') === -1){
							$(this).closest('.js-gnav-more').addClass('lower-open');
						}else{
							$(this).closest('.js-gnav-more').removeClass('lower-open');
						}
						e.preventDefault();
					}
				);
			}

			if (rjs.checkUA.widthPC) {
				$lnavmore.on({
					'mouseenter':function(e){
						var _this = $(this);
						var _tgt = _this;

						_tgt.addClass('lower-open');
					},
					'mouseleave':function(e){
						var _this = $(this);
						var _tgt = _this;

						_tgt.removeClass('lower-open');
					}
				});
			} else {
				$lnavmorea.on('click',
					function(e){
						var $expandClass = $(this).closest('.js-lnav-more').attr('class');
						if($expandClass.indexOf('lower-open') === -1){
							$(this).closest('.js-lnav-more').addClass('lower-open');
						}else{
							$(this).closest('.js-lnav-more').removeClass('lower-open');
						}
						e.preventDefault();
					}
				);

			}

		};


		/**
		 * @sumally タブ切り替え
		 */
		construct.prototype.setTabContents = function () {

			$tabGroup = $('.js-tab-group');

			if ($tabGroup.length > 0) {
				$tabGroup.each(function() {

					var _this = $(this);
					var _tab = $(this).find('.js-tab-cate-list');
					var _dispatcher = $({});
					var _tgtArea;

					var _setTabContents = function (value) {
						_tgtArea = value;
						_dispatcher.trigger('dataUpdate');
					}

					var _updateContents = function () {
						_this.find('.js-tab-contents').hide();
						_this.find(_tgtArea).show();
						_tab.find('a').removeClass('act');
						_tab.find('a[href = "' + _tgtArea + '"]').addClass('act');
					}

					// dataUpdateイベント登録
					_dispatcher.on('dataUpdate', _updateContents);

					// タブ押下
					_tab.find('li a').on('click', function(e) {
						var __this = $(this);
						_setTabContents(__this.attr('href'));
						e.preventDefault();
					});
					// 初期表示
					_setTabContents(_tab.find('li:first-child a').attr('href'));

				});
			}

		};

		/**
		 * @sumally リスト並び替え
		 */
		construct.prototype.setSortLists = function () {

			var $sortBtn = $('.js-sort-btn');

			if ($sortBtn.length > 0) {

				var $tgt = $('.news-list');
				var $tgtLen = $tgt.length;
				var $tgtTab = $('.js-tab-cate-list');
				var currentIndex = 0;
				var clickFlg = true;

				//現在表示されているニュースエリアの引数番号取得
				var getVisibleList = function(){
					for (var i=0; i < $tgtLen; i++) {
						if ( $tgt.eq(i).is(':visible') ){
							return i;
						}
					}
				};

				//ソート事前準備処理
				var visibleListPreSort = function(){
					currentIndex = getVisibleList();
					$tgt.eq(currentIndex).shuffle({
						speed: 500,
						easing: 'ease-in-out'
					});
				};

				//ソート関連処理
				var visibleListSort = function(){
					currentIndex = getVisibleList();
					var opts = {};
					var tgtClass = $tgt.eq(currentIndex).attr('class');//反転判定用にclass取得

					//反転させるかどうか判定
					if ( tgtClass.match(/js-reverse/) ) {
						$tgt.eq(currentIndex).removeClass('js-reverse');
					} else {
						$tgt.eq(currentIndex).addClass('js-reverse');
						opts = {
							reverse: true
						};
					}

					//ソート実行
					$tgt.eq(currentIndex).shuffle('sort',opts);

					//ソート時のアニメーション終了後にフラグを切り替えてclick可能に
					setTimeout(function(){
						clickFlg = true;
					},'500');
				}


				visibleListPreSort();
				if($tgtTab.length > 0){
					$tgtTab[0].addEventListener('click', function () {//タブ切り替えが行われた後
						visibleListPreSort();
					});
				}


				$sortBtn.on('click', function (e) {
					e.preventDefault();

					if ( clickFlg ) {
						clickFlg = false;//ソートが終わるまでclickさせないためのフラグ
						visibleListSort();
					}

				});
			}

		};

		/**
		 * @sumally YouTube動画 モーダル再生
		 */
		construct.prototype.setMovieShow = function () {

			$('.js-movie-show').magnificPopup({
				type: 'iframe',
				iframe: {
					markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
					'<div class="mfp-title"><a href="#" onClick="$.magnificPopup.close(); return false;"><img src="/rn17/img/common/btn/btn_close_bottom.png" alt="" width="140" height="40" /></a></div>'+
					'</div>'
				},
				gallery: {
					enabled: false
				},
				callbacks: {
					markupParse: function(template, values, item) {
						values.title = item.el.attr('title');
					}
				},
				disableOn: function() {
					if( $(window).width() < 768 ) {
						return false;
					}
					return true;
				}
			});

		};

		/**
		 * @sumally 商品リスト スライド
		 */
		construct.prototype.setRelaseSlide = function () {

			var $itemlist = $('.js-item-list');

			if (rjs.checkUA.widthPC) {

				var $slicklist = [];
				var limit_top = [];
				var stop_flg = [];
				var scroll_top;

				$itemlist.each(function(i) {
					var _this = $(this);

					$slicklist[i] = _this.slick({
						autoplay: true,
						autoplaySpeed: ITEM_AUTO_PLAY_SPEED * 1000,
						centerMode: false,
						infinite: true,
						slidesToShow: 4,
						slidesToScroll: 4,
						draggable: false,
						speed: 700,
						arrows: true,
						dots: true
					});

					stop_flg[i] = false;

				});

				// windowスクロール時、フレームアウトしたらスライド一時停止
				$(window).bind('scroll', function() {
					scroll_top = $(window).scrollTop();

					$.each($slicklist, function(i) {

						var _this = $(this);
						limit_top[i] = _this.offset().top + _this.outerHeight();

						if (scroll_top > limit_top[i] && !stop_flg[i]) {
							$slicklist[i].slick('slickPause');
							stop_flg[i] = true;
						} else if(scroll_top < limit_top[i] && stop_flg[i]) {
							$slicklist[i].slick('slickPlay');
							stop_flg[i] = false;
						}
					});

				});

			} else {

				$itemlist.each(function() {
					_this = $(this);
					_this.on('touchmove', function() {
						if ($(this).scrollLeft() > 50) {
							$(this).closest('.wrp-release-list').addClass('no-arrow');
						}
					});
				});

			}

		};

		/**
		 * @sumally トピックス スライド
		 */
		construct.prototype.setTopicsSlide = function () {

			if (rjs.checkUA.widthPC) {

				$('.js-topics-list').slick({
					autoplay: true,
					autoplaySpeed: 6000,
					centerMode: false,
					infinite: true,
					slidesToShow: 1,
					draggable: false,
					speed: 700,
					arrows: false,
					dots: true
				});

			}

		};

		/**
		 * @sumally メインイメージ スライド
		 */
		construct.prototype.setMainSlide = function () {

			var resizeTimer;

			// スライド対象のDOMを取得しておく
			var mainHtml = $('.wrp-main-area').html();
			var thumbHtml = $('.wrp-thumb-area').html();
			var $mainlist, $thumblist, $spmainlist, $thumbChildren;

			var _initMainSlide = function () {

				var bodyCls = $('body').attr('class');

				if (bodyCls.indexOf('w-pc') > 0) {

					var cntlist = $('.js-thumb-list .thumb-clm').length;
					var listw = 174;
					var Winw = window.innerWidth ? window.innerWidth: $(window).width();
					var slidediv = (Winw - 60) / listw;

					function floatFormat( number, n ) {
						var _pow = Math.pow( 10 , n ) ;
						return Math.round( number * _pow ) / _pow ;
					}

					var showslidediv = floatFormat(slidediv, 3);

					if(typeof $mainlist !== 'undefined') {
						$mainlist.slick('unslick');
						$thumblist.slick('unslick');
					}

					$mainlist = $('.js-main-list').slick({
						autoplay: true,
						autoplaySpeed: MAIN_AUTO_PLAY_SPEED * 1000,
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
						infinite: true,
						draggable: false,
						fade: true,
						asNavFor: '.js-thumb-list'
					});
					$thumblist = $('.js-thumb-list').slick({
						variableWidth: false,
						infinite: false,
						slidesToScroll: 1,
						slidesToShow: showslidediv,
						infinite: true,
						asNavFor: '.js-main-list',
						draggable: false,
						dots: false,
						centerMode: false,
						focusOnSelect: true
					});

					$('.js-thumb-list .thumb-clm a').on('click', function(e) {
						if($(this).attr('href') == '' || $(this).attr('href') == 'undefined') {
							e.preventDefault();
						}
					});

				} else {

					if(typeof $spmainlist !== 'undefined') {
						$spmainlist.slick('unslick');
					}

					$spmainlist = $('.js-main-list').slick({
						autoplay: true,
						autoplaySpeed: MAIN_AUTO_PLAY_SPEED * 1000,
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
						fade: true
					});

					$thumbChildren = $('.js-thumb-list').children();
					$thumbChildren.eq(0).addClass('thumb-active');
					$thumbChildren.on('click', function(e) {
						slideIndex = $(this).index();
						$spmainlist.slick('slickGoTo', parseInt(slideIndex));
						$thumbChildren.removeClass('thumb-active');
						$thumbChildren.eq(slideIndex).addClass('thumb-active');
						if($(this).find('a').length > 0 && ($(this).find('a').attr('href') == '' || $(this).find('a').attr('href') == 'undefined')) {
							e.preventDefault();
						}
					});

					$spmainlist.on('beforeChange', function(event, slick, currentSlide, nextSlide){
						$thumbChildren.removeClass('thumb-active');
						$thumbChildren.eq(nextSlide).addClass('thumb-active');
					});

				}
			}

			// メインスライド init
			_initMainSlide();
			$(window).resize(function() {

				if (resizeTimer !== false) {
					clearTimeout(resizeTimer);
				}
				resizeTimer = setTimeout(function() {
					$('.wrp-main-area').html(mainHtml);
					$('.wrp-thumb-area').html(thumbHtml);
					_initMainSlide();
				}, 200);

			});

		};

		/**
		 * @sumally SP画像サイズ調整（mod-item-box SP 2列組の場合）
		 */
		 construct.prototype.setSpCol2box = function () {

		 	var $tgt = $('.js-itembox-col2');
			var $elm = $('.js-itembox-col2 .mod-item-box');

		 	if ($elm.length !== 0 && $(window).width() <= 767) {

		 		var resizeTimer;

				var _setImgSize = function(){

					var imgSize = $elm.width();

					$elm.each(function(){
						$elm.find('.item-img > span').css('width', imgSize).css('height', imgSize);
					});

				}

				// 実行
				_setImgSize();

				// リサイズ再計算
				$(window).resize(function(){

					if ($(window).width() <= 767 && $(window).width() !== winWidth) {

						$elm.each(function(){
							$elm.find('.item-img > span').css('width', '').css('height', '');
						});

						if (resizeTimer !== false) {
							clearTimeout(resizeTimer);
						}

						resizeTimer = setTimeout(function() {
							_setImgSize();
						}, 200);
					}

				});
			}

		};

		/**
		 * @sumally 画像遅延ロード
		 */
		 construct.prototype.imgLazyLoad = function () {

			var $elm = $('img.js-lzload');

			if ($elm.length !== 0) {
				$elm.lazyload({
					effect: "fadeIn",
					effect_speed: 1000
				});
			}

		};

		/**
		 * @sumally 試聴モジュール
		 */
		construct.prototype.setItemModule = function () {

			var $doc = $(document);
			var _dispatcher = $({});
			var _tgtArea;
			var _tgtPage;
			var _tgtShow;
			var _streamId, _youtubeId;
			var _streamIndex, _youtubeIndex;

			/**
			 * @sumally 試聴
			 */

			// Music
			var _setMusicContents = function (value, index) {
				_streamId = value;
				_streamIndex = index;
				_dispatcher.trigger('musicPlay');
			}
			var _playMusic = function () {
				if (rjs.checkUA.widthPC) {
					var _str = '<div class="embed-container">'
							 + '<iframe src="https://a5965d544e624120feca684577aac283.cdnext.stream.ne.jp/player/player.html?id='
							 + _streamId
							 + '" height="50" width="100%" frameborder="0" scrolling="no" align="middle" allowtransparency="true" allowfullscreen="" style="max-width:100%;"></iframe>'
							 + '</div>';
				} else {
					var _str = '<div class="embed-container">'
							 + '<iframe src="https://a5965d544e624120feca684577aac283.cdnext.stream.ne.jp/player/player.html?id='
							 + _streamId
							 + '" height="50" width="100%" frameborder="0" scrolling="no" align="middle" allowtransparency="true" allowfullscreen="" style="max-width:100%;"></iframe>'
							 + '</div>';
				}

				if ($('.stream-list li.open').length > 0) {
					$('.stream-list li.open').removeClass('open open-music open-mv').find('.js-embed-area').hide().empty();
				}
				$('.js-embed-area').eq(_streamIndex).closest('li').addClass('open open-music');
				$('.js-embed-area').eq(_streamIndex).slideDown(600, 'easeOutCubic', function() {
					$(this).append(_str);
				});
			}

			// Movie
			var _setMovieContents = function (value, index) {
				_youtubeId = value;
				_youtubeIndex = index;
				_dispatcher.trigger('moviePlay');
			}
			var _playMovie = function () {
				if (rjs.checkUA.widthPC) {
					var _str = '<div class="embed-container">'
							 + '<iframe width="720" height="405" src="https://www.youtube.com/embed/'
							 + _youtubeId
							 + '?autoplay=0&rel=0" frameborder="0" allowfullscreen></iframe>'
							 + '</div>';
				} else {
					var _str = '<div class="embed-container">'
							 + '<iframe src="https://www.youtube.com/embed/'
							 + _youtubeId
							 + '?autoplay=0&rel=0" frameborder="0" allowfullscreen></iframe>'
							 + '</div>';
				}

				if ($('.stream-list li.open').length > 0) {
					$('.stream-list li.open').removeClass('open open-music open-mv').find('.js-embed-area').hide().empty();
				}
				$('.js-embed-area').eq(_youtubeIndex).closest('li').addClass('open open-mv');
				$('.js-embed-area').eq(_youtubeIndex).slideDown(600, 'easeOutCubic', function() {
					$(this).append(_str);
				});
			}

			// embedエリアをすべてクリア
			var _resetEmbed = function() {
				$('.stream-list li.open').removeClass('open open-music open-mv').find('.js-embed-area').hide().empty();
			}

			// イベントトリガー登録
			_dispatcher.on('musicPlay', _playMusic);
			_dispatcher.on('moviePlay', _playMovie);

			// ユーザーイベント
			$doc.on('click', '.js-play-music', function(e) {
				var _this = $(this);

				if ( _this.hasClass('inactive') > 0 || _this.hasClass('incompatible') > 0 ) {
					return false;
				}

				var _tgtlsit = _this.closest('li');
				var _tgtindex = $('#tryContents li').index(_tgtlsit);
				_setMusicContents(_this.data('id'), _tgtindex);
				e.preventDefault();
			});
			$doc.on('click', '.js-play-mv', function(e) {
				var _this = $(this);
				var _tgtlsit = _this.closest('li');
				var _tgtindex = $('#tryContents li').index(_tgtlsit);
				_setMovieContents(_this.data('id'), _tgtindex);
				e.preventDefault();
			});


			/**
			 * @sumally 試聴/購入切り替え
			 */
			var _setTabContents = function (value) {
				_tgtArea = value;
				_dispatcher.trigger('areaUpdate');
			}
			var _updateContents = function () {
				// 表示更新
				$('.js-item-group').removeClass('show-try').removeClass('show-buy');
				$('.js-item-group').addClass(_tgtArea);
				_resetEmbed();
			}

			// イベントトリガー登録
			_dispatcher.on('areaUpdate', _updateContents);

			// ユーザーイベント
			$doc.on('click', '.js-btn-buy, .js-btn-try', function(e) {
				var _this = $(this);
				_setTabContents(_this.attr('href').replace('#', ''));
				e.preventDefault();
			});


			/**
			 * @sumally 試聴モジュール（モーダル起動）
			 */
			var _setModuleContents = function (value, cat) {
				_tgtPage = value;
				_tgtShow = cat;
				_dispatcher.trigger('showModule');
			}

			var _showModuleContents = function (value) {
				$.ajax({
					type: 'GET',
					url: _tgtPage,
					dataType: 'html',
					success: function(data) {

						$('#itemModule').html($(data).find('#productModule')).append('<div class="mfp-title"><a href="#" onclick="$.magnificPopup.close(); return false;"><img src="/rn17/img/common/btn/btn_close_bottom.png" alt="" width="220" height="80"></a></div>');
						_setTabContents(_tgtShow);

						$.magnificPopup.open({
							items: {
								src: '#itemModule'
							},
							type: 'inline',
							closeBtnInside: true,
							callbacks: {
								open: function() {
									if ($('body').hasClass('incompati-player') > 0) {
										$('.mfp-content .js-play-music').addClass('incompatible').removeClass('ga-play-music');
									}
								},
								close: function() {
									$('#itemModule').empty();
								}
							}

						});

					}
				});
			}

			_dispatcher.on('showModule', _showModuleContents);

			$('.js-action-try, .js-action-buy').on('click', function(e) {
				var _this = $(this);
				if ( _this.hasClass('inactive') > 0 || _this.hasClass('incompatible') > 0 ) {
					return false;
				}
				var _href = _this.closest('.mod-item-box').find('a.item-img').attr('href');
				var _action = _this.attr('class').replace('js-action-', '');
				_setModuleContents(_href, 'show-' + _action);
				e.preventDefault();
			});

		};


		return construct;

	})();


})(util);
