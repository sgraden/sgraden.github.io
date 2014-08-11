<!DOCTYPE html>
<!--
Steven Raden 1160995, Project to make a login pag that sets a session
and allows a user to store data permanently, a page where user can 
type in a to do list and add or delete data
-->
<html>
<?php 
include 'common.php'; 

session_start();
if(!isset($_SESSION["logged_in"])) { //if the user is logged in
	pageDie("Not Logged in", "index.php");
}
$username = $_SESSION["username"];
$todolist = file("todo_$username.txt", FILE_IGNORE_NEW_LINES);
?>
	<head>
		<?php head(); ?>
	</head>

	<body>
		<div class="headfoot">
			<?php topheader(); ?>
		</div>
		<div id="main">
			<h2><?= $username ?>'s List of Things To-Do</h2>
			<?php
				$size = filesize("todo_$username.txt");
				if($size == 0) { //adds a comment for users with no data for fun
			?>
					<p>Enter an item and select "add" to start your list <br />
					Select "delete" to remove an item</p>
			<?php
				}
			?>
			<ul id="todolist">
				<?php
					//goes through file and places each text line in the list
					foreach($todolist as $key => $todoitem) { //makes it so key equals index
				?>
						<li>
							<form action="submit.php" method="post">
								<input type="hidden" name="action" value="delete" />
								<input type="hidden" name="index" value=<?= $key ?> />
								<input type="submit" value="Delete" />
							</form>
							<?= $todoitem ?>
						</li>
				<?php
					}
				?>
				<li>
					<form action="submit.php" method="post">
						<input type="hidden" name="action" value="add" />
						<input name="item" type="text" size="25" autofocus="autofocus" />
						<input type="submit" value="Add" />
					</form>
				</li>
			</ul>

			<div>
				<a href="logout.php"><strong>Click Here to Log Out</strong></a>
				<?php $cookieDate = $_COOKIE["date"] ?>
				<em>(You have been logged in since <?= $cookieDate ?>)</em>
			</div>

		</div>

		<div class="headfoot">
			<?php bottomfooter(); ?>
		</div>
	</body>
</html>
