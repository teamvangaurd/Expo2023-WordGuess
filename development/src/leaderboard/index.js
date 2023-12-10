import { firebaseUtil } from '../firebaseconnection/FirebaseUtil.js';

class LeaderBoard {
    constructor() {
        this.leaderBoardTableBody = document.getElementById('leaderboard-data');
    }

    constructTableDataTemplate(count, username, score, time) {
        const tr_tag = document.createElement('tr');
        const th_tag = document.createElement('th');
        th_tag.setAttribute('scope', 'row');
        th_tag.innerText = count;
        tr_tag.appendChild(th_tag);
        for(const data of [username, score, time]) {
            const td_tag = document.createElement('td');
            td_tag.innerText = data;
            tr_tag.appendChild(td_tag);
        }
        this.leaderBoardTableBody.appendChild(tr_tag);
    }

    constructData(data) {
        const dataArray = Object.entries(data);
        dataArray.sort(([, a], [, b]) => b.score - a.score);
        for(let index = 0; index < dataArray.length; index++) {
            const [ username, { score, time }] = dataArray[index];
            this.constructTableDataTemplate(index+1, username, score, time );
        }
    }

    initializeData() {
        firebaseUtil.getAllData(this.constructData.bind(this));
    }
}

const leaderBoard = new LeaderBoard();
leaderBoard.initializeData();