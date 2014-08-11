<!DOCTYPE html>
<!--Steven Raden, AA/AO, NerdLuv Matching nerds with other nerd, This page process signup data and adds to singles.txt -->
<?php
	include 'common.php';
	$filetext = $_POST["name"] . "," . $_POST["gender"] . "," . $_POST["age"] . "," . $_POST["persontype"] . "," 
				. $_POST["os"] . "," . $_POST["minage"] . "," . $_POST["maxage"] . "\n";
	FILE_PUT_CONTENTS("singles.txt", $filetext, FILE_APPEND);
?>
<html>
	<head>
		<?php head(); ?>
	</head>
	
	<body>
		<?php bannerarea(); ?>
		<div>
			<h1>Thank you!</h1>
			<p>Welcome to NerdLuv, <?= $_POST["name"] ?>!</p>
			
			<p>Now <a href="matches.php">log in to see your matches!</a></p>	
		</div>
	
		<?php bottomPart() ?>
	
	</body>
</html>