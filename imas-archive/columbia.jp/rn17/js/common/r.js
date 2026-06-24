/**
 * r.js
 * @version: 0.3
 * @Author: RainbowJapan
 * @UpDate: 2013/05/23
 * @Licensed: under the MIT License
 * @Attention
 * 		- You need over jQuery 1.9.x
 * @Summary
 * 		[ rjs ]
 * 			rjs.checkUA 				: ユーザーエージェントによる分岐フラグを保持
 * 			rjs.getNowDate 			: 今日の年月日時をobj形式で返却
 * 			rjs.getHashData 			: URLに含まれるハッシュ情報を整形し配列として返却
 * 			rjs.heightLine 			: 対象エリアの高さを揃える処理

 *		[ jQueryPlugin ]
 *			$.fn.rjs_hlg 				: 対象エリアに対して、指定した数毎にheightLine.js用グループクラスを付加
 *			$.fn.rjs_rollover 			: 画像にロールオーバーした際に、xxxx_1.xxxの画像とxxxx_2.xxxの画像を切り替える処理
 *			$.fn.rjs_rollover_fade	: fade切替のボタンを設置
 *			$.fn.rjs_rollover_area	: クリッカブルマップ、マウスオーバー時に、オーバーしているエリアのIDに応じて、対象要素の画像を xxx_id.に書き換える
 *			$.fn.rjs_blocklink 			: 対象エリア全体をリンク範囲にする
 *			$.fn.rjs_scrollbtn 			: 対象エリアへスクロールして移動処理
 *			$.fn.rjs_txttrim 			: 指定要素内のテキストに、上限を設けて、上限数を超えたら略称表記にする
 *			$.fn.rjs_setbrwsh 		: 指定要素の高さをブラウザの描画領域の高さに揃える
 *			$.fn.rjs_setGoogleMap	: 対象IDに対してGoogleMapを出力
 *			$.fn.rjs_protectimg		: 対象画像領域の画像を保存させにくくする
 *
 */
/**
 * checkua.js
 * @Summary: ユーザーエージェントによる分岐フラグを保持
 * @Version: 0.3
 * @UpDate: 2013/06/13
 * 		- iPod用フラグを追記
 * 		- iOS,androidOs のフラグを追記
 * @Return object
 * @Example
 * 		console.log(rjs.checkUA.ie6);
 */
