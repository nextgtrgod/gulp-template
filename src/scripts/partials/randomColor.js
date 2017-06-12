// get random hex color
function getRandomColor() {
	var hexColor = '#',
		charsArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
						'A', 'B', 'C', 'D', 'E', 'F'];

	for(i=0; i<6; i++){
		hexColor += charsArray[getRandom(0, 15)];
	};

	return hexColor;
};


$(document).ready(function(){
	$('.wanna-color').each(function(index, el){
		$(el).css({
			'background-color': ''+getRandomColor()+''
		});
	});
});