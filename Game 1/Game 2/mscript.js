function validateForm() {
    let Username = document.getElementById('Username');

    if (Username.value == "") {
        Username.focus();
        return false;
    }
    localStorage.setItem("username", Username.value);

    window.location.replace("level.html");

}