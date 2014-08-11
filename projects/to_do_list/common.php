<!--
Steven Raden 1160995, Project to make a login pag that sets a session
and allows a user to store data permanently, stores commonly used 
functions throughout the project
-->
<?php 
//contains the head information for all pages
function head() { 
?>
	<meta charset="utf-8" />
	<title>Remember the Cow</title> 
	<link href="https://webster.cs.washington.edu/css/cow-provided.css" type="text/css" rel="stylesheet" />
	<link href="cow.css" type="text/css" rel="stylesheet" />
	<link href="https://webster.cs.washington.edu/images/todolist/favicon.ico" type="image/ico" rel="shortcut icon" />
	<script src="https://webster.cs.washington.edu/js/todolist/provided.js" type="text/javascript"></script>
<?php } ?>

<?php 
//contains the top banner
function topheader() { 
?>
	<h1>
		<img src="https://webster.cs.washington.edu/images/todolist/logo.gif" alt="logo" />
		Remember<br />the Cow
	</h1>
<?php } ?>

<?php
//contains the bottom banner
function bottomfooter() { 
?>
	<p>
		"Remember The Cow is nice, but it's a total copy of another site." - PCWorld<br />
		All pages and content &copy; Copyright CowPie Inc.
	</p>

	<div id="w3c">
		<a href="https://webster.cs.washington.edu/validate-html.php">
		<img src="https://webster.cs.washington.edu/images/w3c-html.png" alt="Valid HTML" /></a>

		<a href="https://webster.cs.washington.edu/validate-css.php">
		<img src="https://webster.cs.washington.edu/images/w3c-css.png" alt="Valid CSS" /></a>
	</div>
<?php } ?>

<?php
//used for the various reasons and locations a page would die and redirect
function pageDie($reason, $redirect) {
	header("location: $redirect");
	die($reason);
}
?>

