import GameUtil from './GameUtil.js';
import { firebaseUtil } from '../firebaseconnection/FirebaseUtil.js';

export default class GameStatus {
    constructor(username) {
        this.username = username;
        this.gameUtil = new GameUtil();
        this.gameUtil.onStart();
    }

    setTimeLeft(value) {
        this.gameUtil.setTimeLeft(value);
    }

    getTimeLeft() {
        return this.gameUtil.getTimeLeft();
    }
    convertToTwoDigits(number) {
        return String(number).padStart(2, '0');
    }
    updateTimerDisplay(returnTime = false) {
        const timeLeft = this.gameUtil.getTimeLeft();
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        if(returnTime) {
            return `${minutes}:${seconds}`;
        }
        const timerContainer = document.getElementById('time_remaining_container');
        timerContainer.firstChild.innerText = this.convertToTwoDigits(minutes);
        timerContainer.lastChild.innerText = this.convertToTwoDigits(minutes);
    }

    onSuccessMsg(data) {
        document.cookie = '';
        const { username, value } = data;
        const { score } = value;
        document.getElementById('score-details').innerText = `Your Score : ${score}`;
        const congratsContainer = document.getElementById('congrats-preview');
        congratsContainer.style.opacity = 1;
        congratsContainer.classList.add('is-visible')
    }

    displayResult() {
        const $ = document.getElementById;
        const playerScore = this.gameUtil.wins;

        const options = {
            username: this.username,
            value: {
                score: playerScore,
                time: this.updateTimerDisplay(true)
            },
            onSuccess: this.onSuccessMsg.bind(this),
            onFailure: ()=>{
                console.log('err');
            }
        }

        firebaseUtil.setScore(options)
    }
}