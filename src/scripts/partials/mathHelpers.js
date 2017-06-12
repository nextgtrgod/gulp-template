// get random integer (mostly used)
// getRandom() 					// 0 or 1 		[int]
// getRandom(max)				// 0..max 		(inclusively)
// getRandom(min, max)			// min..max 	(inclusively)
// getRandom(min, max, false) 	// min..!0..max (inclusively)
function getRandom(min, max, includeZero) {
	switch (arguments.length) {
		case 0:
			return Math.round(Math.random());

		case 1:
			return ~~(Math.random() * (arguments[0] + 1))

		case 2:
			return ~~(Math.random() * (max + 1 - min)) + min;

		case 3:
			if(arguments[2]) {
				return ~~(Math.random() * (max + 1 - min)) + min;
			}
			var result = ~~(Math.random() * (max + 1 - min)) + min;
			if(result === 0) {
				return ++result
			}
			return result
	}
};


// get random float
function getRandomFloat(min, max) {
	return Math.random() * (max + 1 - min) + min;
};


// check if number is integer
function isInt(n) {
	return (~~n) === n;
}