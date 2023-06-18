// ul of guessed letters
const listOfLetters = document.querySelector(".guessed-letters");
// guess button
const guessBtn = document.querySelector(".guess");
// letter input
const input = document.querySelector(".letter");
// word in progress
const unknownWord = document.querySelector(".word-in-progress");
// remaining guesses
const remainingGuesses = document.querySelector(".remaining");
// span of remaining guesses
const remainingSpan = document.querySelector(".remaining span");
// message 
const message = document.querySelector(".message");
// play again button
const playAgainBtn = document.querySelector(".play-again");

let guessedLetters = [];
let numberOfGuesses = 8;

// get some words!
const getWord = async function() {
    const response = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const words = await response.text();
    const wordsArray = words.split("\n");
    const randomWord = Math.floor(Math.random() * wordsArray.length);
    word = wordsArray[randomWord].trim();
    hideLetters(word);
};
getWord();

// replace each letter with a dot
function hideLetters (word) {
    const placeholders = [];
    for (let letter of word) {
        placeholders.push("●");
    }
    unknownWord.innerText = placeholders.join("");
};

guessBtn.addEventListener("click", function(e) {
    e.preventDefault();     // prevents the page from reloading
    message.innerText = "";
    const userGuess = input.value;
    const guess = validateInput(userGuess);
    makeGuess(guess);
    input.value = "";
    
});

// check user input
const validateInput = function(userGuess) {
    const acceptedLetter = /[a-zA-Z]/;   //to ensure a letter is entered
    
    if (userGuess.length === 0) {
        message.innerText = "Rememebr to type a letter from A to Z!";
    } else if (userGuess.length > 1) {
        message.innerText = "Rememebr to type only one letter from A to Z!";
    } else if (!userGuess.match(acceptedLetter)) {      //to check for anything other than letters
        message.innerText = "Rememebr to only type a letter from A to Z!";
    } else {
        return userGuess;
    }
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess) ) {
        message.innerText = "You already guessed that letter. Try again!"
    } else {
        guessedLetters.push(guess);
        countGuesses(guess);
        showGuessedLetters();
        updateUnknownWord(guessedLetters);
    }
};

const showGuessedLetters = function() {
    listOfLetters.innerText = "";
    for (let letter of guessedLetters) {
        let li = document.createElement("li");
        li.innerText = letter;
        listOfLetters.append(li);
    }
};

// replace the dots with the guessed letters
const updateUnknownWord = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (let letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    unknownWord.innerText = revealWord.join("");
    winOrLoose();
};

// check to see if the user won
const winOrLoose = function() {
    if (word.toUpperCase() === unknownWord.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

// count the remaining guesses
const countGuesses = function(guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    } else {
        message.innerText = `Oops! Seems there is no ${guess} in this word.`;
        numberOfGuesses -= 1;
    }

    if (numberOfGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (numberOfGuesses === 1){
        remainingSpan.innerText = `${numberOfGuesses} guess`;
    } else {
        remainingSpan.innerText = `${numberOfGuesses} guesses`;
    }
};

const startOver = function() {
    guessBtn.classList.add("hide");
    remainingGuesses.classList.add("hide");
    listOfLetters.classList.add("hide");
    playAgainBtn.classList.remove("hide");
};

playAgainBtn.addEventListener("click", function() {
    message.classList.remove("win");
    message.innerText = "";
    numberOfGuesses = 8;
    remainingSpan.innerText = `${numberOfGuesses} guesses`;
    remainingGuesses.innerHTML = "";
    guessedLetters = [];
    listOfLetters.innerText = "";
    
    getWord()
    
    playAgainBtn.classList.add("hide");
    guessBtn.classList.remove("hide");
    remainingGuesses.classList.remove("hide");
    listOfLetters.classList.remove("hide");
});