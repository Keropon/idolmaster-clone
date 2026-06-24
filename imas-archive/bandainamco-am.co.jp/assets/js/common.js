var this_page_is_preview = (0 == location.pathname.indexOf('/wmpreview'));


	var displayInfo = function(option){
		this.option = option;
		this.url = '';
	    this.shopName = new Object();
	    this.titleName = new Object();
		this.ymGroup = new Array();
		this.infos = new Array();
		this.mode = 0;
		this.dateMode = 0;
		this.init();

	}

	displayInfo.prototype = {

		init:function(){
			var _this = this;

			if($("dl.infoGroupJs").length){
				_this.mode = 1;
			}
			
			if(this.option == "infoGroupJs"){
				_this.mode = 1;
			}
			
			
			if($("dl.infoGroupYJs").length){
				_this.dateMode = 1;
			}
			
			_this.getJson();
			
			if(_this.mode){
			//	console.log(_this.mode);
				_this.infoGroupinit();
			}

		},
		infoGroupinit:function(){
			var _this = this;
			var preYm = "";
			var i = 0;
			var k = 0;
			$("dl.infoList > dt").each(function(){

				 yms = $(this).find("time").html().split(".");
				 ym = yms[0] + "." + yms[1];
				 if(ym != preYm){
				 	//console.log(_this.getYYYYMM(-2));
				 	_this.ymGroup[i] = ym;
				 	preYm = ym;
				 	k = 0;
				 	i++;
				 }
				 _this.infos[preYm + "_" + k] = $(this).get(0).outerHTML + $(this).next().get(0).outerHTML;
				 $(this).next().remove();
				 $(this).remove();
				 k++;
			});

			$("dl.infoList").css("display","block");
			$("body").on("click",".exeDispInfo",function(){
				var dispNo = $(this).attr("data-no");
				_this.dispInfo(dispNo);
				history.pushState(null, null, location.pathname + "?infoNo=" + dispNo);
				setTimeout(function(){	
					if(typeof($("img.lazy").lazyload) == "function"){	
						$("img.lazy").lazyload();	
					}	
				},300);
			});
			window.addEventListener('popstate', function(event) {
				var infoNo = _this.getQueryVariable("infoNo");
				_this.dispInfo(infoNo);
			},false );
		},
		getQueryVariableHref:function(href,variable) {
			var _this = this;
			var query = href;
			query = query.split('?').pop();
			var vars = query.split('&');
			for (var i = 0; i < vars.length; i++) {
			    var pair = vars[i].split('=');
			    if (decodeURIComponent(pair[0]) == variable) {
			        return decodeURIComponent(pair[1]);
			    }
			}
		},
		getQueryVariable:function(variable) {
			var _this = this;
		    var query = window.location.search.substring(1);
		    var vars = query.split('&');
		    for (var i = 0; i < vars.length; i++) {
		        var pair = vars[i].split('=');
		        if (decodeURIComponent(pair[0]) == variable) {
		            return decodeURIComponent(pair[1]);
		        }
		    }
		},
		getJson:function(){
			var _this = this;
			var mewsTagLen = $('.newsTag').length;
			if(mewsTagLen > 0){
			      	$.when(
				      	$.ajax({
							url: _this.url + '/data/toAP/shopName.json',
							cache : false,
							method: 'get',
							dataType: 'jsonp',
							jsonpCallback: 'shopInfo',
							context:_this,
							success:function(shopInfo) {
								for(i=0,len=shopInfo.shop.length;i<len;i++){
									_this.shopName[shopInfo.shop[i].web_admin_id] = shopInfo.shop[i].shop_name;
									_this.shopName[shopInfo.shop[i].web_admin_id + "_url"] = shopInfo.shop[i].url;
								}
							},error:function(){
							}
						}),
						$.ajax({
							url: _this.url + '/data/toAP/titleName.json',
							cache : false,
							method: 'get',
							dataType: 'jsonp',
							jsonpCallback: 'titleInfo',
							context:_this,
							success:function(titleInfo) {
								for(i=0,len=titleInfo.title.length;i<len;i++){
									_this.titleName[titleInfo.title[i].ip_code] = titleInfo.title[i].character_series;
								}
							},error:function(){
							}
						})
					).done(function(shopInfo) {
				
						 var infoNo = _this.getQueryVariableHref(location.href,"infoNo");
						  	if(infoNo){
						  		_this.dispInfo(infoNo);
						  	
						  	}else{
						  		_this.dispInfo(0);
						  
						  	}

					});
			}
		},
		infoGroupDisp:function(pos){
			var _this = this;
			$("dl.infoList").empty();
			var appendHtml = "";
			for(i=0;i<_this.ymGroup.length;i++){
				yymms = _this.ymGroup[i].split(".");
				var monNum = Number(yymms[1]);
				appendHtml+= "<li><a class=\"exeDispInfo\" href=\"javascript:void(0)\" data-no=\"" + i + "\">";
					if(_this.dateMode == 1){
						appendHtml+= yymms[0] + "年";
					}
				appendHtml+= monNum + "月</a></li>";
			}
			$("ul.archiveList").remove();
			$("dl.infoList").before("<ul class=\"archiveList\">" + appendHtml + "</ul>");
			for(i=0;i<10000;i++){
				if(_this.infos[_this.ymGroup[pos] + "_" + i]){
					$("dl.infoList").append(_this.infos[_this.ymGroup[pos] + "_" + i]);
				}else{
					break;
				}
			}
		},
		dispInfo:function(pos){
			var _this = this;
			if(_this.mode){
			//	console.log(_this.mode);
				_this.infoGroupDisp(pos);
			}

			$(".newsTag").each(function(){
		
					var shops = $(this).attr("data-shop_id");
					if(shops){
					//console.log("hoge");
						var shopTag = "";
						var shopAr = shops.split(',');
						if(shopAr.length < 2){
							for(i=0,len=shopAr.length;i<len;i++){
								if(
									(
										(typeof _this.shopName[shopAr[i]] !== 'undefined') &&
										(_this.shopName[shopAr[i]] !="")
									)
								){
									var okFlg = true;
									$(this).next().find("ul li a").each(function(){
									//console.log($(this).text() + "=" + _this.shopName[shopAr[i]]);
									var leftWord = $(this).attr("href").split(/namco\.co\.jp/);
									//console.log(leftWord.length);
									if(leftWord.length == 1){
										leftWord[1] = $(this).attr("href");
									}
									var rightWord = _this.shopName[shopAr[i] + '_url'].split(/namco\.co\.jp/) ;
									//console.log(leftWord[1] + "=" + rightWord[1]);
										if(leftWord[1] + "/" == rightWord[1]){
										//if(rightWord[1].match(leftWord[1] == ){
											okFlg = false;
										}
										if(leftWord[1]  == rightWord[1]){
										//if(rightWord[1].match(leftWord[1] == ){
											okFlg = false;
										}
									});
									if(okFlg){
										shopTag += "<li class=\"sTagJs\" ><a href=\"" + _this.shopName[shopAr[i] + '_url'] + "\" >" + _this.shopName[shopAr[i]] + "</a></li>";
									}
								}
							}
							
							if($(this).next().find("ul li").hasClass("sTagJs")){
							
							}else{
								$(this).next().find("ul").append(shopTag);
							}
						}
					}
					var titles = $(this).attr("data-title_id");
					if(titles){
						var titleTag = "";
						var titleAr = titles.split(',');
						for(i=0,len=1;i<len;i++){
							if(
								(typeof _this.titleName[titleAr[i]] !== 'undefined')
							){
								titleTag += "<li class=\"sTagJs\" ><a href=\"" + "http://www.namco.co.jp/c_search/?first=titles&second=" +  encodeURI(_this.titleName[titleAr[i]]) + "\" >" + _this.titleName[titleAr[i]] + "</a></li>";
							}
						}
						
						if($(this).next().find("ul li").hasClass("sTagJs")){
						
						}else{
							$(this).next().find("ul").append(titleTag);
						}					}
			});
		},
		getYYYYMM:function(n){
			var tmp = new Date();
			tmp.setDate(1);
			tmp.setMonth( tmp.getMonth() + n );
			var year = tmp.getFullYear();
			var mon = tmp.getMonth();
			var date = year + "." + (mon < 9 ? '0' : '') + (mon + 1);
			return date;
		}
	}
