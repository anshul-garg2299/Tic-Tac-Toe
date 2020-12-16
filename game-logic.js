const ROW = 3;
const COLUMN = 3;
const SIZE = 150;


let gameData;
let currentPlayer;

let board = [];

let GAME_OVER = false;

const xImg = new Image(SIZE, SIZE);
xImg.src = "img/X.png";

const oImg = new Image(SIZE, SIZE);
oImg.src = "img/O.png";

const WINNING_COMBOS = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function init(player, opponent) {

    currentPlayer = player.person;

    gameData = new Array(COLUMN * ROW);

    let cell_id = 0;

    //draw board
    for (let i = 0; i < ROW; i++) {
        board[i] = [];
        for (let j = 0; j < COLUMN; j++) {
            board[i][j] = cell_id;

            ctx.strokeStyle = "#000";
            ctx.strokeRect(j * SIZE, i * SIZE, SIZE, SIZE);

            cell_id++;
        }
    }
}

canvas.addEventListener("click", function (event) {
    //    console.log(event);
    if (GAME_OVER) {
        return;
    }

    let X = event.offsetX;
    let Y = event.offsetY;

    //    console.log(X,Y);
    let i = Math.floor(Y / SIZE);
    let j = Math.floor(X / SIZE);


    //    console.log(i,j);

    let id = board[i][j];
    //    console.log(id);
    if (gameData[id]) return;

    gameData[id] = currentPlayer;

    drawOnBoard(currentPlayer, i, j);

    if (isWinner(currentPlayer)) {
        gameOver(currentPlayer);
        GAME_OVER = true;
        return;
    }

    if (isTie()) {
        gameOver("tie");
        GAME_OVER = true;
        return;
    }


    if (opponent == "computer") {

        let id = minimax(player.computer).id;

        gameData[id] = player.computer;

        let XY = getIJ(id);

        drawOnBoard(player.computer, XY.i, XY.j);
        
        if(isWinner(player.computer)){
            gameOver(player.computer);
            GAME_OVER = true;
            return;
        }
        else if(isTie()){
            gameOver("tie");
            GAME_OVER = true;
            return;
        }


    } else {

        if (currentPlayer === player.person) {
            currentPlayer = player.friend;
        } else {
            currentPlayer = player.person;
        }
    }

});

function drawOnBoard(player, i, j) {

    let img;
    if (player == "X") {
        img = xImg;
    } else {
        img = oImg;
    }
    ctx.drawImage(img, j * SIZE, i * SIZE);
}

function isWinner(PLAYER) {
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
        let win = true;
        for (let j = 0; j < WINNING_COMBOS[0].length; j++) {
            let id = WINNING_COMBOS[i][j];
            win = win && (gameData[id] == PLAYER)
        }
        if (win) {
            return true;
        }
    }

    return false;
}

function isTie() {
    let isBoardFull = true;

    for (let i = 0; i < gameData.length; i++) {
        isBoardFull = isBoardFull && gameData[i];
    }

    if (isBoardFull) {
        return true;
    } else return false;
}

function gameOver(result) {
    let resultImg = `img/${result}.png`;
    let message;
    if (result == "tie") {
        message = "It's a Tie!"
    } else {
        message = `${result} is the Winner!`;
    }
    gameOverScreen.innerHTML = `
    <h1>${message}</1>
    <img class="winner-img" src=${resultImg} </img>
    <div class="play" onclick="location.reload()">Play Again!</div>  
    `;

    canvas.classList.add("hide");
    gameOverScreen.classList.remove("hide");
}

function minimax(PLAYER) {
    if (isWinner(player.person)) {
        return {
            score: -5
        }
    } else if (isWinner(player.computer)) {
        return {
            score: +5
        }
    } else if (isTie()) {
        return {
            score: 0
        }
    }

    let EMPTY = emptySpaces();

    let moves = [];

    for (let i = 0; i < EMPTY.length; i++) {
        let id = EMPTY[i];

        let move = new Object;
        move.id = id;

        let prevValue = gameData[id];
        gameData[id] = PLAYER;

        if (PLAYER == player.computer) {
            move.score = minimax(player.person).score;
        } else {
            move.score = minimax(player.computer).score;
        }

        gameData[id] = prevValue;

        moves.push(move);
    }

    let bestMove;
    if (PLAYER == player.computer) {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    }

    return bestMove;

}

function emptySpaces() {
    let ans = [];
    for (let i = 0; i < gameData.length; i++) {
        if (!gameData[i]) {
            ans.push(i);
        }
    }
    return ans;
}

function getIJ(id) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] == id) {
                return {
                    i: i,
                    j: j
                };
            }
        }
    }
}
