(function(){
	 	//搜索框获得或失去焦点
	var id=document.getElementById('search');
	id.onfocus=function(){
		id.style.border="1px solid #42b983"; 
	}
 	id.onblur=function(){
		id.style.border="1px solid #e3e3e3"; 
	}
	var id1=document.getElementById('moblie_search');
	id1.onfocus=function(){
		id1.style.border="1px solid #42b983"; 
	}
 	id1.onblur=function(){
		id1.style.border="1px solid #e3e3e3"; 
	}
	//todo的导航栏的切换
	function getScrollTop() {  
        var scrollPos;  
        if (window.pageYOffset) {  
        scrollPos = window.pageYOffset; }  
        else if (document.compatMode && document.compatMode != 'BackCompat')  
        { scrollPos = document.documentElement.scrollTop; }  
        else if (document.body) { scrollPos = document.body.scrollTop; }   
        return scrollPos;   
	}
	var result_a=document.getElementsByClassName("result_a")[0];
	var html_a=document.getElementsByClassName("html_a")[0];
	var js_a=document.getElementsByClassName("js_a")[0];
	var css_a=document.getElementsByClassName("css_a")[0];
	result_a.addEventListener('click',function(){
		var ScrollTop=getScrollTop();
		setTimeout(function(){
			window.pageYOffset=ScrollTop;
			document.documentElement.scrollTop=ScrollTop;
			document.body.scrollTop=ScrollTop;
		},0)		
		result_a.style.borderBottom="3px solid #0084ff";
		html_a.style.borderBottom="none";
		js_a.style.borderBottom="none";
		css_a.style.borderBottom="none";
	},true);
	html_a.addEventListener('click',function(){
		var ScrollTop=getScrollTop();
		setTimeout(function(){
			window.pageYOffset=ScrollTop;
			document.documentElement.scrollTop=ScrollTop;
			document.body.scrollTop=ScrollTop;
		},0)
		html_a.style.borderBottom="3px solid #0084ff";
		result_a.style.borderBottom="none";
		js_a.style.borderBottom="none";
		css_a.style.borderBottom="none";
	},true);
	js_a.addEventListener('click',function(){
		var ScrollTop=getScrollTop();
		setTimeout(function(){
			window.pageYOffset=ScrollTop;
			document.documentElement.scrollTop=ScrollTop;
			document.body.scrollTop=ScrollTop;
		},0)
		js_a.style.borderBottom="3px solid #0084ff";
		html_a.style.borderBottom="none";
		result_a.style.borderBottom="none";
		css_a.style.borderBottom="none";
	},true);
	css_a.addEventListener('click',function(){
		var ScrollTop=getScrollTop();
		setTimeout(function(){
			window.pageYOffset=ScrollTop;
			document.documentElement.scrollTop=ScrollTop;
			document.body.scrollTop=ScrollTop;
		},0)
		css_a.style.borderBottom="3px solid #0084ff";
		html_a.style.borderBottom="none";
		js_a.style.borderBottom="none";
		result_a.style.borderBottom="none";
	},true);
	var nav_img=document.getElementsByClassName('nav_img');
	nav_img[0].onclick=function(){
		document.getElementsByClassName('left_bar')[0].style.display="block";
	}
})();
//控制点击其他区域隐藏侧边栏
document.body.addEventListener('click',function(event){
	var e=event||window.event;//防止初始化失败
	var elem=e.srcElement||e.target;//点击或触摸点的元素的节点
	while(elem){
		if(elem!=document.body){
			if(elem.id=='target_area'||elem.id=='nav_id'){
				return;
			}
			elem=elem.parentNode;
		}else{
			if(document.getElementsByClassName('left_bar')[0].style.display!="none")
			{
				document.getElementsByClassName('left_bar')[0].style.display="none";
			}		
			return;
		}
	}
},true);
