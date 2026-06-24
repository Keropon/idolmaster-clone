
//store List ------------------------------------------------------

var globalSearchKeyword = function(config){
	var _this = this;

	this.appendTopHtml = '';
	// this.appendTopHtml += '<div id="js_bnam_ERFTGwerr">';
	this.appendTopHtml += '<script src="/assets/js/bnamsgs.js" charset="utf-8"></script>';
	this.appendTopHtml += '<script src="/assets/js/shopListBnam.js" id="shopListBnamGlobal"></script>';
	/*
	this.appendTopHtml += '<script> ';
	this.appendTopHtml += 'var shopListBnamObj = new shopListBnam({';
	this.appendTopHtml += 'domain_code:"spot",';
	this.appendTopHtml += 'spot_code:"all",';
	this.appendTopHtml += 'start:false,';
	this.appendTopHtml += 'inputkey_disp:true,';
	this.appendTopHtml += 'pre_keyword:""';
	this.appendTopHtml += '});';
	this.appendTopHtml += '</script>';
	*/
	//this.appendTopHtml += '</div>';

	//$("dl.header_search dt").eq(0).empty().append('SEARCH');
	$("dl.header_search dd").eq(0).empty().append(this.appendTopHtml);

	/*
	$("body").on("click",".header_search dt",function(){
		if ($("body").hasClass('search_open')) {
			$('body').removeClass('search_open');//for search 
			//$(this).closest(".header_wrapper").removeClass('js_open');
			$('#searchFormGlobal').remove();
		} else {
			_this.init();
			$('body').addClass('search_open');//for search 
			$("html,body").scrollTop(0);//for search 
			//$(this).closest(".header_wrapper").addClass('js_open').siblings(".js_open").removeClass('js_open');
			$("body").addClass('js_scroll_off');
		}
	});
	*/
	/* 2022 add */
	_this.init();

}

globalSearchKeyword.prototype = {
	init:function(){
		this.scriptGo();
	},scriptGo:function(){
		//console.log(location.pathname);
		if(!location.pathname.match(/^\/search\//)){
			var shopListBnamObjGlobal = new shopListBnam({
				domain_code:"",
				spot_code:"",
				start:false,
				inputkey_disp:true,
				pre_keyword:"",
				menu_off:true,
				global_mode:true,
				select_disp:true
			});
		}
		$("#select-category-list,#select-header-category-list").niceSelect();
	}
}

$(document).ready(function(){
	var globalSearchKeywordObj = new globalSearchKeyword();
});

var zaiko_hyo = function(config){
	this.hash = config.id;
	this.init();
}

zaiko_hyo.prototype = {
	init:function(){
		var _this = this;
		if(_this.hash){
			$.ajax({
				url: '/data/zaiko_hyo/' + _this.hash,
				cache : false,
				method: 'get',
				dataType: 'json'
			}).done(function(res) {
				_this.disp(res);
			}).fail(function(data){

			});
		}
		_this.makeStyle();
	},
	disp:function(res){
		var _this = this;
		$("#js-" + _this.hash).after(res.html);
		$("table.js_zaiko_hyo").attr("cellspacing","0");
		$("table.js_zaiko_hyo").attr("cellpadding","0");
		
		$("#js-" + _this.hash).after('<div><div style="float: left;font-size:16px;margin:30px 0 10px 0;">' + res.title + '</div><div style="float: right;margin:40px 0 0 0;">' + res.date + '</div></div>');
	},
	makeStyle:function(){
		var _this = this;
		if( _this.makeStyle.fired ) return;
		_this.makeStyle.fired = true;
		var style = '';
		style += '<style type="text/css">';
		style += 'table.js_zaiko_hyo { width:100%; border-top:1px solid #cccccc;border-right:1px solid #cccccc}';
		style += 'table.js_zaiko_hyo th { border-bottom:1px solid #cccccc;border-left:1px solid #cccccc;padding:10px;text-align:center;background-color:#e5e5e5; }';
		style += 'table.js_zaiko_hyo td { border-bottom:1px solid #cccccc;border-left:1px solid #cccccc;padding:10px; }';
		style += 'table.js_zaiko_hyo td.text-center { text-align:center;}';
		style += '</style>';
		$('head').append(style);
	//
	}
}

$(document).ready(function(){
	$(".js-zaiko-hyo-2021").each(function(){
		let hash = $(this).attr("id");
		hash = hash.replace('js-','');
		if (typeof zaiko_hyoObj === "undefined"){
		let zaiko_hyoObj = new zaiko_hyo({"id":hash});
	}else{
		zaiko_hyoObj({"id":hash});
	}
	});
});
