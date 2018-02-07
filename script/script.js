(function(){
	window.onload = function(){
		console.log(url);
		$("#login").on('click', function(event) {
			event.preventDefault();
			var username = $("#username input").val();
			var password = $("#password input").val();
			var vercode = $("#ver_code input").val();
			console.log(username);
			var json = {
				"username":username,
				"password":password,
				"ver_code":vercode,
			}
			$.ajax({
				url: url + 'login',
				type: 'POST',
				dataType: 'json',
				contentType: "application/json",
				data:JSON.stringify(json)
			})
			.done(function(res) {
				console.log(res.msg);
				// console.log("success");
				if(res.ret==0){
					$(window).attr('location','./index/index.html');  
				}else if(res.ret == 1001 || res.ret == 1002){
					document.getElementsByClassName("passwordWrong")[0].style.display = "block";
					document.getElementsByClassName("verCodeWrong")[0].style.display = "none";
				}else if(res.ret == 1003){
					document.getElementsByClassName("passwordWrong")[0].style.display = "none";
					document.getElementsByClassName("verCodeWrong")[0].style.display = "block";
				}
			})
			.fail(function() {
				// console.log("error");
			})
			.always(function() {
				// console.log("complete");
			});

		});
		document.getElementById("get_ver_code").addEventListener("click",function(){
			this.src = url + 'get_ver_code?time=' + Math.random();
		} ,false )
	}
	document.addEventListener("keydown",function(event){
		 var e = event || window.event || arguments.callee.caller.arguments[0];
		 if(e && e.keyCode == 13){
		 	document.getElementById("login").click();
		 }
	} ,false);
})();