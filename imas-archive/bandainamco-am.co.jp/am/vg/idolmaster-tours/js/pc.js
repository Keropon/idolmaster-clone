var ytplayer;
var iframeapi_load = false;
var iframeapi_ready = false;
var muteflag = 0;

var bg = "#bg";
function mobile_check()
{
    var ua = navigator.userAgent.toLowerCase();
    if (location.search != "?pc" && location.search != "?ipad" && 
        (location.search == "?sp" ||
         ua.indexOf("iphone") != -1  || ua.indexOf("ipod") != -1 ||
         (ua.indexOf("android") != -1 && ua.indexOf("mobile") != -1) ||
         (ua.indexOf("firefox") != -1 && ua.indexOf("mobile") != -1) ||
         ua.indexOf("bb10") != -1 ||
         ua.indexOf("blackberry") != -1 ||
         ua.indexOf("windows phone") != -1))
	{
			return 1;
	}
	return	0;
}
var ie_ver = 0;
function ie_version()
{
    var ua = navigator.userAgent.toLowerCase();

    if (ua.indexOf("msie 6.")  !== -1) {
        ie_ver = 6;
    }
    else if (ua.indexOf("msie 7.")  !== -1) {
        ie_ver = 7;
    }
    else if (ua.indexOf("msie 8.")  !== -1) {
        ie_ver = 8;
    }
    else if (ua.indexOf("msie 9.")  !== -1) {
        ie_ver = 9;
    }
    else if (ua.indexOf("msie 10.")  !== -1) {
        ie_ver = 10;
    }
    else if (ua.indexOf("trident/7") !== -1) {
        ie_ver = 11;
    }
    else if (ua.indexOf("edge/") !== -1) {
        ie_ver = 12; // edge
    }
}
function ipad_check()
{
    var ua = navigator.userAgent.toLowerCase();
    if (location.search == "?ipad" || ua.indexOf("ipad") != -1)
	{
			return 1;
	}
	return	0;
}
var metaflag = 0;
if (metaflag == 0 && mobile_check())
{
    var meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1";
    document.getElementsByTagName('head')[0].appendChild(meta);
    metaflag  = 1;
}
if (metaflag == 0 && ipad_check())
{
    var meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=980";
    document.getElementsByTagName('head')[0].appendChild(meta);
    metaflag  = 1;
}
var ptopshowflag = true;
function disp_gotop()
{
	var window_h = $(window).height();
	var	pos = $(window).scrollTop();
	if (pos > window_h / 3)
	{
		if (ptopshowflag == false)
		{
			ptopshowflag = true;
			$("#ptop").stop().fadeIn();
		}
	}
	else
	{
		if (ptopshowflag == true)
		{
			ptopshowflag = false;
			$("#ptop").stop().fadeOut();
		}
	}
}
function sethd()
{
   if (muteflag == 1)
   {
   		ytplayer.mute();
   }
	ytplayer.setPlaybackQuality('hd720');
}

function onYouTubeIframeAPIReady()
{
	if (iframeapi_ready == false)
	{
		ytplayer =  new YT.Player('ytp', {
			events: {
			  'onReady': sethd
			}
		});
		iframeapi_ready = true;
	}
}

function open_movie_html(obj)
{
	var q = "&amp;vq=hd720&amp;enablejsapi=1";
	if (obj.hasClass("sdselect"))
	{
		q = "";
	}
    q = "";
	var result = obj.attr("href").match(/v=([^&]+)&/);
    var result_si = obj.attr("href").match(/&si=([^&]+)&/);
    var si = "";
    if (result_si != null && result_si.length < 2)
    {
        result_si = obj.attr("href").match(/;si=([^&]+)&/);
    }
    if (result_si != null && result_si.length > 1)
    {
        si = "&amp;si=" + result_si[1];
    }
	var urlstr = "https://www.youtube-nocookie.com/embed/" + result[1] + "?rel=0" + si + q + "&amp;autohide=1&amp;iv_load_policy=3";
	var htmlstr ='<iframe id="ytp" width="853" height="480" src="' + urlstr + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';

	return	htmlstr;
}
/*
function iframeapi_init()
{
	if (iframeapi_load == false)
	{
		var tag = document.createElement('script');

      	tag.src = "https://www.youtube.com/iframe_api";

     	var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		iframeapi_load = true;
	}
	else if (iframeapi_ready == true)
	{
		ytplayer =  new YT.Player('ytp', {
			events: {
			  'onReady': sethd
			}
		});
	}
}*/
function open_movie(obj)
{
	var htmlstr;
	htmlstr = open_movie_html(obj);

    if (mobile_check())
    {
        return true;
    }
	muteflag = 0;
	$.colorbox({
		opacity: 0.9,
		html: htmlstr,
		transition: "fade",
		speed: 200,
		innerWidth: 853,
		innerHeight: 480,
		scrolling: false,
		className: "cbmv",
		close: "閉じる",
		onComplete: function(){
			// iframeapi_init();
		}
	});
    return  false;
}
function window_w()
{
    if ( !window.innerWidth ){
        return  $(window).width();
    }
    return  window.innerWidth;
}
var set_tw_first = false;
function set_tw()
{
    if ($("#twitterwidget").length > 0)
    {
		$("#twitterwidget>a").attr("width", $("#twitterwidget").width());
        $("#twitterwidget>a").attr("height", $("#twitterwidget").height());
        if (set_tw_first === false)
        {
            $('body').append($('<scr'+'ipt src="//platform.twitter.com/widgets.js" charset="utf-8"><\/scr'+'ipt>'));
            set_tw_first = true;
        }
        setTimeout(function(){
            if ($("#twitterwidget iframe").length > 0)
            {
				$("#twitterwidget iframe").width($("#twitterwidget").width());
                $("#twitterwidget iframe").height($("#twitterwidget").height());
            }
        }, 200);
    }
}
function loaded_func() {
}

