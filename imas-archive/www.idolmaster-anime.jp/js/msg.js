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

var is_from = window.location.search.substring(1, window.location.search.length);
if (is_from == 'top') {
  $(function() {
    $('#bd-dvd-box, #msg-wrap').css('display', 'none');
  });
}
$(function () {
  $('#director_message').click(function() {
    $('#msg-wrap, #msg-box').fadeIn(1000);
  });
  $('.btn-msg').click(function() {
    var mode = $('a', this).attr('class');
    switch (mode) {
      case 'msg':
        var txt = 'イラスト';
        var alt = 'illust';
        $('a', this).removeClass().addClass('illust');
        break;
      case 'illust':
        var txt = 'メッセージ';
        var alt = 'msg';
        $('a', this).removeClass().addClass('msg');
        break;
    }
    $('.image img, .btn-msg img').fadeOut(300, function() {
      $('.image img').attr('src', '/img/msg/' + mode + '.jpg');
      $('.btn-msg img').attr('src', '/img/msg/btn-' + alt + '.png').attr('alt', '錦織監督からの' + txt + 'はこちら');
      $('.btn-msg a').attr('title', '錦織監督からの' + txt + 'はこちら');
      $(this).delay(400).fadeIn(500);
    });
    return false;
  });
});
$(window).load(function() {
  $('#msg-wrap, #msg-box, #bd-dvd-box, #btnClose').click(function() {
    $('#msg-wrap, #msg-box, #bd-dvd-box').fadeOut(200);
  });
});