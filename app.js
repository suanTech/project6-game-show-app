
/* Variables & base functions */
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ul = document.querySelector('#phrase ul');
let missed = 0;
let answer;
const button = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const text = document.createElement('h3');
const phrases = [
    'A piece of cake',
    'Happy as a clam',
    'Rock and roll',
    'New kid on the block',
    'Team Treehouse',
    'Happy coding'
];

// Show overlay
function showOverlay(result) {
    overlay.className = result;
    overlay.style.visibility = 'visible';
};
// Set element's property and value function
function setEL(element, property, value) {
    element[property] = value;
    return element;
}


/* Game Starts Here */

// Remove overlay - start game
button.addEventListener('click', () => {
    overlay.className = 'hidden';
    overlay.style.visibility = 'hidden';
    overlay.style.transition= 'all .7s';
});

// Get random phrase in letters in a array
function getRandomPhraseAsArray(arr) {
    const randomNumber = Math.floor(Math.random()* arr.length);
    const randomPhrase = arr[randomNumber];
    const characters = randomPhrase.split('');
    return characters;
};

// Display random phrase in letters
function addPhraseToDisplay(arr) {
    for (let i=0; i<arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        ul.appendChild(li);
        if (arr[i].indexOf(' ') !== -1) {
            li.className = 'space';
        } else {
            li.className = 'letter';
        };
        answer = arr.join('');
    } return arr;
    
};
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 


// Check matching letter
function checkLetter(letterBtn) {
    const letterLI = document.querySelectorAll('.letter');
    let matchingLetter = null;
    for (let i=0; i<letterLI.length; i++) {
        const letter = letterLI[i];
        if (letterBtn.textContent === letter.textContent.toLowerCase()) {
            letter.className += ' show';
            letter.style.transition = '.8s ease-in-out';
            matchingLetter = letter.textContent;
        };
    } return matchingLetter;
};

// Disable chosen letters/ check matches
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const letterBtn = e.target;
        letterBtn.className = 'chosen';
        letterBtn.disabled = true;
        // Lose heart if no matching letter found
        const letterFound = checkLetter(letterBtn);
        if (letterFound === null) {
            const lostHeart = document.querySelectorAll('.tries img')[missed];
            lostHeart.src = 'images/lostHeart.png';
            missed++;
        };  
    } checkWin();
});

// If win load win page/ if lose load lose page
function checkWin() {
    const shownLetters = document.querySelectorAll('.show');
    const phraseLetters = document.querySelectorAll('.letter');
    const title = document.querySelector('#overlay h2');
    if(shownLetters.length === phraseLetters.length) {
        resultPage['win'](title);
        resetGame();
    } else if(missed >= 5) {
        resultPage['lose'](title);
        resetGame();
    };
};

// Win page/lose page load function saved as object
const resultPage = {
    win: (title) => {
        showOverlay('win')
        setEL(text, 'textContent', 'Congratulations! 🙌🙌 ');
        setEL(title, 'textContent', 'You win!');
        setEL(title, 'className', 'typewriter');
        setEL(button, 'textContent', 'Play again');
        text.style.animation = 'fadeIn 1.3s';
        overlay.insertBefore(text, title);
    },
    lose: (title) => {
        setEL(text, 'innerHTML', 
            `The answer was <br><span style="font-size:1.4em">"${answer}"</span>.`);
        showOverlay('lose')
        setEL(title, 'textContent', 'Too bad! ☠️');
        setEL(button, 'textContent', 'Try again');
        setEL(title, 'className', 'scale');
        text.style.animation = 'fadeIn 2s ease-in-out'
        overlay.insertBefore(text, button);
    }
};

// Reset Game
function resetGame() {
    missed = 0;
    ul.innerHTML = '';
    const shownLetters = document.querySelectorAll('.show');
    for (let i = 0; i< shownLetters.length; i++) {
        shownLetters[i].classList.remove('show');
        shownLetters[i].textContent = '';
    };
    const letterBtn = document.querySelectorAll('.chosen');
    for (let i = 0; i< letterBtn.length; i++) {
        letterBtn[i].classList.remove('chosen');
        letterBtn[i].disabled = false;
    };
    const newPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhrase);
    const hearts = document.querySelectorAll('.tries img');
    for(let i = 0; i < hearts.length; i++) {
        hearts[i].src = 'images/liveHeart.png';
    };
};