this.rjs = this.rjs || {};
(function($){
	rjs.checkUA = {
		// OS
		windows: false,
		mac: false,
		iOS:false,
		androidOS:false,

		// Browser
		ie: false,
			ie6: false,
			ie7: false,
			ie8: false,
			ie9: false,
			ie10: false,
		firefox: false,
		chrome: false,
		safari: false,
		opera: false,

		// Engine
		webkit: false,

		// Device
		PC: false,
		iPhone: false,
		iPad:false,
		iPod:false,
		android: false,
		androidTablet: false,

		// Mobile Vesion
		iOSver9: false,
		androidver5: false,

		// Device Width
		widthPC: false,
		widthSP: false,

		setUA:function(){
			var ua = navigator.userAgent;

			// --------------------------------------------------
			// Check OS
			// --------------------------------------------------
				if(ua.indexOf('Win') !== -1){
					this.windows = true;
				}else if(ua.indexOf('Mac') !== -1){
					this.mac = true;
				}

			// --------------------------------------------------
			// Check Browser
			// --------------------------------------------------
				// IE
				if(ua.indexOf('MSIE') != -1){
					this.ie = true
					if(ua.indexOf('MSIE 6') != -1){ this.ie6 = true };
					if(ua.indexOf('MSIE 7') != -1){ this.ie7 = true };
					if(ua.indexOf('MSIE 8') != -1){ this.ie8 = true };
					if(ua.indexOf('MSIE 9') != -1){ this.ie9 = true };
					if(ua.indexOf('MSIE 10') != -1){ this.ie10 = true };
				}
				// Firefox
				else if(ua.indexOf('Firefox') != -1){ this.firefox = true; }

				// Chrome
				else if(ua.indexOf('Chrome') != -1){ this.chrome = true; this.webkit = true; }

				// Safari
				else if(ua.indexOf('Safari') != -1 && ua.indexOf('Chrome') == -1){ this.safari = true; this.webkit = true; }

				// Opera
				else if(ua.indexOf('Opera') != -1){ this.opera = true; }

			// --------------------------------------------------
			// Device Check
			// --------------------------------------------------
				if(ua.indexOf('iPhone') != -1){
					// iPhone
					this.iPhone = true;
					this.iOS = true;
				}else if(ua.indexOf('iPad') != -1){
					// iPad
					this.iPad = true;
					this.iOS = true;
				}else if(ua.indexOf('iPod') != -1){
					// iPod
					this.iPod = true;
					this.iOS = true;
				}else if(ua.indexOf('Android') != -1){
					// Android
					this.android = true;
					// AndroidTablet
					if(ua.indexOf('Mobile') != -1){
					} else {
						this.androidTablet = true;
					}
					this.androidOS = true;
				}else{
					this.PC = true;
				}


			// --------------------------------------------------
			// Device Width Check
			// --------------------------------------------------
			if( ua.indexOf('iPhone') != -1) {
				var version = ua.match(/iPhone OS ([\d]+)_([\d]+)_([\d]+)/);
				if(!version){
					version = ua.match(/iPhone OS ([\d]+)_([\d]+)/);
				}

				if (version[1] >= 9) {
					this.iOSver9 = true;
				}
			}
			if( ua.indexOf('iPad') != -1) {
				var version = ua.match(/iPad; CPU OS ([\d]+)_([\d]+)_([\d]+)/);
				if(!version){
					version = ua.match(/iPad; CPU OS ([\d]+)_([\d]+)/);
				}

				if (version[1] >= 9) {
					this.iOSver9 = true;
				}
			}
			if( ua.indexOf('Android') > 0 ) {
				var version = ua.match(/Android ([\d]+).([\d]+).([\d]+)/);
                if(!version){
                    version = ua.match(/Android ([\d]+).([\d]+)/) || ua.match(/Android ([\d]+)/);
                }
/*				if(!version){
					version = ua.match(/Android ([\d]+).([\d]+)/);
				}
*/
				if (version[1] > 5) { // over Android 6
					this.androidver5 = true;
				}
				if ((version[1] == 5) && (version[2] > 1)) { // over Android 5.2
					this.androidver5 = true;
				}
				if ((version[1] == 5) && (version.length > 3)) { // over Android 5.1.1
					if ((version[2] > 0) && (version[3] > 0)) {
						this.androidver5 = true;
					}
				}
			}


			// --------------------------------------------------
			// Device Width Check
			// --------------------------------------------------
			var w = window.innerWidth ? window.innerWidth: $(window).width();
			if (w < 768) {
				this.widthSP = true;
			} else {
				this.widthPC = true;
			}


			// --------------------------------------------------
				return this;
		}
	}
	rjs.checkUA.setUA();
}) (jQuery);
/**
 * getNowDate
 * @Summary: 今日の年月日時を、利用しやすい形式に整形した後、obj形式で返却
 * @Version: 0.2
 * @UpDate: 2013/05/23
 * @Return object
 *    dateObj = 2013年1月1日1時1分1秒
 *		-- dateObj.y = 2013
 *		-- dateObj.y2 = 13
 *		-- dateObj.m = 1
 *		-- dateObj.m2 = 01
 *		-- dateObj.d = 1
 *		-- dateObj.d2 = 01
 *		-- dateObj.h = 1
 *		-- dateObj.h2 = 01
 *		-- dateObj.min = 1
 *		-- dateObj.min2 = 01
 *		-- dateObj.sec = 1
 *		-- dateObj.sec2 = 01
 * @example
 *		var dateObj = rjs.getNowDate();
 *		console.log(dateObj.y);
 */
this.rjs = this.rjs || {};
(function($){
	rjs.getNowDate = function(){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var year2,month2,day2,hours2,minutes2,seconds2;
		year = year.toString();
		year2 = year.substr(2,2);
		if(month < 10){ month2 = '0'+month; } else{ month2 = month; }
		if(day < 10){ day2 = '0'+day; } else{ day2 = day; }
		if(hours < 10){ hours2 = '0'+hours; } else{ hours2 = hours; }
		if(minutes < 10){ minutes2 = '0'+minutes; } else{ minutes2 = minutes; }
		if(seconds < 10){ seconds2 = '0'+seconds; } else{ seconds2 = seconds; }
		var dateObj ={
			y:year,
			y2:year2,
			m:month,
			m2:month2,
			d:day,
			d2:day2,
			h:hours,
			h2:hours2,
			min:minutes,
			min2:minutes2,
			sec:seconds,
			sec2:seconds2
		}
		return dateObj;
	}
}) (jQuery);
/**
 * getHashData
 * @Summary: URLからパラメータ（ハッシュ）を取得しオブジェクトにして返却
 * @Version: 0.2
 * @UpDate: 2013/05/23
 * @Return object
 * @Example
 * 		// http://test.dev?v=10&dir=test&p=2
 *		var parms = rjs.getHashData();
 *		var parms_v = parms['v']; //10
 *		var parms_dir = parms['dir']; // test
 *		var parms_p = parms['p']; //2
 */
