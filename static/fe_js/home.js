var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");
var btn1 = document.getElementById("myBtn1");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}
btn1.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function menu()
{
  var menu=document.getElementById('menubar');
  if(menu.style.display=="none")
  {
    menu.style.display="flex";
  }
  else
  {
    menu.style.display="none";
  }
}