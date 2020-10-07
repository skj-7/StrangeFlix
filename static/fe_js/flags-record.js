function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
function video()
{
    var Video = document.getElementById("video");
    var Comment = document.getElementById("comment");
        Video.style.display="flex";
        Comment.style.display="none";
}
function comment()
{
    var Video = document.getElementById("video");
    var Comment = document.getElementById("comment");
    Video.style.display="none";
    Comment.style.display="flex";

}