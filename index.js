"use strict";
(function() {

var contentProjects = [];
var contentExperience = [];
var modalIsOpen = true;

//$(draw);
$(document).ready( function() {
	/*if mobile then show the menu names without hover*/
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('#navBar > div > div span').addClass('showMenuNames');
	}
	
	$(window).scroll(function(e) {
		// console.log('hello');
		if (modalIsOpen) {
			e.preventDefault();
			return false;
		} else {
			return true;
		}
	});

	$(".navButton").click(function(event) {
		toggleNav();
		var elementID = event.currentTarget.id;
		elementID = elementID.substring(3).toLowerCase();

	    $('html, body').animate({
	        scrollTop: $("#" + elementID).offset().top
	    }, 1000);
	});

	/*Grabs Json file at load*/
	$.getJSON("content.json", function(data) {
		getJson(data);
	});

	/*applies click listener to nav*/
	$('#navToggleButton').click(toggleNav);

	/*attaches click listener to work and projects*/
	$('#projects .item').click(function() {
		openModal($(this).attr("data-val"), "project");
	});
	$('#work .item').click(function() {
		openModal($(this).attr("data-val"), "work");
	});

	/*close modal*/
	$('#modalContent #modalHead button, #modalCover').click(function() {
		$('#modalContent').slideUp();
		$('#modalCover').hide();
	});

	/*applies listener to handle sending and removes message*/
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

	/*Handles reset contact form*/
	$('#contactReset').click(function() {
		$('#contact .contactMessage').slideUp(function() {
			$('#contact .contactMessage').remove();
		});
	});

});

function toggleNav() {
	//click menu button
	var $navList = $('#navBar > div');

	if ($navList.hasClass('navClosed')) { //open
		$navList.addClass('navOpen').removeClass('navClosed');
	} else { //Close
		$navList.addClass('navClosed').removeClass('navOpen');
	}
}

function getJson(data) {
	$.each(data, function(key, val) {
		if (val.category == "project") {
			contentProjects.push(val);
		} else if (val.category == "work") {
			contentExperience.push(val);
		}
	});
}

/*Opens, empties, and fills the modal with the content relevant to button pressed*/
function openModal(val, category) {
	var currObject = {};
	if (category == "project") {
		currObject = contentProjects[val];
	} else {
		currObject = contentExperience[val];
	}


	// $('#modalContent #modalImg img').attr("src", currObject.img); //img
	$('#modalContent #modalBody').scrollTop(0);
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
	$('#modalContent').slideDown();
	$('#modalCover').show();
}

function sendEmail() {
	var form = $('#contactForm').serializeArray();
	$.ajax({
		type: 'POST',
		url: 'mail.php',
		data: form,
		success: function(res) {
			$('#contactSend').attr('disabled', 'disabled');
			$('#contact h1.sectionTitle').after("<h2 class='contactMessage contactSuccess'>Email has been sent. I will be in contact shortly.</h2>");
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