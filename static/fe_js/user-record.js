function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
function free()
{
    var Free=document.getElementById("free");
    var Ppv=document.getElementById("ppv");
    var Premium=document.getElementById("premium");
        Free.style.display="flex";
        Ppv.style.display="none";
        Premium.style.display="none";
}
function ppv()
{
    var Free=document.getElementById("free");
    var Ppv=document.getElementById("ppv");
    var Premium=document.getElementById("premium");
        Free.style.display="none";
        Ppv.style.display="flex";
        Premium.style.display="none";
}
function premium()
{
    var Free=document.getElementById("free");
    var Ppv=document.getElementById("ppv");
    var Premium=document.getElementById("premium");
        Free.style.display="none";
        Ppv.style.display="none";
        Premium.style.display="flex";
}