this.rjs = this.rjs || {};
(function($){
	rjs.getHashData = function(){
		var hashArray = [];
		var q = window.location.search.substring(1);
		var p = q.split('&');
		for (var i=0; i<p.length; i++) {
			var pos = p[i].indexOf('=');
			if (pos > 0) {
				var key = p[i].substring(0,pos);
				var val = p[i].substring(pos+1);
				hashArray[key] = val;
			}
		}
		return hashArray;
	}
}) (jQuery);
/**
 * imgPreload
 * @Summary 指定画像をプリロード
 * @Version: 0.1
 * @UpDate: 2013/06/27
 * @example
 * [MIN OPTION]
 *		rjs.imgPreload([xxx.jpg, xxx.gif, xxx.png]);	// 画像のパスを配列形式で指定する
 * [MAX OPTION]
 *		rjs.imgPreload([xxx.jpg, xxx.gif, xxx.png],		// 画像のパスを配列形式で指定する
 *			function (){ callback });					// コールバック処理を関数形式で指定する
 */
this.rjs = this.rjs || {};
(function($){
	rjs.imgPreload = function(options, callback){
		var aryImage = options.concat();
		var num = aryImage.length;
		var callbackflg = 'false';
		if (callback) {
			callbackflg = 'true';
		}
		for (var i = num; i-- > 0;) {
			var imgObj = new Image();
			imgObj.src = aryImage[i];
			if (rjs.checkUA.ie8 && imgObj.width !== 0) {
					if (--num < 1) {
						if (callbackflg == 'true') {
							$.proxy(callback());
						}
					}
			} else {
				imgObj.onload = function() {
					if (--num < 1) {
						if (callbackflg == 'true') {
							$.proxy(callback());
						}
					}
				};
			}
		}
	}
}) (jQuery);
/**
 * $.fn.rjs_rollover
 * @Summary:
 * 		画像にロールオーバーした際に、xxxx_1.xxxの画像とxxxx_2.xxxの画像を切り替える処理
 * 		jQueryのバージョンに応じて、on,delegate,live を分岐してイベントを起こします
 * @Version: 0.3
 * @UpDate: 2013/06/12
 * @Exsample
 * 	[MIN OPTION]
 * 		$('img.rovr').rjs_rollover();
 *
 *		[MAX OPTION]
 *			$('img.rovr').rjs_rollover({
 *				lavel_off:'_1.', //ロールオーバー前の画像のラベル名
 *				lavel_on:'_2.'  //ロールオーバー後の画像のラベル名
 * 		});
 *
 */
