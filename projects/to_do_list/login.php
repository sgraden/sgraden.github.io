<!--
Steven Raden 1160995, Project to make a login page that sets a session
and allows a user to store data permanently, this page accepts the index
data and processes it to allow user passage, save the user, or state that
the information is invalid
-->
<?php

include 'common.php';
if($_POST["name"] == "" || $_POST["password"] == "") { //makes sure information isnt blank
	pageDie("Forgotten Field", "index.php");
}
if(!file_exists("users.txt")){
	file_put_contents("users.txt", "", FILE_APPEND); //Creates users.txt file
}
$username = $_POST["name"];
$password = $_POST["password"];
$loggedin = false;
if(!file_exists("todo_$username.txt")){ //if SOMEHOW a user does not have a todo this creates
	file_put_contents("todo_$username.txt", "", FILE_APPEND);
}
// Compares the given username and password to the ones stored. if password
// fails then it dies and if they pass it sets loggedin to true
$users = file("users.txt", FILE_IGNORE_NEW_LINES);
foreach($users as $user) {
	list($filename, $filepass) = explode(":", $user);
	if($filename == $username) {
		if($filepass == $password) {
			$loggedin = true;
		}else {
			pageDie("Incorrect Password", "index.php");
		}
	}
}
// only runs if the previous part did not set loggedin to true
// checks to see if info matches the username and password req's
// Then saves the information if they pass.
if(!$loggedin) {
	if(preg_match("/^[a-z][a-z0-9]{2,7}/", $username)&&preg_match("/^\d.{4,10}\W$/", $password)) {
		$fileinput = $username . ":" . $password . "\n";
		FILE_PUT_CONTENTS("users.txt", $fileinput, FILE_APPEND);
		$loggedin = true;
	}else {
		pageDie("Improper Username or Password Format", "index.php");
	}
}
// Starts a session because information either was already in or is now saved
// assigns session login to true and saves the username then redirects to todolist.php
if($loggedin) {
	$expireTime = time() + 60*60*24*7; 
	setcookie("date", date("D y M d, g:i:s a"), $expireTime);
	session_start();
	$_SESSION["logged_in"] = true;
	$_SESSION["username"] = $username;
	header("location:todolist.php");
}

?>