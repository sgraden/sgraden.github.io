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
	})

	$('#fullpage').fullpage({
		//anchors: ['homeSection', 'aboutSection', 'projectsSection', 'experienceSection', 'contactSection'],
		verticalCentered: true,
		sectionsColor: ['white', '#67A29C', '#50A062', '#67A29C', '#50A062'], //#DEDEDE
		scrollingSpeed: 300,
		autoScrolling: scroll,
		css3: true,
		navigation: scroll,
		navigationPosition: 'right',
		navigationTooltips: ['Home', 'About', 'Projects', 'Experience', 'Contact'],
		onLeave: function(index, nextIndex, direction) {
			if (scroll) {
				//wowAnimateIn(nextIndex, direction)
			}
		},
		scrollOverflow: true,
		//responsive: 500,
		normalScrollElements: "#modalContent"
		//fixedElements: '#element1, .element2'
		//menu: true,
	});

	$.getJSON("content.json", function(data) {
		getJson(data);
	});


	$('#projects .item').click(function() {
		openModal($(this).attr("data-val"), "project");
	});
	$('#experience .item').click(function() {
		openModal($(this).attr("data-val"), "experience");
	});

	$('#contactSend').click(function(e) {
		e.preventDefault();
		if ($('#contact .contactMessage').length) {
			$('#contact .contactMessage').slideUp(function() {
				$('#contact .contactMessage').remove();
				sendEmail();
			});
		} else {
			sendEmail();
		}
		return false;
	});

	$('#contactReset').click(function() {
		$('#contact .contactMessage').slideUp(function() {
			$('#contact .contactMessage').remove();
		});
	});

});




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
		if(!$('#contact .row > div').hasClass('wow')) {
			$('#contact .row > .sectionTitle, #contact .row > div').addClass('wow animated fadeInLeftBig');
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
	$('#modalContent #modalImg img').attr("src", currObject.img); //img
	$('#modalContent #modalTitle').text(currObject.title); //title
	$('#modalContent #modalInfo').text(currObject.description); //description
	
	if (currObject.languages.length > 0) { //insert languages
		$('#modalContent #modalToolsList').empty();
		$('#modalContent #modalToolsGraph').empty();
		//$.each(currObject.links, function(key, val) {
		for (var i = 0; i < currObject.languages.length; i++) {
			var list = currObject.languages;
			if (currObject.graph.length > 0) {
				var graphHeight = currObject.graph[i] * 10;
				$('#modalContent #modalToolsGraph').append(
					$('<div class="col-xs-2"></div>').append(
						$('<div></div>').height(graphHeight + 'px').css('top', 50 - graphHeight)
					)
				);
			}
			$('#modalContent #modalToolsList').append(
				$('<div class="col-xs-2">' + list[i] + '</div>')
			);
		}
		$('#modalToolsTitle').show();
		$('#modalContent #modalToolsList').show();
	} else {
		$('#modalToolsTitle').hide();
		$('#modalContent #modalToolsList').hide();
	}
	if (currObject.graph.length > 0) { //Not always a graph
		$('#modalToolsGraph').show();
	} else {
		$('#modalToolsGraph').hide();
	}

	if (currObject.links.length > 0) { //insert links
		$('#modalContent #modalRelatedList').empty();
		//$.each(currObject.links, function(key, val) {
		for (var i = 0; i < currObject.links.length; i = i + 2) {
			var list = currObject.links;
			$('#modalContent #modalRelatedList').append(
				$("<a href='" + list[i + 1] + "' target='_blank'></a>" ).append(
					$('<div class="col-xs-2">' + list[i] + '</div>')
				)
			);
		}
		$('#modalRelatedTitle').show();
		$('#modalContent #modalRelatedList').show();
	} else { //no links
		$('#modalRelatedTitle').hide();
		$('#modalContent #modalRelatedList').hide();
	}
	$('#modalContent').modal('show');
}

function sendEmail() {
	
	var form = $('#contactForm').serializeArray();
	$.ajax({
		type: 'POST',
		url: 'mail.php',
		data: form,
		success: function(res) {
			$('#contact h1.sectionTitle').after("<h2 class='contactMessage contactSuccess'>Email has been sent. Thank you. I will be in contact shortly.</h2>");
			$('#contact .contactMessage').slideDown();
		},
		error: function(res) {
			if (res.status == 400) {
				$('#contact h1.sectionTitle').after("<h2 class='contactMessage contactError'>Name or Email was not entered or Email was not valid.</h2>");
			} else {
				$('#contact h1.sectionTitle').after("<h2 class='contactMessage contactError'>There was an error sending the Email. Please try again.</h2>");
			}
			$('#contact .contactMessage').slideDown();
		}
	});
	
}
	
})();