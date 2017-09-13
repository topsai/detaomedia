/**
* name: common
* version: v3.0.0
* update: 去掉pc端跨屏支持
* date: 2016-04-30
*/
define(function(require, exports, module) {
  var $ = require('jquery');
  var base = require('base');
  var typeCatch = base.getType();
  require('box');
  if(base.browser.ie<7){
    alert('您的浏览器版本过低，请升级或使用chrome、Firefox等高级浏览器！');
  }

  // 2017-03-29 解决新闻综合页面，控制台因找不到$('#jump')而报错，目前已知存在$('#jump')的页面有：线上课程，新闻详情
  $(function(){
    if($('#jump').length>0 && base.browser.ie && location.hash == "#jump"){
      var jumpTop = $("#jump").offset().top;
      window.scrollTo(0, jumpTop);
    }
  })

  // 横屏提示（建议只在手机端使用）
  var popNoticeofScreenRotation=function(){
    // console.log( base.getOrient())
     if(base.getOrient()=="Heng"){
      $('body').append('<div id="shuping" style="position:fixed; z-index:9999; width:100%; height:100%; left:0; top:0;"><img src="/resources/web/img/shuping.png" style="width:100%; height:100%;"/></div>')
     }else{
       console.log( ('#shuping').length)
        if($('#shuping').length>0) $('#shuping').remove();
     }
  }
  if(base.getType()=="Mobile"){popNoticeofScreenRotation();}
  //移动端跨屏刷新
  $('body').attr('data-w',$('body').outerWidth());
  var throttleResize = base.throttle(function(){

    if(base.getType()=='Mobile'){
     popNoticeofScreenRotation();
    }else{
      var new_width = $('body').outerWidth();
      if(new_width != $('body').data('w')){
        //document.location.reload();
      }
    }
    
    // if(base.getType()!='Pc'){
      // console.log('type::',base.getType());
      
    // }
  });
  $(window).on('resize',function(){
    throttleResize();

  });


  //字号调节
  var $speech=$('.myart:visible'),
     defaultsize=parseFloat($speech.css('font-size'));
  if($speech.length){
    //window.localStorage &&  localStorage.getItem('fz') && $speech.css('font-size', localStorage.getItem('fz')+'px');
    $('body').on('click','#switcher a',function(){
      var num=parseFloat($speech.css('font-size'))
      switch(this.id){
        case'small':num/=1.4
        break
        case'big':num*=1.4
        break
        default:num=defaultsize
      }
      $speech.css('font-size',num+'px')
      //window.localStorage && localStorage.setItem('fz',num);
    })
  }

  //页面平滑滚动
  if(base.getType() == 'Pc'){
    if (base.browser.ie > 8) {
      var smooth = require('smoothscroll');
      smooth.initSmooth();
      $(".slimScrollDiv").hover(function(){
      	smooth.remove();
      },function(){
      	smooth.add();
      });
    }
  }

  //图片懒加载
  require('scroll-loading');
  $("img").scrollLoading({
    attr:"data-url"
  });

  /*
  * 常用工具
  */
  //返回顶部
  $('body').on('click','.gotop',function(){$('html,body').stop(1).animate({scrollTop:'0'},300);return false});
  //关闭当前页
  $('body').on('click','.closewin',function(){window.opener=null;window.open("","_self");window.close()});
  //打印当前页
  $('body').on('click','.print',function(){window.print()});
  //加入收藏
  $('body').on('click','.favorite',function(){var sURL = "http:&#47;&#47;"+document.domain+"&#47;",sTitle = document.title;try{window.external.addFavorite(sURL, sTitle)} catch (e){try{window.sidebar.addPanel(sTitle, sURL, "")}catch (e){alert("加入收藏失败，请使用Ctrl+D进行添加")}}});
  //设为首页
  $('body').on('click','.sethome',function(){var vrl="http:&#47;&#47;"+document.domain+"&#47;";if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(e){alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。")}var prefs=Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);prefs.setCharPref('browser.startup.homepage',vrl)}else{alert("您的浏览器不支持自动设为首页，请您手动进行设置！")}});
  //屏蔽ie78 console未定义错误
  if (typeof console === void(0)) {
      console = { log: function() {}, warn: function() {} }
  };
  //textarea扩展max-length
  $('textarea[max-length]').on('change blur keyup',function(){
    var _val=$(this).val(),_max=$(this).attr('max-length');
    if(_val.length>_max){
      $(this).val(_val.substr(0,_max));
    };
  });
  //延时显示
  $('.opc0').animate({'opacity':'1'},160);
  // placeholder
  $('input, textarea').placeholder();
  //按需渲染
  base.scanpush();
  //响应图片
  base.resImg();
  /*
  * 输出
  */
  module.exports = {
    demo:function(){
      console.log('hello '+base.getType());
    }
  }

  /*
  * 站内公用
  */
 
  //导航当前状态 2.0后台需要使用
  //var jrChannelArr=jrChannel.split('#');
  //$('.nav').children('li').eq(jrChannelArr[0]).addClass('cur').find('li').eq(jrChannelArr[1]).addClass('cur');
  
  if(base.getType()=='Pc'){

     //多组分享js         
     require.async('bdshare',function(bdshare){
        bdshare([{
              tag : 'foot_share',  
              bdSize : 32,      //图标尺寸, 16｜24｜32
              bdStyle : '0'     //图标类型, 0｜1｜2

        }]);

        bdshare({
          //如果不需要从页面获取分享内容不要加onBeforeClick这一段
          onBeforeClick: function(cmd, config) {
            var e = (arguments.callee.caller.arguments[0] || window.event).event;
            // config.bdText = $(e.target).parents('.bdsharebuttonbox').data('sharetitle');
            //更改标题，所取的值若为undefined将默认使用页面title
            // config.bdDesc = 'shareTo ' + cmd;
            //cmd是分享目标id，例如人人的id是"renren"，可以用来识别具体分享到哪里
            // config.bdPic = 'http://temp.im/100x100/';
            config.bdPic = location.hostname + $('.myart img').eq(0).attr('src');
            //更改分享信息的缩略图
            // config.bdUrl = window.location.href + '?shareTo=' + cmd;
            //更改分享信息的url

            return config; //返回新的config
          }
        },[{
              tag : 'new_share',  
              bdSize : 32,      //图标尺寸, 16｜24｜32
              bdStyle : '0'     //图标类型, 0｜1｜2

        }]);
     });

     var vision=base.browser.ie;
       if(vision==0||vision>9){
        require('wow');
          wow = new WOW(
            {
              animateClass: 'animated',
              offset: 0
            }
          );
          wow.init();
        }

    //底部友情链接
    $('.f_link').on('mouseenter',function(){
      $(this).addClass('f_on').find('.option').stop().slideDown();
    }).on('mouseleave',function(){
      $(this).removeClass('f_on').find('.option').stop().slideUp();
    });


  }else{
    //底部友情链接
    $('.f_link').on('click',function(){
      $(this).toggleClass('f_on').find('.option').stop().slideToggle();
    });

    require('offcanvas');
    $('#menu').offcanvas();
  }
  
  $("header .search .hd").click(function(e){
    e.preventDefault();
    $("header nav li").addClass("hide");
    //$("header nav .line").hide()
    $("header .search .hd").addClass("hide");
    $("header .search a.close").show().stop().animate({
      top : 0,
      opacity : 1
    }, 500, "linear", function(){
      $("header .search-box").show();
      Enter($("header .search-box input").eq(0), "left", 0, 2, 500, 300)
      setTimeout(function(){
        $("header .search-box .list").show();
        Enter($("header .search-box .list").children().eq(0), "left", 0, $("header .search-box .list").children().length, 200, 100)
      }, 500)
    })
    $(".search-bg").stop().fadeIn(1000, "linear")
  })
  $("header .search a.close, .search-bg").click(function(e){
   $("header nav li, header .search .hd").removeClass("hide");
   // $("header nav .line").show()
    $("header .search a.close").hide().css({
      top : -10,
      opacity : 0
    })
    $(".search-bg, header .search-box").hide();
    $("header .search-box input").css({
      left: 20 + '%',
      opacity : 0
    })
    $("header .search-box .list").children().css({
      left: 20 + '%',
      opacity : 0
    })
  })

  function Enter(obj, direction, distance, number, time, delay) {
  // 从左往右，distance > 0
  if(direction == "left"){
    obj.stop().animate({
      left : distance,
      opacity : 1
    }, time)
    setTimeout(function(){
      if(obj.next().index() + 1 <= number){
        Enter(obj.next(), direction, distance, number, time, delay)
      }
    }, delay)
  }
  // 从上往下，distance > 0
  if(direction == "top"){
    obj.stop().animate({
      top : distance,
      opacity : 1
    }, time)
    setTimeout(function(){
      if(obj.next().index() + 1 <= number){
        Enter(obj.next(), direction, distance, number, time, delay)
      }
    }, delay)
  }
  // CSS3 X位移
  if(direction == "X"){
    obj.stop().transition({
      x : distance,
      opacity : 1
    }, time)
    setTimeout(function(){
      if(obj.next().index() + 1 <= number){
        Enter(obj.next(), direction, distance, number, time, delay)
      }
    }, delay)
  }
  if(direction == "Y"){
    obj.stop().transition({
      y : distance,
      opacity : 1
    }, time)
    setTimeout(function(){
      if(obj.next().index() + 1 <= number){
        Enter(obj.next(), direction, distance, number, time, delay)
      }
    }, delay)
  }
}
  

  ///////////请不要注释或者删除。。。。
  //$('body').removeClass('afterLogin');
  $.post("/core/control/wcm_common_member/control.jsp",{"method":"checkLogin"},function(data){
    var html="";
    var mo="";

      if(data.indexOf('loginout')!=-1){
          html="<span class='lt'><a href='/site/login.htm' target='_blank'>登录</a><em class='b'>|</em><a href='/site/regist.htm' target='_blank'>注册</a></span>";
        mo="  <li class='mobile_show mobile_login'><a href='/site/login.htm'>登录</a></li>"+
        "<li class='mobile_show mobile_login'><a href='/site/regist.htm'>注册</a></li>";
      }else{
        //$('body').addClass('afterLogin');
        html="<span class='lt'>尊敬的 <a href='/member/my-activities-list-0.htm' id='usern'>"+data+" </a>，欢迎来到德稻教育</a><em class='b'>|</em><a href='javascript:;' class='logout'>退出</a></span>";
        mo+="<li class='mobile_show mobile_login'><a href='javascript:;' class='logout'>退出</a></li>";     
      }
      html+="<span class='lt lang'><a href='/'>中文</a><em class='b'>|</em><a href='/en/'>EN</a></span>";
      mo+="<li class='mobile_show'><a href='/'>中文</a></li>"+
          "<li class='mobile_show'><a href='/en/'>English</a></li>";
      $('#loginLink').html(html);
     // console.log(mo);
      $('#menusList').append(mo);
        //点击退出按钮
      $('.logout').on('click',function(){
        //console.log("退出");
          //清除cookie
          // $.cookie("remPwd","",{expires:7,path:'/'});     
          // $.cookie("remName","",{expires:7,path:'/'});
          $.post("/core/control/wcm_common_member/control.jsp",{"method":"logout"},function(data){
            window.location.reload();
          });
      });
  });


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})