(function($){

	// オプション指定
	var defaults = {
		lavel_off:'_1.', //ロールオーバー前の画像のラベル名
		lavel_on:'_2.'  //ロールオーバー後の画像のラベル名
	};

	//プラグイン
	$.fn.rjs_rollover = function(options) {
		var elements = this;
		var opts = $.extend({}, $.fn.rjs_rollover.defaults, options);
		var doc = $(document);
		var lgth_unit0 = 4;//.jpg .png .gif

		function rollover_on($obj){
			var this_img0 = $obj.attr('src');
			var dat0 = this_img0.split('/');
			var img_name0 = dat0[dat0.length-1];
			var start0 = this_img0.length - lgth_unit0;
			var end0 = this_img0.length;
			var unit0 = this_img0.slice(start0,end0);
			var name_nml0 = img_name0.split(unit0);
			var name_tgl0 = img_name0.replace(opts.lavel_off,opts.lavel_on);
			var img_tgl0 = this_img0.replace(img_name0,name_tgl0);
			$obj.attr('src',img_tgl0);
		}

		function rollover_off($obj){
			var this_img0 = $obj.attr('src');
			var dat0 = this_img0.split('/');
			var img_name0 = dat0[dat0.length-1];
			var start0 = this_img0.length - lgth_unit0;
			var end0 = this_img0.length;
			var unit0 = this_img0.slice(start0,end0);
			var name_tgl0 = img_name0.replace(opts.lavel_on,opts.lavel_off);
			var img_tgl0 = this_img0.replace(img_name0,name_tgl0);
			$obj.attr('src',img_tgl0);
		}

		if($.fn.on){
			doc.on('mouseenter',elements.selector,function(){
				rollover_on($(this));
			}).on('mouseleave',elements.selector,function(){
				rollover_off($(this));
			});
		}else if($.fn.delegate) {
			doc.delegate(elements.selector,'mouseover',function(){
				rollover_on($(this));
			}).delegate(elements.selector,'mouseout',function(){
				rollover_off($(this));
			});
		}else if($.fn.live){
			$(elements.selector).live('mouseover',function(){
				rollover_on($(this));
			}).live('mouseout',function(){
				rollover_off($(this));
			});
		}

	};
	$.fn.rjs_rollover.defaults = defaults;

	// 実行
	$(function(){
		$('img.rovr').rjs_rollover();
	});

}) (jQuery);
/**
 * $.fn.rjs_rollover_area
 * @Summary: クリッカブルマップ、マウスオーバー時に、オーバーしているエリアのIDに応じて、対象要素の画像を xxx_id.に書き換える
 * @Version: 0.2
 * @UpDate: 2013/05/23
 * @Exsample
 * 	[MIN OPTION]
 * 		$('area').rjs_rollover_area({imgid:'#mapimg'});
 *
 *	[HTML SAMPLE]
 * 		<img src="xxx.jpg" id="mapimg" usemap="map1">
 * 		<map id="map1">
 * 			<area href="#" id="area1">
 * 			<area href="#" id="area2">
 * 		</map>
 */
(function($){

	var defaults = {
		imgid:'#mapimg'
	};

	$.fn.rjs_rollover_area = function(options) {
		var elements = this;
		var opts = $.extend({}, $.fn.rjs_rollover_area.defaults, options);
		var doc = $(document);
		var def_src = $(opts.imgid).attr('src');
		doc.on('mouseenter',elements.selector,
			function () {
				var areaid = $(this).attr('id');
				var after_src = def_src.replace('.','_'+areaid+'.');
				$(opts.imgid).attr('src',after_src);
			}
		).on('mouseleave',elements.selector,
			function () {
				$(opts.imgid).attr('src',def_src);
			}
		);
	}
	$.fn.rjs_rollover_area.defaults = defaults;

	// $(function(){
	// 	$('area').rjs_rollover_area({imgid:'#mapimg'});
	// });

}) (jQuery);
/**
 * $.fn.rjs_rollover_fade
 * @Summary: fade切替のボタンを設置
 * @Version: 0.2
 * @UpDate: 2013/05/23
 * @Exsample
 * 	[MIN OPTION]
 * 		$('.fovr').rjs_rollover_fade();
 *
 *		[MAX OPTION]
 *    		$('.fovr').rjs_rollover_fade({
 *				lavel_off:'_1.',
 *				lavel_on:'_2.',
 *				speed: 'fast'
 *			});
 */
(function($){

	var defaults = {
		lavel_off:'_1.',
		lavel_on:'_2.',
		speed:'fast'
	};

	$.fn.rjs_rollover_fade = function(options) {
		var elements = this;
		var opts = $.extend({}, $.fn.rjs_rollover_fade.defaults, options);
		var doc = $(document);

		elements.each(function(){
			var this_img = $(this).attr('src');
			var after_img = this_img.replace(opts.lavel_off,opts.lavel_on);
			$(this).parent().css({'background':'url(' + after_img + ') no-repeat 0 0','display':'block'});
			doc.on('mouseenter',elements.selector,
				function(){
					$(this).stop().fadeTo(opts.speed, 0);
				}
			).on('mouseleave',elements.selector,
				function(){
					$(this).stop().fadeTo(opts.speed, 1);
				}
			);
		});
	};
	$.fn.rjs_rollover_fade.defaults = defaults;

	$(function(){
		$('.fovr').rjs_rollover_fade();
	});

}) (jQuery);
/**
 * heightLine / setHeightLineGroup
 * @Summary:
 * 		- 対象エリアに対して高さ揃え処理を行う
 * 		- 対象エリアに対して、heightLine.js用グループクラスを付加した後、heightLine処理を実行する
 * @Version: 0.2
 * @UpDate: 2013/05/23
 * @Example
 *	[MIN OPTION]
 *		$('.class').rjs_hlg();
 *
 *	[MAX OPTION]
 * 		$('.class').rjs_hlg({
 * 			colmax:4,// カラム数
 * 			grouplast:{
 * 				_class:'edge' // 各カラムの最後のカラムに対して付けるクラス名
 * 			}
 * 		});
*/

