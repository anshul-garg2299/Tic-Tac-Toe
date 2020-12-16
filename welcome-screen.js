const welcomeScreen = $(".welcome-screen");
const aiBtn = $(".ai-btn");
const friendBtn = $(".friend-btn");
const xBtn = $(".x-btn");
const oBtn = $(".o-btn");
const playBtn = $(".play-btn");
const canvas = document.getElementById("cvs")
const ctx = canvas.getContext("2d");
const gameOverScreen = document.getElementById("game-over-screen")


//helper functions
function switchActive(off, on) {
    off.removeClass("active");
    on.addClass("active");
}

//initialization with default values
let opponent = "computer";
//player contains symbol for person and friend/computer
const player = new Object;
player.person = "X";
player.friend = "O";
player.computer = "O";


aiBtn.on("click", function () {
    opponent = "computer";
    switchActive(friendBtn, aiBtn);
});

friendBtn.on("click", function () {
    opponent = "friend";
    switchActive(aiBtn, friendBtn);
});

oBtn.on("click", function () {
    player.person = "O";
    player.friend = "X";
    player.computer = "X";

    switchActive(xBtn, oBtn);
});

xBtn.on("click", function () {
    player.person = "X";
    player.friend = "O";
    player.computer = "O";

    switchActive(oBtn, xBtn);
    welcomeScreen.addClass
});

playBtn.on("click", function () {
    //in game-logic.js

    init(player, opponent);  
    welcomeScreen.addClass("hide");
    canvas.classList.remove("hide");


});
