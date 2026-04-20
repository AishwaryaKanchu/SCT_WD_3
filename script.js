const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
  });
}

function handleClick(index) {
  if (cells[index] !== "" || !gameActive) return;

  cells[index] = currentPlayer;
  updateBoard();

  if (checkWinner()) {
    statusText.innerText = `${currentPlayer} Wins! 🎉`;
    gameActive = false;
  } else if (!cells.includes("")) {
    statusText.innerText = "It's a Draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `${currentPlayer}'s Turn`;
  }
}

function updateBoard() {
  const allCells = document.querySelectorAll(".cell");
  allCells.forEach((cell, i) => {
    cell.innerText = cells[i];
  });
}

function checkWinner() {
  return winPatterns.some(pattern => {
    return pattern.every(i => cells[i] === currentPlayer);
  });
}

function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = "X's Turn";
  createBoard();
}

createBoard();
statusText.innerText = "X's Turn";