import GameStatus from './GameStatus.js';

function getCookie(name) {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

function verifyUser() {
    const username = getCookie('username');
    if(!username) {
        alert('need to login');
        setTimeout(() => {
            window.location.href = './index.html';
        }, 100);
    }
    return username;
}

function gameInit() {
    const username = verifyUser();
    if(!username) {
        return;
    }
    let timerInterval;
    const gameStatus = new GameStatus(username);
    timerInterval = setInterval( () => {
        let timeLeft = gameStatus.getTimeLeft();
        timeLeft -= 1000
        gameStatus.setTimeLeft(timeLeft);
        gameStatus.updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameStatus.displayResult();
        }
    }, 1000);
}

gameInit();