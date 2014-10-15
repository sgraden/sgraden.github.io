"use strict";
(function() {

	//$(draw);
	$(document).ready( function() {
		$('#fullpage').fullpage({
			//anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
			sectionsColor: ['white', 'white', '#255E68', '#A94439', '#A97039'], //#DEDEDE
			scrollingSpeed: 300,
			css3: true,
			navigation: true,
			navigationPosition: 'right',
			navigationTooltips: ['Home', 'About', 'Projects', 'Work', 'Contact']
			//fixedElements: '#element1, .element2'
			//menu: true,
			
		});
		$(".item").click(function(event) {
			resetWidths(this);
			expandContent(this);
		})
	});

	function expandContent(clicked) {
		$(clicked).children(".contentOnClick").toggle("slide", {direction: "up"});
	}

	function resetWidths(clicked) {
		$(clicked).parent().siblings().removeClass("col-lg-8 col-lg-4").addClass("col-lg-2");
		$(clicked).parent().removeClass('cold-lg-4 col-lg-2').addClass('col-lg-8');
	}



	
})();