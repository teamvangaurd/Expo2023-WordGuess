import { firebaseUtil } from '../firebaseconnection/FirebaseUtil.js';

function setCookie(name, value) {  
    const cookie = `${name}=${encodeURIComponent(value)}`;
  
    document.cookie = cookie;
  }

function verifyUser(event) {
    const username = document.getElementById('username').value;
    if(username == '') {
        alert('username should not be empty');
    }else {
        const callbackHandler = (isFound) => {
            if(isFound) {
                alert('try with different username');
            }else {
                setCookie('username', username );
                setTimeout(() => {
                    window.location.href = './user.html';
                }, 100);
            }
        }
        firebaseUtil.verifyIsUserAlreadyFound(callbackHandler, username);
    }
    event.preventDefault();
}

function attachEvent() {
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', verifyUser);
}

attachEvent();