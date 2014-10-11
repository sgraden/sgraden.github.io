"use strict";
(function() {

	//$(draw);
	$(document).ready( function() {
		$('#fullpage').fullpage({
			//anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
			sectionsColor: ['#DEDEDE'], //#DEDEDE
			scrollingSpeed: 300,
			css3: true,
			navigation: true,
			navigationPosition: 'right',
			navigationTooltips: ['Home', 'About', 'Projects', 'Work', 'Contact']
			//fixedElements: '#element1, .element2'
			//menu: true,
			
		});
	});



	
})();