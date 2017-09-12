/*
* name: manifest.js
* version: v1.0.1
* update: 添加appcan通信插件
* date: 2016-04-01
*/
define('manifest',function(){
    var mod = {
        'audio/audio'                       : 'v1.0.11',
        'copy/ZeroClipboard'                : 'v0.0.11',
        'flv/flv'                           : 'v0.0.21',
    	'jquery/1/jquery'					: 'v1.11.31',
        'jquery/2/jquery'                   : 'v2.1.41',
    	'My97DatePicker/WdatePicker'		: 'v0.0.11',
    	'raty/raty'							: 'v0.1.01',
    	'validform/validform'				: 'v2.2.31',
    	'video/video'						: 'v0.0.11',
    	'webuploader/webuploader'			: 'v1.0.01',
        'album'                             : 'v2.2.101',
        'appcan'                            : 'v0.1.01',
    	'autocomplete'						: 'v0.0.11',
        'base'								: 'v2.13.61',
        'bdshare'							: 'v3.1.21',
        'box'								: 'v3.10.1',
        'countdown'							: 'v1.0.21',
        'drag'								: 'v0.5.01',
        'easing'							: 'v0.0.11',
        'echarts'                           : 'v0.0.21',
        'etpl'								: 'v0.0.11',
        'fastclick'                         : 'v0.0.11',
        'hoverdir'                          : 'v0.0.11',
        'img-loaded'						: 'v0.0.11',
        'img-ready'							: 'v1.0.01',
        'instantclick'						: 'v0.0.11',
        'json'								: 'v0.0.11',
        'jrange'                            : 'v0.0.11',
        'lazyload'							: 'v2.0.11',
        'lettering'                         : 'v2.0.11',
        'loader'                            : 'v0.0.21',
        'marquee'                           : 'v0.10.11',
        'masonry'							: 'v0.0.11',
        'mousemenu'							: 'v1.0.01',
        'mousetrap'							: 'v1.5.31',
        'mousewheel'						: 'v0.0.11',
        'modernizr'                         : 'v0.0.11',
        'offcanvas'                         : 'v2.0.41',
        'on-scroll'							: 'v2.1.31',
        'photowall'							: 'v0.1.11',
        'pjax'								: 'v0.0.11',
        'qr'								: 'v0.1.01',
        'scroll-bar'						: 'v2.2.71',
        'scrollify'                         : 'v1.0.51',
        'scroll-col'                        : 'v4.2.41',
        'scroll-row'						: 'v3.0.61',
        'skrollr'                           : 'v0.0.11',
        'superscrollorama'                  : 'v0.0.11',
        'select'							: 'v3.1.91',
        'slide'								: 'v4.1.91',
        'swipe'                             : 'v2.0.01',
        'tab'								: 'v2.1.21',
        'tip'								: 'v1.2.21',
        'touch'								: 'v0.1.11',
        'tweenmax'                          : 'v1.18.51',
        'unslider'                          : 'v2.0.01',
        'zoom'								: 'v2.0.21',
        'scroll-loading'                    : 'v0.0.11',
        'smoothscroll'                      : 'v0.0.12'
    };
    var manifest = {};
    for(var key in mod){
        manifest[seajs.data.base + key + '.js'] = mod[key]
    }
    seajs.data.localcache.manifest = manifest;
    
});