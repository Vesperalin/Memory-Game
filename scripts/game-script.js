// script for game.html page
let availableCardsNames = [
    'images/card-images/apple.svg',
    'images/card-images/avocado.svg',
    'images/card-images/cabbage.svg',
    'images/card-images/lemon.svg',
    'images/card-images/peach.svg',
    'images/card-images/pumpkin.svg',
    'images/card-images/raspberry.svg',
    'images/card-images/tomato.svg'
];
let gameLevel = localStorage.getItem("level");
let board = document.querySelector('.board-wrapper');
let movesCounterElement = document.querySelector('.moves');
let cardsNames = availableCardsNames.slice(0, (() => {
    if (gameLevel == 1)
        return 6;
    else if (gameLevel == 2)
        return 8;
    else
        return 4;
})());
const pairsAmount = cardsNames.length;
let guessedPairsCounter = 0;

if (gameLevel == 0)
    board.style.height = "280px";
else if (gameLevel == 1)
    board.style.height = "420px";

cardsNames = cardsNames.concat(cardsNames).sort((a, b) => Math.random() - 0.5);

for (let i = 0; i < cardsNames.length; i++) {
    board.innerHTML += `
    <div class="card" onclick="flipCard(this)">
        <img class="front-face" src="images/logo.svg" alt="front-face-card" ">
        <img class="back-face" src="${cardsNames[i]}" alt="image-card"">
    </div>`;
}

const makeFlipEffect = elem => {
    elem.firstElementChild.classList.remove('front-face');
    elem.firstElementChild.classList.add('front-face-flip');
    elem.lastElementChild.classList.remove('back-face');
    elem.lastElementChild.classList.add('back-face-flip');
}

const revertFlipEffect = elem => {
    elem.firstElementChild.classList.remove('front-face-flip');
    elem.firstElementChild.classList.add('front-face');
    elem.lastElementChild.classList.remove('back-face-flip');
    elem.lastElementChild.classList.add('back-face');
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(self) {
    if (lockBoard) return;
    if (self === firstCard) return;

    makeFlipEffect(self);

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = self;
        return;
    }

    secondCard = self;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.lastElementChild.src === secondCard.lastElementChild.src;
    increaseMovesCounter();
    isMatch ? disableCards() : unflipCards();
}

function increaseMovesCounter() {
    let moves = parseInt(movesCounterElement.textContent);
    movesCounterElement.textContent = (moves + 1);
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.removeAttribute("onclick");
    secondCard.removeAttribute("onclick");
    guessedPairsCounter++;
    checkIfEndOfGame();
    resetBoard();
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkIfEndOfGame() {
    if (guessedPairsCounter === pairsAmount)
        clearInterval(timer);
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        revertFlipEffect(firstCard);
        revertFlipEffect(secondCard);
        resetBoard();
    }, 1500);
}

// timer
const timerElement = document.querySelector('.timer');
const timeCount = () => {
    let hours = timerElement.children[0].textContent;
    let minutes = timerElement.children[1].textContent;
    let seconds = timerElement.children[2].textContent;

    seconds = parseInt(seconds) + 1;

    if (seconds === 60) {
        seconds = 0;
        minutes = parseInt(minutes) + 1;

        if (minutes === 60) {
            minutes = 0;
            hours = parseInt(hours)++;
        }
    }

    timerElement.children[0].textContent = hours;
    timerElement.children[1].textContent = minutes;
    timerElement.children[2].textContent = seconds;
};

const timer = setInterval(timeCount, 1000);
