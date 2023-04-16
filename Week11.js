
const tiles = document.querySelectorAll(".tile");
const playerX = "X";
const playerO = "O";
let turn = playerX
const boardState = Array(tiles.length);
boardState.fill(null);
const winningCombos = [
    //rows
     { combo: [1, 2, 3]},
     { combo: [4, 5, 6]},
     { combo: [7, 8, 9]},
     //colums
     { combo: [1, 4, 7]},
     { combo: [2, 5, 8]},
     { combo: [3, 6, 9]},
     //diagonal
     { combo: [1, 5, 9]},
     { combo: [3, 5, 7]},
 ];



//Elements
const gameOver = document.getElementById("gameOver");
const gameOverText = document.getElementById("gameOverText");
const playAgain = document.getElementById("playagain");
playAgain.addEventListener("click", startNewGame);



function setHoverText(){
    //remove hover text
    tiles.forEach((tile) => {
        tile.classList.remove("x-hover")
        tile.classList.remove("o-hover")
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;

    tiles.forEach((tile) => {
        if (tile.innerText == "") {
            tile.classList.add(hoverClass);
        }
    });
}

//make the tiles clickable
tiles.forEach((tile) => tile.addEventListener("click", tileClick));
setHoverText();
function tileClick(event){
    if (gameOver.classList.contains("visible")) {
        return;
    }

    const tile = event.target;
    const tileNumber = tile.dataset.index;

    if (tile.innerText != ""){
        return;
    }

    if (turn === playerX){
        tile.innerText = playerX;
        boardState[tileNumber - 1] = playerX;
        turn = playerO;
        //console.log("X")
    }

    else {
        tile.innerText = playerO;
        boardState[tileNumber - 1] = playerO;
        turn = playerX;
        //console.log("O")
        }
    
setHoverText();
checkWinner();
}

//check for a winner
function checkWinner(){
    for(const winningCombo of winningCombos){
        const combo = winningCombo.combo
        const tileValue1 = boardState [combo[0] - 1];
        const tileValue2 = boardState [combo[1] - 1];
        const tileValue3 = boardState [combo[2] - 1];

        if(tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            gameOverAlert(tileValue1);
            return;
        }
    }

//check for a draw
    const allTileFilledIn = boardState.every((tile) => tile !== null);
    if (allTileFilledIn) {
        gameOverAlert(null);
        return;
    }
}

//game over function
function gameOverAlert(winnerText) {
    let text = "It's a draw!";
    if(winnerText != null) {
        text = `Winner is ${winnerText}!`;
        console.log('game over')
    }

    gameOver.className = "visible";
    gameOverText.innerText = text;

}

//function to start new game
function startNewGame(){
    gameOver.className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = playerX;
    setHoverText();
}


