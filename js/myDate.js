(function () {
	var added = false;
	window.myDate = function (str) {
		if (typeof(str)=="string") {
			var oBox = document.getElementById(str);
		} else {
			var oBox = str;
		}
		var oDiv = document.createElement("div");
		oDiv.className = "clearfix my_calendar";
		oBox.appendChild(oDiv);
		var oNum = 5;
		if (arguments.length==2) {
			oNum = arguments[1];
		}
		var oDate = new Date();
		for (var i = 0 ; i<oNum; i++) {
			(function (index) {
				var oCalendar = document.createElement("div");
				if (index==0) {
					oCalendar.className = "calendar_date calendar_year";
				} else {
					oCalendar.className = "calendar_date";
				}
				oCalendar.innerHTML = '<span><strong class="calendar_time"></strong><i></i></span><ul></ul>';
				oDiv.appendChild(oCalendar);
				var oStrong = oCalendar.getElementsByTagName("span")[0].children[0];
				var oUl = oCalendar.getElementsByTagName("ul")[0];			
				switch (index) {
					case 0:
						oStrong.innerHTML = oDate.getFullYear()+"年";
						for (var i = 0; i<20; i++) {
							var oLi = document.createElement("li");
							oLi.innerHTML = oDate.getFullYear()+i+"年";
							oUl.appendChild(oLi);
						}
					break;
					case 1:
						oStrong.innerHTML = addzero(oDate.getMonth()+1)+"月";
						for (var i = 0; i<12; i++) {
							var oLi = document.createElement("li");
							oLi.innerHTML = addzero(i+1)+"月";
							oUl.appendChild(oLi);
						}				
					break;
					case 2:
						oStrong.innerHTML = addzero(oDate.getDate())+"日";				
					break;
					case 3:
						oStrong.innerHTML = addzero(oDate.getHours())+"时";
						for (var i = 0; i<24; i++) {
							var oLi = document.createElement("li");
							oLi.innerHTML = addzero(i)+"时";
							oUl.appendChild(oLi);
						}				
					break;
					case 4:
						oStrong.innerHTML = "00分";
						for (var i = 0; i<12; i++) {
							var oLi = document.createElement("li");
							oLi.innerHTML = addzero(i*5)+"分";
							oUl.appendChild(oLi);
						}				
					break;				
				}									
			})(i);
		}
			
		var aDate = oDiv.getElementsByTagName("div");									
		for (var i = 0; i<aDate.length; i++) {
			(function (index) {
				aDate[index].bOpen = false;
				var oSpan = aDate[index].getElementsByTagName("span")[0];
				var oUl = aDate[index].getElementsByTagName("ul")[0];
				var aLi = oUl.getElementsByTagName("li");
				oSpan.onclick = function () {
					if (aDate[index].bOpen) {
						oSpan.children[1].className = "";
						oUl.className = "";
						aDate[index].bOpen = false;
					} else {
						for (var i = 0 ; i <aDate.length; i++) {
							aDate[i].children[0].children[1].className = "";
							aDate[i].children[1].className = "";
							aDate[i].bOpen = false;
						}
						if (index==2) {
							oUl.innerHTML = "";
							var oMonth = parseInt(aDate[1].getElementsByTagName("span")[0].children[0].innerHTML);
							var oYear = parseInt(aDate[0].getElementsByTagName("span")[0].children[0].innerHTML);
							var _len = 31;
							if (oMonth==2) {
								_len = 28; 
								if (oYear%4==0) {
									_len = 29; 	
								}
							} else if (oMonth==4||oMonth==6||oMonth==9||oMonth==11) {
								_len = 30;
							}
							for (var i = 0; i<_len; i++) {
								var oLi = document.createElement("li");
								oLi.innerHTML = addzero(i+1)+"日";
								oUl.appendChild(oLi);
							}						
						}
						oSpan.children[1].className = "calendar_active";
						oUl.className = "calendar_active";
						aDate[index].bOpen = true;
					}
				};
				oUl.onclick = function(ev){
					var oEvent = ev || event;
					var oSrc = oEvent.srcElement || oEvent.target;
					if(oSrc.tagName.toLowerCase() == "li"){
						oSpan.children[0].innerHTML = oSrc.innerHTML;
						oSpan.children[1].className = "";
						oUl.className = "";
						aDate[index].bOpen = false;				
					}
				};
			})(i);
		}		
		
		function addzero(n) {
			return n<10?"0"+n:n;
		};
		
		if (added) return;
		added = true;
		var oLink = document.createElement('link');
		oLink.rel = 'stylesheet';
		oLink.href = 'css/myDate.css';
		document.body.appendChild(oLink);						
	};
	
	window.getmyDate = function (str) {
		if (typeof(str)=="string") {
			var oBox = document.getElementById(str);
		} else {
			var oBox = str;
		}
		
		var aStrong = getByClass(oBox,"calendar_time");				
		var _arr = [];
		for (var i = 0 ; i<aStrong.length;i++) {
			var _str = parseInt(aStrong[i].innerHTML);
			_arr.push(_str);
		}
		var oDate = new Date();
		
		switch (_arr.length) {
			case 1 :addarr(4);
			break;
			case 2 :addarr(3);
			break;
			case 3 :addarr(2);
			break;
			case 4 :addarr(1);
			break;
		}
		
		function addarr(n) {
			for (var i = 0 ; i <n; i++) {
				_arr.push(0);				
			}			
		}
		if (_arr[1]) {
			_arr[1]=1;
		}
		
		oDate.setFullYear(_arr[0],_arr[1]-1,_arr[2]);
		if (_arr.length==5) {
			oDate.setHours(_arr[3],_arr[4],0,0);
		} 					
		return oDate.getTime();						
	};
	
	function getByClass(oParent, sClass) {
		if(oParent.getElementsByClassName) {
			return oParent.getElementsByClassName(sClass);
		} else {
			var aEle=oParent.getElementsByTagName('*');
			var re=new RegExp('\\b'+sClass+'\\b');
			var result=[];
			
			for(var i=0;i<aEle.length;i++) {
				if(aEle[i].className.search(re)!=-1) {
					result.push(aEle[i]);
				}
			}
			
			return result;
		}
	};
	
})();

	
