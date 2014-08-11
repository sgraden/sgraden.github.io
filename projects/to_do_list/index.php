<!DOCTYPE html>
<!--
Steven Raden 1160995, Project to make a login pag that sets a session
and allows a user to store data permanently, this page is the index that
the user types in login information
-->
<html>
	<?php include 'common.php'; ?>
	<head>
		<?php head(); ?>
	</head>

	<body>
		<div style="color: red; font-size: 15px;">ALERT: Site not currently working due to webhost changes</div>
		<div class="headfoot">
			<?php topheader(); ?>
		</div>

		<div id="main">
			<p>
				The best way to manage your tasks. <br />
				Never forget the cow (or anything else) again!
			</p>

			<p>
				Log in now to manage your to-do list. <br />
				If you do not have an account, one will be created for you.
			</p>

			<form id="loginform" action="login.php" method="post">
				<div><input name="name" type="text" size="8" autofocus="autofocus" /> 
					<strong>User Name</strong> Start with lowercase, letters or numbers, 2-7 characters long</div>
				<div><input name="password" type="password" size="8" /> 
					<strong>Password</strong> Start with number, 4-10 characters long, and end with capital</div>
				<div><input type="submit" value="Log in" /></div>
			</form>
	<?php
		if(isset($_COOKIE["date"])) {
			$cookieDate = $_COOKIE["date"];
	?>
			<p>
				<em>(last login from this computer was <?= $cookieDate ?>)</em>
			</p>
	<?php
		}
	?>
		</div>
		<div class="headfoot">
			<?php bottomfooter(); ?>
		</div>
	</body>
</html>