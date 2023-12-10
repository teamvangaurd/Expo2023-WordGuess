export default class GameUtil {
    constructor() {
        this.words = ['MALWARE','PHISING','PASSWORD','DDOS','BRUTEFORCE','TROJAN','RCE','DNS','COOKIE','REDOS','BREACH'];
        this.clue =['What type of malicious software is designed to harm your computer?','What\'s the term for tricking people into sharing sensitive info through fake emails or websites?','What do you call a set of characters that grants access to a computer system or account?','A type of cyber attack where a system is flooded with traffic to make it unavailable ?','A technique where attackers attempt to guess passwords by systematically trying all possible combinations ?','A type of malware that disguises itself as legitimate software but actually performs malicious actions ?','This type of attack involves injecting malicious code into a website ?','In this cyber threat scenario, attackers gain control and execute commands on a targeted system remotely?','A type of malicious software that encrypts your files and demands payment for their release.','This system translates human-readable domain names into numerical IP addresses.','Tiny data bits stored in your browser for tracking online activity and remembering you on websites, posing potential privacy risks','This type of attack exploits inefficient regular expressions, causing a system to become unresponsive.','An unauthorized access or intrusion that results in the compromise of sensitive data.'];
        this.currentWordIndex = 0;
        this.attempts = 0;
        this.guessedLetters = [];
        this.wins = 0;
        this.losses = 0;
        this.clueLabel = this.$('clue');
        this.timerDuration = 100000;
        this.timeLeft = this.timerDuration;
    }

    $(id) {
        return document.getElementById(id);
    }

    getTimeLeft() {
        return this.timeLeft;
    }

    setTimeLeft(val) {
        return this.timeLeft = val;
    }
    
    async onStart() {
        this.updateDisplay();
        // this.updateTimerDisplay();
        this.clueLabel.innerText = this.clue[this.currentWordIndex];
        const inputElement = this.$('input');
        inputElement.addEventListener('input', this.onGuess.bind(this));
    }

    onGuess(event) {
        const keyPressed = event.target.value.toUpperCase();
        if (this.isLetterOnly(keyPressed)) {
            if (this.guessedLetters.indexOf(keyPressed) === -1) {
                this.guessedLetters.push(keyPressed);
                this.attempts++;
                this.updateDisplay();
                if (this.isRoundLost()) {
                    this.losses++;
                    this.goToNextWord();
                } else if (this.isRoundWon()) {
                    this.wins++;
                    this.goToNextWord();
                }
            }
        }
        event.target.value = '';
    }
    
    getGameboardWord() {
        const word = this.currentWordLetters().map( (letter) => {
            if (this.guessedLetters.indexOf(letter) === -1) {
                return '&nbsp';
            } else {
                return letter;
            }
        });
        return word;
    }
    
    goToNextWord() {
        this.currentWordIndex++;
        this.clueLabel.innerText = this.clue[this.currentWordIndex];
        this.attempts = 0;
        this.guessedLetters = [];
        this.updateDisplay();
    }
    
    isRoundLost() {
        return (this.getGuessesAllowed() - this.attempts === 0);
    }
    
    isRoundWon() {
        return (this.getGameboardWord().indexOf('&nbsp') === -1);
    }

    isLetterOnly(character) {
        if (character.length !== 1) {
            return false;
        }
        const checker = /^[A-Z]+$/i.test(character);
        return checker;
    }

    updateDisplay() {
        this.$('guessed').innerHTML = this.guessedLetters.reduce(function (list, letter) {
            return (list + letter + ' ');
        }, '');
        this.showGameBoard();
        this.$('wins').innerHTML = this.wins;
        this.$('losses').innerHTML = this.losses;
        this.$('guesses_remaining').innerHTML = this.getGuessesAllowed() - this.attempts;
    }
    
    showGameBoard() {
        const container = this.$('game_board_container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        this.getGameboardWord().forEach( (letter) => {
            const newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'game_board_letter');
            newDiv.innerHTML = letter;
            if (letter !== '&nbsp') {
                newDiv.setAttribute('class', 'no_border');
            }
            container.appendChild(newDiv);
        });
    }
    
    currentWordLetters() {
        return (this.words[this.currentWordIndex].split(''));
    }

    getGuessesAllowed() {
        return 10;
    }
}