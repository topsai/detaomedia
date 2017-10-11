/**
 * blank
 */
define(function(require) {
  var $ = require('jquery');
  var base = require('base');
 
  //
  
  if(base.getType()=='Pc'){
  	//下层导航跟随

    $(function(){
        /*var prevTop = 0,
          currTop = 0,
          topH = $('.pageHeader').outerHeight()+10;
        if( $(window).scrollTop() > 0){
          $('.pageHeader').css('top',-topH);
        };
        $('.pageHeader').addClass('head-fix').show();
        $('body').css('padding-top',$('.pageHeader').outerHeight());

        $(window).scroll(function() {
          currTop = $(window).scrollTop();
          if (currTop < prevTop) { 
            $('.pageHeader').css('top',0)//上
          } else {
            $('.pageHeader').css('top',-topH);//下
          }
          setTimeout(function(){prevTop = currTop},0);
        });*/
    }); 
  }

  //返回顶部
  $('body').append('<img src="/static/resources/web/img/gotop.jpg" alt="返回顶部" class="gotop_img gotop">');
  if( $(window).scrollTop() > 10){
    $('.gotop').fadeIn();
  }else{
    $('.gotop').fadeOut();
  }
  $(window).scroll(function(){
    if( $(window).scrollTop() > 10){
      $('.gotop').fadeIn();
    }else{
      $('.gotop').fadeOut();
    }
  })


  
  
});