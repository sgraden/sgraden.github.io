<!DOCTYPE html>
<!--Steven Raden, AA/AO, NerdLuv Matching nerds with other nerd, This page finds users matches -->
<?php
	include ('common.php');
	$userName = $_GET["name"];
?>
	<head>
		<?php head(); ?>
	</head>

	<body>
		<?php bannerarea();?>
		<h1>Matches for <?= $userName; ?></h1>
<!-- this php code first finds and saves the data for the current user and then narrows
	down the matches for the user and displays them -->
<?php
	$singles = file("singles.txt");
	foreach($singles as $single) {
		$inLine = explode(",", $single);
		if($inLine[0] == $userName) {
			$user = $inLine;
		}
	}
	
	foreach($singles as $single) {
		$inLine = explode(",", $single);
		if($user[1] != $inLine[1]) {
			if($user[2] > $inLine[5] && $user[2] < $inLine[6] && $inLine[2] > $user[5] && $inLine[2] < $user[6]) {
				if($user[4] == $inLine[4]) {
					$personalitymatch = 0;
					for($i = 0; $i <= 3; $i++) {
						if($user[3][$i] == $inLine[3][$i]) {
							$personalitymatch++;
						}
					}
					if($personalitymatch >= 1) {
					
?>
						<div class="match">
							<p>
								<img src="https://webster.cs.washington.edu/images/nerdluv/user.jpg" 
														alt=<?php $inLine[0] ?> /> <?= $inLine[0] ?>
							</p>
							<ul>
								<li><strong>gender:</strong> <?= $inLine[1] ?></li> 
								<li><strong>age:</strong> <?= $inLine[2] ?></li>
								<li><strong>type:</strong> <?= $inLine[3] ?></li>
								<li><strong>OS:</strong> <?= $inLine[4] ?></li>
							</ul>
						</div>
<?php
					}
				}
			}
		}
	}	
?>
	
	<?php bottomPart() ?>
	
	</body>
</html>