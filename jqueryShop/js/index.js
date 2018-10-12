 /**
*
*搜索框文字效果(input.js)
**/
$(function(){
	$("#inputSearch").focus(function(){
		$(this).addClass("focus");
		if ($(this).val() == this.defaultValue){
			$(this).val("");
		}
	})
	.blur(function(){
		$(this).removeClass("focus");
		if($(this).val() == ""){
			$(this).val(this.defaultValue);
		}
	})
	.keyup(function(e){
		if(e.which == 13){
			alert("回车提交信息！");
		}
	})
})
/*
*
*网页换肤(changeSkin.js)
*/
$(function(){
	var $li = $("skin li");
	$li.click(function(){
		switchSkin(this.id);
	})
	var cookie_skin = $.cookie("MyCssSkin");
	if(cookie_skin){
		switchSkin(cookie_skin);
	}
});
function switchSkin(skinName){
	$('#'+skinName).addClass("selected")
	.siblings().removeClass("selected");
	$("#cssfile").attr("href","style/skin/"+skinName+".css");
	// 设置不同的皮肤
	$.cookie("MyCssSkin",skinName,{path: '/',expires:10}); 
}

/*
*导航效果（nav.js）
*
*/ 
$(function(){
   $("#nav li").hover(function(){
		$(this).find(".jnNav").show();
	},function(){
		$(this).find(".jnNav").hide();
	});
})

/*
*
*左侧商品分类热销效果(addhot.js)
*/
$(function(){
	$(".jnCatainfo .promoted").append('<s class="hot"></s>');
})

/*
*
*右侧上部产品广告效果(ad.js)
*/
$(function(){
	var $imgrolls = $("#jnImageroll div a");
	$imgrolls.css("opacity","0.7");
	var len = $imgrolls.length;
	var index = 0;
	var adTimer = null;
	$imgrolls.mouseover(function(){
		index = $imgrolls.index(this);
		showImage(index);
	}).eq(0).mouseover();


	// 滑入停止动画，滑出开始动画

	$("#jnImageroll").hover(function(){
		if(adTimer){
			clearInterval(adTimer);
		}
	},function(){
		adTimer = setInterval(function(){
			showImage(index);
			index++;
			if(index == len){
				index = 0;
			}
		},1000);
	}).trigger("mouseleave");

})

//通过index值显示图片 
function showImage(index){
	var $rollobj = $("#jnImageroll");
	var $rolllist = $rollobj.find("div a");
	var newhref = $rolllist.eq(index).attr("href");
	$("#JS_imgWrap").attr("href",newhref)
					.find("img").eq(index).stop(true,true).fadeIn()
					.siblings().fadeOut();
	$rolllist.removeClass("chos").css("opacity","0.7")
			 .eq(index).addClass("chos").css("opacity","1");
}

/*
*
*右侧下部品牌活动横向滚动效果(imgSlide.js)
*/

$(function(){
	var x = 10;
	var y = 20;
	$("a.tooltip").mouseover(function(e){
		this.myTitle = this.title;
		console.log(e.pageX);
		console.log(e.clientX);
		this.title = "";
		var tooltip = "<div id='tooltip'>" + this.myTitle + "</div>";
		$("body").append(tooltip);
		$("#tooltip")
					.css({
						"top": (e.pageY) + "px",
						"left": (e.pageX) + "px",
 					})
 					.show("fast");
	}).mouseout(function(){
		this.title = this.myTitle;
		$("#tooltip").remove();
	}).mousemove(function(e){
		$("#tooltip")
					.css({
						"top": (e.pageY + y) + "px",
						"left": (e.pageX + x) + "px",
					})
	});
})

/*
*
*右侧下部光标滑过产品列表效果(imgHover.js)
*/
$(function(){
	$("#jnBrandList li").each(function(index){
		var $img = $(this).find("img");
		var img_w = $img.width();
		var img_h = $img.height();
		var spanHtml = '<span style="position:absolute;top:0;width:'+img_w+'px;height:'+img_h+'px;" class="imageMask"></span>';
		$(spanHtml).appendTo(this);
	})
	// $("#jnBrandList li").delegate(".imageMask", "hover", function(){
	// 	console.log("啦啦")
	// 	$(this).toggleClass("imageOver");
	// });
	
	$("#jnBrandList").find(".imageMask").on("mouseenter mouseleave",function(){
		$(this).toggleClass("imageOver");
	})
	
})

/*
*
*右侧下部品牌活动横向滚动效果(imgSlide.js)
*/
$(function(){
	$("#jnBrandTab li a").click(function(){
		$(this).parent().addClass("chos")
						.siblings().removeClass("chos");
		var idx = $("#jnBrandTab li a").index(this);
		showBrandList(idx);
		return false;
	}).eq(0).click();
});

//显示不同的模块 

function showBrandList(index){
	var $rollobj = $("#jnBrandList");
	var rollWidth = $rollobj.find("li").outerWidth();
	rollWidth = rollWidth * 4; //一个版面的宽度
	$rollobj.stop(true,true).animate({left : -rollWidth*index}, 1000);
}

