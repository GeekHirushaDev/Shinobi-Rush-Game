//background sound
var bgSound = new Audio("mp3/background.mp3");
bgSound.loop = true;

//run sound
var runSound = new Audio("mp3/run.mp3");
runSound.loop = true;

//jump sound
var jumpSound = new Audio("mp3/jump.mp3");

//wich laugh sound
var wicherLaughSound = new Audio("witchlaugh.mp3");
wicherLaughSound.loop = true;

//win sound
var winmonsterSound = new Audio("mp3/catch ninja.mp3");

//lost sound
var lostmonsterSound = new Audio("mp3/lostmonstersound.wav");

//dead sound
var deadSound = new Audio("mp3/dead.mp3");

//win sound
var winSound = new Audio("mp3/win.mp3");
var winSound = new Audio("mp3/win.mp3");

// key event
function keyCheck(event) {

    //enter key
    if (event.which == 13) {

        if (runWorkerId == 0) {

            setTimeout(moveMonster, 2000);
            clearInterval(idleWorkerId);
            idleWorkerId = -1;
            boy.style.width = "150px";


            createBlockWorkerId = setInterval(createBlock, 100);
            moveBlockId = setInterval(moveBlock, 100);
            runWorkerId = setInterval(run, 50);
            runSound.play();
            wicherLaughSound.play();

            backgroundWorkerId = setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore, 100);
        }
    }

    //space key
    if (event.which == 32) {

        if (jumpWorkerId == 0) {

            clearInterval(idleWorkerId);
            idleWorkerId = -1;
            boy.style.width = "150px";

            clearInterval(runWorkerId);
            runSound.pause();
            wicherLaughSound.pause();


            setTimeout(moveMonster, 2000);

            jumpWorkerId = setInterval(jump, 100);
            jumpSound.play();
        }
    }
}



// create Bloack

var createBlockWorkerId = 0;
var blockMarginLeft = 500;
var blockId = 1;

function createBlock() {

    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;

    blockId++;

    var gap = Math.random() * (1000 - 800) + 300;

    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);
}



// move block

var moveBlockId = 0;

function moveBlock() {

    for (var i = 1; i <= blockId; i++) {

        var currentBlock = document.getElementById("block" + i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft < 362 & newMarginLeft > 262) {

            if (boyMarginTop > 373) {
                clearInterval(runWorkerId);
                runSound.pause();
                wicherLaughSound.pause();

                clearInterval(jumpWorkerId);
                jumpWorkerId = -1;

                clearInterval(backgroundWorkerId);
                clearInterval(scoreWorkerId);
                clearInterval(createBlockWorkerId);
                clearInterval(moveBlockId);

                deadWorkerId = setInterval(dead, 100);
                deadSound.play();
                winmonsterSound.play();
                bgSound.pause();

                document.getElementById("monster").style.marginLeft = "300px";
                document.getElementById("monster").style.marginTop = "500px";
            }
        }

        var winscore = Math.random() * (2000 - 1000) + 20;

        if (newScore == 10000) {
            clearInterval(runWorkerId);
            runSound.pause();
            wicherLaughSound.pause();

            clearInterval(jumpWorkerId);
            jumpWorkerId = -1;

            clearInterval(backgroundWorkerId);
            clearInterval(scoreWorkerId);
            clearInterval(createBlockWorkerId);
            clearInterval(moveBlockId);

            lostmonsterSound.play();
            setTimeout(win, 1800);
            bgSound.pause();

            boy.style.marginLeft = "155px";
            boy.style.marginTop = "465px";
            boy.style.width = "230px";
            boy.src = "won.png";

            document.getElementById("wonScreen").style.visibility = "visible";
            document.getElementById("wonScore").style.visibility = "visible";
            document.getElementById("winScore").innerHTML = newScore;
            document.getElementById("monster").style.rotate = "90deg";
            document.getElementById("monster").style.marginTop = "500px";

        }
    }
}



//run boy

var boy = document.getElementById("boy");
var runImageNumber = 0;
var runWorkerId = 0;

function run() {

    runImageNumber++;

    if (runImageNumber == 10) {
        runImageNumber = 0;
    }

    boy.src = "character/Run__00" + runImageNumber + ".png";
}



//jump boy

var jumpImageNumber = 0;
var jumpWorkerId = 0;
var boyMarginTop = 415;

function jump() {

    jumpImageNumber++;

    if (jumpImageNumber <= 4) {
        boyMarginTop = boyMarginTop - 30;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber >= 7) {
        boyMarginTop = boyMarginTop + 30;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber == 10) {
        jumpImageNumber = 0;

        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;

        runWorkerId = setInterval(run, 50);
        runSound.play();
        wicherLaughSound.play();

        if (backgroundWorkerId == 0) {
            backgroundWorkerId = setInterval(moveBackground, 100);
        }

        if (scoreWorkerId == 0) {
            scoreWorkerId = setInterval(updateScore, 100);
        }
        if (moveBlockId == 0) {
            moveBlockId = setInterval(moveBlock, 100);
        }
        if (scoreWorkerId == 0) {
            scoreWorkerId = setInterval(updateScore, 100);
        }

        if (createBlockWorkerId == 0) {
            createBlockWorkerId = setInterval(createBlock, 100);
        }
    }

    boy.src = "character/Jump__00" + jumpImageNumber + ".png";
}



//move background

var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;

function moveBackground() {
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px";

}



//score 

var score = document.getElementById("meter");
var newScore = 0;
var scoreWorkerId = 0;

function updateScore() {

    newScore = newScore + 10;

    score.value = newScore;
}



//dead

var deadImageNumber = 0;
var deadWorkerId = 0;

function dead() {

    deadImageNumber++;

    if (deadImageNumber == 9) {
        clearInterval(deadWorkerId);
        boy.style.marginTop = "465px";
        
        document.getElementById("lostScore").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
        document.getElementById("endScreen").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
    }

    boy.src = "character/Dead__00" + deadImageNumber + ".png";
}



//reload
function reload() {
    location.reload();
}



//move monster
var monster = document.getElementById("monster");

function moveMonster() {
    monster.style.marginLeft = "0px";
    boy.style.marginLeft = "300px";
}



//idle mode
var idleImageNumber = 0;
var idleWorkerId = 0;

function idle() {
    idleImageNumber++;

    if (idleImageNumber == 10) {
        idleImageNumber = 0;
    }

    boy.src = "character/Idle__00" + idleImageNumber + ".png";
    boy.style.width = "100px";
}


function win() {
    winSound.play();
}