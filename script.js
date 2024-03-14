let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let player1Name = '';
let player2Name = '';
let player1Score = 0;
let player2Score = 0;
let gameMode = 'two-player'; // Default mode is two-player
let currentTheme = 'default'; // Default theme
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const maxWins = 3; // Maximum wins required to end the game

function startGame() {
    player1Name = document.getElementById('player1').value || 'Player 1';
    player2Name = document.getElementById('player2').value || 'Player 2';
    document.getElementById('player-names').style.display = 'none';
    document.getElementById('board').style.display = 'grid';
    document.getElementById('modes').style.display = 'flex';
    document.getElementById('themes').style.display = 'none';
    reset(); // Start the game
}

function switchMode(mode) {
    if (mode === gameMode) return; // If mode is not changed, do nothing
    gameMode = mode;
    if (mode === 'vs-computer') {
        player2Name = 'Computer'; // Set computer name
        document.getElementById('player2').disabled = true; // Disable player2 input
    } else {
        document.getElementById('player2').disabled = false; // Enable player2 input
    }
    reset(); // Reset the game when switching mode
    if (mode === 'two-player') {
        document.getElementById('themes').style.display = 'none'; // Hide themes in two-player mode
    } else {
        document.getElementById('themes').style.display = 'flex'; // Show themes in vs-computer mode
    }
    document.getElementById('score').innerText = ''; // Clear the score when switching mode
}


function switchTheme(theme) {
    currentTheme = theme;
    document.body.className = theme;
}

function playerMove(cellIndex) {
    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        document.getElementById('board').children[cellIndex].innerText = currentPlayer;
        if (checkWin()) {
            document.getElementById('result').innerText = `Player ${currentPlayer} wins!`;
            updateScore(currentPlayer);
            if (player1Score === maxWins || player2Score === maxWins) {
                document.getElementById('player-names').style.display = 'flex';
                document.getElementById('score').innerText = '';
                document.getElementById('result').innerText = '';
            } else {
                setTimeout(reset, 1000); // Reset after 1 second
            }
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('result').innerText = "It's a draw!";
            setTimeout(resetAfter, 1000); // Reset after 1 second
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (gameMode === 'vs-computer' && currentPlayer === 'O') {
                setTimeout(computerMove, 500); // Delay computer move for better user experience
            }
        }
    }
}


function computerMove() {
    let emptyCells = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            emptyCells.push(i);
        }
    }
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    playerMove(emptyCells[randomIndex]);
}
function checkWin() {
    for (let condition of winningConditions) {
        if (board[condition[0]] !== '' && board[condition[0]] === board[condition[1]] && board[condition[1]] === board[condition[2]]) {
            return true;
        }
    }
    // Check if any player filled 3 cells in a row
    for (let i = 0; i < 9; i += 3) {
        if (board[i] !== '' && board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
            return true;
        }
    }
    // Check if any player filled 3 cells in a column
    for (let i = 0; i < 3; i++) {
        if (board[i] !== '' && board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
            return true;
        }
    }
    return false;
}

function updateScore(player) {
    if (player === 'X') {
        player1Score++;
    } else {
        player2Score++;
    }
    document.getElementById('score').innerText = `${player1Name}: ${player1Score} - ${player2Name}: ${player2Score}`;
}
function reset() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    player1Score = 0; // Score reset
    player2Score = 0; // Score reset
    document.getElementById('score').innerText = ''; // Clear the score
    document.getElementById('result').innerText = ''; // Clear the result message
    for (let i = 0; i < 9; i++) {
        document.getElementById('board').children[i].innerText = '';
    }
}

function resetAfter() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('result').innerText = '';
    for (let i = 0; i < 9; i++) {
        document.getElementById('board').children[i].innerText = '';
    }
}