/*--------------------------------------------------------------------------*
 *
 *  heightLine JavaScript Library beta4
 *
 *  MIT-style license.
 *
 *  2007 Kazuma Nishihata
 *  http://www.webcreativepark.net
 *
 *--------------------------------------------------------------------------*/
this.rjs = this.rjs || {};
(function($){

	rjs.heightLine = function(){

		this.className="hl";
		this.parentClassName="hlp";

		reg = new RegExp(this.className+"-([a-zA-Z0-9-_]+)", "i");
		objCN =new Array();
		var objAll = document.getElementsByTagName ? document.getElementsByTagName("*") : document.all;
		for(var i = 0; i < objAll.length; i++) {
			var eltClass = objAll[i].className.split(/\s+/);
			for(var j = 0; j < eltClass.length; j++) {
				if(eltClass[j] == this.className) {
					if(!objCN["main CN"]) objCN["main CN"] = new Array();
					objCN["main CN"].push(objAll[i]);
					break;
				}else if(eltClass[j] == this.parentClassName){
					if(!objCN["parent CN"]) objCN["parent CN"] = new Array();
					objCN["parent CN"].push(objAll[i]);
					break;
				}else if(eltClass[j].match(reg)){
					var OCN = eltClass[j].match(reg)
					if(!objCN[OCN]) objCN[OCN]=new Array();
					objCN[OCN].push(objAll[i]);
					break;
				}
			}
		}

		//check font size
		var e = document.createElement("div");
		var s = document.createTextNode("S");
		e.appendChild(s);
		e.style.visibility="hidden"
		e.style.position="absolute"
		e.style.top="0"
		document.body.appendChild(e);
		var defHeight = e.offsetHeight;

		changeBoxSize = function(){
			for(var key in objCN){
				if (objCN.hasOwnProperty(key)) {
					//parent type
					if(key == "parent CN"){
						for(var i=0 ; i<objCN[key].length ; i++){
							var max_height=0;
							var CCN = objCN[key][i].childNodes;
							for(var j=0 ; j<CCN.length ; j++){
								if(CCN[j] && CCN[j].nodeType == 1){
									CCN[j].style.height="auto";
									max_height = max_height>CCN[j].offsetHeight?max_height:CCN[j].offsetHeight;
								}
							}
							for(var j=0 ; j<CCN.length ; j++){
								if(CCN[j].style){
									var stylea = CCN[j].currentStyle || document.defaultView.getComputedStyle(CCN[j], '');
									var newheight = max_height;
									if(stylea.paddingTop)newheight -= stylea.paddingTop.replace("px","");
									if(stylea.paddingBottom)newheight -= stylea.paddingBottom.replace("px","");
									if(stylea.borderTopWidth && stylea.borderTopWidth != "medium")newheight-= stylea.borderTopWidth.replace("px","");
									if(stylea.borderBottomWidth && stylea.borderBottomWidth != "medium")newheight-= stylea.borderBottomWidth.replace("px","");
									CCN[j].style.height =newheight+"px";
								}
							}
						}
					}else{
						var max_height=0;
						for(var i=0 ; i<objCN[key].length ; i++){
							objCN[key][i].style.height="auto";
							max_height = max_height>objCN[key][i].offsetHeight?max_height:objCN[key][i].offsetHeight;
						}
						for(var i=0 ; i<objCN[key].length ; i++){
							if(objCN[key][i].style){
								var stylea = objCN[key][i].currentStyle || document.defaultView.getComputedStyle(objCN[key][i], '');
									var newheight = max_height;
									if(stylea.paddingTop)newheight-= stylea.paddingTop.replace("px","");
									if(stylea.paddingBottom)newheight-= stylea.paddingBottom.replace("px","");
									if(stylea.borderTopWidth && stylea.borderTopWidth != "medium")newheight-= stylea.borderTopWidth.replace("px","")
									if(stylea.borderBottomWidth && stylea.borderBottomWidth != "medium")newheight-= stylea.borderBottomWidth.replace("px","");
									objCN[key][i].style.height =newheight+"px";
							}
						}
					}
				}
			}
		}

		checkBoxSize = function(){
			if(defHeight != e.offsetHeight){
				changeBoxSize();
				defHeight= e.offsetHeight;
			}
		}
		changeBoxSize();
		setInterval(checkBoxSize,1000)
		window.onresize=changeBoxSize;
	}

	/**
	 * 対象エリアに対して、指定した数毎にheightLine.js用グループクラスを付加
	 * @exsample
	 *	[MIN OPTION]
	 *		$('.class').rjs_hlg();
	 *	[MAX OPTION]
	 *		$('.class').rjs_hlg({colmax:4});
	 */
	rjs.setHeightLineGroup = function (){
		var that = this;
		var area_no = 0;

		// Option
		var defaults = {
			colmax:'4', // カラム数
			grouplast:{
				_class:'edge'
			}
		};

		$.fn.rjs_hlg = function(options) {
			var elements = this;
			var opts = $.extend({}, $.fn.rjs_hlg.defaults, options);
			var group_number = 1;
			area_no = area_no + 1;
			elements.each(function(i) {
				var i = i+1;
				$(this).addClass("hl-area" + area_no + '-group' + group_number);
				if(i % opts.colmax === 0){
					group_number = group_number + 1;
				}
			});
			that.heightLine();
			return this;
		};

		// Option
		$.fn.rjs_hlg.defaults = defaults;

	}

	$(function(){
		rjs.heightLine();
		rjs.setHeightLineGroup();
	});

}) (jQuery);
/**
 * $.fn.rjs_blocklink
 * @Summary: 対象エリア全体をリンク範囲にするjQueryプラグイン
 * @Version: 0.2
 * @UpDate: 2013/05/23
 * @Example
 *	[MIN OPTION]
 *		$('.class').rjs_blocklink();
 *
 *	[MAX OPTION]
 * 		$('.class').rjs_blocklink({
 *			add_class:'hovr', // マウスオーバー時に付加するクラス名
 *			replace_class:'rovr', // マウスオーバー時に画像を置換するクラス名
 *			replace_rule:{before:'_1.',after:'_2.'},// マウスオーバー時に画像を置換するルール
 *			cursor:true, //マウスオーバー時にカーソルを変えるか
 *			alpha: 0, // マウスオーバー時に対象エリアを透過にする
 *			linktgt_class:'a.boxlinktgt', // リンク対象のクラス
 *			popwin:{
 *				_class: 'popwin', // リンクをポップアップで開きたい場合に、付加するクラス名
 *				_w:'560', //ポップアップ横幅
 *				_h:'520', //ポップアップ縦幅
 *				_pos_center:true //ポップアップ表示位置をセンターにするか？
 *			},
 *			anchor:{
 *				deff: 0,
 *				speed: 1000,
 *				easing: 'swing'
 *			}
 * 		});
 */
