/*
 * name: box.js
 * version: v3.10.1
 * update: 1.关闭按钮设置白色，不再受a链接hover变色影响；
 2.弹出弹窗时关闭a链接自动获取焦点，变相去除表单项焦点，
 以防用户在不关闭提示语的情况下还能通过敲击键盘空格、回车等按键多次提交表单
 * date: 2017-03-31                     
 * base on: zhangxinxu
 */
define('box', function(require, exports, module) {
	"use strict";
	seajs.importStyle('.box_wrap_close a,.box_wrap_close a:hover{text-decoration:none}\
		.box_wrap_close a,.box_wrap_msg_clo{text-align:center;cursor:pointer}\
		#boxBlank{display:none !important; position:fixed;z-index:99;left:0;top:0;width:100%;height:100%;background:#000;filter:alpha(opacity=50);\
		background:rgba(0,0,0,.5)}\
		#boxBlank.active{display:block !important}\
		.box_wrap_in{min-width:9em}\
		.box_wrap_out{z-index:100;}\
		.box_wrap_out_posi{position:absolute;border-radius:4px;overflow:hidden;max-width:100%;}\
		.box_wrap_out_posi.init{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}\
		.box_wrap_out_posi.show{-webkit-transform:scale(1);transform:scale(1);opacity:1;\
			-webkit-transition:all 160ms ease-in-out;transition:all 160ms ease-in-out}\
		.box_wrap_out_drag{-webkit-transition:none;transition:none}\
		.box_wrap_bar{position:relative;height:46px;line-height:46px; -webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}\
		.box_wrap_title{padding-left:1em;margin:0;font-weight:400;font-size:1.1em;color:#fff}\
		.box_wrap_close{position:absolute;right:0;top:0;}\
		.box_wrap_close a{font:700 1.5em/20px Tahoma;padding:.5em;color:#fff}\
		.box_img_close{background:#fff;border-radius:4px}\
		.box_wrap_body {background:#fff}\
		.box_wrap_remind{font-size:16px; padding:2em 2em;min-width:14em;overflow:hidden}\
		.box_wrap_foot{position:relative; min-width:12em;overflow:hidden}\
		.box_wrap_foot .btn{margin:0;display:block;border-radius:0;border:0;background:none;border-top:1px solid #aaa}\
		.box_wrap_foot._confirm .btn{float:left;width:50%}\
		.box_wrap_foot._confirm:after{content:"";position:absolute;left:50%;top:0;width:0;height:100%;\
		border-left:1px solid #aaa}\
		.box_wrap_msg{position:relative;width:500px;max-width:100%}\
		.box_wrap_msg_cont{padding:15px 40px 15px 15px;line-height:22px}\
		.box_wrap_msg_clo{position:absolute;width:30px;height:50px;line-height:50px;right:0;top:0}\
		.box_wrap_msg_clo .ion{margin:0;font-size:16px}\
		.box_wrap_msg_clo:hover{opacity:.8}', module.uri);
	var $ = require('jquery');
	var base = require('base');
	var Language = [{
			close: "关闭",
			confirm: "确认",
			cancel: "取消",
			loading: "加载中...",
			error: "加载出了点问题"
		}, {
			close: "close",
			confirm: "confirm",
			cancel: "cancel",
			loading: "loading...",
			error: "something is wrong"
		}],
		def = {
			title: "对话框",
			oktext: null,
			canceltext: null,
			shut: "×",
			width: "auto",
			height: "auto",
			layout: true, //是否使用默认弹出框
			setposi: true, //是否自动定位
			hook: null, //自定义样式名
			bar: true, //是否显示标题栏
			bg: true, //是否显示背景
			fix: true, //是否弹出框固定在页面上
			bgclose: true, //是否点击半透明背景隐藏弹出框
			drag: false, //是否可拖拽
			protect: false, //保护装载的内容
			onshow: null, //弹窗显示后触发事件
			onclose: null, //弹窗关闭后触发事件
			delay: 0, //弹窗打开后关闭的时间, 0和负值不触发
			lang: 0, //语言选择，0：中文 1:英文,
			color: "info", //msg方法情景色，info，primary，success，warning，danger
			focus:true,//打开弹窗时让关闭弹窗按钮自动获取焦点
			animate: true
		},
		eleBlank = $("#boxBlank").length ? $('#boxBlank') :
		$('<div id="boxBlank" ontouchmove="return false" onselectstart="return false" />').appendTo('body');
	eleBlank.click(function() {
		$.box.hide(false, true);
	});
	//全局配置
	if(window.innerWidth<640){
		def.animate = false
	};
	if ($.isPlainObject(window.boxGlobal)) {
		$.extend(def, window.boxGlobal);
	};

	$.box = function(elements, options) {
		if (!elements) {
			return console.warn('no elements to $.box()');
		};
		var s = $.extend({}, def, options || {}),
			hook = '',
			boxID = 'boxID' + parseInt(Math.random() * 1e5),
			$o,
			eleOut;
		
		if (s.hook && /^\w*$/.test(s.hook)) {
			hook = s.hook;
		};
		typeof(elements) === 'function' && (elements = elements());
		if (typeof(elements) === 'object' && elements.length) {
			//现有dom
			elements.show();
			if (!s.bridge) {
				s.protect = true;
			}
		} else if ($.parseHTML($.trim(elements + ''))[0].nodeType === 1) {
			//dom字符串
			elements = $(elements);
		} else {
			//纯字符串
			elements = $('<div class="box_wrap_remind">' + elements + '</div>');
			s.layout || (elements.css('min-width', '0'));
		};

		eleOut = (function() {
			var _;
			if (s.layout) {
				_ = $('<div class="box_wrap_out_posi">' +
					'<div class="box_wrap_in">' +
					'<div class="box_wrap_bar bg-primary" onselectstart="return false;">' +
					'<h4 class="box_wrap_title"></h4>' +
					(s.shut ? '<div class="box_wrap_close"><a href="#" title="' + Language[s.lang].close + '"></a></div>' : '')+
					'</div>' +
					'<div class="box_wrap_body"></div>' +
					'</div>' +
					'</div>');
				_.find('.box_wrap_body').append(elements);
			} else if (s.setposi) {
				_ = $('<div class="box_wrap_out_posi" />').append(elements);
			} else {
				_ = elements;
			}

			return _.addClass(hook + ' box_wrap_out ' + boxID)
				.attr('box-ui-bg', !!s.bg)
				.data({
					protect: s.protect,
					bgclose: s.bgclose,
					setposi: s.setposi
				})
				.appendTo('body');
		})();

		$o = {
			s: s,
			ele: elements,
			bg: eleBlank,
			out: eleOut,
			tit: eleOut.find(".box_wrap_title"),
			bar: eleOut.find(".box_wrap_bar"),
			clo: eleOut.find(".box_wrap_close a")
		};
		$o.tit.html(s.title);
		$o.clo.html(s.shut);


		if ($.isFunction(s.onshow)) {
			setTimeout(function() {
				s.onshow(eleOut);
			}, 0);
		};
		if (s.focus){
			$.box.setFocus($o);
		}
		if (!s.bar) {
			$.box.barHide($o);
		};
		if (s.setposi) {
			$.box.setSize($o);
		}
		if (s.fix && s.setposi) {
			$.box.setFixed($o);
		};
		if (s.drag) {
			$.box.drag($o);
		} else if(!window.PluginBoxResizeHandel){
			window.PluginBoxResizeHandel = base.throttle(function(){
				$.box.setSize($o)
			});
			$(window).on('resize',PluginBoxResizeHandel);
		};
		
		if (!s.bg) {
			$.box.bgHide();
		} else {
			$.box.bgShow();
		};
		$o.clo.click(function(e) {
			e.preventDefault();
			return $.box.hide($o);
		});
		if (s.delay > 0) {
			setTimeout(function() {
				$.box.hide($o);
			}, s.delay);
		};

		//返回box元素
		return $o;
	};
	$.extend($.box, {
		setSize: function($o) {
			if (!$o.bg.length || !$o.ele.length || !$o.out.length) {
				return;
			}
			var w = $(window).width(),
				h = $(window).height(),
				st = $(window).scrollTop(),
				outHeight,
				xh,
				xw;
			if($o.s.width=='auto'){
				xw = Math.min($o.out.width(),w);
			}else{
				xw = Math.min($o.s.width,w);
			};
			$o.out.css("width",xw);
			if($o.s.height==='auto'){
				outHeight = $o.out.height();
				if(outHeight>h){
					xh = h;
				}else{
					if($o.out.data('initHeight')===void(0)){
						xh = outHeight;
						$o.out.data('initHeight',xh);
					}else if($o.out.data('initHeight')!==outHeight){
						xh = $o.out.data('initHeight');
					}else{
						xh = outHeight;
					}
				};
			}else{
				xh = Math.min(parseFloat($o.s.height),h);
				console.log('box高度自定调整为窗口最大高度：'+h);
			};
			
			$o.bg.height(h);
			$o.out.css({
				"width": xw,
				"height": xh
			});
			if($o.s.layout){
				$o.out.find('.box_wrap_body').height(xh-$o.out.find('.box_wrap_bar').outerHeight());
			};
			if ($o.s.setposi) {
				var l = (w - xw) / 2,
					t;					
				if ($o.s.top !== void(0)) {
					t = $o.s.top;
				}else if($o.s.fix){
					t = (h - xh) / 2;
				}else{
					t = st + (h - xh) / 2;
				}
				$o.out.css({
					top: t,
					left: l
				});
				if($o.s.animate){
					$o.out.addClass('init');
					setTimeout(function(){
						$o.out.addClass('show');
					},0);
				};
			}
			return $o;
		},
		setFixed: function($o) {
			if (!$o.out || !$o.out.length) {
				return false;
			};
			return $o.out.css({
				position: "fixed"
			});
		},
		bgCheck: function() {
			if (!$('.box_wrap_out[box-ui-bg=true]').length) {
				setTimeout(function(){
					$('#boxBlank').removeClass('active')
				},0);
			};
		},
		bgHide: function() {
			$.box.bgCheck();
		},
		bgShow: function() {
			$('#boxBlank').addClass('show active');
		},
		barHide: function($o) {
			if ($o.bar && $o.bar.length) {
				$o.bar.remove();
			}
		},
		hide: function($o, fromBgClick) {
			if(window.PluginBoxResizeHandel){
				$(window).unbind('resize',PluginBoxResizeHandel);
				window.PluginBoxResizeHandel = null;
			};
			if (!$o) {
				var _allBox = $('.box_wrap_out');
				if (fromBgClick) {
					_allBox = _allBox.filter(function() {
						return $(this).data('bgclose') === true;
					});
				};
				_allBox.each(function(i, e) {
					var _this = $(e);
					if (!_this.data('setposi')) {
						//actionSheet插件关闭
						_this.removeClass('action-sheet-up');
					};
					if (_this.data('protect')) {
						var _ele = _this.find('.box_wrap_body').length ? _this.find('.box_wrap_body').children() : _this.children();
						_ele.hide().appendTo($("body"));
					};
					_this.remove();
					$.box.bgCheck();
				});
				return _allBox = null;
			} else if ($o.ele && $o.out.length && $o.out.css("display") !== "none") {
				var _to = $o.s.animate ? 200 : 0;
				if ($o.s.setposi && $o.s.animate) {
					$o.out.removeClass('show');
				} else {
					$o.out.removeClass('action-sheet-up');
				};		
				setTimeout(function() {
					if ($o.s.protect) {
						$o.ele.hide().appendTo($("body"));
					};
					$o.out.remove();
					$.box.bgCheck();
					if ($.isFunction($o.s.onclose)) {
						$o.s.onclose();
					};
				}, _to);
			}
		},
		drag: function($o) {
			if (!$o.out.length || !$o.bar.length) {
				return false;
			};
			require.async('drag', function() {
				$o.out.drag({
					dragStart: function($this) {
						$this.addClass('box_wrap_out_drag');
					},
					dragEnd: function($this) {
						$this.removeClass('box_wrap_out_drag');
					}
				});
			});
		},
		setFocus:function(s) {
			return s.clo.length>0 ? s.clo.focus() : false;
		},
		loading: function(s) {
			return $.box(Language[s.lang].loading, {
				bar: false,
				bgclose: false
			});
		},
		confirm: function(message, sureCall, cancelCall, options) {
			var s = $.extend({}, def, options || {});
			s.bridge = true;
			var element = $('<div class="box_wrap_remind">' + message + '</div>' + '<div class="box_wrap_foot _confirm"><button class="btn btn-lg boxconfirm">' + (s.oktext ? s.oktext : Language[s.lang].confirm) + '</button><button class="btn btn-lg boxcancel">' + (s.canceltext ? s.canceltext : Language[s.lang].cancel) + '</button></div>');
			var _o = $.box(element, s);
			_o.out.find(".boxconfirm").click(function() {
				if ($.isFunction(sureCall)) {
					sureCall.call(this);
				}
			});
			_o.out.find(".boxcancel").click(function() {
				if (cancelCall && $.isFunction(cancelCall)) {
					cancelCall.call(this);
				};
				$.box.hide(_o);
			});
			return _o;
		},
		alert: function(message, callback, options) {
			var s = $.extend({}, def, options || {});
			s.bridge = true;
			var element = $('<div class="box_wrap_remind">' + message + '</div>' + '<div class="box_wrap_foot"><button class="btn btn-block btn-lg boxconfirm">' + (s.oktext ? s.oktext : Language[s.lang].confirm) + '</button></div>');
			var _o = $.box(element, s);
			_o.out.find(".boxconfirm").click(function() {
				if (callback && $.isFunction(callback)) {
					callback.call(this);
				};
				$.box.hide(_o);
			});
			return _o;
		},
		msg: function(message, options) {
			var s = $.extend({}, def, options || {}),
				element;
			s.top = 0;
			s.layout = false;
			s.bg = false;
			s.bridge = true;
			if(s.delay){
				element = '<div class="box_wrap_msg"><div class="box_wrap_msg_cont bg-' + s.color + '">' + message + '</div></div>';
			}else{
				element = '<div class="box_wrap_msg"><div class="box_wrap_msg_cont bg-' + s.color + '">' + message + '</div><div class="box_wrap_msg_clo"><i class="ion">&#xe6c9;</i></div></div>';
			}
			var _o = $.box(element, s);
			_o.out.find(".box_wrap_msg_clo").one('click', function() {
				$.box.hide(_o);
			});
			return _o;
		},
		ajax: function(uri, params, options) {
			var s = $.extend({}, def, options || {});
			if (uri) {
				var _loading = $.box.loading(s);
				options = options || {};
				options.protect = false;
				$.ajax({
					url: uri,
					data: params || {},
					success: function(html, other) {
						$.box.hide(_loading);
						return $.box(html, options);
					},
					error: function() {
						$.box.hide(_loading);
						return $.box.alert(Language[s.lang].error);
					}
				});
			}
		},
		ifram: function(uri, params, options) {
			if (uri) {
				var html;
				options = options || {};
				options.protect = false;
				params = params || {};
				html = '<iframe name="' + (params.name || '') + '" src="' + uri + '" width="' + (params.width || 640) + '" height="' + (params.height || 480) + '" frameborder="0"></iframe>';
				return $.box(html, options);
			}
		},
		img: function(src, options) {
			if (!src || !src.split) return;
			var s = $.extend({}, def, options || {}),
				_loading = $.box.loading(s),
				$img = '<img src="' + src + '">',
				imgBox;
			options = options || {};
			options.bg = true;
			options.layout = false;
			options.onshow = function($box){
				$box.append('<div class="box_wrap_close box_img_close"><a>x</a></div>')
				.find('.box_img_close').on('click',function(){
					$.box.hide(imgBox)
				})
			};
			require.async('img-ready', function(ready) {
				ready(src, function(width, height) {
					options.width = width;
					options.height = height;
					$.box.hide(_loading);
					return imgBox = $.box($img, options);
				})
			})
		}
	})
});