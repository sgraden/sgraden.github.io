//Steven Raden 1160995 AA
//Building a 15 piece puzzle with features to show which pieces can move
//This is the Javascript file that contains the code to show movement and
//	color animation depending on the piece hovering over.
"use strict";

(function() { //Module?
	window.onload = startup;

	var emptyX = 300; //Empty boxes x coordinate
	var emptyY = 300; //Empty boxes y coordinate
	var shuffling = false; //Every Day I am. stops win during shuffle

	//the starter code
	function startup() {
		winInserter(true); //inserts the total wins text
		createSquares(); //makes the squares with createSquares and arrangeSquares methods
		newImage(); //checks what past image they had and sets it
		squareImage(); //aligns the image within each square
		document.getElementById("shuffle").onclick = startShuffle;
		//loops through to assign functions on the divs
		var squares = document.querySelectorAll(".pieces");
		for(var i = 0; i < squares.length; i++) {
			squares[i].onclick = onClickMove; //on click moves the square if able to
			movableTest(squares[i]); //checks each div to see if movable for first move.
		}
		document.getElementById("background").onchange = imageOnChange; //changes background image
	}

	//creates the divs for each piece and appends them to the puzzlearea
	//then calls the arrangeSquares methods to move them into place
	function createSquares() {
		var area = document.getElementById("puzzlearea");
		for (var i = 0; i < 15; i++) {
			var piece = document.createElement("div");
			piece.className = "pieces";
			piece.innerHTML = i + 1;
			area.appendChild(piece);
		}
		arrangeSquares(); //places them in right places
	}

	//arranges the squares into their correct positions 1-15
	//selects all the pieces, called by createSquares
	function arrangeSquares() {
		var squares = document.querySelectorAll(".pieces");
		var xcounter = 0; //the column of the box
		var ycounter = 0; //the row of the box
		for(var i = 0; i < squares.length; i++){
			squares[i].style.left = (xcounter * 100) + "px";
			squares[i].style.top = (ycounter * 100) + "px";
			xcounter++;
			if(xcounter > 3){
				xcounter = 0;
				ycounter++;
			}
		}
	}

	//aligns the images in each div to be the correct position
	function squareImage() {
		var squares = document.querySelectorAll(".pieces");
		var x = 0;
		var y = 0;
		//for all squares get x/y and multiply by -1 and set background to that
		for(var i = 0; i < squares.length; i++){
			x = parseInt(squares[i].style.left) * -1;
			y = parseInt(squares[i].style.top) * -1;
			squares[i].style.backgroundPosition = x + "px " + y + "px";
		}
	}

	//shuffles the pieces around 100 times by moving each one individually
	//if it is an active square that can move
	function startShuffle() {
		shuffling = true;
		win(false); //sets win comment to blank
		for(var i = 0; i < 1000; i++) { //shuffle squares 100times
			var active = document.querySelectorAll(".active");
			//choose a random square and move
			moveSquare(active[parseInt(Math.random() * active.length)]);
		}
	}

	//method that is called when a box is clicked on. checks if box is movable based on class
	//Then calls the function to move the box
	function onClickMove() {
		shuffling = false;
		if(this.classList.contains("active")) {
			moveSquare(this);
		}
	}

	//moves the square that is clicked/shuffled. called by startShuffle and onClickMove
	function moveSquare(square) {
		var thisX = parseInt(square.style.left);
		var thisY = parseInt(square.style.top);
		square.style.left = emptyX + "px"; //moves squares x/y to empty space
		square.style.top = emptyY + "px";
		emptyX = thisX;
		emptyY = thisY;
		checkMovable(); //checks and assigns which squares are movable
		allAligned(); //checks if squares are all aligned
	}

	//runs through all the divs after each move and has movableTest add the class
	//active if movable. called by moveSquare
	function checkMovable() {
		var squares = document.querySelectorAll(".pieces");
		for(var i = 0; i < squares.length; i++) {
			movableTest(squares[i]);
		}
	}

	//function that checks a square to see if it can be moved and adds/removes active class
	function movableTest(square) {
		var thisX = parseInt(square.style.left); //squares x value
		var thisY = parseInt(square.style.top); //squares y value
		//checks the squares x/y compares to the empty squares x/y
		if(((thisX + 100 == emptyX || thisX - 100 == emptyX) && thisY == emptyY) ||
				((thisY + 100 == emptyY || thisY - 100 == emptyY) && thisX == emptyX)) {
			square.classList.add("active"); //can move
		}else {
			square.classList.remove("active"); //cannot move
		}
	}

	//checks if each div is aligned properly and calls the proper functions
	function allAligned() {
		if(!shuffling) {
			var squares = document.querySelectorAll(".pieces");
			var correctSquares = 0;
			for(var i = 0; i < squares.length; i++) { //loop through squares
				var squaresXY = squares[i].style.backgroundPosition; //get background position
				var squaresSplit = squaresXY.split(" "); //split the text into x and y
				//if the backgroundPosition x and y match the divs current position it is correct
				if(parseInt(squaresSplit[0]) * -1 == parseInt(squares[i].style.left) &&
						parseInt(squaresSplit[1]) * -1 == parseInt(squares[i].style.top)) {
					correctSquares++;
				}
			}
			if(correctSquares == 15) {
				win(true);
				winInserter(false);
			}else {
				correctSquares = 0;
				win(false);
			}
		}
	}

	//inserts the number of wins into the page, called at start and winCounter
	//didn't realize limited use of localStorage due to reading old specs (didn't know changed)
	function winInserter(start) { //var start is whether this is called from onload or not
		if(!localStorage["wins"]) {
			localStorage["wins"] = 0;
		}
		if(!shuffling && !start) {
			localStorage["wins"]++;
		}
		document.getElementById("wins").innerHTML = "Total Wins: " + localStorage["wins"];
	}

	//injects the winner text into the page and removes it
	//when shuffle or pieces not aligned, called by allAligned.
	function win(hasWon) {
		var winSpace = document.getElementById("winner");
		if(hasWon){
			winSpace.innerHTML = "Congratulations you have Won!";
		}else {
			winSpace.innerHTML = "";
		}
	}

	//called on change of the select box
	function imageOnChange() {
		localStorage["image"] = this.value;
		newImage();
	}

	//called onchange. called by imageOnChange and at start
	//this way different classes are able to be set to new images easily
	function newImage() {
		if(!localStorage["image"]) {
			localStorage["image"] = "Android.jpg";
		}
		var storedImg = localStorage["image"];
		//goes through select options and checks if their value matches the stored image
		var options = document.getElementsByTagName("option");
		for(var i = 0; i < options.length; i++) {
			if(options[i].value == storedImg){
				options[i].selected = "selected"; //sets the correct option to be selected
			}
		}
		var squares = document.querySelectorAll(".pieces");
		for(var i = 0; i < squares.length; i++) { //sets each div to have the new background image
			squares[i].style.backgroundImage = "url(" + storedImg + ")";
		}
	}
})();