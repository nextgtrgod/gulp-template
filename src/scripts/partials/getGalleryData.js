// read from json -----------------------------]
var jsonData;

$(function(){

	getJsonData(); //aaaa!!!


	function getJsonData() {

		$.getJSON("galleryData.json", function(json) {
			jsonData = json;

			$(document).trigger('jsonload.success');

		})
		.fail(function(json, status, error) {

			if(status === 'error' && error === 'Not Found') {
				makeJsonRequest()
			} else {
				console.error('getJSON failed: ' + status + '\n' + error + '\n' + 'We\'re Sorry')
				$(document).trigger('jsonload.fail');
			}


		});

	};


	// if no json file, requesting to make the new one
	function makeJsonRequest() {

		var xmlhttp = new XMLHttpRequest();
			
		xmlhttp.open("GET", "makejson.php", true);
		xmlhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				
				if(this.response === "success") {

					getJsonData();

				} else {
					document.write(this.response)
				}

			}
		}
		xmlhttp.send();

	};


});