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
  	if(base.getType() == "Mobile"){
      //小导航样式
      $(".full_section").eq(0).css({"z-index":2,"overflow":"inherit"});
      base.navHandle();
    }

    //获取数组
      var flagArr = new Array();
      $(".dt_sele_ser li input[type='hidden']").each(function(i){
         flagArr.push($(this).attr("id"));
      });     
    function getParam(f) { 
      for(var i=0;i<flagArr.length;i++){
        if(f!=flagArr[i]){     
       //   getAjax(flagArr[i]);
            $.post("/ext/ajax_dashi_param.jsp",{flag:flagArr[i],"fieldId": $("#fieldId").val(),"nationId": $("#nationId").val(), "prizeId": $("#prizeId").val()},function(data){                    
                  if(data.indexOf("flag")!=-1){                    
                     data=JSON.parse($.trim(data));  
                      var html='<a id="" href="javascript:;">全部</a>';
                       var params = eval(data.params);
                       for(var i=0;i<params.length;i++){
                         html+="<a id='"+params[i].id+"'' href='javascript:;'>"+params[i].name+"</a>";
                       }
                     //  console.log("html||"+html);
                     $("#s"+data.flag).html(html);  
                  }                       
              });
          }
        }              
      }
    

    // function getAjax(f){
    //     switch(f){
    //         case "fieldId":
    //             $.post("/ext/ajax_dashi_param.jsp",{flag:f,"fieldId": $("#fieldId").val(),"nationId": $("#nationId").val(), "prizeId": $("#prizeId").val()},function(data){            
    //                 if(data.indexOf("a")!=-1){
    //                   $("#sfieldId").html(data);        
    //                 }
    //             });
    //         break;
    //       case "nationId":
    //             $.post("/ext/ajax_dashi_param.jsp",{flag:f,"fieldId": $("#fieldId").val(),"nationId": $("#nationId").val(), "prizeId": $("#prizeId").val()},function(data){            
    //                     if(data.indexOf("a")!=-1){
    //                       $("#snationId").html(data);        
    //                     }
    //                 });
    //             break;
    //       case "titleId":
    //           $.post("/ext/ajax_dashi_param.jsp",{flag:f,"fieldId": $("#fieldId").val(),"nationId": $("#nationId").val(), "prizeId": $("#prizeId").val()},function(data){            
    //                   if(data.indexOf("a")!=-1){
    //                     $("#stitleId").html(data);        
    //                   }
    //               });
    //           break;
    //        case "prizeId":
    //           $.post("/ext/ajax_dashi_param.jsp",{flag:f,"fieldId": $("#fieldId").val(),"nationId": $("#nationId").val(), "prizeId": $("#prizeId").val()},function(data){            
    //                   if(data.indexOf("a")!=-1){
    //                     $("#sprizeId").html(data);        
    //                   }
    //               });
    //           break;
    //       default:break;
    //     } 
    // }
    var flag="";
    if(base.getType()=='Pc'){
      $('.dt_sele_ser li').each(function(i,e){
          $(this).mouseenter(function(){              
              $('.dt_sele_ser li').eq(i).find('._options').stop().slideDown('fast');
              $('.dt_sele_ser li').eq(i).find('._options a').click(function(e) {
                e.preventDefault();
                $(this).parents('._options').slideUp('fast');              
                $('.dt_sele_ser li').eq(i).find('._val').text($(this).text());
                $('.dt_sele_ser li').eq(i).find("input[type='hidden']").val($(this).attr("id"));  
                //获得参数
                flag= $('.dt_sele_ser li').eq(i).find("input[type='hidden']").attr("id");
                getParam(flag);
                $('#newsForm').submit();
              });
          }).mouseleave(function(){
             $(this).find('._options').stop().slideUp('fast');
          })
      })
    }else{
       $('.dt_sele_ser li').each(function(i,e){
          $(this).click(function(){
              $('.dt_sele_ser li').eq(i).find('._options').stop().slideToggle('fast');
              $('.dt_sele_ser li').eq(i).find('._options a').click(function(e) {
                e.preventDefault();
                 $('.dt_sele_ser li').eq(i).find('._val').text($(this).text());
                 $(this).parents('._options').slideUp('fast');
                 $('.dt_sele_ser li').eq(i).find("input[type='hidden']").val($(this).attr("id"));
                 $('#newsForm').submit();
              });
          })
        })
    }
    
     //数字滚动效果
  /*require('animate-number');
  var $digs = $('.widget-area'),
    distance = $digs.offset().top - $(window).height() + 200;
    $digs.find('li').each(function(i, e) {
    $(e).find('p').data('v', $(e).find('p').text()).text('99');
  })
  var _num01=$('.odometer1').text();
  var _num02=$('.odometer2').text();
  var _num03=$('.odometer3').text();
  var sec2func = function() {
    if ($(window).scrollTop() > distance) {
      $('.odometer1').stop().prop('number', 10).animateNumber({ number: _num01 },1000);
      $('.odometer2').stop().prop('number', 99).animateNumber({ number: _num02 },1000);
      $('.odometer3').stop().prop('number', 99).animateNumber({ number: _num03 },1000);
      
      $(window).unbind('scroll', sec2func);     
    }
  }
  $(window).on('scroll', sec2func);*/
    //数据加载更多
    //加载模块
    //require('masonry');
   // require('img-loaded');
    //require('./blocksit.min');
    //定义变量
    var $container = $('#container'),
        win = $('#st_data_more'),
        loaded = true;
    /*$container.imagesLoaded(function() {
        $container.masonry({
            itemSelector: 'li'
        })
    });*/
    //滚动加载
    win.bind('click', function() {
        $('.pj-lb-more .loading').show();
        $('.pj-lb-more a').hide();
        addItem();
    });
  var do_load=true;
    function addItem(n) {
		if(do_load){
			do_load=false;		
			loaded = false;
			if(n==1){
				loaded =true;
			}
			base.toload({
				reload:loaded,
				type: 'get',
				url: '/tools/ajax_dedaodashi.jsp',
				data: {
					"fieldId": $("#fieldId").val(),
					"nationId": $("#nationId").val(),
					"titleId": $("#titleId").val(),
					"prizeId": $("#prizeId").val(),
					"keywords":$("#keywords").val()
				},
				dataType:'html',
				success: function(d) {
					if ($.trim(d) == null) {
						win.unbind("scroll");
					} else {  
                   
						if( $('#container').find('li').length%3!=0||(d.indexOf("li")==-1)){ 
							//s_win.unbind("scroll");
							$('#st_data_more').html("已加载完成…").addClass('load_end');
							$('.pj-lb-more').show();
							  setTimeout(function(){
								$('.pj-lb-more').hide();
							  },2000);
						  }else{
							  do_load=true;
							  $('.pj-lb-more').show();
							  setTimeout(function(){
								 $('#container').append(d);   
								$('.pj-lb-more').hide();
							  },1000);
						  }                 
					}
				}
			});
		}
    };
    require('validform');
    var newsForm = $('#newsForm').Validform({
        tiptype:4,
        ajaxPost:true,
        showAllError:true,
        beforeSubmit: function(form) {
			do_load=true;
            $("input[name='nationId']").val($("#nationId").val());
            $("input[name='titleId']").val($("#titleId").val());
            $("input[name='prizeId']").val($("#prizeId").val());
            $("input[name='fieldId']").val($("#fieldId").val());
        },
        callback:function(rs){
             $("#container").html("");
             addItem(1);
        }
    });
    addItem();


    //滚动加载
    var s_win=$(window),sTimer,
      _this = $('#container');
    s_win.scroll(function scrollHandler(){
      clearTimeout(sTimer);
      sTimer = setTimeout(function(){
        if(s_win.loaded == 1){
          s_win.unbind("scroll", scrollHandler);
        }
        var t=s_win.scrollTop(),
        h=s_win.height(),
        t1= _this.offset().top, 
        h1 =_this.outerHeight(true) ;
        if(t+h >= t1+h1){
          addItem();
          }
      },100);
    });
  
});