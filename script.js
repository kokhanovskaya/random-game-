const cardSymbols = ['🫵🏻', '🙌🏻', '👩🏻‍🦰', '👩🏻‍💻', '🙇🏻‍♀️', '🫶🏼', '👼🏽', '👆🏽', '🤌🏽', '💅🏽' ];
let cards = [...cardSymbols, ...cardSymbols]; 

let moves = 0;
let matchedPairs = 0;
let firstCard = null;
let secondCard = null;
let isChecking = false;
let timer;
let time = 0;

const board = document.querySelector('.board');
const movesCounter = document.querySelector('.moves');
const timerDisplay = document.querySelector('.timer');
const winMessage = document.querySelector('.win');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    moves = 0;
    matchedPairs = 0;
    firstCard = null;
    secondCard = null;
    isChecking = false;
    time = 0;
    clearInterval(timer);
    timerDisplay.textContent = "Time: 0 sec";
    movesCounter.textContent = "0 moves";
    winMessage.style.display = 'none';
    shuffle(cards);
    createBoard();

    timer = setInterval(() => {
        time++;
        timerDisplay.textContent = `Time: ${time} sec`;
    }, 1000);
}

function createBoard() {
    board.innerHTML = ''; 
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard(e) {
    if (isChecking) return;
    const clickedCard = e.target;

    clickedCard.classList.add('flipped');
    clickedCard.textContent = clickedCard.dataset.symbol;

    if (!firstCard) {
        firstCard = clickedCard;
    } else if (!secondCard && clickedCard !== firstCard) {
        secondCard = clickedCard;
        checkForMatch();
    }
}

function checkForMatch() {
    isChecking = true;
    moves++;
    movesCounter.textContent = `${moves} moves`;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        matchedPairs++;
        resetFlippedCards();

        if (matchedPairs === cardSymbols.length) {
            gameOver();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetFlippedCards();
        }, 1000);
    }
}

function resetFlippedCards() {
    firstCard = null;
    secondCard = null;
    isChecking = false;
}

function gameOver() {
    clearInterval(timer);
    winMessage.style.display = 'block';
}

document.querySelector('button').addEventListener('click', startGame);

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('game-description');
    const closeButton = document.getElementById('close-modal');
    const startButton = document.getElementById('start-game');

    modal.style.display = 'flex';

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    startButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});

