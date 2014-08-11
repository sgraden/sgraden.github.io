<!DOCTYPE html>
<html>
	<?php include 'common.php'; ?>
	<?php head(); ?>
			<div id="allpictures">
<?php
		foreach(glob("photos/*.jpg") as $img) {
?>
			<div class="pics">
				<img class = "actualimage" src=<?= $img ?> alt="Image" width="105px" height="105px">
			</div>
<?php
		}
?>
			</div>
			<div id="largeimage">
				<a id="imagelink" href="photos/holidays.jpg">
					<img id="bigpicture" src="photos/holidays.jpg" alt="Conference Center" width = "700px"/>
				</a>
			</div>
		</div>
	</body>
</html>