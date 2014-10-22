"use strict";
(function() {

	//$(draw);
	$(document).ready( function() {
		var scroll = true;
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			scroll = false;
		}

		$(window).resize(function() {
			$('.wow').removeClass('wow animated');
		})

		$('#fullpage').fullpage({
			//anchors: ['homeSection', 'aboutSection', 'projectsSection', 'experienceSection', 'contactSection'],
			sectionsColor: ['white', '#437882', '#50A062', '#B2574D', '#D39D6A'], //#DEDEDE
			scrollingSpeed: 300,
			autoScrolling: scroll,
			css3: true,
			navigation: scroll,
			navigationPosition: 'right',
			navigationTooltips: ['Home', 'About', 'Projects', 'Experience', 'Contact'],
			onLeave: function(index, nextIndex, direction) {
				if (scroll) {
					wowAnimateIn(nextIndex, direction)
				}
			},
			scrollOverflow: true,
			//responsive: 500,
			normalScrollElements: ".item .content"
			//fixedElements: '#element1, .element2'
			//menu: true,
		});

		/*$('.item .content').slimScroll({
        	height: 'auto'
    	});
    	$('#aboutContent').slimScroll({
        	height: 'auto'
    	});*/

		new WOW().init();

		$('.item').click(function() {
			expandContent(this);
		});

		$('.content').click(function(event) {
			event.stopPropagation();
		});
	});
	
	function expandContent(clicked) {
		$(clicked).children('.content').slideToggle().focus();
	}

	function wowAnimateIn(nextIndex, direction) {
		if (nextIndex == 1) { //home

		} else if (nextIndex == 2 && direction == 'down') { //about
			if(!$('#about .row div').hasClass('wow')) {
				//console.log('hey');
				$('#about .sectionTitle, #about .row div').addClass('wow animated fadeInLeftBig');
			}
		} else if (nextIndex == 3 && direction == 'down') { //projects
			if(!$('#projects .item').hasClass('wow')) {
				$('#projects .sectionTitle, #projects .item').addClass('wow animated fadeInUpBig');
			}
		} else if (nextIndex == 4 && direction == 'down') { //experience
			if(!$('#experience .item').hasClass('wow')) {
				$('#experience .sectionTitle, #experience .item').addClass('wow animated fadeInUpBig');
			}
		} else if (nextIndex == 5 && direction == 'down') { //contact

		}
		
	}

	//hides other item content
	function hideOtherItemContent(elements) {
		for (var i = 0; i < elements.length; i++) {
			var itemContent = $(elements[i]).children('.item').children('.contentOnClick');
			if (itemContent.is(":visible")) {
				expandContent($(elements[i]).children('.item'));
			}
		}
	}

	/*function resetWidths(clicked) {
		var clickedSiblings = $(clicked).parent().siblings();
		hideOtherItemContent(clickedSiblings);
		$(clicked).parent().siblings().removeClass("col-lg-8 col-lg-4").addClass("col-lg-2");
		$(clicked).parent().removeClass('cold-lg-4 col-lg-2').addClass('col-lg-8');
	}*/

	
})();