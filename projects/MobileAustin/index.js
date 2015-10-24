"use strict";
(function() {

	$(document).ready(function() {
		$('#mainContent > .contentElement > ul > li').click(function() {
			showEventInfo(this);
		});
		$('#mainContent > #mapButtons > div > div').click(function() {
			selectMapElement(this);
		});

		$(".openDrawer").click(function() {
			$('#sideBar').toggle();
			$('#cover').toggle();
		});

		$('#cover').click(function() {
			$('#sideBar').hide();
			$('#cover').hide();
		});
	});

	function showEventInfo(clicked) {
		$(clicked).children(".eventInfo").toggle();
	}

	function selectMapElement(clicked) {
		//var $($(clicked).attr('id'))
		if ($(clicked).hasClass("inactive")) {
			$(clicked).removeClass("inactive");
		} else {
			$(clicked).addClass("inactive");
		}
	}

})();