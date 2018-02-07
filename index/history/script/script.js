(function(){
	window.onload = function(){
		var page_size = 10;
		var page = 1;
		var total_num = null;
		function ajaxhistory(page){
			$.ajax({
				url: url+'history',
				type: 'POST',
				dataType: 'json',
				contentType: "application/json",
				data:JSON.stringify({
					"page_size":page_size,
					"page_num":page 
				}),
			})
			.done(function(res) {
				total_num = res.data.total_num;
				var container = document.getElementById("container");
				var listContainer = container.getElementsByClassName("listContainer")[0];
				listContainer.innerHTML = '';
				for (var i = 0 ; i < res.data.list.length ; i++){
					var list = container.getElementsByClassName("list")[0];
					var Line_div = document.createElement("div");
					Line_div.className = "line";

					var Number_div = document.createElement("div");
					Number_div.className = "number";
					var Number_text = document.createTextNode(i+1);
					Number_div.appendChild(Number_text);

					var Name_div = document.createElement("div");
					Name_div.className = "name";
					var Name_text = document.createTextNode(res.data.list[i].name);
					Name_div.appendChild(Name_text);

					var Date_div = document.createElement("div");
					Date_div.className = "date";
					var Date_text = document.createTextNode(res.data.list[i].certificate_num);
					Date_div.appendChild(Date_text);

					var Operation_div = document.createElement("div");
					Operation_div.className = "operation";

					var reEdit_span = document.createElement("span");
					reEdit_span.setAttribute("data-id", res.data.list[i].id);
					reEdit_span.className = "reEdit";
					var reEdit_text = document.createTextNode("重新编辑");
					reEdit_span.appendChild(reEdit_text);

					var Delete_span = document.createElement("span");
					Delete_span.setAttribute("data-id", res.data.list[i].id);
					Delete_span.className = "delete";
					var Delete_text = document.createTextNode("删除");
					Delete_span.appendChild(Delete_text);
					var longString = document.createTextNode(" | ");
					Operation_div.appendChild(reEdit_span);
					Operation_div.appendChild(longString);
					Operation_div.appendChild(Delete_span);4

					Line_div.appendChild(Number_div);
					Line_div.appendChild(Name_div);
					Line_div.appendChild(Date_div);
					Line_div.appendChild(Operation_div);

					listContainer.appendChild(Line_div);

				}
				var deletes = document.getElementsByClassName("delete");
				for (var i = 0 ; i < deletes.length ; i++){
					(function(i){
						deletes[i].addEventListener("click", function(){
							console.log(this.getAttribute("data-id"));
							$.ajax({
								url: url + 'delete_certificate?id='+this.getAttribute("data-id"),
								type: 'GET',
								contentType: "application/json",
							})
							.done(function() {
								window.history.go(0);
								console.log("success");
							})
							.fail(function() {
								console.log("error");
							})
							.always(function() {
								console.log("complete");
							});
							
						}, false);
					})(i);
				}
				var reEdits = document.getElementsByClassName("reEdit");
				for (var j = 0 ; j < reEdits.length ; j++){
					(function(j){
						reEdits[j].addEventListener("click", function(){
							console.log(this.getAttribute("data-id"));
							window.location.href="../newCert/newCert.html?id="+this.getAttribute("data-id");
						}, false);
					})(j);
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}
		ajaxhistory(page);
		document.getElementsByClassName("next")[0].addEventListener("click", function(){
			if(total_num>page*page_size){
				page++;
				document.getElementsByClassName("page")[0].innerText = page;
				ajaxhistory(page);
			}else{
				return false;
			}

		}, false);
		document.getElementsByClassName("prev")[0].addEventListener("click", function(){
			if(page>1){;
				page--;
				document.getElementsByClassName("page")[0].innerText = page;
				ajaxhistory(page);
			}else{
				return false;
			}
		}, false);
		document.getElementsByClassName("firstPage")[0].addEventListener("click", function(){
			if(page!==1){
				page=1;
				document.getElementsByClassName("page")[0].innerText = page;
				ajaxhistory(page);
			}else{
				return false;
			}
		}, false);
		document.getElementsByClassName("lastPage")[0].addEventListener("click", function(){
			if(page!==Math.ceil(total_num/page_size)){
				page=Math.ceil(total_num/page_size);
				document.getElementsByClassName("page")[0].innerText = page;
				ajaxhistory(page);
			}else{
				return false;
			}
		}, false);
	}
})();