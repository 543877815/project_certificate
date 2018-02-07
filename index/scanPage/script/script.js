(function(){
	document.getElementsByClassName("company")[0].innerText = getQueryString("company");
	document.getElementsByClassName("name")[0].innerText = getQueryString("name");
	document.getElementsByClassName("number")[0].innerText = getQueryString("number");
	function getQueryString(key){
		var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
		var result = window.location.search.substr(1).match(reg);
		return result?decodeURIComponent(result[2]):null;
	}
})();