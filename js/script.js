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

const word = "magnolia";
const guessedLetters = [];

// replace each letter with a dot
function hideLetters (word) {
    const placeholders = [];
    for (let letter of word) {
        placeholders.push("●");
    }
    unknownWord.innerText = placeholders.join("");
};

hideLetters(word);

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
    if (guessedLetters.includes(guess)) {
        message.innerText = "You alread guessed that letter. Try again!"
    } else {
        guessedLetters.push(guess);
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
    }
};