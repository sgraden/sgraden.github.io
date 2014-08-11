<!DOCTYPE html>
<!--Steven Raden, AA/AO, NerdLuv Matching nerds with other nerd, This page receives and sends new user data -->
<?php
	include 'common.php';
?>
	<head>
		<!--contains the universal head-->
		<?php head(); ?>
	</head>
	<body>
		<!--contains the banner -->
		<?=bannerarea(); ?>
		<form action="signup-submit.php" method="post">
			<div>
				<fieldset>
					<legend>New User Signup:</legend>
					<strong>Name:</strong> <input type="text" name="name" size="16"/> <br />
					<strong>Gender:</strong>
						<label><input type="radio" name="gender" value="M" /> Male</label>
						<label><input type="radio" name="gender" value="F" checked="checked" /> Female</label> <br />
					<strong>Age:</strong> <input type="text" name="age" size="6" maxlength="2" /> <br />
					<strong>Personality type:</strong> <input type="text" name="persontype" size="6" maxlength="4" />
							(<a href="http://www.humanmetrics.com/cgi-win/JTypes2.asp">Don't know your type?</a>) <br />
					<strong>Favorite OS:</strong>
						<select name="os">
							<option value="Windows" selected="selected">Windows</option>
							<option value="Mac OS X">Mac OS X</option>
							<option value="Linux">Linux</option>
						</select> <br />
					<strong>Seeking age:</strong>
					<input type="text" name="minage" placeholder="min" size="6" maxlength="2" /> to
					<input type="text" name="maxage" placeholder="max" size="6"  maxlength="2" /> <br />
					<input type="submit" value="Sign Up" />
				</fieldset>
			</div>
		</form>
		<!--contains the universal bottom -->
		<?php bottomPart() ?>
	
	</body>
</html>