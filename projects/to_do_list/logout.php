<!--
Steven Raden 1160995, Project to make a login pag that sets a session
and allows a user to store data permanently, logs out the user and 
deletes the users session
-->
<?php
	include 'common.php';
	session_start();
	session_destroy();
	session_regenerate_id(TRUE);
	session_start();
	pageDie("", "index.php");
?>