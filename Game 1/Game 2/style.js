//background sound start
function bg() {
        bgSound.play();
}


//idle start
function start() {
        if (idleWorkerId == 0) {
                idleWorkerId = setInterval(idle, 220);
        }
}

    
//button url c1
function c1btn() {
        location.href = "C:/Users/geekh/OneDrive/Desktop/GHGame Studios/Web template/nickname.html";
}

function c2btn() {
        location.href = "index.html";
}

function c3btn() {
        location.href = "Game 3/game3.html";
}

function validateForm() {
        let Username = document.getElementById('Username');
    
        if (Username.value == "") {
            Username.focus();
            return false;
        }
        localStorage.setItem("username", Username.value);
    
        window.location.replace("level.html");
    
    }