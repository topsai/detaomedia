/**
 * blank
 */
define(function(require) {
  var $ = require('jquery');
  var base = require('base');

  //
  if(base.getType() !=='Mobile'){
    $(".menu_bd").parents('.n_section').addClass('menuZ-index');
    // 2017-03-13 注释：pc端二级栏目宽度已通过样式设定
    // $('.index_imgBox').each(function(i,e) {
    //   var li_w = $(this).find('li');
    //   var li_num = $(this).find('li').length;
    //   var li_width = $(this).find('.wrap').width()/li_num;
    //       li_w.width(Math.floor(li_width));
    // });
    // $(window).resize(function(){
    //   $('.index_imgBox').each(function(i,e) {
    //     var li_w = $(this).find('li');
    //     var li_num = $(this).find('li').length;
    //     var li_width = $(this).find('.wrap').width()/li_num;
    //         li_w.width(Math.floor(li_width));
    //   });
    // });
  }
  require('easing');
  if(base.getType()=='Pc'){
   	$(".menu_bd").height('60px');
		
		$(document).ready(function(){

			var scrolls = $(window).scrollTop();
			var navHeight= $('.menu_bd').offset().top; 
			var navFix=$(".menus"); 
      if(scrolls > navHeight){
        navFix.addClass("s_fixed").parents('.full_section').addClass('zindex');
      }
			
			$(window).scroll(function(){ 
				if($(this).scrollTop()>navHeight){ 
					navFix.addClass("s_fixed").parents('.full_section').addClass('zindex'); 
				} 
				else{ 
					navFix.removeClass("s_fixed").parents('.full_section').removeClass('zindex'); 
				} 
			}) 

			/*var prevTop = 0,
          currTop = 0;
			$(window).scroll(function() {
          currTop = $(window).scrollTop();
          if (currTop < prevTop) { 
            navFix.addClass('top_show')//上
          } else {
            navFix.removeClass('top_show');//下
          }
          setTimeout(function(){prevTop = currTop},0);
        });
        if( $(window).scrollTop() > 0){
          navFix.removeClass('top_show');
        };*/


		})
  }


  // 2016-12-23
  // index_imgBox 文字浮层绝对居中
  // if($('.index_imgBox').length>0){
  //   $('.index_imgBox').each(function(){
  //     $(this).find('li').each(function(){
  //       var $this = $(this).find('.inline-box');
  //       var _txt_h = $this.find('.s_text').height();
  //       var _box_h = $this.height();
  //       var _top = (_box_h-_txt_h) /2;
  //       $this.find('.s_text').css({position:'absolute',margin:0,top:_top,left:0,width:'82%',paddingLeft:'9%',paddingRight:'9%'});
  //     })
  //   });
  // }

  
});