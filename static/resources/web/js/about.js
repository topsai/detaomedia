/**
 * blank
 */
define(function(require) {
  var $ = require('jquery');
  var base = require('base');
  var com=require('./common');
  //
    require('./floatNav');
  	require('./floatMenu.js?v=3');
  	/*require('scroll-bar');
  	$('.dt_educate .pd').scrollBar();*/
  
  	require('slide');
  	$('.about_PinPai').slide({
      effect:'fade',
  		prev:'.a_prev',
  		next:'.a_next'
  	});
    

    
});