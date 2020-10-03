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
    if(solo.style.display=="none")
    {
      solo.style.display="flex";
      series.style.display="none";
    }
  }
  function single()
  {
    var solo = document.getElementById("middle-solo");
    var series = document.getElementById("middle-series");
    if(series.style.display=="none")
    {
      solo.style.display="none";
      series.style.display="flex";
    }
  }