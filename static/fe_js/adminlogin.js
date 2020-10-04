function pin()
{
    let securitybox=document.getElementById("sec");
    console.log(securitybox.style.display);
    if(securitybox.style.display!="none")
    {
        securitybox.style.display="none";
    }
    else{
        securitybox.style.display="flex";
    }
}