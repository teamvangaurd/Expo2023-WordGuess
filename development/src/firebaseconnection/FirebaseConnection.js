import { getDatabase, ref, onValue ,get, child, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';

class FirebaseConnection {
    constructor() {
        const firebaseConfig = {
            databaseURL: 'https://mygame-2804b-default-rtdb.firebaseio.com/'
        }
        initializeApp(firebaseConfig);
        this.database = getDatabase();
    }

    #getdbRef() {
        return this.getDataRef('/');
    }

    getData(callback, ...options) {
        const testChild = child(this.#getdbRef(), '/');
        get(testChild).then((data) => {
            callback(data.val(), options);
        });
    }

    getDataRef(datapath) {
        return ref(this.database, datapath);
    }

    setData(data, successCallback, errorCallback) {
        const dataKey = data.username;
        const dataValue = data.value;
        set(this.getDataRef(dataKey), dataValue)
            .then(() => {
                successCallback(data);
            })
            .catch((e) => {
                console.log(e);
                errorCallback(data);
            });
    }
}

export default FirebaseConnection;