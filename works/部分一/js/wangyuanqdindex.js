//兼容ie8不支持indexof
if (!Array.prototype.indexOf){
  Array.prototype.indexOf = function(elt /*, from*/){
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++){
      if (from in this && this[from] === elt)
        return from;
    }
    return -1;
  };
}
/*轮播图*/
	var request=new XMLHttpRequest();
	request.open("GET","https://api.kooritea.cc/get_img");
	request.responseType='text';
	var obj;
	request.onreadystatechange=function(){
		if (request.readyState ===4) {
	        if (request.status === 200) {
	        	var data=request.responseText;
	        	obj=JSON.parse(data);
	        	var arr=[obj.img[0],obj.img[1],obj.img[2]]
	        	var dot1=document.getElementById('dot1');
	        	var pic= document.getElementById('swiper_pic');
	        	pic.src=obj.img[0];//初始化
	        	dot1.addEventListener('click',function(){
		       		pic.src=obj.img[0];
		       		dot2.style.background="#fff";
		       		dot1.style.background="#5d5d5d";
		       		dot3.style.background="#fff";
	       		},true);
	       		var dot2=document.getElementById('dot2');	       
		       	dot2.addEventListener('click',function(){
		       		pic.src=obj.img[1];
		       		dot2.style.background="#5d5d5d";
		       		dot1.style.background="#fff";
		       		dot3.style.background="#fff";
		       	},true);
	       		var dot3=document.getElementById('dot3');
		       	dot3.addEventListener('click',function(){
		       		pic.src=obj.img[2];
		       		dot2.style.background="#fff";
		       		dot1.style.background="#fff";
		       		dot3.style.background="#5d5d5d";
		       		var index=arr.indexOf(pic.src);
		       	},true);	      
		       	var play=setInterval(function(){
					var index=arr.indexOf(pic.src);
					if((index+1)==3){
				    	index=0;
				    	dot2.style.background="#fff";
		       			dot1.style.background="#5d5d5d";
		       			dot3.style.background="#fff";

				    }else{
				    	index=index+1;
				    	if(index==1){
				    		dot2.style.background="#5d5d5d";
		       				dot1.style.background="#fff";
		       				dot3.style.background="#fff";
				    	}else{
				    		dot2.style.background="#fff";
		       				dot1.style.background="#fff";
		       				dot3.style.background="#5d5d5d";
				    	}
				    } 
				    pic.src=obj.img[index];
				},5000);
				pic.addEventListener('mouseover',function(){
					clearInterval(play);
				},true)
				pic.addEventListener('mouseout',function(){
					play=setInterval(function(){
					var index=arr.indexOf(pic.src);
					if((index+1)==3){
				    	index=0;
				    	dot2.style.background="#fff";
		       			dot1.style.background="#5d5d5d";
		       			dot3.style.background="#fff";

				    }else{
				    	index=index+1;
				    	if(index==1){
				    		dot2.style.background="#5d5d5d";
		       				dot1.style.background="#fff";
		       				dot3.style.background="#fff";
				    	}else{
				    		dot2.style.background="#fff";
		       				dot1.style.background="#fff";
		       				dot3.style.background="#5d5d5d";
				    	}
				    } 
				    pic.src=obj.img[index];
				},5000);
				},true);
	        }
	    }
	} 
	request.send();
/*处理广告栏和多选栏的关系*/
window.addEventListener('scroll',function test(){
   	var ad=document.getElementById('ad_id');
    var mutiselect=document.getElementById('mutiselect_id');
	if(document.body.scrollTop==0&&document.documentElement.scrollTop==0){        
	    ad.style.display="block";
	    mutiselect.style.display="none";
	  }else{
	   	ad.style.display="none";
	   	if (sousuo_id.style.display!="none"&&nav_id.style.display!="none") {
	   	 	 mutiselect.style.display="block";
	   	}
	        
	}
  
},true);
function openNav(){
	document.getElementById('nav_id').style.display="none";
	document.getElementById('close1').style.display="inline";
	document.getElementsByTagName('body')[0].style.background="#fff";
	document.getElementById('body').style.display="none";
	document.querySelector('.body1').style.display="block";

}
function closeNav(){
	var nav_id=document.getElementById('nav_id');
	var close1=document.getElementById('close1');
	close1.style.display="none";
	nav_id.style.display="inline";
	document.getElementsByTagName('body')[0].style.background="#ececec";
	document.getElementById('body').style.display="block";
	document.querySelector('.body1').style.display="none";
}

