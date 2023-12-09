var words = ["MANOJKUMAR","JIM","DWIGHT","ANGELA","RYAN","CREED","KELLY",];
var clue =["1","2","3","myname","myname","myname","myname"];
var currentWordIndex = 0;
var attempts = 0;
var guessedLetters = [];
var wins = 0;
var losses = 0;
const clueLabel=document.getElementById("clue");
const timerDuration = 20000;
let timeLeft = timerDuration;
function onStart() {
    updateDisplay();
    updateTimerDisplay();
    clueLabel.innerText=clue[currentWordIndex];
    console.log(clueLabel,clue[currentWordIndex]);
    const inputElement=document.getElementById("input");
    inputElement.addEventListener("input", onGuess);
}

function onGuess(event) {
    console.log("entered");
    console.log(event.target.value);
    var keyPressed = event.target.value.toUpperCase();
    if (isLetterOnly(keyPressed)) {
        if (guessedLetters.indexOf(keyPressed) === -1) {
            guessedLetters.push(keyPressed);
            attempts++;
            updateDisplay();
            if (isRoundLost()) {
                losses++;
                goToNextWord();
                return;
            } else if (isRoundWon()) {
                wins++;
                goToNextWord();
                return;
            }

        }
    }
    event.target.value="";
}
function getGameboardWord() {
    return (currentWordLetters().map(function (letter) {
        console.log(letter);
        if (guessedLetters.indexOf(letter) === -1) {
            return "&nbsp";
        } else {
            return letter;
        }
    }
    ));
}

function goToNextWord() {
    currentWordIndex++;
    clueLabel.innerText=clue[currentWordIndex];
    attempts = 0;
    guessedLetters = [];
    updateDisplay();
}

function isRoundLost() {
    return (getGuessesAllowed() - attempts === 0);
}

function isRoundWon() {
    return (getGameboardWord().indexOf("&nbsp") === -1);
}

function isLetterOnly(character) {
    if (character.length !== 1) {
        return false;
    }
    var checker = /^[A-Z]+$/i.test(character);
    return checker;
}


function updateDisplay() {
    document.getElementById("guessed").innerHTML = guessedLetters.reduce(function (list, letter) {
        return (list + letter + " ");
    }, "");
    showGameBoard();
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("guesses_remaining").innerHTML = getGuessesAllowed() - attempts;
}

function showGameBoard() {
    var container = document.getElementById('game_board_container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    console.log(getGameboardWord());
    getGameboardWord().forEach(function (letter) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "game_board_letter");
        newDiv.innerHTML = letter;
        if (letter !== "&nbsp") {
            newDiv.setAttribute("class", "no_border");
        }
        container.appendChild(newDiv);
    });
}

function currentWordLetters() {
    return (words[currentWordIndex].split(""));
}

function getGuessesAllowed() {
    return (10);
}
const timerInterval = setInterval(function () {
    timeLeft -= 1000;
    updateTimerDisplay();

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        displayResult();
    }
}, 1000);

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    document.getElementById('time_remaining').textContent = `${minutes}:${seconds}`;
}

function displayResult() {
    console.log("running");
    // Hide game elements
    document.getElementById('game_board_container').style.display = 'none';
    document.getElementById('guessed_container').style.display = 'none';
    document.getElementById('win_loss_container').style.display = 'none';
    document.getElementById('guesses_remaining_container').style.display = 'none';
    document.getElementById('clue').style.display = 'none';

    // // Display result message
    const wins = document.getElementById('wins').textContent;
    document.getElementById('your_score').textContent = `Your score is ${wins}`;
    document.getElementById('result_container').style.display = 'block';
}


onStart();
