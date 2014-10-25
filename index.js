"use strict";
(function() {

	var contentProjects = [];
	var contentExperience = [];

	//$(draw);
	$(document).ready( function() {
		var scroll = true;
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			scroll = false;
		}

		$(window).resize(function() {
			$('.wow').removeClass('wow animated');
			//$('#home.section .row, #about.section .row').height($('html').height());
		})

		$('#fullpage').fullpage({
			//anchors: ['homeSection', 'aboutSection', 'projectsSection', 'experienceSection', 'contactSection'],
			verticalCentered: true,
			sectionsColor: ['white', '#437882', '#50A062', '#437882', '#50A062'], //#DEDEDE
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
			scrollOverflow: true
			//responsive: 500,
			//normalScrollElements: ".item .content"
			//fixedElements: '#element1, .element2'
			//menu: true,
		});

		$.getJSON("content.json", function(data) {
			getJson(data);
		});

		//new WOW().init();

		$('#projects .item').click(function() {
			//expandContent(this);
			openModal($(this).attr("data-val"), "project");
		});
		$('#experience .item').click(function() {
			//expandContent(this);
			openModal($(this).attr("data-val"), "experience");
		});
	});
	
/*	function expandContent(clicked) {
		$(clicked).children('.content').slideToggle().focus();
	}*/

	function wowAnimateIn(nextIndex, direction) {
		if (nextIndex == 1) { //home

		} else if (nextIndex == 2 && direction == 'down') { //about
			if(!$('#about .row div').hasClass('wow')) {
				$('#about .sectionTitle, #about .row div').addClass('wow animated fadeInLeftBig');
			}
		} else if (nextIndex == 3 && direction == 'down') { //projects
			if(!$('#projects .item').hasClass('wow')) {
				$('#projects .sectionTitle, #projects .item').addClass('wow animated fadeInLeftBig');
			}
		} else if (nextIndex == 4 && direction == 'down') { //experience
			if(!$('#experience .item').hasClass('wow')) {
				$('#experience .sectionTitle, #experience .item').addClass('wow animated fadeInLeftBig');
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

	function getJson(data) {
		$.each(data, function(key, val) {
			if (val.category == "project") {
				contentProjects.push(val);
			} else if (val.category == "experience") {
				contentExperience.push(val);
			}
		});
	}

	function openModal(val, category) {
		var currObject = {};
		if (category == "project") {
			currObject = contentProjects[val];
		} else {
			currObject = contentExperience[val];
		}
		$('#modalContent #modalImg img').attr("src", currObject.img);
		$('#modalContent #modalTitle').text(currObject.title);
		$('#modalContent #modalInfo').text(currObject.description);
		if (currObject.links.length > 0) {
			$('#modalContent #modelRelatedList').empty();
			//$.each(currObject.links, function(key, val) {
			for (var i = 0; i < currObject.links.length; i = i + 2) {
				var list = currObject.links;
				$('#modalContent #modelRelatedList').append(
					$('<li></li>').append(
						$("<a href='" + list[i + 1] + "' target='_blank'>" + list[i] + "</a>" )
					)
				);
			}
			$('#modalRelatedTitle').show();
			$('#modalContent #modelRelatedList').show();
		} else { //no links
			$('#modalRelatedTitle').hide();
			$('#modalContent #modelRelatedList').hide();
		}
		$('#modalContent').modal('show');
	}
	
})();