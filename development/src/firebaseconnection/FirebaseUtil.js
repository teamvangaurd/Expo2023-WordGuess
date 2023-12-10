import FirebaseConnection from './FirebaseConnection.js';
class FirebaseUtil {
    constructor() {
        this.firebaseConnection = new FirebaseConnection();
    }

    verifyUser(data, options) {
        const [ callback, username ] = options;
        if(data[username]) {
            callback(true);
        }else {
            callback(false);
        }
    }

    verifyIsUserAlreadyFound(callback, username) {
        this.firebaseConnection.getData(this.verifyUser.bind(this), callback, username);
    }

    setScore(options) {
        const { onSuccess, onFailure, username, value } = options;
        
        const data = {
            username,
            value
        };
        this.firebaseConnection.setData(data, onSuccess, onFailure);
    }

    getAllData(callback) {
        this.firebaseConnection.getData(callback);
    }
}

export const firebaseUtil = new FirebaseUtil();