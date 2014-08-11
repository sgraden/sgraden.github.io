//Steven Raden 1160995 AA
//Assignment to demonstrate how to code html pages with JS
//this is my javascript page that cause actions based on user interactions

"use strict";
window.onload = startup;
//On output comparison tool my page look really odd

var currSlide = -1; //slide the program is on with a number index, starts at -1 for increments
var slides = null; //The image split into sections, starting with null
var delay = 250; //the set delay, altered by the speed buttons, starts with medium setting
var timer = null; //Timer does not exist until it is created
var displayedAnimation = null; //Unsplit animation that is in the text area

//loads the correct functions and items upon startup
function startup() {
    document.getElementById("start").onclick = startAnimation;
    document.getElementById("stop").onclick = stopAnimation;
    document.getElementById("stop").disabled = true;
    document.getElementById("animation").onchange = chosenAnimation;
    document.getElementById("size").onchange = textSize;
    for(var i = 0; i<document.getElementsByName("speed").length; i++) {
        document.getElementsByName("speed")[i].onchange = animationSpeed;
    }
}
//Initiated by the start button it tests if slides are set to null and if they are
//then it splits the information in textarea by the delimiter
//then it starts a timer and disables the start and animation, enables stop
function startAnimation() {
    displayedAnimation = document.getElementById("textarea").value;
    slides = displayedAnimation.split("=====\n"); //divides the entire image into slides
    animate(); //calls animate once to pass the initial delay on entire image by the timer
    timer = setInterval(animate, delay);
    guiSettings();
}
function guiSettings() { //Switches start, animation, stop buttons from disabled to abled
    document.getElementById("start").disabled = !document.getElementById("start").disabled;
    document.getElementById("animation").disabled = !document.getElementById("animation").disabled;
    document.getElementById("stop").disabled = !document.getElementById("stop").disabled;
}
//function for displaying and running the correct animations in the correct order
function animate() {
    document.getElementById("textarea").value = slides[currSlide += 1];
    if(currSlide == slides.length - 1) {
        currSlide = -1;
    }
}
//stops the animation and sets the correct buttons to be active
//resets all the frame and timers
function stopAnimation() {
    clearInterval(timer);
    document.getElementById("textarea").value = displayedAnimation; //puts the full image in box
    guiSettings();
    timer = null; //sets timer to nothing so it can be reset needed so speed doesnt start animation
    currSlide = -1;  //resets current slide to the original starting value  
}
//initated by the changing of the speeds
//resets the value of delay and clears the timer, but resets the timer with new speed
function animationSpeed() {
    delay = this.value; //sets the delay to the value of selected speed
    clearInterval(timer);//clears timer to set a new delay
    if(timer !== null) { //stops animation from starting onclick when not playing
        timer = setInterval(animate, delay); //restarts with new delay
    }
}
//selects and displays the correct animation based on what is selected from box of options
//finds which option is selected then takes that and puts it into the ANIMATIONs array and inserts
//into the text area
function chosenAnimation() {
    //gets animation chosen from text in select box
    displayedAnimation = animation[this.options[this.selectedIndex].innerHTML];
    //inserts unbroken animation into textbox
    document.getElementById("textarea").value = displayedAnimation;
    currSlide = -1; //reset the currSlide to -1 for next animation
}
//alters the text size depending on selection by finding which one is selected
//and getting the value from it (my values are the text sizes)
function textSize() {
    var ptSize =  parseInt(this.options[this.selectedIndex].value);
    document.getElementById("textarea").style.fontSize = ptSize + "pt";
}