<?php
error_reporting(-1);
ini_set('display_errors', 'On');

// foreach ($_POST as $key => $value) {
// 	echo "Field ".htmlspecialchars($key)." is ".htmlspecialchars($value)."<br>";
// }

$name = "";
$email = "";
$comment = "";

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['comment'])) {
	$name = htmlspecialchars($_POST['name']);
	$email = htmlspecialchars($_POST['email']);
	$comment = htmlspecialchars($_POST['comment']);
} else {
	header('HTTP/1.1 500 Internal Server Error');
	exit("ERROR: There was an error receiving data");
}

if (!preg_match("/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/", $email)) {
	header('HTTP/1.1 400 Bad Request');
	exit("ERROR: There was an error receiving data");
} elseif ($name == "") {
	header('HTTP/1.1 400 Bad Request');
	exit("ERROR: There was an error receiving data");
}

$message = "Name: " . $name . "\nEmail: " . $email . "\nComment:\n" . $comment;

if (!mail("stevengraden@gmail.com", "Portfolio" , $message)) {
	header('HTTP/1.1 500 Internal Server Error');
	exit("ERROR: Something happened when sending email.");
}

?>