'use strict';


var $ = function $(selector) {

	// var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	// var elements = Array.from(context.querySelectorAll(selector));

	var elements = Array.from(document.querySelectorAll(selector));

	return {
		elements: elements,

		get: function get(URL) {
				var xmlhttp = new XMLHttpRequest();
				
				xmlhttp.open("GET", URL, true);
				xmlhttp.onreadystatechange = function() {
					if(this.readyState == 4 && this.status == 200) {
						return this.response
					}
				}
				xmlhttp.send();
			},

		append: function append(content) {
			this.elements.forEach(function (element) {
				element.innerHTML += content;
			});
		},

		addClass: function addClass(className) {
				this.elements.forEach(function (element) {
					element.classList.add(className);
				});
			},

		removeClass: function removeClass(className) {
				this.elements.forEach(function (element) {
					element.classList.remove(className);
				});
			},
		
		toggleClass: function toggleClass(className) {
				this.elements.forEach(function (element) {
					element.classList.toggle(className);
				});
			},

		html: function html(newHTML) {
				this.elements.forEach(function (element) {
					element.innerHTML = newHtml;
				});
				return this;
			},
	
		css: function css(newCSS) {
				this.elements.forEach(function (element) {
					Object.assign(element.style, newCss);
				});

				return this;
			},

		on: function on(event, handler, options) {
				this.elements.forEach(function (element) {
					element.addEventListener(event, handler, options);
				});

				return this;
			},


	};
};