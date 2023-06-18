// ul of guessed letters
const guessedLetters = document.querySelector(".guessed-letters");
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
    const guessedLetter = input.value;
    console.log(guessedLetter);
});