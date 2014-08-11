"use strict";

window.onload = startup;


function startup() {
	var images = document.querySelectorAll(".actualimage");
	for(var i = 0; i < images.length; i++) {
		images[i].onclick = enlarge;

	}

}

function enlarge() {
	var bigPicture = document.getElementById("bigpicture");
	var pictureArea = document.getElementById("largeimage");
	var link = document.getElementById("imagelink");
	bigPicture.src = this.src;
	link.href = this.src;
}