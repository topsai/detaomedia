/**
 * blank
 */
define(function(require) {
  var $ = require('jquery');
  var base = require('base');
  var com=require('./common');
  //
  	require('./floatNav');
  	require('./floatMenu');
	//require('scroll-bar');
	//$('.dt_educate .pd').scrollBar();

	//演 讲 推 荐
	require('scroll-col');
	$('.yjtj_pic').scrollCol({
    mode: 'hero',
    prev: '.myback',
    next: '.myforward'
  });

	//if(base.getType()=='Pc'){
	  //往 期 演 讲
	  require('tab');
	  $('.yj_tab').tab({
	  	tabs:'.yj_tabTit li',
	  	conts:'.yj_tac',
	  	posi_auto:false
	  });

	  /*require('hoverdir');
		$('.pic_list li').each(function(){ 
			$(this).hoverdir({
				speed:300,
			    easing:'ease',
			    hoverDelay:100,
			    inverse:false
			});
		});*/
  
  	//}
});