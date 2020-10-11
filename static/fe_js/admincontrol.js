function myFunction() {
		var x = document.getElementById("myLinks");
		if (x.style.display === "block") {
			x.style.display = "none";
		} else {
			x.style.display = "block";
		}
	}
	function single()
	{
		var solo = document.getElementById("middle-solo");
		var series = document.getElementById("middle-series");
			solo.style.display="flex";
			series.style.display="none";
	}
	function series()
	{
		var solo = document.getElementById("middle-solo");
		var series = document.getElementById("middle-series");
			solo.style.display="none";
			series.style.display="flex";
	}