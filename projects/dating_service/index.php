<!DOCTYPE html>
<!--Steven Raden, AA/AO, NerdLuv Matching nerds with other nerd, This page is the front -->
<?php
	include 'common.php';
?>
<html>

	<head>
		<?php head(); ?>
	</head>

	<body>
		<?php bannerarea(); ?>

		<div>
			<h1>Welcome!</h1>

			<ul>
				<li>
					<a href="signup.php">
						<img src="https://webster.cs.washington.edu/images/nerdluv/signup.gif" alt="icon" />
						Sign up for a new account
					</a>
				</li>

				<li>
					<a href="matches.php">
						<img src="https://webster.cs.washington.edu/images/nerdluv/heartbig.gif" alt="icon" />
						Check your matches
					</a>
				</li>
			</ul>
		</div>

		<?php bottompart(); ?>
	</body>
</html>
