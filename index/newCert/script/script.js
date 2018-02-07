(function(){
	//点击回到顶部
	document.getElementsByClassName("returnTop")[0].addEventListener("click", function(){
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}, false)
	//下拉菜单和日历取消显示
	var active = false;
	document.addEventListener("click", function(){
		if (active==true){
			var drapdown_menus = document.getElementsByClassName("drapdown_menu");
			for (var j = 0 ; j < drapdown_menus.length ; j++){
				if(drapdown_menus[j].style.display != 'none'){
					drapdown_menus[j].style.display = 'none';
				}
			}
			var calendars = document.getElementsByClassName("calendar");
			for(var i = 0; i < calendars.length; i++){
				if(calendars[i].style.display != "none"){
					calendars[i].style.display = "none";
				}
			}
			active = false;	
		}
	}, false);
	//下拉菜单的实现
	var drapdown_buttons = document.getElementsByClassName("drapdown_button"); 
	for (var i = 0; i < drapdown_buttons.length; i++){
		drapdown_buttons[i].addEventListener("click", function(){var that = this;show(that,"flex","drapdown_menu");} , false);
	}
	// var drapdown_options = document.getElementsByClassName("option");
	// for (var i = 0; i < drapdown_options.length;i++){
	// 	drapdown_options[i].addEventListener("click", function(){
	// 		this.parentNode.parentNode.getElementsByClassName("selected")[0].src = this.src;
	// 		console.log(this.src);
	// 	}, false);
	// }
	//日历的出现
	var calendar_logos = document.getElementsByClassName("calendar_logo");
	for(var i = 0; i< calendar_logos.length; i++){
		calendar_logos[i].addEventListener("click", function(){var that = this;show(that,"block","calendar");}, false);
	}
	function show(that, display, name){
		active = true;
		if(that.parentNode.getElementsByClassName(name)[0].style.display != "none"){
			that.parentNode.getElementsByClassName(name)[0].style.display = 'none';
			return false;
		}
		var calendar = document.getElementsByClassName(name);
		for (var j = 0 ; j < calendar.length ; j++){
			calendar[j].style.display = 'none';
		}

		that.parentNode.getElementsByClassName(name)[0].style.display = display;
		event.stopPropagation();
	}

	//点击输入包裹框自动focus输入框
	var ReferenceDocumentContainers = document.getElementsByClassName("ReferenceDocuments");
	inputContainerClick(ReferenceDocumentContainers);
	var inputContainers = document.getElementsByClassName("inputContainer");
	inputContainerClick(inputContainers);
	var tds = document.getElementsByTagName("td");
	inputContainerClick(tds);

	function clickFocus(){
		this.getElementsByClassName("input")[0].focus();
	}
	function inputContainerClick(containers){
		for (var j = 0; j < containers.length; j++){
			containers[j].addEventListener("click", clickFocus, false);
		}
	}

	//删除单行
	function deleteLine(event){
		var thisDataId = this.parentNode.getAttribute("data-id")
		var lists = this.parentNode.parentNode.getElementsByClassName("list");
		this.parentNode.parentNode.removeChild(lists[thisDataId]);
		for (var i = 0; i < lists.length; i++){
			lists[i].setAttribute("data-id", i);
		}
		this.removeEventListener("click", deleteLine, false);	
		this.removeEventListener("click", clickFocus, false);
	}

	//增加一行
	var button_add = document.getElementsByClassName("button_add");
	button_add[0].addEventListener("click",addLine);
	function addLine(){
		var CalibrationList = document.getElementsByClassName("CalibrationList")[0];
		var lists = CalibrationList.getElementsByClassName("list");
		if(lists.length<5){
			var div = document.createElement("div");
			div.className = "list";
			div.setAttribute("data-id", lists.length);
			var button_sub = document.createElement("img");
			button_sub.className = "button_sub";
			button_sub.src = "imgs/sub.png";
			button_sub.addEventListener("click", deleteLine, false);

			var div_Name = document.createElement("div");
			div_Name.className = "inputContainer Name";
			var input_Name = document.createElement("div");
			input_Name.className = "input CalibrationItem";
			div_Name.appendChild(input_Name);

			var div_No = document.createElement("div");
			div_No.className = "inputContainer No";
			var input_No = document.createElement("div");
			input_No.className = "input CalibrationItem";
			div_No.appendChild(input_No);

			var div_MeasuringRange = document.createElement("div");
			div_MeasuringRange.className = "inputContainer MeasuringRange";
			var input_MeasuringRange = document.createElement("div");
			input_MeasuringRange.className = "input CalibrationItem";
			div_MeasuringRange.appendChild(input_MeasuringRange);


			var div_MPE = document.createElement("div");
			div_MPE.className = "inputContainer MPE";
			var input_MPE = document.createElement("div");
			input_MPE.className = "input CalibrationItem";
			div_MPE.appendChild(input_MPE);

			var div_CertificateNo = document.createElement("div");
			div_CertificateNo.className = "inputContainer CertificateNo";
			var input_CertificateNo = document.createElement("div");
			input_CertificateNo.className = "input CalibrationItem";
			div_CertificateNo.appendChild(input_CertificateNo);

			var div_ValiDateTo = document.createElement("div");
			div_ValiDateTo.className = "inputContainer ValidDateTo";
			var input_ValiDateTo = document.createElement("div");
			input_ValiDateTo.className = "input CalibrationItem";
			div_ValiDateTo.appendChild(input_ValiDateTo);

			CalibrationList.appendChild(div);
			div.appendChild(button_sub);
			div.appendChild(div_Name);
			div.appendChild(div_No);
			div.appendChild(div_MeasuringRange)
			div.appendChild(div_MPE);
			div.appendChild(div_CertificateNo);
			div.appendChild(div_ValiDateTo);
			var inputs = document.getElementsByClassName("input");
			for (var i = 0; i < inputs.length; i++){
				inputs[i].setAttribute("contenteditable", "true");
			}
			var containers = div.getElementsByClassName("inputContainer");
			inputContainerClick(containers);
		}
	}

//存在样式
var hasClass = function(obj,value) {
	if(!obj.className){
		return false;
	}else {
		var classes = obj.className.split(" ");
		for(var i = 0; i < classes.length; i++){
			if(classes[i]==value){
				return true;
			}
		}
		return false;
	}
};
	//增加样式
	var addClass = function(obj,value){
		if (!hasClass(obj, value)) {
			obj.className += " " + value;
		}
	};
	//删除样式
	var removeClass = function(obj,value) {
		if(hasClass(obj, value)){
			obj.className.replace(value , "");
			obj.className.replace("  "," ");
		}
	};
	//交换样式
	var toggleClass = function(obj, value){
		if(hasClass(obj,value)){
			removeClass(obj, value);
		}else {
			addClass(obj, value);
		}
	};
	//在元素节点后嵌入新的节点
	var insertAfter = function(newElement,targetElement){
		var parent = targetElement.parentNode;
		if(parent.lastChild == targetElement)
		{
			parent.appendChild(newElement);
		}
		else
		{
			parent.insertBefore(newElement,targetElement.nextSibling);
		}
	};
	//删除所有子节点
	var removeChildren = function(nodeObject) {
		var length = nodeObject.childNodes.length;
		for (var i = 0; i<length; i++){
			nodeObject.removeChild(nodeObject.childNodes[0]);
		}
	};
	//建立日历
	//获取现在的时间
	var getcurrentTime = function() {
		var getTime = new Date();
		var getcurrentDay = getTime.getDay();
		var getcurrentDate = getTime.getDate();
		var getcurrentMonth = getTime.getMonth() + 1;
		var getcurrentYear = getTime.getFullYear();
		this.showcurrentDay = function() {
			return getcurrentDay;
		};
		this.showcurrentDate = function() {
			return getcurrentDate;
		};
		this.showcurrentMonth = function() {
			return getcurrentMonth;
		};
		this.showcurrentYear = function() {
			return getcurrentYear;
		};
		this.setcurrentTime = function() {
			globalDay = getcurrentDay;
			globalDate = getcurrentDate;
			globalMonth = getcurrentMonth;
			globalYear = getcurrentYear;
		};
	};
	var globalTime = new getcurrentTime();
	var globalDay = 0;
	var globalDate = 0;
	var globalMonth = 0;
	var globalYear = 0;
	//建立日历
	var setcalendar = function(currentDay, currentDate, currentMonth, currentYear, classBox) {
		var lineNumber = 6, columnNumber = 7;
		var showcurrentDate = function() {
			// console.log(globalYear + "年" +currentMonth + "月" + globalDate + "日" + "星期" + globalDay);
		};
		var calendarContainer = classBox;
		calendarContainer.addEventListener("click", function(event){event.stopPropagation()}, false);
		//表格的标题
		var setcalendarCaption = function () {
			var calendarCaption = document.createElement("caption");
			addClass(calendarCaption,"circular-top");
			var Month = currentMonth
			var calendarCaptionText = document.createTextNode( currentYear + "年" + Month + "月");
			calendarCaption.appendChild(calendarCaptionText);
			calendarContainer.appendChild(calendarCaption);
			//左右切换
			var addArrow = function(imgurl, position) {
				var arrow = document.createElement("img");
				arrow.src="imgs/" + imgurl;
				arrow.setAttribute("class", position);
				calendarCaption.appendChild(arrow);
			};
			addArrow("leftArrow.png","left");
			addArrow("rightArrow.png","right");
			var pageChange = function(position) {
				var changeArrow = calendarContainer.getElementsByClassName(position);
				changeArrow[0].onclick=function(){
					if(position=="left"){
						globalMonth-1 == 0 ? (globalMonth = 12) && (globalYear -= 1): globalMonth -=1;
					}else {
						globalMonth+1 == 13 ? (globalMonth = 1) && (globalYear += 1): globalMonth +=1;
					}		
					recordMsetcalendar(calendarContainer);
				};

			};
			pageChange("left");
			pageChange("right");
		}
		var setcalendarTableHeader = function() {
			var TableHead = document.createElement("thead");
			calendarContainer.appendChild(TableHead);
			var TableRow = document.createElement("tr");
			TableHead.appendChild(TableRow);
			var day = ["Sun", "Mon" , "Tue" , "Wed" , "Thu" , "Fri" , "Sat"];
			for (var i = 0; i < day.length ; i++){
				var calendarTableHeader = document.createElement("th");
				var calendarTableHeaderText = document.createTextNode(day[i]);
				calendarTableHeader.appendChild(calendarTableHeaderText);
				TableRow.appendChild(calendarTableHeader);
			}	
		}
		var setcalendarTableBody = function() {
			var TableBody = document.createElement("tbody");
			calendarContainer.appendChild(TableBody);
			for (var i = 0 ; i < lineNumber ; i++){
				var TableBodyRow = document.createElement("tr");
				TableBody.appendChild(TableBodyRow);
				for (var j = 0 ; j < columnNumber ; j++){
					var TableBodyLind = document.createElement("td");
					TableBodyRow.appendChild(TableBodyLind);

					TableBodyLind.addEventListener("click", function(){
						// console.log(this.innerHTML);
						// console.log(currentMonth);
						// console.log(currentYear);
						//console.log(this.parentNode.parentNode.parentNode.parentNode);
						this.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("Year")[0].value = currentYear
						this.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("Month")[0].value = currentMonth;
						this.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("Day")[0].value = this.innerHTML;

					}, false);
				}
			}

		}
		var setcalendarTableFooter = function() {
			var TableFoot = document.createElement("tfoot");
			calendarContainer.appendChild(TableFoot);
			var TableBodyRow = document.createElement("tr"); 
			TableFoot.appendChild(TableBodyRow);
			var reset = document.createElement("img");
			reset.src = "imgs/iconfont-reset.png";
			for (var i = 0 ; i < columnNumber ; i++){
				var TableBodyLind = document.createElement("td");
				TableBodyRow.appendChild(TableBodyLind);
				if(i == 0)TableBodyLind.appendChild(reset);
			}
			reset.onclick = function() {
				globalTime.setcurrentTime();
				recordMsetcalendar(calendarContainer);
			}
		};
		var recordMsetcalendar = function(container) {
			var TempLeft = container.style.left;
			var TempTop = container.style.top;
			setcalendar(globalDay,globalDate,globalMonth,globalYear,classBox);
			container.style.left = TempLeft;
			container.style.top = TempTop;
		}
	//闰年判断
	var IsLeapYear = function(year) {
		if (year%4 == 0 && year%100 != 0 || year%400 == 0){
			return true;
		}else {
			return false;
		}
	}
	//返回某年某月某日是星期几
	var WhatDay = function(year,month,day){
			if(month==1||month==2) {//判断month是否为1或2　
				year--;
				month+=12;
			}
			var c = parseInt(year/100) ;
			var y = parseInt(year-c*100);
			var week = y + parseInt(y/4) -2*c + parseInt(13*(month+1)/5)+day-1; 
			while(week<0){week+=7;}
			week%=7;
			switch(week){
				case 1: return 0;//printf("Monday\n");break;
				case 2: return 1;//printf("Tuesday\n");break;
				case 3: return 2;//printf("Wednesday\n");break;
				case 4: return 3;//printf("Thursday\n");break;
				case 5: return 4;//printf("Friday\n");break;
				case 6: return 5;//printf("Saturday\n");break;
				case 0: return 6;//printf("Sunday\n");break;
			}
		}
		//日历上日期的设置
		var setcalendarDate = function() {
			var MonthDayNumber = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if(IsLeapYear(currentYear)==true) {
				MonthDayNumber[2] = 29;
			}
			var FirstDayIS = WhatDay(currentYear,currentMonth,0);

			var calendarDate = calendarContainer.getElementsByTagName("td");
			for (var i = 0; i<MonthDayNumber[currentMonth]; i++){
				var Temp = document.createTextNode(i+1);
				calendarDate[FirstDayIS+i].appendChild(Temp);
			}
			if (globalTime.showcurrentDay() == globalDay && 
				globalTime.showcurrentDate() == globalDate && 
				globalTime.showcurrentMonth() == globalMonth &&
				globalTime.showcurrentYear() == globalYear){
				addClass(calendarDate[currentDate+FirstDayIS-1],"today");
		}
	}

	//清除上一个并重新生成一个
	removeChildren(calendarContainer);
	//生成日历
	setcalendarCaption();
	setcalendarTableBody();
	setcalendarDate();
	setcalendarTableFooter();
} ;
globalTime.setcurrentTime();
var ReceivedCalendar = document.getElementsByClassName("ReceivedCalendar")[0];
setcalendar(globalDay,globalDate,globalMonth,globalYear,ReceivedCalendar);
var CalibrationCalendar = document.getElementsByClassName("CalibrationCalendar")[0];
setcalendar(globalDay,globalDate,globalMonth,globalYear,CalibrationCalendar);

var certificateId = null;
var create_time = null;
var modify_time = null;
window.onload = function(){

	//拉取图片签名
	$.ajax({
		url: url + 'get_signature',
		type: 'GET',
	})
	.done(function(res) {
		// console.log(res.data);
		var drapdown_menus = one.getElementsByClassName("drapdown_menu");
		for(var i = 0 ; i < drapdown_menus.length ; i++){
			for(var j = 0 ; j < res.data.length ; j++){
				var img = document.createElement("img");
				img.src = url + res.data[j].url;
				img.className = "option";
				img.setAttribute("data-id", res.data[j].id);
				drapdown_menus[i].appendChild(img);
			}
		}
		var drapdown_options = one.getElementsByClassName("option");
		for (var i = 0; i < drapdown_options.length;i++){
			drapdown_options[i].addEventListener("click", function(){
				this.parentNode.parentNode.getElementsByClassName("selected")[0].src = this.src;
				var data_id = this.getAttribute("data-id");
				this.parentNode.parentNode.getElementsByClassName("selected")[0].setAttribute("data-id",data_id);
				console.log(this.src);
			}, false);
		}
		// console.log("success");
	})
	.fail(function() {
		// console.log("error");
	})
	.always(function() {
		// console.log("complete");
	});
	var nav = document.getElementById("nav");
	var one = document.getElementById("one");
	var two = document.getElementById("two");
	var three = document.getElementById("three");
	
	//如果有id则证明是查看历史记录所以要拉取信息
	if(getQueryString("id")){
		$.ajax({
			url: url + "certificate_detail?id="+getQueryString("id"),
			type: 'GET',
		})
		.done(function(res) {
			new QRCode(document.getElementsByClassName("code")[0], {
				text: res.data.customer+"|"+res.data.description+"|"+"第 "+res.data.certificate_num+" 号",
				colorDark : "#000000",
				colorLight : "#ffffff",
				render: "table",
				correctLevel : QRCode.CorrectLevel.H
			});
			// console.log("success");
			certificateId = res.data.id;
			nav.getElementsByClassName("CompanyName")[0].value = res.data.name;
			one.getElementsByClassName("Certificate")[0].value = 
			two.getElementsByClassName("Certificate")[0].value = 
			three.getElementsByClassName("Certificate")[0].value = "第 " + res.data.certificate_num + " 号";
			one.getElementsByClassName("Customer")[0].value = res.data.customer;
			one.getElementsByClassName("Address")[0].value = res.data.address;
			one.getElementsByClassName("Description")[0].value = res.data.description;
			one.getElementsByClassName("ModelType")[0].value = res.data.model_type;
			one.getElementsByClassName("SerialNo")[0].value = res.data.serial_num;
			one.getElementsByClassName("Manufacturer")[0].value = res.data.manufacturer;
			$("#one .Approved img.selected").attr("data-id",res.data.approved_by);
			var src = $("#one .Approved .drapdown_menu img[data-id='" + res.data.approved_by + "']")[0].src;
			$("#one .Approved img.selected").attr("src",src);

			$("#one .CheckedBy img.selected").attr("data-id",res.data.checked_by);
			var src = $("#one .CheckedBy .drapdown_menu img[data-id='" + res.data.checked_by + "']")[0].src;
			$("#one .CheckedBy img.selected").attr("src",src);
			
			$("#one .CalibratedBy img.selected").attr("data-id",res.data.calibrated_by);
			var src = $("#one .CalibratedBy .drapdown_menu img[data-id='" + res.data.calibrated_by + "']")[0].src;
			$("#one .CalibratedBy img.selected").attr("src",src);
			one.getElementsByClassName("ReceivedYear")[0].value = res.data.receive_year;
			one.getElementsByClassName("ReceivedMonth")[0].value = res.data.receive_month;
			one.getElementsByClassName("ReceivedDay")[0].value = res.data.receive_day;
			one.getElementsByClassName("CalibrationYear")[0].value = res.data.calibration_year;
			one.getElementsByClassName("CalibrationMonth")[0].value = res.data.calibration_month;
			one.getElementsByClassName("CalibrationDay")[0].value = res.data.calibration_day;
			$("#two .ReferenceDocuments .input").html(res.data.reference_file.replace(/\n/g,"<br>"));
			var lists = res.data.standards;
			for (var i = 0 ; i < lists.length ; i++){
				if(i>0){
					var CalibrationList = two.getElementsByClassName("CalibrationList")[0];
					var list = document.createElement("div");
					list.className = "list";
					list.setAttribute("data-id", i);
					CalibrationList.appendChild(list);
					var button_sub = document.createElement("img");
					button_sub.className = "button_sub";
					button_sub.src = "imgs/sub.png";
					button_sub.addEventListener("click", deleteLine, false);
					list.appendChild(button_sub);

					var nameContainer = document.createElement("div");
					nameContainer.className = "inputContainer Name";
					var nameInput = document.createElement("div");
					nameInput.className = "input";
					nameInput.setAttribute("contenteditable", "true");
					nameContainer.appendChild(nameInput);
					list.appendChild(nameContainer);

					var noContainer = document.createElement("div");
					noContainer.className = "inputContainer No";
					var noInput = document.createElement("div");
					noInput.className = "input";
					noInput.setAttribute("contenteditable", "true");
					noContainer.appendChild(noInput);
					list.appendChild(noContainer);

					var MeasuringRangeContainer = document.createElement("div");
					MeasuringRangeContainer.className = "inputContainer MeasuringRange";
					var MeasuringRangeInput = document.createElement("div");
					MeasuringRangeInput.className = "input";
					MeasuringRangeInput.setAttribute("contenteditable", "true");
					MeasuringRangeContainer.appendChild(MeasuringRangeInput);
					list.appendChild(MeasuringRangeContainer);

					var MPEContainer = document.createElement("div");
					MPEContainer.className = "inputContainer MPE";
					var MPEInput = document.createElement("div");
					MPEInput.className = "input";
					MPEInput.setAttribute("contenteditable", "true");
					MPEContainer.appendChild(MPEInput);
					list.appendChild(MPEContainer);

					var certificateContainer = document.createElement("div");
					certificateContainer.className = "inputContainer CertificateNo";
					var certificateInput = document.createElement("div");
					certificateInput.className = "input";
					certificateInput.setAttribute("contenteditable", "true");
					certificateContainer.appendChild(certificateInput);
					list.appendChild(certificateContainer);

					var validDateContainer = document.createElement("div");
					validDateContainer.className = "inputContainer ValidDateTo";
					var validDateInput = document.createElement("div");
					validDateInput.className = "input";
					validDateInput.setAttribute("contenteditable", "true");
					validDateContainer.appendChild(validDateInput);
					list.appendChild(validDateContainer);

					var inputContainers = list.getElementsByClassName("inputContainer");
					inputContainerClick(inputContainers);
				}

				$("#two .list .Name .input")[i].innerHTML = lists[i].name.replace(/\n/g,"<br>");
				$("#two .list .No .input")[i].innerHTML = lists[i].num.replace(/\n/g,"<br>");
				$("#two .list .MeasuringRange .input")[i].innerHTML = lists[i].measuring_range.replace(/\n/g,"<br>");
				$("#two .list .MPE .input")[i].innerHTML = lists[i].mpe.replace(/\n/g,"<br>");
				$("#two .list .CertificateNo .input")[i].innerHTML = lists[i].standard_cert_num.replace(/\n/g,"<br>");
				$("#two .list .ValidDateTo .input")[i].innerHTML = lists[i].valid_date.replace(/\n/g,"<br>");
			}
			two.getElementsByClassName("Address")[0].value = res.data.calibration_address;
			two.getElementsByClassName("Temperature")[0].value = res.data.temperature;
			two.getElementsByClassName("RelativeHumidity")[0].value = res.data.relative_humidity;
			two.getElementsByClassName("Other")[0].value = res.data.others;
			two.getElementsByClassName("condition")[0].value = res.data.limits;
			two.getElementsByClassName("recommend")[0].value = res.data.recommended_cycle;
			var columnNumber = 3;
			var tds = $("#three .result tbody tr td .input");
			for (var i = 0 ; i < columnNumber; i++){
				tds[i].innerHTML = res.data.calibration_datas[i].cali_temp;
				tds[i].setAttribute("data-id", res.data.calibration_datas[i].id);
				tds[i+columnNumber].innerHTML = res.data.calibration_datas[i].real_temp;
				tds[i+columnNumber].setAttribute("data-id", res.data.calibration_datas[i].id);
				tds[i+columnNumber*2].innerHTML = res.data.calibration_datas[i].display_temp;
				tds[i+columnNumber*2].setAttribute("data-id", res.data.calibration_datas[i].id);
				tds[i+columnNumber*3].innerHTML = res.data.calibration_datas[i].error_value;
				tds[i+columnNumber*3].setAttribute("data-id", res.data.calibration_datas[i].id);
			}
		})
.fail(function() {
	// console.log("error");
})
.always(function() {
	// console.log("complete");
});
}else{
	//拉取证书编号
	$.ajax({
		url: url + 'get_certificate_num',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(res) {
		$(".Certificate").val("第 "+res.data.certificate_num+" 号");
		certificateId = res.data.id;
		create_time = res.data.create_time;
		modify_time = res.data.modify_time;
		//条形码生成
		JsBarcode("#barcode", res.data.certificate_num,{
			fontSize:16,
			height:40
		})
		// console.log("success");
	})
	.fail(function() {
		// console.log("error");
	})
	.always(function() {
		// console.log("complete");
	});
}

function getOffsetTop(ele){
	var top= 0,left=0;
	while(ele){
		top+=ele.offsetTop;
		left+=ele.offsetLeft;
		ele=ele.offsetParent;
	}
	return top;
}

//下载按钮绑定事件
document.getElementById("download").addEventListener("click", function(){
	//判空
	var inputs = document.getElementsByTagName("input");
	for( var i = 0 ; i < inputs.length ; i++){
		console.log(getOffsetTop(inputs[i]));
		inputs[i].style.outline = "";
		if(inputs[i].value==""&&inputs[i].className!=="Certificate"){
			inputs[i].style.outline = "red solid thick";
			$('html,body').animate({
				scrollTop : getOffsetTop(inputs[i]) - inputs[i].offsetHeight
			},500);
			return;
		}
	}
	var inputCls = document.getElementsByClassName("input");
	console.log(inputCls);
	for( var i = 0 ; i < inputCls.length ; i++){
		inputCls[i].style.outline = "";
		if(inputCls[i].innerText==""){
			inputCls[i].style.outline = "red solid thick";
			$('html,body').animate({
				scrollTop : getOffsetTop(inputCls[i]) - inputCls[i].offsetHeight
			},500);
			return;
		}
	}
	document.body.scrollTop = document.documentElement.scrollTop = 0;
		//数据封装
		var standardsArray = new Array();
		var lists = $("#two .list");
		for (var i = 0 ; i < lists.length ; i++){
			var standards = {
				"name":$("#two .list .Name .input")[i].innerHTML.replace(/<\/div>/g,"").replace(/<div>/g,"").replace(/<br>/g,"\n").replace(/<\/span>/g,"").replace(/<span style="font-size: 1.3vmax;">/g,""),
				"num":$("#two .list .No .input")[i].innerHTML.replace(/<\/div>/g,"").replace(/<div>/g,"").replace(/<br>/g,"\n").replace(/<\/span>/g,"").replace(/<span style="font-size: 1.3vmax;">/g,""),
				"measuring_range":$("#two .list .MeasuringRange .input")[i].innerHTML.replace(/<\/div>/g,"").replace(/<div>/g,"").replace(/<br>/g,"\n").replace(/<\/span>/g,"").replace(/<span style="font-size: 1.3vmax;">/g,""),
				"mpe":$("#two .list .MPE .input")[i].innerHTML.replace(/<\/div>/g,"").replace(/<div>/g,"").replace(/<br>/g,"\n").replace(/<\/span>/g,"").replace(/<span style="font-size: 1.3vmax;">/g,""),
				"standard_cert_num":$("#two .list .CertificateNo .input")[i].innerHTML.replace(/<\/div>/g,"").replace(/<div>/g,"").replace(/<br>/g,"\n").replace(/<\/span>/g,"").replace(/<span style="font-size: 1.3vmax;">/g,""),
				"valid_date":$("#two .list .ValidDateTo .input")[i].innerHTML.replace(/<\/div>/g,"").replace(/<div>/g,"").replace(/<br>/g,"\n").replace(/<\/span>/g,"").replace(/<span style="font-size: 1.3vmax;">/g,"")
			}
			standardsArray.push(standards);
		}
		var columnNumber = 3;
		var calibrationDataArray = new Array();
		var tds = $("#three .result tbody tr td .input");
		for (var i = 0 ; i <  columnNumber; i++){
			var column = {
				'id':tds[i].getAttribute("data-id"),
				"cali_temp":tds[i].innerHTML,
				"real_temp":tds[i+columnNumber].innerHTML,
				"display_temp":tds[i+columnNumber*2].innerHTML,
				"error_value":tds[i+columnNumber*3].innerHTML
			}
			calibrationDataArray.push(column);
		}
		// console.log(getQueryString("id"));
		if(!getQueryString("id")){
			var api = 'submit_certificate';
		}else{
			var api = 'modify_certificate';
		}
		// //发送ajax请求进行数据提交或修改
		$.ajax({
			url: url + api,
			type: 'POST',
			dataType: 'json',
			contentType: "application/json",
			data:  JSON.stringify({
				"create_time":create_time,
				"modify_time":modify_time,
				"id":certificateId,
				"name":nav.getElementsByClassName("CompanyName")[0].value,
				"certificate_num":one.getElementsByClassName("Certificate")[0].value.replace("第 ","").replace(" 号",""),
				"customer":one.getElementsByClassName("Customer")[0].value,
				"address":one.getElementsByClassName("Address")[0].value,
				"description":one.getElementsByClassName("Description")[0].value,
				"model_type":one.getElementsByClassName("ModelType")[0].value,
				"serial_num":one.getElementsByClassName("SerialNo")[0].value,
				"manufacturer":one.getElementsByClassName("Manufacturer")[0].value,
				"approved_by":$("#one .Approved img.selected").attr("data-id"),
				"checked_by":$("#one .CheckedBy img.selected").attr("data-id"),
				"calibrated_by":$("#one .CalibratedBy img.selected").attr("data-id"),
				"receive_year":one.getElementsByClassName("ReceivedYear")[0].value,
				"receive_month":one.getElementsByClassName("ReceivedMonth")[0].value,
				"receive_day":one.getElementsByClassName("ReceivedDay")[0].value,
				"calibration_year":one.getElementsByClassName("CalibrationYear")[0].value,
				"calibration_month":one.getElementsByClassName("CalibrationMonth")[0].value,
				"calibration_day":one.getElementsByClassName("CalibrationDay")[0].value,
				"reference_file":$("#two .ReferenceDocuments .input").html().replace(/<\/div>/g,"").replace(/<div>/g,"\n"),
				"standards":standardsArray,
				"calibration_address":two.getElementsByClassName("Address")[0].value,
				"temperature":two.getElementsByClassName("Temperature")[0].value,
				"relative_humidity":two.getElementsByClassName("RelativeHumidity")[0].value,
				"others":two.getElementsByClassName("Other")[0].value,
				"limits":two.getElementsByClassName("condition")[0].value,
				"recommended_cycle":two.getElementsByClassName("recommend")[0].value,
				"calibration_datas":calibrationDataArray,   
			}) ,
		})
		.done(function() {
			// console.log("success");
		})
		.fail(function() {
			// console.log("error");
		})
		.always(function() {
			// console.log("complete");
		});


		//二维码生成
		var Customer = document.getElementsByClassName("Customer")[0].value;
		var Description = document.getElementsByClassName("Description")[0].value;
		var Certificate = document.getElementsByClassName("Certificate")[0].value;
		// console.log(Customer);
		document.getElementsByClassName("code")[0].innerHTML = "";
		// console.log(url + "index/scanPage/scanPage.html?company=" + Customer + "&name=" + Description + "&number=" + Certificate);
		new QRCode(document.getElementsByClassName("code")[0], {
			text: "http://www.alexzfx.com/index/scanPage/scanPage.html?company=" + Customer + "&name=" + Description + "&number=" + Certificate,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRCode.CorrectLevel.H
		});

		//浏览器大小改变
		// var yScroll = (document.documentElement.scrollHeight >document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight; 
		// var xScroll=(document.documentElement.scrollWidth>document.documentElement.clientWidth) ? document.documentElement.scrollWidth : document.documentElement.scrollWidth;   
		// window.resizeTo(1920, 1080);

		//style控制
		//字体控制
		// var multiInput = document.getElementsByClassName("input");
		// for (var i = 0 ; i < multiInput.length ; i++){
		// 	multiInput[i].style.fontSize = '50px';
		// }
		// var inputs = document.getElementsByTagName("input");
		// for (var i = 0 ; i < inputs.length ; i++){
		// 	inputs[i].style.fontSize  = '46px';
		// }
		// two.getElementsByClassName("Address")[0].style.fontSize = 
		// two.getElementsByClassName("RelativeHumidity")[0].style.fontSize = 
		// two.getElementsByClassName("Temperature")[0].style.fontSize = 
		// two.getElementsByClassName("condition")[0].style.fontSize = "50px";
		// document.getElementsByClassName("Certificate")[0].style.fontSize = "40px";
		// document.getElementsByClassName("Certificate")[1].style.fontSize = 
		// document.getElementsByClassName("Certificate")[2].style.fontSize = "34px";
		var multiInput = document.getElementsByClassName("input");
		for (var i = 0 ; i < multiInput.length ; i++){
			if(hasClass(multiInput[i], "resultItem")){
				multiInput[i].style.fontSize = '1.3vmax';
			}else{
				multiInput[i].style.fontSize = '1.5vmax';
			}
		}
		var inputs = document.getElementsByTagName("input");
		for (var i = 0 ; i < inputs.length ; i++){
			if(hasClass(inputs[i],'cn')||hasClass(inputs[i],'en')){
				inputs[i].style.fontSize  = '1.5vmax';
			}else{
				inputs[i].style.fontSize  = '2vmax';
				
			}
		}
		two.getElementsByClassName("Address")[0].style.fontSize = 
		two.getElementsByClassName("RelativeHumidity")[0].style.fontSize = 
		two.getElementsByClassName("Temperature")[0].style.fontSize = 
		two.getElementsByClassName("condition")[0].style.fontSize = "2vmax";
		document.getElementsByClassName("Certificate")[0].style.fontSize = "2vmax";
		document.getElementsByClassName("Certificate")[1].style.fontSize = 
		document.getElementsByClassName("Certificate")[2].style.fontSize = "2vmax";
		//截图控制
		one.style.margin = "0 auto";
		one.style.width = "100%";
		one.style.border = "0px";
		two.style.margin = "0 auto";
		two.style.width = "100%";
		two.style.border = "0px";
		three.style.margin = '0 auto';
		three.style.width = "100%";
		three.style.border = "0px";
		var that = this;
		this.style.display = "none";
		document.getElementById("nav").style.display = "none";
		var drapdown_buttons = document.getElementsByClassName("drapdown_button");
		canvasToggle(drapdown_buttons,"none");
		var calendars = document.getElementsByClassName("calendar_logo");
		canvasToggle(calendars,"none");
		var button_adds = document.getElementsByClassName("button_add");
		canvasToggle(button_adds,"none");
		var button_subs = document.getElementsByClassName("button_sub");
		canvasToggle(button_subs,"none");
		var inputs = document.getElementsByTagName("input");
		for(var i = 0; i<inputs.length; i++){
			inputs[i].style.borderWidth = "0px";
		}
		//截取图片
		html2canvas(document.body,{
			onrendered:function(canvas){
				var contentWidth = canvas.width;
				var contentHeight = canvas.height;
				//A4纸a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
				var pageHeight = contentWidth / 595.28 * 841.89;
				var leftHeight = contentHeight;
				//初始位置
				var position = 0;

				var imgWidth = 595.28;
				var imgHeight = 595.28/contentWidth*contentHeight;

				var pageData = canvas.toDataURL("image/jpeg",1.0);
				var pdf = new jsPDF('','pt','a4');
				if(leftHeight < pageHeight){
					pdf.addImage(pageData,"JPEG",0,0,imgWidth,imgHeight);
				}else{//leftHeight 防止后面出现Drap to outliner or Upload
					while(leftHeight>100){
						pdf.addImage(pageData,"JPEG",0,position,imgWidth,imgHeight);
						leftHeight -=pageHeight;
						position -= 841.89;
						//避免空白页
						if(leftHeight>100){
							//增加一页
							pdf.addPage();
						}
					}
				}
				//生成PDF
				var name = nav.getElementsByClassName("CompanyName")[0].value + ".pdf"
				pdf.save(name);
				
				
				// style恢复
				// 字体控制
				var multiInput = document.getElementsByClassName("input");
				for (var i = 0 ; i < multiInput.length ; i++){
					if(hasClass(multiInput[i], "CalibrationItem")){
						multiInput[i].style.fontSize = '1vmax';
					}else if(hasClass(multiInput[i], "resultItem")){
						multiInput[i].style.fontSize = '1vmin';
					}
					else{
						multiInput[i].style.fontSize = '1.3vmax';
					}
				}

				var inputs = document.getElementsByTagName("input");
				for (var i = 0 ; i < inputs.length ; i++){
					inputs[i].style.fontSize  = '1vmax';
				}
				two.getElementsByClassName("Address")[0].style.fontSize = 
				two.getElementsByClassName("RelativeHumidity")[0].style.fontSize = 
				two.getElementsByClassName("Temperature")[0].style.fontSize = 
				two.getElementsByClassName("condition")[0].style.fontSize = 
				document.getElementsByClassName("Certificate")[0].style.fontSize = 
				document.getElementsByClassName("Certificate")[1].style.fontSize = 
				document.getElementsByClassName("Certificate")[2].style.fontSize = "1vmax";
				document.getElementById("nav").style.display = "block";

				that.style.display = 'block';
				canvasToggle(drapdown_buttons,"block");
				canvasToggle(calendars,"block");
				canvasToggle(button_adds,"block");
				canvasToggle(button_subs,"block");
				for(var i = 0; i<inputs.length; i++){
					inputs[i].style.borderWidth = "2px";
				}
				one.style.margin = "0 20% 0";
				one.style.width = "60%";
				one.style.border = "1px solid black";
				two.style.margin = "0 20% 0";
				two.style.width = "60%";
				two.style.border = "1px solid black";
				three.style.margin = "0 20% 0";
				three.style.width = "60%";
				three.style.border = "1px solid black";

			},
			background: "#FFFFFF"
		});
	}, false);
function canvasToggle(components, value){
	for(var i = 0;i<components.length;i++){
		components[i].style.display = value;
	}
}
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}
}

})();