function openSearch(){
	var sousuo_id=document.getElementById('sousuo_id');
	var close2=document.getElementById('close2');
	sousuo_id.style.display="none";
	close2.style.display="inline";
	document.getElementsByTagName('body')[0].style.background="#fff";
	document.getElementById('body').style.display="none";
	document.querySelector('.search').style.display="block";
}
function closeSearch(){
	var sousuo_id=document.getElementById('sousuo_id');
	var close2=document.getElementById('close2');
	sousuo_id.style.display="inline";
	close2.style.display="none";
	document.getElementsByTagName('body')[0].style.background="#ececec";
	document.getElementById('body').style.display="block";
	document.querySelector('.search').style.display="none";
}
var nav_id=document.getElementById('nav_id');
nav_id.addEventListener('click',function (){
	if(sousuo_id.style.display=="none"){
		closeSearch()

	}
	openNav();
	document.body.scrollTop?document.body.scrollTop=0:document.documentElement.scrollTop=0;
	document.getElementsByTagName('body')[0].style.overflow="hidden";
},true);
var close1=document.getElementById("close1");
close1.addEventListener('click',function(){
	closeNav();
	document.getElementsByTagName('body')[0].style.cssText="overflow-y:auto";
},true);
sousuo_id.addEventListener('click',function(){
	if (nav_id.style.display=="none") {
		closeNav();
	}
	openSearch();
	document.body.scrollTop?document.body.scrollTop=0:document.documentElement.scrollTop=0;
	document.getElementsByTagName('body')[0].style.overflow="hidden";
},true);
 close2.addEventListener('click',function(){
 	closeSearch();
	document.getElementsByTagName('body')[0].style.cssText="overflow-y:auto";
 },true);
 var xiangxia1=document.getElementById('xiangxia1');
 var xiangxia2=document.getElementById('xiangxia2');
 var xiangshang1=document.getElementById('xiangshang1');
 var xiangshang2=document.getElementById('xiangshang2');
 function openFile(){
 	xiangxia1.style.display="none";
 	xiangshang1.style.display="inline";
 	document.querySelector('.file_option').style.display="block";
 }
 function closeFile(){
 	xiangxia1.style.display="inline";
 	xiangshang1.style.display="none";
 	document.querySelector('.file_option').style.display="none";
 }
 function openDate(){
 	xiangxia2.style.display="none";
 	xiangshang2.style.display="inline";
 	document.querySelector('.date_option').style.display="block";
 }
 function closeDate(){
 	xiangxia2.style.display="inline";
 	xiangshang2.style.display="none";
 	document.querySelector('.date_option').style.display="none";
 }
 xiangxia1.addEventListener('click',function(){
 	if (xiangxia2.style.display=="none") {
 		closeDate();
 	}
 	openFile();
 },true);
 xiangshang1.addEventListener('click',function(){
 	closeFile();
 },true);

 xiangxia2.addEventListener('click',function(){
 	if(xiangxia1.style.display=="none"){
 		closeFile();
 	}
 	openDate();
 },true);
 xiangshang2.addEventListener('click',function(){
 	closeDate();
 },true);
var label=document.getElementsByTagName("label");
for(var i=0;i<label.length;i++){
	label[i].addEventListener('click',function(event){
		var e=event||window.event;
		var elem= e.srcElement||e.target;
		console.log(elem.parentNode.previousSibling.previousSibling.checked);
		setTimeout(function(){
			if(elem.tagName=="DIV"){
				if (elem.parentNode.previousSibling.previousSibling.checked) {
					elem.style.background="#6e6969";
					// alert("gerg");
				}else{
					
					elem.style.background="#fff";
				}
			}else{
				if (elem.previousSibling.previousSibling.checked) {
					elem.firstChild.nextSibling.style.background="#6e6969";
					// alert("gerg");
				}else{

					elem.firstChild.nextSibli.style.background="#fff";
				}
			}
		},0)	
	},true);

}
function hover(className){
	var className=document.querySelector("."+className);
	var a=[];
	var p=className.parentNode.children;
	for(var i =0,pl= p.length;i<pl;i++) {
		if(p[i] !== className) a.push(p[i]);
	}
	className.addEventListener('mouseover',function(){
			for(var j=0;j<a.length;j++){
			a[j].style.color="#ececec";
		}
	},true);
	className.addEventListener('mouseout',function(){
			for(var j=0;j<a.length;j++){
			a[j].style.color="#3d3d3d";
		}
	},true);
	
}
hover('Awards');
hover('About');
hover('Live_Judging');
hover('Profiles');
hover('Editorial');
hover('Jobs_a');

