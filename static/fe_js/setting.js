function personal() {
    var personal = document.getElementById("personal");
    var security = document.getElementById("security");
    var subs = document.getElementById("subs");

    personal.style.display = "flex";
    security.style.display = "none";
    subs.style.display = "none";
}
function security() {
    var personal = document.getElementById("personal");
    var security = document.getElementById("security");
    var subs = document.getElementById("subs");

    personal.style.display = "none";
    security.style.display = "flex";
    subs.style.display = "none";
}
function subs() {
    var personal = document.getElementById("personal");
    var security = document.getElementById("security");
    var subs = document.getElementById("subs");

    personal.style.display = "none";
    security.style.display = "none";
    subs.style.display = "flex";
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