var is_ie = false;
/*@cc_on
  @if (@_jscript_version == 10)
    is_ie = 10;
  @elif (@_jscript_version == 9)
    is_ie = 9;
  @elif (@_jscript_version == 5.8)
    is_ie = 8;
  @else
    is_ie = 7;
  @end
@*/

$(function() {
  if (navigator.userAgent.indexOf("MSIE") != -1) {
    $('.hover img').each(function() {
      if ($(this).attr('src').indexOf('.png') != -1) {
        $(this).css({
          'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' +
          $(this).attr('src') +
          '", sizingMethod="scale");'
        });
      }
    });
  }
  
  $(".youtube").colorbox({iframe:true, innerWidth:853, innerHeight:480});
  $(".colorBox").colorbox();
  $('.iframe').colorbox({iframe: true, innerWidth: '646px', innerHeight: '412px'});
  $('#twitter_update_list').carouFredSel({
    items:{
      visible: 1,
      width: 640,
      height: 100
    },
    scroll:{
      items: 1,
      fx: 'scroll',
      duration: 800,
      pauseOnHover: true
    },
    auto:{
      play: true,
      timeoutDuration: 8000
    },
    prev: '.prev',
    next: '.next'
  }, {
    wrapper:{
      classname: 'twitter_update_list_wrap'
    }
  });
  $('#socialBtnList').css('display', 'none');
  $('#socialBtn').click(function() {
    $('#socialBtnList').toggle();
  });
  $('.smscroll a').click(function() {
    var target = $(this).attr('href');
    $(window).scrollTo(target, 500);
    return false;
  });
});

$(window).load(function() {
  equalHeight($('.equalHeight'));
});

function equalHeight(group) {
  tallest = 0;
  group.each(function() {
    thisHeight = $(this).height();
    if(thisHeight > tallest) {
      tallest = thisHeight;
    }
  });
  group.height(tallest);
}