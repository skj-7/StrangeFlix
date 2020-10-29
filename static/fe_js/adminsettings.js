function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
function check() {
    var pass = document.getElementById('password');
    var confirm = document.getElementById('confirmpassword');
    var submit = document.getElementById('submit');
    if (pass.value == "" && confirm.value == "") {
        pass.style.backgroundColor = "white";
        confirm.style.backgroundColor = "white";
        submit.disabled = true;
    }
    else if (pass.value == confirm.value) {
        pass.style.backgroundColor = "green";
        confirm.style.backgroundColor = "green";
        submit.disabled = false;
    }
    else {
        pass.style.backgroundColor = "red";
        confirm.style.backgroundColor = "red";
        submit.disabled = true;
    }
}