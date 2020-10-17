function comments()
{
    var section=document.getElementById('comment-section');
    if(section.style.display=="none")
    {
        section.style.display="flex";
    }
    else
    {
        section.style.display="none";
    }
}