(function(){
	var isactive=false;
	var isall=true;
	var iscompeled=false;
	var selectAll=false;//状态值 
	function completed(){//筛选完成事件
		var complete=[];
		var toggle=document.getElementsByClassName('toggle');
		for(var i=0; i<toggle.length;i++){
			if (toggle[i].checked) {
				complete.push(toggle[i]);
			}
		}
		return complete;
	}
	function isNoSelect(){//判断是否全部事件未被选中
		var toggle=document.getElementsByClassName('toggle');
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
		var toggle=document.getElementsByClassName('toggle');
		for(var i=0; i<toggle.length;i++){
			if (!toggle[i].checked) {
				active.push(toggle[i]);
			}
		}
		return active;
	}
	function clickAll(){//点击all后的处理函数
		var toggle=document.getElementsByClassName('toggle');
		for(var i=0; i<toggle.length;i++){
			toggle[i].parentNode.style.display="block";
		}
	}
	function clickActive(){//active状态的处理函数
			var complete=completed();
			for(var i=0;i<complete.length;i++){
				complete[i].parentNode.style.cssText="display:none";	
			}
			var active=actived();
			for(var i=0;i<active.length;i++){
				active[i].parentNode.style.cssText="display:block";	
			}		
	}
	function clickCompleted(){//active状态的处理函数
			var complete=completed();
			for(var i=0;i<complete.length;i++){
				complete[i].parentNode.style.cssText="display:block";	
			}
			var active=actived();
			for(var i=0;i<active.length;i++){
				active[i].parentNode.style.cssText="display:none";	
			}		
	}
	function isSelectAll(){//判断是否全部事件被选中
		var toggle=document.getElementsByClassName('toggle');
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
		var num=document.getElementsByClassName("number");
		num[0].innerText=n;
	}	
	function main(){
		var data=JSON.parse(localStorage.getItem("todo" ));
		if(iscompeled){clickCompleted();}//过滤完成事件
		showLefts();//初始化未完成事件数
		var toggle=document.getElementsByClassName('toggle');
		var toggle_all=document.getElementsByClassName('toggle_all');
		toggle[toggle.length-1].addEventListener('click',function(event){//监听选中按钮
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
				document.getElementsByClassName('clear')[0].style.display="inline";	
				next.style.cssText="text-decoration:line-through;color: #d9d9d9;";
				if(isactive){						
					clickActive();//处于active
				}	
			}else{
				if (iscompeled) {
					clickCompleted();//处于complete
				}
				next.style.cssText="color: #4d4d4d;text-decoration:none;"
			}
			if(isSelectAll()){//选中全部
				toggle_all[0].style.color="#737373";
			}else{
				toggle_all[0].style.color="#e6e6e6";
			}
			if(isNoSelect()){//没有选中
				document.getElementsByClassName('clear')[0].style.display="none";		
			}
		},true);
		var close=document.getElementsByClassName('close');
		var todo_li=document.getElementsByClassName('todo_li');
		generalCode(close.length-1);		
	}
	function generalCode(index){
		var close=document.getElementsByClassName('close');
		close[index].addEventListener('click',function(event){//控制事件的删除
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
				document.getElementsByClassName('clear')[0].style.display="none";		
			}
			if(!parent.hasChildNodes()){//如果所有事件都没有-恢复原状
				document.getElementsByClassName('toggle_all')[0].style.visibility="hidden";
				document.getElementsByClassName('menu')[0].style.display="none";
				document.getElementsByClassName('all')[0].style.cssText="border-color:rgba(175, 47, 47, 0.2)";
				document.getElementsByClassName('active')[0].style.cssText="border-color:transparent";
				document.getElementsByClassName('completed')[0].style.cssText="border-color:transparent";
				isall=true;
				iscompeled=false;
				isactive=false;
			}
		},true);
		//控制内容的展示
		var toggle=document.getElementsByClassName('toggle');
		toggle[index].addEventListener('change',function(){
			showLefts();//统计未完成事件数
		},true);		
		var view=document.getElementsByClassName('view');
		view[index].addEventListener('dblclick',function(event){//双击显示内容编辑
			var e=event||window.event;
			var elem=e.srcElement||e.target;
			var edit=elem.parentNode.lastChild;
			var toggle=elem.previousSibling;
			var todo_ul=elem.parentNode.parentNode;
			elem.style.display="none";//隐藏展示内容的div
			edit.style.display="block";//显示编辑的div
			edit.value=elem.innerHTML;
			edit.focus();//获取展示内容并获取焦点
			edit.addEventListener('keypress',function(event){
				if(event.keyCode=="13"){			
					edit.blur();
				}
			},true);//按回车或失去焦点保存编辑内容
			edit.addEventListener('blur',function(){
				if (edit.value) {
					for(var j=0; j<data.length;j++){
						if (data[j].id==elem.parentNode.id) {
							data[j].title=edit.value;//如果还有编辑内容修改数据内容
							localStorage.setItem("todo",JSON.stringify(data) ); 
							break;
						}
					}
					elem.innerText=edit.value;
				}else{
					for(var j=0; j<data.length;j++){
						if (data[j].id==elem.parentNode.id) {
							data.splice(j,1);//没有则删掉数据
							localStorage.setItem("todo",JSON.stringify(data) ); 
							break;
						}
					}	
					if(edit.parentNode.parentNode){
						edit.parentNode.parentNode.removeChild(edit.parentNode);
					}
					if(!todo_ul.hasChildNodes()){
						document.getElementsByClassName('toggle_all')[0].style.visibility="hidden";
						document.getElementsByClassName('menu')[0].style.display="none";
					}
					showLefts();//编辑状态的的统计
				}
				elem.style.display="block"
				edit.style.display="none";//编辑完恢复原来的显示
				toggle.style.visibility="visible";
			},true);
			toggle.style.visibility="hidden";//编辑状态隐藏选择按钮	
		},true);
	}
	window.addEventListener('load',function(){ //重新加载时获取数据恢复原来的事件 
		var data=JSON.parse(localStorage.getItem("todo" ));
		if(data.length!=0){ //如果有值恢复menu栏和全选开关
			document.getElementsByClassName('toggle_all')[0].style.visibility="visible";
			document.getElementsByClassName('menu')[0].style.display="block";	
			for(var i=0;i<data.length;i++){//遍历数据渲染页面
				var todo_ul=document.getElementsByClassName('todo_ul');
				var li=document.createElement('li');
				li.className ="todo_li";
				li.id=(data[i].id);
				todo_ul[0].appendChild(li);
				var todo_li=document.getElementsByClassName('todo_li');
				var new_toggle=document.createElement('input');
				new_toggle.type="checkbox";
				new_toggle.className="toggle";
				todo_li[todo_li.length-1].appendChild(new_toggle);
				var new_view=document.createElement('label');
				new_view.className="view";
				new_view.innerText=data[i].title;
				todo_li[todo_li.length-1].appendChild(new_view);
				if(data[i].completed){//如果数据有完成的事件
					document.getElementsByClassName("clear")[0].style.display="inline";	
					new_toggle.checked="checked";//初始化成应有的状态
					document.getElementsByClassName('view')[i].style.cssText="text-decoration:line-through;color:#d9d9d9";
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
			var toggle=document.getElementsByClassName('toggle');
			var toggle_all=document.getElementsByClassName('toggle_all');
		    for(var x=0;x<toggle.length;x++){
				toggle[x].addEventListener('click',function(event){//监听选中按钮
					var e=event||window.event;
					var elem=e.srcElement||e.target;
					var next=elem.nextSibling;
					var data=JSON.parse(localStorage.getItem("todo" ));
					for(var j=0; j<data.length;j++){
						if (data[j].id==elem.parentNode.id) {
							data[j].completed=elem.checked;//更改是否存储完成状态值
							localStorage.setItem("todo",JSON.stringify(data) ); 
							break;
							}
						}					
					if(elem.checked){//出现clear按钮和改变文字显示
						document.getElementsByClassName('clear')[0].style.display="inline";	
						next.style.cssText="text-decoration:line-through;color: #d9d9d9;";
						if(isactive){						
							clickActive();//处于active
						}	
					}else{
						if (iscompeled) {
							clickCompleted();//处于complete
						}
						next.style.cssText="color: #4d4d4d;text-decoration:none;"
					}
					if(isSelectAll()){//选中全部
						toggle_all[0].style.color="#737373";
					}else{
						toggle_all[0].style.color="#e6e6e6";
					}
					if(isNoSelect()){//没有选中
						document.getElementsByClassName('clear')[0].style.display="none";		
					}
				},true);
			}
			if(isSelectAll()){//初始化全选按钮
			document.getElementsByClassName("toggle_all")[0].style.color="#737373";
			}		
			var close=document.getElementsByClassName('close');
			var todo_li=document.getElementsByClassName('todo_li');	
			for (var i=0;i<close.length;i++) {	//for循环绑定事件
				generalCode(i);			
			 }
		}	
	},true);
	//回车创建并记录事件
	var index=0;//新建事件的索引
	var data=JSON.parse(localStorage.getItem("todo" ));
	if(!!data){
		if (data.length) {//如果还有数据
		var str=data[data.length-1].id;
		index=parseInt(str.slice(1))+1;//将索引值更新为最后一个id值+1
		}
	}
	var todo_input=document.getElementsByClassName('todo_input');	
	todo_input[0].addEventListener('keypress',function(event){
		if(event.keyCode=="13"&&todo_input[0].value){//判断回车和是否有值
			document.getElementsByClassName('toggle_all')[0].style.visibility="visible";
			document.getElementsByClassName('menu')[0].style.display="block";
			var todo_ul=document.getElementsByClassName('todo_ul');
			var li=document.createElement('li');
			li.className = "todo_li";		
			li.id=("p"+index++);				
			todo_ul[0].appendChild(li);
			var todo_li=document.getElementsByClassName('todo_li');
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
			var new_edit=document.createElement('input');
			new_edit.type="text";
			new_edit.className="edit";
			todo_li[todo_li.length-1].appendChild(new_edit);
			main();
			selectAll=false; 									
			document.getElementsByClassName("toggle_all")[0].style.color="#e6e6e6";
		}
	},true);
	document.getElementsByClassName('active')[0].addEventListener('click',function(){//点击active修改样式
		document.getElementsByClassName('active')[0].style.cssText="border-color:rgba(175, 47, 47, 0.2)";
		document.getElementsByClassName('all')[0].style.cssText="border-color:transparent";
		document.getElementsByClassName('completed')[0].style.cssText="border-color:transparent";
		isactive=true;
		isall=false;
		iscompeled=false;
		clickActive();
	},true);
	document.getElementsByClassName('all')[0].addEventListener('click',function(){//点击all修改样式
		document.getElementsByClassName('all')[0].style.cssText="border-color:rgba(175, 47, 47, 0.2)";
		document.getElementsByClassName('active')[0].style.cssText="border-color:transparent";
		document.getElementsByClassName('completed')[0].style.cssText="border-color:transparent";
		isall=true;
		iscompeled=false;
		isactive=false;
		clickAll();
	},true);
	document.getElementsByClassName('completed')[0].addEventListener('click',function(){//点击compelete修改样式
		document.getElementsByClassName('completed')[0].style.cssText="border-color:rgba(175, 47, 47, 0.2)";
		document.getElementsByClassName('active')[0].style.cssText="border-color:transparent";
		document.getElementsByClassName('all')[0].style.cssText="border-color:transparent";
		isall=false;
		iscompeled=true;
		isactive=false;
		clickCompleted();
	},true);
	var toggle_all=document.getElementsByClassName('toggle_all');
	toggle_all[0].addEventListener('click',function(){//控制所有事件的是否全选
		var toggle=document.getElementsByClassName('toggle');
		var data=JSON.parse(localStorage.getItem("todo" ));
		var view=document.getElementsByClassName('view');
		if(!(isSelectAll())){
			for(var i=0; i<data.length;i++){
				data[i].completed=true;//改变所有数据complete状态值
				localStorage.setItem("todo",JSON.stringify(data) ); 
			}
			document.getElementsByClassName('clear')[0].style.display="inline";	
			toggle_all[0].style.color="#737373";
			for(var i=0;i<toggle.length;i++){
				toggle[i].checked="checked";				
				view[i].style.cssText="text-decoration:line-through;color: #d9d9d9;";
			}
			if(isactive){						
				clickActive();
			}
			if(iscompeled){
				clickCompleted();
			}
			selectAll=true;
		}else{
			for(var i=0; i<data.length;i++){
				data[i].completed=false;//改变所有数据complete状态值
				localStorage.setItem("todo",JSON.stringify(data) ); 
			}
			document.getElementsByClassName('clear')[0].style.display="none";	
			toggle_all[0].style.color="#e6e6e6";
			for(var i=0;i<toggle.length;i++){
				toggle[i].checked="";
				view[i].style.cssText="color: #4d4d4d;text-decoration:none;";
			}
			if(isactive){						
				clickActive();
			}
			if(iscompeled){
				clickCompleted();
			}
			selectAll=false;
		}
		showLefts();//统计未完成事件数
	},true);
	document.getElementsByClassName('clear')[0].addEventListener('click',function(){	//点击清除所有	
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
		if(!document.getElementsByClassName('todo_ul')[0].hasChildNodes()){		
			document.getElementsByClassName("toggle_all")[0].style.color="#e6e6e6";
			document.getElementsByClassName('clear')[0].style.display="none";
			document.getElementsByClassName('toggle_all')[0].style.visibility="hidden";
			document.getElementsByClassName('menu')[0].style.display="none";
			document.getElementsByClassName('all')[0].style.cssText="border-color:rgba(175, 47, 47, 0.2)";
			document.getElementsByClassName('active')[0].style.cssText="border-color:transparent";
			document.getElementsByClassName('completed')[0].style.cssText="border-color:transparent";
			isall=true;
			iscompeled=false;
			isactive=false;
		}
		document.getElementsByClassName('clear')[0].style.display="none";
	},true);	
	window.addEventListener('beforeunload',function(){ //在页面关闭时保存数据 
		var arr=[];
		var toggle=document.getElementsByClassName("toggle");   					
			for(var x=0;x<toggle.length;x++){
				var obj={id:null,title:null,completed:null};
					obj.id=toggle[x].parentNode.id;//新建对象
					obj.title=toggle[x].nextSibling.innerText;
					obj.completed=toggle[x].checked;
					arr.push(obj);//将对象压入数组
			} 			
			localStorage.setItem("todo",JSON.stringify(arr) ); 
	},true);
})();