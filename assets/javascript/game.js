var words = ["MALWARE","PHISING","PASSWORD","DDOS","BRUTEFORCE","TROJAN","RCE","DNS","COOKIE","REDOS","BREACH"];
var clue =["What type of malicious software is designed to harm your computer?","What's the term for tricking people into sharing sensitive info through fake emails or websites?","What do you call a set of characters that grants access to a computer system or account?","A type of cyber attack where a system is flooded with traffic to make it unavailable ?","A technique where attackers attempt to guess passwords by systematically trying all possible combinations ?","A type of malware that disguises itself as legitimate software but actually performs malicious actions ?","This type of attack involves injecting malicious code into a website ?","In this cyber threat scenario, attackers gain control and execute commands on a targeted system remotely?","A type of malicious software that encrypts your files and demands payment for their release.","This system translates human-readable domain names into numerical IP addresses.","Tiny data bits stored in your browser for tracking online activity and remembering you on websites, posing potential privacy risks","This type of attack exploits inefficient regular expressions, causing a system to become unresponsive.","An unauthorized access or intrusion that results in the compromise of sensitive data."];
var currentWordIndex = 0;
var attempts = 0;
var guessedLetters = [];
var wins = 0;
var losses = 0;
const clueLabel = document.getElementById("clue");
const timerDuration = 2000;
let timeLeft = timerDuration;

function onStart() {
    updateDisplay();
    updateTimerDisplay();
    clueLabel.innerText = clue[currentWordIndex];
    const inputElement = document.getElementById("input");
    inputElement.addEventListener("input", onGuess);
}

function onGuess(event) {
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
    event.target.value = "";
}

function getGameboardWord() {
    return (currentWordLetters().map(function (letter) {
        if (guessedLetters.indexOf(letter) === -1) {
            return "&nbsp";
        } else {
            return letter;
        }
    }));
}

function goToNextWord() {
    currentWordIndex++;
    clueLabel.innerText = clue[currentWordIndex];
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
    // Hide game elements
    document.getElementById('game_board_container').style.display = 'none';
    document.getElementById('guessed_container').style.display = 'none';
    document.getElementById('win_loss_container').style.display = 'none';
    document.getElementById('guesses_remaining_container').style.display = 'none';
    document.getElementById('clue').style.display = 'none';

    // Display result message
    const wins = document.getElementById('wins').textContent;
    document.getElementById('your_score').textContent = `Your score is ${wins}`;
    document.getElementById('result_container').style.display = 'block';
}

function login() {
    // Check if the entered credentials are for the admin
    const urlParams = new URLSearchParams(window.location.search);

    // Check if the URL contains "admin=true"
    if (urlParams.get('admin') === 'true') {
        // Display the admin dashboard
        document.getElementById('login_container').style.display = 'block';
    } else {
        // Display the user game
        document.getElementById('login_container').style.display = 'none';
        document.getElementById('user_game').style.display = 'block';

        // Start the game for the user
        onStart();
    }
}

function validatePassword() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin') {
        document.getElementById('login_container').style.display = 'none';
        document.getElementById('admin_dashboard').style.display = 'block';
    }
}

// ... (your existing code)

function displayResult() {
    // Prompt user for name
    const playerName = prompt('Enter your name:');
    const playerScore = document.getElementById('wins').textContent;

    // Send name and score to serverless function
    saveToServerlessFunction(playerName, playerScore);

    // Hide game elements
    document.getElementById('game_board_container').style.display = 'none';
    document.getElementById('guessed_container').style.display = 'none';
    document.getElementById('win_loss_container').style.display = 'none';
    document.getElementById('guesses_remaining_container').style.display = 'none';
    document.getElementById('clue').style.display = 'none';

    // Display result message
    document.getElementById('your_score').textContent = `Your score is ${playerScore}`;
    document.getElementById('result_container').style.display = 'block';
}

// Function to send name and score to serverless function
function saveToServerlessFunction(name, score) {
    fetch('/.netlify/functions/saveScore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, score }),
    })
        .then(response => response.json())
        .then(data => console.log('Score saved:', data))
        .catch(error => console.error('Error saving score:', error));
}

login();
