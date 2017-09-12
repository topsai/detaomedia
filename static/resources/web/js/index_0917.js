/**
 * index
 */
define(function(require) {
  var $ = require('jquery');
  var base = require('base');
  var com = require('./common.js?v=2');


  if(base.getType() == "Mobile"){
      //小导航样式
      $(".full_section").eq(0).css({"z-index":2,"overflow":"inherit"});
      base.navHandle(".index_imgBox");
  }

  $('body').addClass('indexPage');
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
  });
  $('body').on('click','.gotop',function(){
    $.scrollify.move("#page1");
  });
  $('body').on('click','.index_arr',function(){
    // 滚屏效果已去除
    // $.scrollify.move("#page2");

    $('html,body').animate({scrollTop:$('.index_section').height()-90},300);
  });

  //获取banner图片尺寸
  var bannerImg={
    // width:$('.ibanner img').eq(0).width(),
    // height:$('.ibanner img').eq(0).height()
    width:1920,
    height:1200
  }
  // 设置banner高度，当图片不足以撑满banner时，降低banner高度
  var getBannerHeight=function(){
    var bannerMaxHeight=Math.floor($(window).width()*bannerImg.height/bannerImg.width);//banner高度最大是图片按比例放大的高度
    // console.log($(window).height()>bannerMaxHeight+"::"+$('.ibanner img').width());
    return $(window).height()>bannerMaxHeight ? bannerMaxHeight : $(window).height();
  };
  if (base.getType() == "Pc") {
  	$('.ibanner,.ibanner li').height(getBannerHeight());
  	$(window).resize(function(){
	    $('.ibanner,.ibanner li').height(getBannerHeight());
	  });

    // 2017-03-15
    // 导航背景色
    if(base.getType()!="Mobile"){
      $(window).scrollTop($(window).scrollTop()+1);
      $(window).scrollTop($(window).scrollTop()-1);
      $(window).scroll(function(){
        $(window).scrollTop()>$('.index_sec1').height()-$('.pageHeader').height() ? $('.pageHeader').addClass('whiter_head') : $('.pageHeader').removeClass('whiter_head');
      });
    }

    // 一级栏目色块高度已通过样式统一，此处给予色块的padding-top值已不需要
    //  var w_h=$(window).height(),
    //     tPt = (w_h-600)/2;
    // if (w_h>799){
    //   $('.full_section .hd').css({"padding-top":tPt});
    // }

    // 滚屏幕效果
	  // require('scrollify');
	  // require('easing');
	  // $.scrollify({
	  //   section:'.full_section',
	  //   //sectionName:false,
	  //   // easing: "easeInCubic",
   //    // easing:"linear",
	  //   scrollSpeed:1200,
	  //   offset : 0,
	  //   scrollbars: true,
	  //   axis:"y",
	  //   target:"html,body",
   //    // target:".index_sec_container",
	  //   interstitialSection:".pageFooter",
	  //   before:function(i,s){},
	  //   after:function(i,s){
	  //     var i = i+1;
	  //     $('.index_sec'+i).addClass('active').siblings().removeClass('active');
	  //     //$('.full_section').find('.css3').removeClass('css3');
	  //     setTimeout(function() {
	  //         $('.index_sec'+i).find('.title').addClass('css3')
	  //     },200)
	  //     setTimeout(function() {
	  //         $('.index_sec'+i).find('.text').addClass('css3')
	  //     },400)
	  //      setTimeout(function() {
	  //         $('.index_sec'+i).find('.index_imgBox,.menus').addClass('css3')
	  //     },700)
	  //   }
	  // });
  }
  
  var slide_mode;
  if (base.getType() !== "Mobile") {
    slide_mode = 'fade'
  }else{
    slide_mode = 'slide'
  }
  require('slide');
  $('.ibanner').slide({
    effect:slide_mode,
    pause:false,
    interval:5000,
    duration:1000,
    auto:true
  });

  // 二级栏目色块宽度以及导航挡住一级色块已通过样式统一，此处宽度设置已不再需要
  // var navHeight=0;//导航高度偏移量
  // var setImgBoxPos=function(){
  //   $('.full_section').each(function(i,e) {
  //     navHeight=$(this).find('.hd').length>0?parseInt($(this).find('.hd').css("marginTop").split("px")[0]):0;
  //     $(this).find('.index_imgBox').height($(this).outerHeight()-$(this).find('.hd').outerHeight()-navHeight);
  //     var li_w = $(this).find('.index_imgBox').find('li'),
  //         li_num = $(this).find('.index_imgBox').find('li').length;
  //         // li_w.width($(this).find('.wrap').outerWidth()/li_num);
  //   });
  // }
 //  if (base.getType() !== "Mobile") {
 //    setImgBoxPos();
 //    $(window).resize(function(event) {
 //      //document.location.reload();
 //      setImgBoxPos();
 //    });
	// }

  require('scroll-col');
  var srcoll_mode;
  if (base.getType() !== "Mobile") {
    srcoll_mode = 'hero'
  }else{
    srcoll_mode = ''
  }

  var catId=$('#catId').val();    
  $.post("/tools/ajax_recommended_news.jsp", {flag:"recommendedNews",catId:catId}, function(data) {
    $("#recommendedNews").html(data).find('img').each(function(){
      if(base.getType()=="Mobile"){
        $(this).attr('src',$(this).data("m"));
      }
    });
    // var w_h=$(window).height(),
    //     new_s_h = w_h-$('.index_sec6 .hd').outerHeight()-$('.index_sec6 .menus').outerHeight();
    // if (base.getType() == "Pc"){
      //$('.inews_scroll,.inews_scroll li,.inews_scroll li a').height(new_s_h);
      // if(w_h>760){
      //   $('.inews_scroll').find('img').height(new_s_h);
      // }
    // }
    // 2017-03-29 新闻横向滚动高度重置
    // var scroll_h=$('.testBtn .inews_scroll').find('img').height();
    var scroll_img_h=400,scroll_img_w=950;
    if(base.getType()=="Pc"){
      $('.inews_scroll').height(scroll_img_h);
    }else if(base.getType()=="Pad"){
      if($(window).width()<950){
        $('.inews_scroll').height(scroll_img_h*$(window).width()/scroll_img_w);
      }
    }else{
      scroll_img_h=389;scroll_img_w=600;
      $('.inews_scroll').height(scroll_img_h*$(window).width()/scroll_img_w);
    }
    $('.inews_scroll').scrollCol({
      mode:srcoll_mode,
      prev:'.is_arr_left',
      next:'.is_arr_right'
    });
  });

})