function personal()
{
    var personal=document.getElementById("personal");
    var security=document.getElementById("security");
    var subs=document.getElementById("subs");

    personal.style.display="flex";
    security.style.display="none";
    subs.style.display="none";
}
function security()
{
    var personal=document.getElementById("personal");
    var security=document.getElementById("security");
    var subs=document.getElementById("subs");

    personal.style.display="none";
    security.style.display="flex";
    subs.style.display="none";
}
function subs()
{
    var personal=document.getElementById("personal");
    var security=document.getElementById("security");
    var subs=document.getElementById("subs");

    personal.style.display="none";
    security.style.display="none";
    subs.style.display="flex";
}