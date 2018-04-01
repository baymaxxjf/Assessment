$(document).ready(function () {
	var isactive=false,isall=true,iscompeled=false,selectAll=false;//状态值 
	function completed(){//筛选完成事件
		var complete=[];
		$('.toggle').each(function(index,elem){
			if(elem.checked){
				complete.push(elem);
			}
		});
		return complete;
	}
	function isNoSelect(){//判断是否全部事件未被选中
		var toggle=$('.toggle');
		for(var i=0; i<toggle.length;i++){
			if (toggle[i].checked) {
				selectAll=false;
				break;
			}
			if (i==toggle.length-1) {
				selectAll=true;
			}
		}	
		return selectAll;
	}	
	function actived(){//筛选未完成事件
		var active=[];
		$('.toggle').each(function(index,elem){
			if (!elem.checked) {
				active.push(elem);
			}
		});
		return active;
	}
	function clickAll(){//点击all后的处理函数
		$('.todo_li').each(function(index,elem){
			$(elem).attr('class','todo_li todo_li_block');
		});
	}
	function clickActive(){//active状态的处理函数
		var complete=completed();
		$.each(complete,function(index,elem){
			$(elem.parentNode).attr('class','todo_li todo_li_none');
		});
		var active=actived();
		$.each(active,function(index,elem){
			$(elem.parentNode).attr('class','todo_li todo_li_block');
		});	
	}
	function clickCompleted(){//active状态的处理函数
		var complete=completed();
		$.each(complete,function(index,elem){
			$(elem.parentNode).attr('class','todo_li todo_li_block');
		});
		var active=actived();
		$.each(active,function(index,elem){
			$(elem.parentNode).attr('class','todo_li todo_li_none');
		});			
	}
	function isSelectAll(){//判断是否全部事件被选中
		var toggle=$('.toggle');
		for(var i=0; i<toggle.length;i++){
			if (!toggle[i].checked) {
				return false;
				break;
			}
			if (i==toggle.length-1) {
				return true;
			}
		}	
	}
	function showLefts(){
		var n=actived().length;
		var num=$(".number");
		num[0].innerText=n;
	}	
	function main(){
		var data=JSON.parse(localStorage.getItem("todo" ));
		if(iscompeled){clickCompleted();}//过滤完成事件
		showLefts();//初始化未完成事件数
		var toggle=$('.toggle');
		var toggle_all=$('.toggle_all');
		$('.toggle:last').on('click',function(event){//监听选中按钮
			var e=event||window.event;
			var elem=e.srcElement||e.target;
			var next=elem.nextSibling;
			var data=JSON.parse(localStorage.getItem("todo" ));
			for(var j=data.length-1; j>=0;j--){
				if (data[j].id==elem.parentNode.id) {
					data[j].completed=elem.checked;//更改是否存储完成状态值
					localStorage.setItem("todo",JSON.stringify(data) ); 
					break;
				}
			}					
			if(elem.checked){//出现clear按钮和改变文字显示
				$('.clear:first').addClass("clear_inline");	
				$(next).addClass('view_change');
				if(isactive){						
					clickActive();//处于active
				}	
			}else{
				if (iscompeled) {
					clickCompleted();//处于complete
				}
				$(next).removeClass('view_change');
			}
			if(isSelectAll()){//选中全部
				$(".toggle_all:first").addClass('toggle_all_color');
			}else{
				$(".toggle_all:first").removeClass('toggle_all_color');
			}
			if(isNoSelect()){//没有选中
				$('.clear:first').removeClass("clear_inline");			
			}
		});
		var close=$('.close');
		var todo_li=$('.todo_li');
		generalCode(close.length-1);		
	}
	function generalCode(index){
		var close=$('.close');
		$(close[index]).on('click',function(event){//控制事件的删除
			var e=event||window.event;//防止初始化失败
			var elem=e.srcElement||e.target;//点击或触摸点的元素的节点
			elem=elem.parentNode;							
			var parent=elem.parentNode;
			for(var i=data.length-1; i>=0;i--){
				if (data[i].id==elem.id) {
					data.splice(i,1);//删除选中的单条数据
					localStorage.setItem("todo",JSON.stringify(data) ); 
					break;
				}
			}
			elem.parentNode.removeChild(elem);
			showLefts();//清除事件后重新统计active
			if(isNoSelect()){
				$('.clear:first').removeClass("clear_inline");			
			}
			if(!parent.hasChildNodes()){//如果所有事件都没有-恢复原状
				$('.toggle_all:first').removeClass("togggle_all_visible");
				$('.menu:first').addClass('menu_none');
				$('.all:first').addClass('all_change');
				$('.active:first').removeClass('active_change');
				$('.completed:first').removeClass('completed_change');
				isall=true;
				iscompeled=false;
				isactive=false;
			}
		});
		//控制内容的展示
		var toggle=$('.toggle');
		$(toggle[index]).on('change',function(){
			showLefts();//统计未完成事件数
		});		
		var view=$('.view');
		$(view[index]).on('dblclick',function(event){//双击显示内容编辑
			var e=event||window.event;
			var elem=e.srcElement||e.target;
			var edit=elem.parentNode.lastChild;
			var toggle=elem.previousSibling;
			var todo_ul=elem.parentNode.parentNode;
			elem.style.display="none";//隐藏展示内容的div
			edit.style.display="block";//显示编辑的div
			edit.value=elem.innerHTML;
			edit.focus();//获取展示内容并获取焦点
			$(edit).on('keypress',function(event){
				if(event.keyCode=="13"){			
					edit.blur();
				}
			});//按回车或失去焦点保存编辑内容
			$(edit).on('blur',function(){
				if (edit.value) {
					$.each(data,function(index,value){
						if (value.id==elem.parentNode.id) {
							value.title=edit.value;//如果还有编辑内容修改数据内容
							localStorage.setItem("todo",JSON.stringify(data) ); 
							return false;
						}
					});
					elem.innerText=edit.value;
				}else{
					$.each(data,function(index,value){
						if (value.id==elem.parentNode.id) {
							data.splice(index,1);//没有则删掉数据
							localStorage.setItem("todo",JSON.stringify(data) ); 
							return false;
						}
					});	
					if(edit.parentNode.parentNode){
						edit.parentNode.parentNode.removeChild(edit.parentNode);
					}
					if(!todo_ul.hasChildNodes()){
						$('.toggle_all:first').removeClass("togggle_all_visible");
						$('.menu:first').addClass('menu_none');
					}
					showLefts();//编辑状态的的统计
				}
				elem.style.display="block"
				edit.style.display="none";//编辑完恢复原来的显示
				toggle.style.visibility="visible";
			});
			toggle.style.visibility="hidden";//编辑状态隐藏选择按钮	
		});
	}
	(function(){ //重新加载时获取数据恢复原来的事件 
		var data=JSON.parse(localStorage.getItem("todo" ));
		if(data.length!=0){ //如果有值恢复menu栏和全选开关
			$('.toggle_all:first').addClass("togggle_all_visible");
			$('.menu:first').removeClass('menu_none');	
			for(var i=0;i<data.length;i++){//遍历数据渲染页面
				var todo_ul=$('.todo_ul');
				var li=document.createElement('li');
				li.className ="todo_li";
				li.id=(data[i].id);
				todo_ul[0].appendChild(li);
				var todo_li=$('.todo_li');
				var new_toggle=document.createElement('input');
				new_toggle.type="checkbox";
				new_toggle.className="toggle";
				todo_li[todo_li.length-1].appendChild(new_toggle);
				var new_view=document.createElement('label');
				new_view.className="view";
				new_view.innerText=data[i].title;
				todo_li[todo_li.length-1].appendChild(new_view);
				if(data[i].completed){//如果数据有完成的事件
					$('.clear:first').addClass("clear_inline");
					new_toggle.checked="checked";//初始化成应有的状态
					$($('.view')[i]).addClass('view_change');
				}
				var new_close=document.createElement('button');
				new_close.className="close";
				todo_li[todo_li.length-1].appendChild(new_close);
				var new_edit=document.createElement('input');
				new_edit.type="text";
				new_edit.className="edit";
				todo_li[todo_li.length-1].appendChild(new_edit);
			}
			showLefts();//统计未完成事件数
			var toggle=$('.toggle');
			var toggle_all=$('.toggle_all');
		    for(var x=0;x<toggle.length;x++){
				$(toggle[x]).on('click',function(event){//监听选中按钮
					var e=event||window.event;
					var elem=e.srcElement||e.target;
					var next=elem.nextSibling;
					var data=JSON.parse(localStorage.getItem("todo" ));
					$.each(data,function(index,value){
						if (value.id==elem.parentNode.id) {
							value.completed=elem.checked;//更改是否存储完成状态值
							localStorage.setItem("todo",JSON.stringify(data) ); 
							return false;
						}
					})					
					if(elem.checked){//出现clear按钮和改变文字显示
						$('.clear:first').addClass("clear_inline");
						$(next).addClass('view_change');
						if(isactive){						
							clickActive();//处于active
						}	
					}else{
						if (iscompeled) {
							clickCompleted();//处于complete
						}
						$(next).removeClass('view_change');
					}
					if(isSelectAll()){//选中全部
						$(".toggle_all:first").addClass('toggle_all_color');
					}else{
						$(".toggle_all:first").removeClass('toggle_all_color');
					}
					if(isNoSelect()){//没有选中
						$('.clear:first').removeClass("clear_inline");			
					}
				});
			}
			if(isSelectAll()){//初始化全选按钮
			$(".toggle_all:first").addClass('toggle_all_color');
			}		
			var close=$('.close');
			var todo_li=$('.todo_li');
			$.each(close,function(index,elem){
			 	generalCode(index);
			})
		}	
	})();
	//回车创建并记录事件
	var index=0;//新建事件的索引
	var data=JSON.parse(localStorage.getItem("todo" ));
	if(!!data){
		if (data.length) {//如果还有数据
		var str=data[data.length-1].id;
		index=parseInt(str.slice(1))+1;//将索引值更新为最后一个id值+1
		}
	}
	var todo_input=$('.todo_input');	
	$(todo_input[0]).on('keypress',function(event){
		if(event.keyCode=="13"&&todo_input[0].value){//判断回车和是否有值
			$('.toggle_all:first').addClass("togggle_all_visible");
			$('.menu:first').removeClass('menu_none');
			var todo_ul=$('.todo_ul');
			var li=document.createElement('li');
			li.className = "todo_li";		
			li.id=("p"+index++);				
			todo_ul[0].appendChild(li);
			var todo_li=$('.todo_li');
			var new_toggle=document.createElement('input');
			new_toggle.type="checkbox";
			new_toggle.className="toggle";
			todo_li[todo_li.length-1].appendChild(new_toggle);
			var new_view=document.createElement('label');
			new_view.className="view";
			new_view.innerText=todo_input[0].value;//获取输入的值
			todo_input[0].value="";
			todo_li[todo_li.length-1].appendChild(new_view);
			var new_close=document.createElement('button');
			new_close.className="close";
			todo_li[todo_li.length-1].appendChild(new_close);
			var new_edit=$("<input />").attr({
				type:"text",
				"class":"edit"
			})
			$(new_edit).appendTo(todo_li[todo_li.length-1])
			main();
			selectAll=false; 									
			$(".toggle_all:first").removeClass('toggle_all_color');
		}
	});
	$('.active:first').on('click',function(){//点击active修改样式
		$('.active:first').addClass('active_change');
		$('.all:first').removeClass('all_change');
		$('.completed:first').removeClass('completed_change');
		isactive=true;
		isall=false;
		iscompeled=false;
		clickActive();
	});
	$('.all:first').on('click',function(){//点击all修改样式
		$('.all:first').addClass('all_change');
		$('.active:first').removeClass('active_change');
		$('.completed:first').removeClass('completed_change');
		isall=true;
		iscompeled=false;
		isactive=false;
		clickAll();
	});
	$('.completed:first').on('click',function(){//点击compelete修改样式
		$('.completed:first').addClass('completed_change');
		$('.all:first').removeClass('all_change');
		$('.active:first').removeClass('active_change');
		isall=false;
		iscompeled=true;
		isactive=false;
		clickCompleted();
	});
	$('.toggle_all:first').on('click',function(){//控制所有事件的是否全选
		var toggle=$('.toggle');
		var data=JSON.parse(localStorage.getItem("todo" ));
		var view=$('.view');
		if(!(isSelectAll())){
			$.each(data,function(index,value){
				value.completed=true;//改变所有数据complete状态值
				localStorage.setItem("todo",JSON.stringify(data) ); 
			});
			$('.clear:first').addClass("clear_inline");
			$('.toggle_all:first').addClass('toggle_all_color');
			$.each(toggle,function(index,value){
				value.checked="checked";
				$(view[index]).addClass('view_change');	
			});
			if(isactive){						
				clickActive();
			}
			if(iscompeled){
				clickCompleted();
			}
			selectAll=true;
		}else{
			$.each(data,function(index,value){
				value.completed=false;//改变所有数据complete状态值
				localStorage.setItem("todo",JSON.stringify(data) ); 
			});
			$('.clear:first').removeClass("clear_inline");	
			$('.toggle_all:first').removeClass('toggle_all_color');
			$.each(toggle,function(index,value){
				value.checked="";
				$(view[index]).removeClass('view_change');
			});
			if(isactive){						
				clickActive();
			}
			if(iscompeled){
				clickCompleted();
			}
			selectAll=false;
		}
		showLefts();//统计未完成事件数
	});
	$('.clear:first').on('click',function(){	//点击清除所有	
		var data=JSON.parse(localStorage.getItem("todo" ));
		var complete=completed();
		for(var i=0;i<complete.length;i++){
			for(var j=0; j<data.length;j++){
				if (data[j].id==complete[i].parentNode.id) {
					data.splice(j,1);//删除完成事件的数据
					localStorage.setItem("todo",JSON.stringify(data) ); 
					break;
				}
			}
			complete[i].parentNode.parentNode.removeChild(complete[i].parentNode);
		}
		if(!$('.todo_ul')[0].hasChildNodes()){		
			$(".toggle_all:first").removeClass('toggle_all_color');
			$('.clear:first').removeClass("clear_inline");	
			$('.toggle_all:first').removeClass("togggle_all_visible");
			$('.menu:first').addClass('menu_none');
			$('.all:first').addClass('all_change');
			$('.active:first').removeClass('active_change');
			$('.completed:first').removeClass('completed_change');
			isall=true;
			iscompeled=false;
			isactive=false;
		}
		$('.clear:first').removeClass("clear_inline");	
	});	
	$(window).on('beforeunload',function(){ //在页面关闭时保存数据 
		var arr=[];
		var toggle=$(".toggle");   					
			for(var x=0;x<toggle.length;x++){
				var obj={id:null,title:null,completed:null};
					obj.id=toggle[x].parentNode.id;//新建对象
					obj.title=toggle[x].nextSibling.innerText;
					obj.completed=toggle[x].checked;
					arr.push(obj);//将对象压入数组
			} 			
			localStorage.setItem("todo",JSON.stringify(arr) ); 
	});
});
