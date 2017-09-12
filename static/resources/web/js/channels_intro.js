/**
 * blank
 */
define(function(require) {
  var $ = require('jquery');
  var base = require('base');
  var com=require('./common');


    if(base.getType() == "Mobile"){
      //小导航样式
      $(".full_section").eq(0).css({"z-index":2,"overflow":"inherit"});
      base.navHandle(".index_imgBox");

      // 下层导航，针对手机端轮播图片被遮挡处理
      $(".full_section").each(function(){
      	if($(this).hasClass('mobileSlideBlock')){
      		$(this).css({paddingTop:$(this).find('.box .hd').innerHeight()});
      	}
      });
    }

    // 点击跳链
    // var locateToAnchor=function(){
    //   if(window.location.hash=="#jump"){
    //     // $('html,body').animate({scrollTop:$('#jump').offset().top},300);
    //     $('html,body').scrollTop($('#jump').offset().top-100);
    //   }
    // }
    // locateToAnchor();
    // $('body').on('click','a',function(){
    //   if($(this).attr('src').length>0&&$(this).attr('src').split('#')[1]=="jump"){
    //     console.log("jumped");
    //     locateToAnchor();
    //   }
    // });
    
});