(function($){

	var defaults = {
		add_class:'hovr', // マウスオーバー時に付加するクラス名
		replace_class:'rovr', // マウスオーバー時に画像を置換するクラス名
		replace_rule:{before:'_1.',after:'_2.'},// マウスオーバー時に画像を置換するルール
		cursor:true, //マウスオーバー時にカーソルを変えるか
		alpha: 0, // マウスオーバー時に対象エリアを透過にする
		linktgt_class:'a.boxlinktgt', // リンク対象のクラス
		popwin:{
			_class: 'popwin', // リンクをポップアップで開きたい場合に、付加するクラス名
			_w:'560', //ポップアップ横幅
			_h:'520', //ポップアップ縦幅
			_pos_center:true //ポップアップ表示位置をセンターにするか？
		},
		anchor:{
			deff: 0,
			speed: 1000,
			easing: 'swing'
		}
	};

	$.fn.rjs_blocklink = function(options) {
		var elements = this;
		var opts = $.extend({}, $.fn.rjs_blocklink.defaults, options);
		elements.each(function() {
			if(opts.cursor){
				$(this).css('cursor','pointer');
			}
			$(this).hover(
				function(){
					if(!opts.alpha){
						$(this).addClass(opts.add_class);
					}else{
						$(this).addClass(opts.add_class).css({'opacity':opts.alpha,'filter':'alpha(opacity='+opts.alpha*100+')'});
					}
					var tImg = $(this).find(opts.replace_class);
					if(tImg.length > 0){
						var bSrc =tImg.attr('src');
						var aSrc = bSrc.replace(opts.replace_rule.before,opts.replace_rule.after);
						tImg.attr('src',aSrc).removeClass(opts.replace_class).addClass('rwait');
					}

					$(this).on('click',
						function(){
							var a_length = $(this).find('a').length;
							if(a_length === 1){
								var $tgt = $(this).find('a');
								gotolink($tgt);
							}else if(a_length > 1){
								var $tgt = $(this).find(opts.linktgt_class);
								if($tgt.length > 0){
									gotolink($tgt);
								}else{
									var $tgt = $(this).find('a').eq(0);
									gotolink($tgt);
								}
							}
							function gotolink($tgt){
								var href0 = $tgt.attr('href');
								var cls0 = $tgt.attr('class');
								var howtotgt = $tgt.attr('target');

								if(cls0 != null){
									if(cls0.indexOf(opts.popwin._class) !== -1) {
										var wname = 'wpop01';
										var w = opts.popwin._w;
										var h = opts.popwin._h;
										if(opts.popwin._pos_center){
											var x = (screen.width - w) / 2;
											var y = (screen.height - h) / 2;
										}else{
											var x = 0;
											var y = 0;
										}
										var win = window.open(href0,wname,'screenX='+x+',screenY='+y+',left='+x+',top='+y+', width='+w+', height='+h+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,favorites=no,resizable=yes');
										win.focus();
										return false;
									}
								}
								if(href0.charAt(0) === '#'){
									$('html,body').animate({ scrollTop: $(href0).offset().top + opts.anchor.deff + 'px' }, opts.anchor.speed);
									return false;
								}
								if(howtotgt !== '_blank') {
									location.href= href0;
								}else {
									window.open(href0, '_blank');
									return false;
								}
							}

							return false;
						}
					);

				},
				function(){
					if(!opts.alpha){
						$(this).removeClass(opts.add_class);
					}else{
						$(this).removeClass(opts.add_class).css({'opacity':'1','filter':'alpha(opacity=100)'});
					}
					var tImg = $(this).find('.rwait');
					if(tImg.length > 0){
						var bSrc =tImg.attr('src');
						var aSrc = bSrc.replace(opts.replace_rule.after,opts.replace_rule.before);
						tImg.attr("src",aSrc).addClass(opts.replace_class).removeClass('rwait');
					}
					$(this).off('click');
				}
			);

		});
		return this;
	};
	$.fn.rjs_blocklink.defaults = defaults;

}) (jQuery);
/**
 * $.fn.rjs_txttrim
 * @Summary 指定要素内のテキストに、上限を設けて、上限数を超えたら略称表記にする
 * @Version: 0.2
 * @UpDate: 2013/05/23
 * @Exsample
 * 	[MIN OPTION] $('#id').rjs_txttrim();
 *	[MAX OPTION] $('#id').rjs_txttrim({
 *		txtmax:10, // 上限文字数
 *		txt:'...'		 // 上限を超えた際に表示するテキスト
 *	});
 *
 */
(function($){
	var defaults = {
		txtmax: 10,
		txt:'…'
	};
	$.fn.rjs_txttrim = function(options) {
		var elements = this;
		var opts = $.extend({}, $.fn.rjs_txttrim.defaults, options);
		elements.each(function() {
			var thisText = $(this).text();
			var thisTextSize = thisText.length;
			if(thisTextSize > opts.txtmax){
				var shorttext = thisText.slice(0,opts.txtmax) + opts.txt;
				$(this).text(shorttext);
			}
		});
		return this;
	};
	$.fn.rjs_txttrim.defaults = defaults;
})(jQuery);
/**
 * $.fn.rjs_setbrwsh
 * @Summary: 指定要素の高さをブラウザの描画領域の高さに揃える
 * @Version: 0.2
 * @UpDate: 2013/05/29
 * @Exsample
 * 	[MIN OPTION]
 * 		$('#hoge').rjs_setbrwsh();
 *	[MAX OPTION]
 *		$('#hoge').rjs_setbrwsh({
 *			x:2,
 *			minHeight: 700,
 *			deff: -100
 *		});
 *
 */
(function($){
	var defaults = {
		x:1,	// ブラウザの高さの倍の高さを与えたい場合は2
		minHeight: false, // 最小値を数値で設定 700
		deff:0 // 差分を指定
	};
	$.fn.rjs_setbrwsh = function(options) {
		$elem = this;
		var opts = $.extend({}, $.fn.rjs_setbrwsh.defaults, options);
		var brH = $(window).height();
		$elem.each(function (i) {
			if(opts.minHeight && opts.minHeight > brH){
				$(this).height((opts.minHeight + opts.deff));
			}else{
				$(this).height((brH*opts.x) + opts.deff);
			}
		});
		return this;
	}
	$.fn.rjs_setbrwsh.defaults = defaults;
}) (jQuery);
/**
 * $.fn.rjs_scrollbtn
 * @Summary: 対象エリアへスクロールして移動処理
 * @Version: 0.2.1
 * @UpDate: 2013/06/23
 * @Attention: required r_checkua.js
 * @Exsample
 * 	[MIN OPTION]
 * 		$('a').rjs_scrollbtn();
 *
 *	[MAX OPTION]
 *		$('a').rjs_scrollbtn({
 *			speed: 1000,
 *			easing: 'linear',
 *			deff: 0
 * 		});
 *
 */

(function($){
	var defaults = {
		speed: 1200,
		easing: 'easeOutCubic',
		deff: 0
	};
	$.fn.rjs_scrollbtn = function(options) {
		var elements = this;
		var opts = $.extend({}, $.fn.rjs_scrollbtn.defaults, options);

		var scroll_elm;
		if (rjs.checkUA.webkit) {
			scroll_elm = (function() {
			if ('scrollingElement' in document) {
				return document.scrollingElement;
			}
			if (navigator.userAgent.indexOf('WebKit') != -1) {
				return document.body;
			}
			return document.documentElement;
			})();
		} else {
			scroll_elm = 'html';
		}



		if (rjs.checkUA.widthPC) {
			opts.deff = opts.deff - 142;
		} else {
			opts.deff = opts.deff - 20;
		}
		elements.each(function() {
			$(this).on('click',function(e){
				var hash = $(this).attr('href');
				if(hash === '#top'){
					$(scroll_elm).animate({ scrollTop: 0 }, opts.speed, opts.easing);
					e.preventDefault();
				}else if(hash.indexOf('#') !== -1 && hash !== '#'){
					$(scroll_elm).animate({ scrollTop: $(hash).offset().top + opts.deff + 'px' }, opts.speed,opts.easing);
					e.preventDefault();
				}
			});
		});
		return this;
	};
	$.fn.rjs_scrollbtn.defaults = defaults;
}) (jQuery);
/**
 * $.fn.rjs_setGoogleMap
 * @Summary: 対象IDに対してGoogleMapを出力
 * @Version: 0.2
 * @UpDate: 2013/05/23
 * @Attention:
 * 		このファイルの呼び出しの前に、下記の様にGoogleMapAPIを呼び出す必要があります。
 * 		<script type="text/javascript" src="http://maps.google.co.jp/maps/api/js?v=3&sensor=false"></script>
 * @Exsample
 *	$('#id').rjs_setGoogleMap({
 *		zoom:17, //地図初期表示時、拡大率
 *		lat:35.700675,	 //地図初期表示時、座標 緯度
 *		lng:139.744999,	 //地図初期表示時、座標 経度
 *		marker:true, // マーカーの配置
 *		marker_lat:35.699495,	 //地図初期表示時、アイコン初期座標 経度
 *		marker_lng:139.746217 //地図初期表示時、アイコン初期座標 経度
 *	});
 */
(function($){

	var defaults = {
		zoom:4, //地図初期表示時、拡大率,
		lat:36.70366,	 //地図初期表示時、座標 緯度
		lng:138.867188,	 //地図初期表示時、座標 経度
		marker: true, // マーカーの配置
		marker_lat:35.689474,	 //地図初期表示時、アイコン初期座標 経度
		marker_lng:139.69172 //地図初期表示時、アイコン初期座標 経度
	};

	$.fn.rjs_setGoogleMap = function(options) {
		var elements = this;
		var opts = $.extend({}, $.fn.rjs_setGoogleMap.defaults, options);

		// ID
		var tgt = elements[0];

		// 中心地図座標
		var latlng_center = new google.maps.LatLng(opts.lat,opts.lng);

		//設定
		var gmap_opts = {
			zoom: opts.zoom,
			center: latlng_center,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(tgt, gmap_opts);

		// マーカーの配置
		if(opts.marker){
			// マーカー座標
			var latlng_marker = new google.maps.LatLng(opts.marker_lat,opts.marker_lng);
			//マーカー
			var marker = new google.maps.Marker({
				position: latlng_marker,
				map: map
			});
		}

	};
	$.fn.rjs_setGoogleMap.defaults = defaults;

}) (jQuery);