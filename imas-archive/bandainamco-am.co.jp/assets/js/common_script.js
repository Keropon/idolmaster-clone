$(function(){
	$("body").removeClass('js_scroll_off');
	var fixFlg = false;
	var menuOpenPos = 0;
//	$(".header_wrapper dt").click(function(){
	$(document).on("click", ".header_wrapper dt", function(){
		if ($(this).closest(".header_wrapper").hasClass('js_open')) {
			$(this).closest(".header_wrapper").removeClass('js_open');
//			$(window).off('.noScroll');
			$(window).scrollTop(menuOpenPos);
			$("body").removeClass('js_scroll_off');

			// BNXP 2026.03 - Webアクセシビリティ対応 ==============================
			$(this).find('button').attr('aria-expanded','false').text('検索エリアを開く');
			$(this).closest(".header_wrapper").find('dd form').prop('hidden', true);
			// ==============================================

			fixFlg = false;
		} else {
			$(this).closest(".header_wrapper").addClass('js_open').siblings('.js_open').removeClass('js_open');
			if (!fixFlg) {
				fixFlg = true;
//				$(window).on("scroll.noScroll touchmove.noScroll", function(e) { e.preventDefault(); });
				menuOpenPos = $(window).scrollTop();
			}
			$("body").addClass('js_scroll_off');

			// BNXP 2026.03 - Webアクセシビリティ対応 ==============================
			$(this).find('button').attr('aria-expanded','true').text('検索エリアを閉じる');
			$(this).closest(".header_wrapper").find('dd form').removeAttr('hidden');
			// ==============================================
		}
	});


	var matchList = new Array('game_center', 'tp', 'chara_shop', 'cafe_and_bar', 'kids', 'others');
	var dirChk = location.pathname.split('/');
	var dirSet = ($.inArray(dirChk[1], matchList) != -1) ? 'spot' : dirChk[1];
	if (dirChk[1] == 'company') {
		if (dirChk[2] == 'NEWS') {
			if (dirChk[3] == 'others') $(".header_nav").find("a[href*='/company/NEWS/others/']").closest("li").addClass('header_nav_current');
			else $(".header_nav").find("a[href*='/company/NEWS/']:not([href*='/company/NEWS/others/'])").closest("li").addClass('header_nav_current');
		}
		else $(".header_nav").find("a[href*='/company/" + dirChk[2] + "/']").closest("li").addClass('header_nav_current');
	} else if (dirSet) {
		$(".header_nav").find("a[href*='/" + dirSet + "/']").closest("li").addClass('header_nav_current');
	}
	$("#swipe_menu, .scroll_menu").swipeMenu();
	new fixedNavFunc();
});
/* fixed nav */
var fixedNavFunc = function(prm){
	this.bodyObj = this.bodyCheck();
	this.fixObj1 = $("#common_page_header");
	this.fixObj2 = $("#swipe_menu");
	this.dmyObj = $('<div class="js_blank_nav" />');
	this.clsRdy = 'js_ready';
	this.clsAct = 'js_fixed';
	this.topFlg = false;
	this.autoFlg = true;
	this.fixedPos = 0;
	this.fix1H = this.fixObj1.length ? this.fixObj1.outerHeight() : 0;
	this.fix2H = this.fixObj2.length ? this.fixObj2.outerHeight() : 0;
	this.fixH = this.fix1H + this.fix2H;
	this.dmyPrm = {'height': this.fixH,};
	this.cngPos = 0;
	this.hshStr = location.hash;
	this.hshObj = (this.hshStr) ? $(this.hshStr) : null;
	this.preSet();
};
fixedNavFunc.prototype = {
	preSet: function(){
		var _this = this;
		this.fixObj1.addClass(this.clsRdy).before(this.dmyObj.height(this.fixH));
		if (this.fix2H) this.fixObj2.css('top', this.fix1H + 'px');
		if ((this.hshObj != null) && this.hshObj.length) {
			var waitId;
			clearInterval(waitId);
			waitId = setInterval(function(){
				clearInterval(waitId);
				_this.bodyObj.scrollTop(Math.round(parseInt(_this.hshObj.offset().top) - _this.fixH + _this.fixedPos));
				_this.scrollCheck();
			}, 500);
		}
		else this.scrollCheck();
		$(window).scroll(function(){ _this.scrollCheck(); });
		$("a[href^='#']").click(function(e){
			if (_this.dmyObj.height()) {
				e.preventDefault();
				var hshChk = $(this).attr('href');
				var tmpObj = $(hshChk);
				if (tmpObj.length) {
					var tmpH = (hshChk == '#pageTop') ? 0 : (Math.round(parseInt(tmpObj.offset().top) - _this.fixH + _this.fixedPos));
					if (_this.autoFlg) _this.bodyObj.animate({scrollTop: tmpH}, 200, 'swing');
					else _this.bodyObj.scrollTop(tmpH);
					_this.scrollCheck();
				}
			}
		});
		var rszId;
		clearInterval(rszId);
		$(window).on((('orientation' in window) ? 'orientationchange' : 'resize'), function(){
			clearInterval(rszId);
			rszId = setInterval(function(){
				clearInterval(rszId);
				_this.fix1H = _this.fixObj1.length ? _this.fixObj1.outerHeight() : 0;
				_this.fix2H = _this.fixObj2.length ? _this.fixObj2.outerHeight() : 0;
				_this.fixH = _this.fix1H + _this.fix2H;
				_this.dmyObj.height(_this.fixH);
				if (_this.fix2H) _this.fixObj2.css('top', _this.fix1H + 'px');
				_this.scrollCheck();
			}, 100);
		});
	},
	scrollCheck: function(){
		var scrH = $(window).scrollTop();
		if (scrH > this.fixedPos) this.fixObj1.addClass(this.clsAct);
		else this.fixObj1.removeClass(this.clsAct);
	},
	setTargetPos: function(getObj){
		if (getObj.attr('href') == '#') return false;
		var chkObj = $(getObj.attr('href'));
		if (chkObj.length) getObj.attr('data-target-position', Math.round(chkObj.offset().top));
	},
	bodyCheck: function(){
		$("html").scrollTop($(window).scrollTop() + 1);
		if ($("html").scrollTop()) return $("html");
		else return $("body");
	}
};
/* swipe menu */
$.fn.swipeMenu = function(prm){
	var exPrm = [];
	var exObj = [];
	for (var i = 0;i < this.length;i++) {
		exPrm[i] = $.extend({
			pathRootArea:		$(this[i]),
			classNameWrap:		'js_scroll_wrapper',
			classNamePrev:		'js_scroll_prev',
			classNameNext:		'js_scroll_next',
			classNameActive:	'js_scroll_active',
			intervalSec:		5,
			slideChangeSec:		.2
		}, prm);
		exObj[i] = new swipeMenuFunc(exPrm[i]);
	}
};
var swipeMenuFunc = function(prm){
	this.baseObj = prm.pathRootArea;
	this.listObj = this.baseObj.find("ul");
	this.wrapCls = prm.classNameWrap;
	this.prvCls = prm.classNamePrev;
	this.nxtCls = prm.classNameNext;
	this.actCls = prm.classNameActive;
	this.scrObj, this.csrPos, this.scrW, this.maxW, this.prvBtn, this.nxtBtn;
	this.preSet();
};
swipeMenuFunc.prototype = {
	preSet: function(){
		var _this = this;
		this.listObj
			.wrap($('<div class="' + this.wrapCls + '">'))
			.parent()
			.after($('<div class="' + this.nxtCls + '">'))
			.after($('<div class="' + this.prvCls + '">'));
		this.scrObj = this.baseObj.find("." + this.wrapCls);
		this.prvBtn = this.baseObj.find("." + this.prvCls);
		this.nxtBtn = this.baseObj.find("." + this.nxtCls);
		if (!this.scrObj.length || !this.prvBtn.length || !this.nxtBtn.length) return false;
		this.scrObj
			.each(function(){
				_this.csrPos = $(this).scrollLeft();
				_this.scrW =$(this).innerWidth();
				_this.maxW = $(this).get(0).scrollWidth;
				if (_this.scrW < _this.maxW) {
					if (!_this.csrPos) _this.prvBtn.removeClass(_this.actCls);
					if (parseInt(_this.csrPos) + parseInt(_this.scrW) < _this.maxW) _this.nxtBtn.addClass(_this.actCls);
				}
				_this.prvBtn.click(function(){
					_this.scrObj.animate({scrollLeft: (_this.scrObj.scrollLeft() - _this.scrW * .5) }, 200, 'swing');
				});
				_this.nxtBtn.click(function(){
					_this.scrObj.animate({scrollLeft: (_this.scrObj.scrollLeft() + _this.scrW * .5) }, 200, 'swing');
				});
			})
			.on('scroll', function () {
				_this.buttonSet();
			});
		var rszId;
		$(window).on((('orientation' in window) ? 'orientationchange' : 'resize'), function(){
			clearInterval(rszId);
			rszId = setInterval(function(){
				clearInterval(rszId);
				_this.buttonSet();
			}, 100);
		});
	},
	buttonSet: function(){
		this.scrW = this.scrObj.innerWidth();
		this.maxW = this.scrObj.get(0).scrollWidth;
		this.csrPos = this.scrObj.scrollLeft();
		if (this.scrW < this.maxW) {
			this.prvBtn.removeClass(this.actCls);
			this.nxtBtn.removeClass(this.actCls);
			if (this.csrPos) this.prvBtn.addClass(this.actCls);
			if (parseInt(this.csrPos) + parseInt(this.scrW) < this.maxW) this.nxtBtn.addClass(this.actCls);
		}
	}
};