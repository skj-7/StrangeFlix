function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
function yt()
{
    var YT=document.getElementById("yt");
    var S3=document.getElementById("s3");
    var NU=document.getElementById("nu");

    var YL=document.getElementById("yl");
    var S3L=document.getElementById("s3l");
    var NUP=document.getElementById("NU");

    YL.style.backgroundColor="blue";
    YL.style.color="white";

    S3L.style.backgroundColor="white";
    S3L.style.color="black";

    NUP.style.backgroundColor="white";
    NUP.style.color="black";

    YT.style.display="block";
    S3.style.display="none";
    NU.style.display="none";
}
function s3()
{
    var YT=document.getElementById("yt");
    var S3=document.getElementById("s3");
    var NU=document.getElementById("nu");
    var YL=document.getElementById("yl");
    var S3L=document.getElementById("s3l");
    var NUP=document.getElementById("NU");

    YL.style.backgroundColor="white";
    YL.style.color="black";

    S3L.style.backgroundColor="blue";
    S3L.style.color="white";

    NUP.style.backgroundColor="white";
    NUP.style.color="black";

    YT.style.display="block";
    S3.style.display="none";
    NU.style.display="none";

    YT.style.display="none";
    S3.style.display="block";
    NU.style.display="none";
}
function nu()
{
    var YT=document.getElementById("yt");
    var S3=document.getElementById("s3");
    var NU=document.getElementById("nu");

    var YL=document.getElementById("yl");
    var S3L=document.getElementById("s3l");
    var NUP=document.getElementById("NU");

    YL.style.backgroundColor="white";
    YL.style.color="black";

    S3L.style.backgroundColor="white";
    S3L.style.color="black";

    NUP.style.backgroundColor="blue";
    NUP.style.color="white";

    YT.style.display="block";
    S3.style.display="none";
    NU.style.display="none";

    YT.style.display="none";
    S3.style.display="none";
    NU.style.display="block";
}