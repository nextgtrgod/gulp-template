var VENDOR = 'unknown';

(function checkBrowser() {
	var ua		= window.navigator.userAgent.toLowerCase();
	var msie	= ua.indexOf('msie');
	var trident	= ua.indexOf('trident');
	var edge	= ua.indexOf('edge');
	var moz		= ua.indexOf('firefox');
	var chr		= ua.indexOf('chrome');
	var saf		= ua.indexOf('safari');
	var root	= document.getElementsByTagName('html')[0];


	if (typeof window.orientation !== 'undefined') root.classList.add('mobile-device');


	if (msie > 0 || trident > 0 || edge > 0) {
		VENDOR = 'any-ie';
		root.classList.add(VENDOR);
		return true

	} else if (moz > 0) {
		VENDOR = 'any-firefox';
		root.classList.add(VENDOR);
		return true

	} else if (chr > 0) {
		VENDOR = 'any-chrome';
		root.classList.add(VENDOR);
		return true

	} else if (saf > 0) {
		VENDOR = 'any-safari';
		root.classList.add(VENDOR);
		return true

	} else {
		return false
	}

})();