$(document).ready(function(){
	if($("#eventNewsTemplate")[0]){
	
	}else{
		var dInfo = new displayInfo();
	}
});

//store List ------------------------------------------------------

var storeListDisp = function(areaType,areaNo,pageNo,newsUrl){
	var pageName = window.location.href.split('/').pop();
	var pageNameAr = pageName.split('?');
	this.areaType = areaType;
	this.areaNo = areaNo;
	this.prefNo = "";
	this.pageNo = pageNo;
	this.selfName = pageNameAr[0];
	this.shopId = "";
	this.url = "";
	this.pageDispUnit = 15;
	this.startDisp = 0;
	this.endDisp = 15;
	this.responseShop = "";
	this.responsePref = "";
	this.responseArea = "";
	this.preKey = "";
	this.curPageNo = 0;
	this.newsUrl = newsUrl;
	this.init();


}

storeListDisp.prototype = {
		init:function(){
			var _this = this;
			$("#storeList").on("click",".pageNate",function(){
				$(this).addClass("cur");
				var pageNo = $(this).attr("data-no");
				_this.curPageNo = pageNo;
				_this.areaType = _this.getQueryVariable("areaType");
				_this.getInfo(_this.areaType,_this.areaNo,pageNo,_this.newsUrl,_this.prefNo);
				$("html, body").animate({ scrollTop: $('#areaJson').offset().top }, 100);
				_this.pushPage();
			});
			
			$("#storeList").on("click",".pageNatePrev",function(){
				var pageNo = parseInt(_this.curPageNo) - 1;
				_this.curPageNo = pageNo;
				_this.areaType = _this.getQueryVariable("areaType");
				_this.getInfo(_this.areaType,_this.areaNo,pageNo,_this.newsUrl,_this.prefNo);
				$("html, body").animate({ scrollTop: $('#areaJson').offset().top }, 100);
				_this.pushPage();
			});
			
			$("#storeList").on("click",".pageNateNext",function(){
				var pageNo = parseInt(_this.curPageNo) + 1;
				_this.curPageNo = pageNo;
				_this.areaType = _this.getQueryVariable("areaType");
				_this.getInfo(_this.areaType,_this.areaNo,pageNo,_this.newsUrl,_this.prefNo);
				$("html, body").animate({ scrollTop: $('#areaJson').offset().top }, 100);
				
				_this.pushPage();
			});
			

			$("body").on("click",".areaJs",function(){
				$("#storeList").css("display","block");
				var dataArea = $(this).attr("data-area");
				_this.areaType = 'area';
				_this.areaNo = dataArea;
				_this.curPageNo = 0;
				_this.getInfo('area',dataArea,0,_this.newsUrl,_this.prefNo);
				_this.pushPage();
			});

			$("body").on("click",".prefJs",function(){
				var dataArea = $(this).attr("data-area");
				_this.areaType = 'pref';
				_this.prefNo = dataArea;
				_this.curPageNo = 0;
				_this.getInfo('pref',_this.areaNo,0,_this.newsUrl,_this.prefNo);
				_this.pushPage();

			});

			window.addEventListener('popstate', function(event) {
				var pageNo = _this.getQueryVariable("pageNo");
				var areaType = _this.getQueryVariable("areaType");
				var areaNo = _this.getQueryVariable("areaNo");
				var newsUrl = _this.getQueryVariable("newsUrl");
				var prefNo = _this.getQueryVariable("prefNo");
				
				_this.areaNo = areaNo;
				_this.prefNo = prefNo;
				_this.getInfo(areaType,areaNo,pageNo,newsUrl,prefNo);
			},false );
			
			var newsUrl = _this.newsUrl;
			var pageNo = _this.getQueryVariable("pageNo");
			if(pageNo){
				_this.pageNo = pageNo;
				_this.curPageNo = pageNo;
			}else{
				_this.pageNo = 0;
				_this.curPageNo = 0;
			}
			var areaType = _this.getQueryVariable("areaType");
			var areaNo = _this.getQueryVariable("areaNo");
			if(areaNo){
				_this.areaNo = areaNo;
			}
			var prefNo = _this.getQueryVariable("prefNo");
			_this.prefNo = prefNo;
			_this.getInfo(areaType,areaNo,pageNo,newsUrl,prefNo);
			
			
		},
		pushPage:function(){
			var _this = this;
			var href = location.pathname + "?";
			href += "pageNo=" + _this.curPageNo;
			href += "&areaType=" + _this.areaType;
			href += "&areaNo=" + _this.areaNo;
			href += "&prefNo=" + _this.prefNo;
			href += "&newsUrl=" + _this.newsUrl;
			history.pushState(null, null, href);
		},
		getQueryVariable:function(variable) {
			var _this = this;
		    var query = window.location.search.substring(1);
		    var vars = query.split('&');
		    for (var i = 0; i < vars.length; i++) {
		        var pair = vars[i].split('=');
		        if (decodeURIComponent(pair[0]) == variable) {
		            return decodeURIComponent(pair[1]);
		        }
		    }
		},
		getQueryVariableHref:function(href,variable) {
			var _this = this;
		    var query = href;
		    query = query.split('?').pop();
		    var vars = query.split('&');

		    for (var i = 0; i < vars.length; i++) {
		        var pair = vars[i].split('=');
		        if (decodeURIComponent(pair[0]) == variable) {
		            return decodeURIComponent(pair[1]);
		        }
		    }
		},
		getInfo:function(areaType,areaNo,pageNo,newsUrl,prefNo){
			var _this = this;
			_this.pageNo = pageNo;
			
			if(!areaNo){
				areaNo = 0;
			}
			if(!prefNo){
				prefNo = 0;
			}
			if(!areaType){
				areaType = "";
			}
			var curKey = areaType + "_" + areaNo + "_" + prefNo;
			if(_this.preKey != curKey){
				_this.pageNo = 0;
				var data="areaType=" + areaType + "&areaNo=" + areaNo + "&newsUrl=" + newsUrl + "&prefNo=" + prefNo;
				$.ajax({
					url: _this.url + '/data/storeList/all',
					cache : false,
					method: 'get',
					data:data,
					dataType: 'jsonp',
					jsonpCallback: 'storeList',
				}).done(function(response) {
					_this.responseShop = response.shop;
					_this.responsePref = response.areaGroup;
					_this.responseArea = response.areaJson;
					_this.disp(pageNo);
					_this.preKey = curKey;
				}).fail(function(data){

				});

			}else{
				_this.disp(pageNo);
			}
		},
		disp:function(pageNo){
			var _this = this;
			if(!pageNo) pageNo =0;
			_this.startDisp = pageNo * _this.pageDispUnit;
			_this.endDisp = _this.startDisp + _this.pageDispUnit;
			var html = "<ul class=\"matchList\">";
			for(i=_this.startDisp;i<_this.endDisp;i++){
				if(_this.responseShop[i]){
				        var wurl = _this.responseShop[i].url;
				        if(location.href.match(/\/scripts\/toAP/)){
					    wurl = wurl.replace(/^\//, "/scripts/toAP/");
					    wurl = wurl.replace(/^http\:\/\/www\.namco\.co\.jp\//, "/scripts/toAP/");
					    
					}
					wurl = wurl.replace(/^https\:\/\/bandainamco\-am\.co\.jp/, "");
					html += "<li><a href=\"" + wurl + "\"><div class=\"text\"><dl>";
					
					if(!_this.responseShop[i].address2) _this.responseShop[i].address2 = '';
					
					html += "<dt>" + _this.responseShop[i].shop_name + " " + _this.responseShop[i].address2 + "</dt>";
					html += "<dd>" + _this.responseShop[i].address1 + "</dd>";
					html += "<dd>" + _this.responseShop[i].operating_hours + "</dd>";
					html += "</div>";
					html += "<div class=\"image\">";
					html += "<img src=\"" + _this.responseShop[i].thumb + "\" alt=\"\">";
					html += "</div></a></li>";
				}
			}
			html += "</ul>";
			$("#storeList").empty().append(html);
			_this.dispPageNate(_this.responseShop.length);
		},
		dispPageNate:function(len){
			var _this = this;
			_this.dispArea();
			_this.dispPref();
			var pagesu = Math.ceil(len/_this.pageDispUnit);
			var pageNate = "<div class=\"pageNav\"><ul>";
			
			if(_this.curPageNo > 0){
				pageNate += "<li class=\"btnPrev\"><a class=\"pageNatePrev\" href=\"javascript:void(0)\">前へ</a></li>";
			}
			pageNate += "<li><ol class=\"inner\">";
			if(pagesu > 1){
				for(i=0;i<pagesu;i++){
					var page_no = i + 1;
					if (i == _this.curPageNo){
						pageNate += "<li class=\"cur\"><a href=\"javascript:void(0);\">" + page_no + "</a></li>";
					}else{
						pageNate += "<li>" + "<a class=\"pageNate\" href=\"javascript:void(0);\" data-no=\"" + i + "\">" + page_no + "</a></li>";
					}
				}
			}
			pageNate += "</ol></li>";
			
			if(_this.curPageNo < pagesu - 1){
				pageNate += "<li class=\"btnNext\"><a class=\"pageNateNext\" href=\"javascript:void(0)\">次へ</a></li>";
			}
			pageNate += "</ul></div>";
			$("#storeList").append(pageNate);
		},
		dispPref:function(){
			var _this = this;
			
			var html = "<ul class=\"selectNav tectectec\">";
			
			var prefCur = "";
			for(i=0;i<_this.responsePref.length;i++){
				if(_this.responsePref[i].pref_id == _this.prefNo){
					prefCur = " cur ";
					html = html.replace(/tectectec/,"subCategorySelected");
				}else{
					prefCur = " ";
				}
				if(_this.responsePref[i]){
					html += "<li class=\"" + prefCur + "\" >" +  "<a class=\"prefJs\" href=\"javascript:void(0)\" data-area=\"" + _this.responsePref[i].pref_id + "\">" + _this.responsePref[i].pref + "</a></li>";
				}
			}
			html += "</ul>";
			if(_this.responsePref.length > 0){
				$("#pref").empty().append(html);
			}
		},
		dispArea:function(){
			var _this = this;
			var areaName = new Array();
			areaName[1] ='北海道';
			areaName[2] ='東北';
			areaName[3] ='関東';
			areaName[4] ='甲信越・北陸';
			areaName[5] ='東海';
			areaName[6] ='近畿';
			areaName[7] ='中国';
			areaName[8] ='四国';
			areaName[9] ='九州・沖縄';

			

			var html = "<ul class=\"selectNav tectectec\">";
		
			var areaCur = "";
			for(i=0;i<_this.responseArea.length;i++){
				if(_this.responseArea[i].area_id == _this.areaNo){
					areaCur = " cur ";
					html = html.replace(/tectectec/,"subCategorySelected");
				}else{
					areaCur = " ";
				}
				if(_this.responseArea[i]){
					html += "<li class=\"" + areaCur + "\" >" +  "<a class=\"areaJs\" href=\"javascript:void(0)\" data-area=\"" + _this.responseArea[i].area_id + "\">" + areaName[_this.responseArea[i].area_id]  + "</a></li>";
				}
			}
			html += "</ul>";
			$("#areaJson").empty().append(html);
		}
}

//reference check ------------------------------------------------------
var ref;

$(document).ready(function(){
    if (localStorage) {
        ref = new reference();
        ref.init();
        if (location.href.indexOf("ref=view") > 1) {
            ref.view();
        }else{
            if (typeof(shop_id) != "undefined" || typeof(title_id) != "undefined"){
                if(typeof(shop_id) != "undefined"){
                    ref.addCnt("shop", shop_id);
                }
                if(typeof(title_id) != "undefined"){
                    ref.addCnt("title", title_id);
                }
                ref.save();
            }
        }
    }
});

var reference = function(){
    this.d = {};
}

reference.prototype = {
	init: function(){
        var _this = this;
        _this.load();
        if (!_this.d) {
            _this.d = {};
            _this.d["shop"] = {};
            _this.d["title"] = {};
        }
	},
	addCnt: function(id, instr){
        var _this = this;
        var a = instr.split(",");
        $.each(a, function(){
            if (this) {
                if (this in _this.d[id]) {
                    _this.d[id][this] = _this.d[id][this] + 1;
                }else{
                    _this.d[id][this] = 1;
                }
            }
        });
	},
    save: function(){
        var _this = this;
        localStorage.setItem('ref', JSON.stringify(this.d));
    },
    load: function(){
        var _this = this;
        _this.d = JSON.parse(localStorage.getItem('ref'));
    },
    getRef: function(id){
        return this.d[id];
    },
	view:function(){
        var _this = this;
        var o = $("<div style='width:200px;'></div>");
        
        var o1 = $("<b>shop</b>");
        var o2 = $("<table></table>");
        $.each(_this.d["shop"], function(k, v){
            o2.append("<tr><th style='padding:2px;'>"+k+"</th><td style='padding:2px;'>"+v+"</td></tr>");
        });
        o.append(o1);
        o.append(o2);

        var o1 = $("<b>title</b>");
        var o2 = $("<table></table>");
        $.each(_this.d["title"], function(k, v){
            o2.append("<tr><th style='padding:2px;'>"+k+"</th><td style='padding:2px;'>"+v+"</td></tr>");
        });
        o.append(o1);
        o.append(o2);

        $("body").prepend(o);        
    }
};




// ------------- outSideNews -----------------
	var outSideNews = function(config){
		this.getPath = config.path;
		this.position = config.position;
		this.init();
	}

	outSideNews.prototype = {
			init:function(){
				var _this = this;
				_this.getInfo();
			},
			getInfo:function(){
				var _this = this;
				var data = "path=" + _this.getPath;
				$.when(
				    $.ajax({
						url: "/scripts/get_namco.php",
						cache : false,
						method: 'get',
						data:data,
						dataType: 'html',
						success:function(callback) {
							_this.news = callback;
						},error:function(){
						}
				     })
				).done(function(newsInfo) {
				
					_this.dispPlay();
				});
			},
			dispPlay:function(){
				var _this = this;
				$(_this.position).append(_this.news);
			}
	}

//page formatting ------------------------------------------------------
$(function(){
	/* sp nav */
//	if ($("#gNav").length) {
//		new spNavFunc({
//			pathRootHeader:	'#pageTop',
//			pathRootNav:	'#headNav',
//			tagButtonMenu:	'<div id="btnMenu"/>',
//			tagButtonClose:	'<div class="btnClose">&times; 閉じる</div>',
//			classNameOn:	'open'
//		}).preSet();
//		new gNavCheckFunc({
//			pathNavRoot: '#gNav li',
//			classNameCurrent: 'cur'
//		}).preSet();
//	}
	if ($(".imageTile").length) {
		new tileSetFunc({
			pathBaseRoot: '.imageTile',
			pathCheckItem: 'figure'
		}).preSet();
	}
	if ($("#shopImage").length) {
		new photoListFunc({
			pathMainImage: '#shopImage figure img',
			pathChangeButton: '#photoList li[data-photo-sec]',
			attrImagePath: 'data-photo-sec',
			classNameCurrent: 'cur'
		}).preSet();
	}

//	new smoothScrollFunc({
//		pathRootButton: "a[href='#pageTop']"
//	}).preSet();
//	new newWindowFunc({
//		pathRootButton: "a[href='#pageTop']"
//	}).preSet();

});
/* sp nav */
var spNavFunc = function(prm){
	this.baseObj = $(prm.pathRootHeader);
	this.navObj = $(prm.pathRootNav);
	this.btnObj = $(prm.tagButtonMenu);
	this.clsObj = $(prm.tagButtonClose);
	this.clsName = prm.classNameOn;
	this.rszFlg = !('onorientationchange' in window);
};
spNavFunc.prototype = {
	preSet: function(){
		var _this = this;
		var lineStr = '<li><a href="http://line.me/R/msg/text/' + encodeURI($("title").text()) + '%0D%0A' + encodeURI(location.href) + '">LINE</a></li>';
		this.navObj.append($("#snsButton").clone().append(lineStr).attr('id', 'snsIcons')).append(this.clsObj);
		this.baseObj.append(this.btnObj);
		this.btnObj.click(function(){ _this.toggleMenu(); });
		this.clsObj.click(function(){ _this.toggleMenu(); });
		if (this.rszFlg) $(window).on('resize', function(){ _this.navObj.attr('style', ''); });
		else $(window).on('onorientationchange', function(){ _this.navObj.attr('style', ''); });
		this.btnObj.on({
			'touchstart': function(e){
				this.posX = event.changedTouches[0].pageX;
				this.posY = event.changedTouches[0].pageY;
			},
			'touchmove': function(e){
				if (!this.posX) return false;
				this.mvX = Math.abs(event.changedTouches[0].pageX - this.posX);
				this.mvY = Math.abs(event.changedTouches[0].pageY - this.posY);
				if (this.mvX - this.mvY > 0) {
					e.preventDefault();
					return false;
				}
			}
		});
	},
	toggleMenu: function(){
		this.btnObj.toggleClass(this.clsName);
		this.navObj.slideToggle(200);
	}
};
var gNavCheckFunc = function(prm){
	this.navObj = $(prm.pathNavRoot);
	this.clsCur = prm.classNameCurrent;
	this.dirChk = this.locationCheck();
};
gNavCheckFunc.prototype = {
	preSet: function(){
		var _this = this;
		if (!this.dirChk) return false;
		this.navObj.each(function(){
			if ($(this).find("a").attr('href').match('/' + _this.dirChk)) {
				$(this).addClass(_this.clsCur);
				return false;
			}
		});
	},
	locationCheck: function(){
		var uri = location.pathname.split('/');
		if (uri[1] == 'company' && uri[3] == 'others') return 'others';
		else if (uri[1] == 'company') return uri[2];
		else return uri[1];
	}
};
var tileSetFunc = function(prm){
	this.baseObj = $(prm.pathBaseRoot);
	this.childObj = $(prm.pathCheckItem);
	this.maxH = 0;
	this.setLst = [];
	this.spW = 800;
	this.spFlg = this.displayCheck();
	this.rszFlg = !('onorientationchange' in window);
};
tileSetFunc.prototype = {
	preSet: function(){
		var _this = this;
		this.setHeight();
		if (this.rszFlg) {
			$(window).on('resize', function(){
				_this.spFlg = _this.displayCheck();
				_this.setHeight();
			});
		}
	},
	setHeight: function(){
		var _this = this;
		var maxCnt = this.spFlg ? 2 : 4;
		this.baseObj.each(function(){
			var chkObj = $(this).find(_this.childObj).parent();
			var setCnt = 0;
			var noCnt = 0;
			_this.setLst[setCnt] = [];
			chkObj.each(function(i){
				_this.setLst[setCnt][noCnt] = $(this);
				if ($(this).closest(".twice").length) noCnt = noCnt + 2;
				else noCnt = noCnt + 1;
				if (noCnt >= maxCnt) {
					setCnt++;
					noCnt = 0;
					_this.setLst[setCnt] = [];
				}
			});
			for (var i in _this.setLst) {
				var maxH1 = 0;
				var maxH2 = 0;
				for (var j in _this.setLst[i]) {
					_this.setLst[i][j].css('min-height', 0);
					if (this.spFlg && j >= 2) maxH2 = Math.max(maxH2, _this.setLst[i][j].height());
					else maxH1 = Math.max(maxH1, _this.setLst[i][j].height());
				}
				for (var j in _this.setLst[i]) {
					if (!(this.spFlg && _this.setLst[i][j].closest(".twice").length)) {
						if (this.spFlg && j >= 2) _this.setLst[i][j].css('min-height', (maxH2 + 2) + 'px');
						else _this.setLst[i][j].css('min-height', (maxH1 + 2) + 'px');
					} else {
						_this.setLst[i][j].css('min-height', 0);
					}
				}
			}
		});
	},
	ieCheck: function(){
		var verChk = navigator.appVersion.toLowerCase();
		return verChk.match(/(msie\s\d|trident\/\d)/) ? parseInt(verChk.replace(/.*(msie\s|rv:)/, '')) : 0;
	},
	displayCheck: function(){
		var barW = ((typeof window.innerWidth == 'number') && (typeof document.body.clientWidth == 'number')) ? (window.innerWidth - document.body.clientWidth) : 0;
		return (($(window).width() - barW < this.spW) && (!this.ieVer || this.ieVer > 8)) ? true : false;
	}
};
/* smooth scroll */
var smoothScrollFunc = function(prm){
	this.bodyObj = $("html, body");
	btnObj = $(prm.pathRootButton);
};
smoothScrollFunc.prototype = {
	preSet: function(){
		var _this = this;
		this.scrollCheck();
		btnObj.click(function(e){
			var getObj = $($(this).attr('href'));
			if (getObj.length) {
				e.preventDefault();
				var getY = getObj.offset().top;
				_this.bodyObj.stop().animate({scrollTop: getY}, 200, 'swing');
			}
		});
	},
	scrollCheck: function(){
		var _this = this;
		$("html, body").stop().animate({'scrollTop': 1}, 0, function(){
			if (_this.bodyObj.length < 2) return false;
			if ($(this).scrollTop()) {
				$(this).css('scrollTop', 0);
				this.bodyObj = $(this);
			}
		});
	}
};
/* new window */
var newWindowFunc = function(prm){
	this.btnObj = $("#snsButton a, #snsIcons a, .share li[class^='btn_'] a");
	this.condStr = 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1';
	tcFlag = this.touchCheck();
};
newWindowFunc.prototype = {
	preSet: function(){
		var _this = this;
		this.btnObj.click(function(e){
			e.preventDefault();
			//var linkPath = encodeURI($(this).attr('href'));
			var linkPath = $(this).attr('href');
			if (tcFlag) var newWin = window.open(linkPath, 'window');
			else var newWin = window.open(linkPath, 'window', _this.condStr);
			newWin.focus();
		});
	},
	touchCheck: function(){
		return ('ontouchstart' in window);
	}
};
/* photo list */
var photoListFunc = function(prm){
	this.imgObj = $(prm.pathMainImage);
	this.btnObj = $(prm.pathChangeButton);
	this.atPath = prm.attrImagePath;
	this.clsCur = prm.classNameCurrent;
	this.imgLst = [];
	this.curNum = 0;
};
photoListFunc.prototype = {
	preSet: function(){
		var _this = this;
		this.btnObj.each(function(i){
			_this.imgLst[i] = new Image;
			_this.imgLst[i].src = $(this).attr(_this.atPath);
			$(this).attr('data-photo-no', i);
			if (!i) $(this).addClass(_this.clsCur);
		});
		_this.eventSet();
		_this.loopImage();
	},
	eventSet:function(){
		var _this = this;
		$("body").on('click','ul#photoList > li',function(){
			var getNo = $(this).attr('data-photo-no');
			_this.curNum = getNo;
			_this.imgObj.attr('src', _this.imgLst[getNo].src);
			$(this).addClass(_this.clsCur).siblings('.' + _this.clsCur).removeClass();
		});
	
	},
	loopImage:function(){
		var _this = this;
		_this.preNum = _this.curNum - 1;
		if (_this.imgLst[_this.curNum]) {
			_this.imgObj.attr('src', _this.imgLst[_this.curNum].src);
		}
		
		$("ul#photoList li[data-photo-no=" + _this.curNum + "]").addClass(_this.clsCur).siblings('.' + _this.clsCur).removeClass();
		
		if(_this.imgLst.length - 1 == _this.curNum){
			_this.curNum = 0;
		}else{
			_this.curNum++;
		}
		setTimeout(function(){
			_this.loopImage();
		},3000);
	}
};

/* google custom search */
(function() {
	var cx = '010408300395277109473:lkuqyhlnt3i';
	var gcse = document.createElement('script');
	gcse.type = 'text/javascript';
	gcse.async = true;
	gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//cse.google.com/cse.js?cx=' + cx;
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(gcse, s);
})();



/* facebook */
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.0";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* google+ */
window.___gcfg = {lang: 'ja'};
(function() {
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

/* twitter */
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");



function displayResult(videoSnippet,mode) {
	var title = videoSnippet.title;
	var videoId = videoSnippet.resourceId.videoId;
	var s = '';
	var size = 30;
	var txt = videoSnippet.title;
	var suffix = '…';
	var b = 0;
	for(var i = 0; i < txt.length; i++) {
		b += txt.charCodeAt(i) <= 255 ? 0.5 : 1;
		if (b > size) {
			txt = txt.substr(0, i) + suffix;
			break;
		}
  	}
  	
  	if('medium' in videoSnippet.thumbnails){
		s+='<li class="swiper-slide"><dl><dt>' + txt + '</dt><dd>';
		if(videoSnippet.thumbnails && videoSnippet.thumbnails.medium.url){
			s+='<a href="http://www.youtube.com/watch?v=' + videoSnippet.resourceId.videoId +'" target="_blank">';
			s+='<img src="' + videoSnippet.thumbnails.medium.url + '" alt="' + txt + '"></a>'; // BNXP 2026.03 - webアクセシビリティ対応：youtubeサムネにalt追加
		}
		s+='</dd></dl></li>';
		if(txt != "Private video"){
			$('#showCt').prepend(s);
		}
	}
}

var op;
var storage;
$(document).ready(function(){
	if(typeof cross_domain_storage != 'function'){
		$.getScript("/assets/js/recommend/recommend.js");
	}
});

// 202203 replace header &  footer start ―― BNXP 2026.03 不要削除
//if (typeof replace2022 === 'undefined') {
//	$('head').append('<script src="/assets/js/replace2022.js" ></script>');
//}
// 202203 replace header &  footer end