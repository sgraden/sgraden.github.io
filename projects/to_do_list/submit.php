<!--
Steven Raden 1160995, Project to make a login pag that sets a session
and allows a user to store data permanently, this page processes todolist
data and removes or adds information in the file, but makes sure all
the data is set and proper first
-->
<?php
	include 'common.php';
	session_start(); 
	if(!isset($_SESSION["logged_in"])) { // is user logged in
		pageDie("Not logged in", "index.php");
	} 
	//adds sent string to the file
	if(isset($_POST["action"])) { //is there an action post
		$action = $_POST["action"];
		$username = $_SESSION["username"];
		if($action == "add") { //action is add
			$filetext = htmlspecialchars($_POST["item"] . "\n");
			FILE_PUT_CONTENTS("todo_$username.txt", $filetext, FILE_APPEND);
		}

		//if no index, index above max, or index not a number go to todolist
		//processes the delete request by saving data to an array, deleting
		//file contents and then writing everything but deleted
		$todolist = file("todo_$username.txt", FILE_IGNORE_NEW_LINES);
		if(isset($_POST["index"]) && $action == "delete") {
			$index = $_POST["index"];
			if(preg_match("/\d/", $index) || $index <= (count($todolist))) {
				FILE_PUT_CONTENTS("todo_$username.txt", ""); //blanks out document
				foreach($todolist as $key => $todoitem) { //Rewrites info except deleted
					if($key != $index) {
						FILE_PUT_CONTENTS("todo_$username.txt", $todoitem . "\n", FILE_APPEND);
					}
				}
			}else {
				pageDie("Incorrect Index", "todolist.php");
			}
		}else {
			pageDie("No Index or wrong action", "todolist.php");
		}
		pageDie("Returning", "todolist.php");
	}else {
		pageDie("No Action", "todolist.php");
	}
?>