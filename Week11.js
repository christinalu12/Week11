//click the cell X/O appears depending on whose turn
//a heading that states whose turn it is 
//a restart button that clears grid
//Bootstrap alert announcing the winner


/*** Containers ***/

const playerX = 'X'
const playerO = 'O'
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*** Data ***/

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winnningMessageTextElement = document.getElementById('winningMessageText')
let isPlayerOTurn = false

/*** Render ***/

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    isPlayerOTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(playerX)
        cell.classList.remove(playerO)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, {once:true})
    })
    setBoardHoeverClass()
    winningMessageElement.classList.remove('show')
}

function handleCellClick(e) {
    const cell = e.target
    const currentClass = isPlayerOTurn ? playerO : playerX
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoeverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a tie!"
    } else {
        winnningMessageTextElement.innerText - `Player ${isPlayerOTurn ? "O's" : "X's"} wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [cellElements].every(cell => {
        return cell.classList.contains(playerX) || cell.classList.contains(playerO)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    isPlayerOTurn = !isPlayerOTurn
}

function setBoardHoeverClass() {
    boardElement.classList.remove(playerX)
    boardElement.classList.remove(playerO)
    if (isPlayerOTurn) {
        boardElement.classList.add(playerO)
    } else {
        boardElement.classList.add(playerX)
    }
}

function checkWin(currentClass) {
    return winningCombos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
/*** Event Listeners ***/