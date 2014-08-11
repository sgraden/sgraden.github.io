<!DOCTYPE html>
<!--Steven Raden, AA/AO, NerdLuv Matching nerds with other nerd, This page this page requests which user to match -->
<?php
	include 'common.php';
?>
	<head>
		<?php head(); ?>
	</head>
	
	<body>
		<?php bannerarea(); ?>
		<form action="matches-submit.php" method="get">
			<fieldset>
				<legend>Returning User:</legend>
				<strong>Name:</strong> <input type="text" name="name" size="16" /> <br />
				<input type="submit" value="View My Matches" />
			</fieldset>	
		</form>
	
	
	
		<?php bottomPart() ?>
	
	</body>
</html>