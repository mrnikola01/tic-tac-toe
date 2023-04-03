// Import stylesheets
// import './style.css';

// Write Javascript code!
const TABLE = document.querySelector('.table');
const TABLE_CELLS = document.querySelectorAll('.table-cell');
const RESTART_BUTTON = document.querySelector('.restart-button');
const WIN_MESSAGE = document.querySelector('.win-message');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function cellClick(event) {
  const CLICKED_CELL = event.target;
  const CLICKED_CELL_INDEX = parseInt(CLICKED_CELL.getAttribute('data-cell'));

  if(gameBoard[CLICKED_CELL_INDEX] !== '' || !gameActive) return;

  gameBoard[CLICKED_CELL_INDEX] = currentPlayer;
  CLICKED_CELL.textContent = currentPlayer;
  CLICKED_CELL.style.color = 'rgba(0, 0, 0, 0.75)';
  // CLICKED_CELL.classList.add(currentPlayer);

  checkWin();
  checkDraw();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function cellHover(event) {
  const HOVERED_CELL = event.target;
  const HOVERED_CELL_INDEX = parseInt(HOVERED_CELL.getAttribute('data-cell'));

  if(gameBoard[HOVERED_CELL_INDEX] === '' && gameActive) {
    HOVERED_CELL.textContent = currentPlayer;
    HOVERED_CELL.style.color = 'rgba(0, 0, 0, 0.25)';
  }
}

function cellLeave(event) {
  const LEFT_CELL = event.target;
  const LEFT_CELL_INDEX = parseInt(LEFT_CELL.getAttribute('data-cell'));

  if(gameBoard[LEFT_CELL_INDEX] === '' && gameActive) {
    LEFT_CELL.textContent = '';
  }
}

function checkWin() {
  const WINNING_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i = 0; i < WINNING_CONDITIONS.length; i++) {
    const [A, B, C] = WINNING_CONDITIONS[i];

    if(gameBoard[A] !== '' && gameBoard[A] === gameBoard[B] && gameBoard[B] === gameBoard[C]) {
      WIN_MESSAGE.innerHTML = `Player <span>${currentPlayer}</span> winned!`;
      WIN_MESSAGE.style.opacity = '100%';
      gameActive = false;
      winningCells([A, B, C]);
      return;
    }
  }
}

function checkDraw() {
  if (gameBoard.every(cell => cell !== '')) {
    WIN_MESSAGE.textContent = 'It is draw!';
    WIN_MESSAGE.style.opacity = '100%';
    gameActive = false;
  }
}

function restartClick() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  WIN_MESSAGE.style.opacity = '0%';

  TABLE_CELLS.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win-cell');
  });
}

function winningCells(cells) {
  for (let i = 0; i < cells.length; i++) {
    const CELL = document.querySelector(`[data-cell='${cells[i]}']`);
    CELL.classList.add('win-cell');
    CELL.style.color = '#eee';
  }
}

TABLE_CELLS.forEach(cell => {
  cell.addEventListener('click', cellClick);
  cell.addEventListener('mouseenter', cellHover);
  cell.addEventListener('mouseleave', cellLeave);
});

RESTART_BUTTON.addEventListener('click', restartClick);

