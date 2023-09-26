
const X = 'x';
const CIRCLE = 'circle';
const WIN_COMB = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
var previousMoves = []

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winnerDeclare = document.getElementById('winnerMsg');
const winnerMessage = document.querySelector('[data-winning-message-text]');
const xScore = document.getElementById('xScore');
const oScore = document.getElementById('oScore');
const drawScore = document.getElementById('draws');
const scoreReset = document.getElementById('resetScore');
const prevMatch = document.getElementById('previous');
const reset = document.getElementById('restart');
let circle;

var scoreX = 0;
var scoreO = 0;
var scoreDraw = 0;

gameStart()
reset.addEventListener('click', gameStart);
scoreReset.addEventListener('click', scoreClear);
// prevMatch.addEventListener('click', savedGame);

function gameStart(){
    circle = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X);
        cell.classList.remove(CIRCLE);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click',handleClick,{ once: true});
    })
    setHover();
    winnerDeclare.classList.remove('show');
    
}

function handleClick(e){
    // placing the mark on the board
    const cell = e.target;
    const currentClass = circle ? CIRCLE : X;
    placemark(cell,currentClass);
    if (checkwin(currentClass)){
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setHover();
    } 
}

function endGame(draw){
    if (draw){
        winnerMessage.innerText = "DRAW!"
        // draw counter
        scoreDraw++;
        drawScore.innerHTML = scoreDraw;
    } else if (circle == true) {
        winnerMessage.innerText = "O is the winner!";
        scoreO++;
        oScore.innerHTML = scoreO;
    } else {
        winnerMessage.innerText = "X is the winner!"
        scoreX++;
        xScore.innerHTML = scoreX;
    }
    winnerDeclare.classList.add('show');
    
}

// declare draw
function isDraw() {
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X) || cell.classList.contains(CIRCLE)
    })
}

function placemark(cell, currentClass) {
    cell.classList.add(currentClass);
    // previousMoves = cell.classList.add(currentClass);
}

// switching turns from X to O 
function swapTurns(){
    circle = !circle;
}

// for hover effect
function setHover() {
    board.classList.remove(X);
    board.classList.remove(CIRCLE);

    if (circle) {
        board.classList.add(CIRCLE);
    } else {
        board.classList.add(X);
    }
}

// winner check
function checkwin(currentClass){
    return WIN_COMB.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

// reset scoreboard
function scoreClear() {
    scoreX = 0;
    scoreO = 0;
    scoreDraw = 0;

    drawScore.innerText = "";
    oScore.innerText = "";
    xScore.innerText = "";
}

// save previous game
function saveTheGame(){
    const cellHolder = []
   for(x=0; x <= length.previousMoves;x++){
       cellHolder[x] = document.getElementById("c" + [x]);
       previousMoves[x] = cellHolder[x];
   }
   
}
function savedGame() {
  for(i=0; length.previousMoves;i++){
      cellElements.innerHTML = previousMoves[i];
  }
}
window.addEventListener('DOMContentLoaded', _e => {
    //Mimic your own variables
    const winnerMessage = document.querySelector('.winner-message');
    const winnerDeclare = winnerMessage;
    const xScore = document.querySelector('.x-score');
    const oScore = document.querySelector('.o-score');
    const drawScore = document.querySelector('.d-score');
    let circle = false;
    let scoreO = 0, scoreX = 0, scoreDraw = 0;
    
    //New one for storing endgame states
    const prevGames = [];
  
    function endGame(draw) {
      let gameResult;
      if (draw) {
        winnerMessage.innerText = "DRAW!"
        // draw counter
        scoreDraw++;
        drawScore.innerHTML = scoreDraw;
        gameResult = "D";
      } else if (circle == true) {
        winnerMessage.innerText = "O is the winner!";
        scoreO++;
        oScore.innerHTML = scoreO;
        gameResult = "O";
      } else {
        winnerMessage.innerText = "X is the winner!"
        scoreX++;
        xScore.innerHTML = scoreX;
        gameResult = "X";
      }
      winnerDeclare.classList.add('show');
  
      prevGames.push({
        result: gameResult,
        boardState: boardState()
      });
    }
  
    function boardState() {
      const res = new Array(9);
      document.querySelectorAll('.cell').forEach(cell => {
        id = cell.id;
        index = parseInt(id.substr(1));
        res[index] = cell.textContent;
      });
      return res;
    }
  
    document.querySelector('#btn-prevstate').addEventListener('click', e => {
      if (prevGames.length) {
        alert(JSON.stringify(prevGames[prevGames.length - 1]));
      } else {
        alert('No previous game');
      }
    });
    
    //For testing only
    document.querySelector('#btn-simgame').addEventListener('click', e => {
      circle = Math.random() < .5;
      document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = (Math.random() < .5) ? 'O' : 'X';
      });
      endGame(Math.random() < .5);
    });
  });