ie_version();
$(function(){
	$('.ro').each(function(i, val){
        $('<img>').attr("src", $(this).attr("src").replace(/^(.+)(\.[a-z]+)$/, "$1_ro$2"));
	});
	$('.ro').hover(
		function () {
            var s = $(this).attr("src");
            if (!s.match(/_ro/))
            {
                s = s.replace(/^(.+)(\.[a-z]+)$/, "$1_ro$2");
                $(this).attr("src", s);
            }
        },function () {
            var s = $(this).attr("src");
            if (s.match(/_ro/))
            {
                s = s.replace("_ro", "");
                $(this).attr("src", s);
            }
        }
	);
    if(ie_ver >= 10)
    {
        $('body').on("mousewheel", function () {
            var wd = event.wheelDelta;
            if (wd !== undefined)
            {
                event.preventDefault();
                var csp = window.pageYOffset;
                window.scrollTo(0, csp - wd);
            }
        });
    }
	if ($('.mv').length > 0)
	{
		$('.mv').click(function()
		{
			return open_movie($(this));
		});
	}
    $("#ptop a[href^='#']").click(function(){
       if (!$(this).hasClass("cpop"))
        {
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var headerHeight = $('#nav-pc').outerHeight();
            var position = target.offset().top;
            $("html, body").animate({scrollTop:position}, 400, "swing");
        }
        return false;
    });
    $("a[href^='#']").click(function(){
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        $("html, body").animate({scrollTop:target.offset().top}, 400, "swing");
        return false;
    });

    disp_gotop();
    $(window).on("scroll", function(){
        disp_gotop();
    });
	if (bg !== undefined && bg !== "" && $(bg).length > 0)
	{
        $(bg).imagesLoaded(function(){
            set_tw();
            $(window).resize(function(){
                set_tw();
            });
            loaded_func();
            $("#loadimg").hide();
            $("#lovl").fadeOut();
            $(".openbtn").click(function () {
                $(this).toggleClass('active');
                $("#nav-sp").toggleClass('panelactive');
                $("#ptop").toggleClass('ptopnone');
            });
            
            $("#nav-sp a").click(function () {
                $(".openbtn").removeClass('active');
                $("#nav-sp").removeClass('panelactive');
            });
            AOS.init();
            if ($('#secondlocat-1').length > 0)
                {

                    if (mobile_check() == 0 && window_w() >=768){
                        $("a.spop").click(function(){
                          var w = $(window).width() - 10;
                          if (w > 1200){
                            w = 1200;
                          }
                          var h = Math.floor(w * 900 / 1200);
                          $.colorbox({
                            inline:  true,
                            href: $(this).attr("href"),
                            opacity: 0.7,
                            current: "",
                            returnFocus: false,
                            className: "shoppopup",
                            innerWidth: w,
                            innerHeight: h,
                          });
                          return false;
                        });
                      } else {
                        $("a.spop").click(function(){
                          var w = $(window).width() - 20;
                          if (w > 1200){
                            w = 1200;
                          }
                          var h = Math.floor(w * 1900 / 1200);
                          $.colorbox({
                            inline:  true,
                            href: $(this).attr("href"),
                            opacity: 0.7,
                            current: "",
                            returnFocus: false,
                            className: "shoppopup",
                            innerWidth: w,
                            innerHeight: h,
                          });
                          return false;
                        });
                      }
                  
                }
        });
	}
});
function checkNavHeight() {
    var $nav = $('#nav-pc');
    var navContentHeight = $nav[0].scrollHeight;
    var windowHeight = $(window).height();
  
    if (navContentHeight > windowHeight) {
      $nav.addClass('scrollable-nav');
    } else {
      $nav.removeClass('scrollable-nav');
    }
  }
  
  $(document).ready(function () {
    checkNavHeight();
    $(window).on('resize', checkNavHeight);
  });