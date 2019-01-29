const WebSocket = require('ws');
const databaseService = require('./database/databaseService');
const constants = require('../constants');
const {SUBREDDITS_TABLE_TITLE} = constants;

const triggers = {
  subredditArchivationFinished: {
      value: false,
      subredditTitle: null
  }
};

function init (server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection (ws) {
        let interval = setInterval(function () {
            const subreddits = databaseService.getDataFromDatabase(SUBREDDITS_TABLE_TITLE);
            subreddits.then(subreddits => {
                if (subreddits.length) {
                    ws.send('subreddits have been stored')
                    clearInterval(interval)
                }
            }).catch(() => {});
        }, 1000)

        let checkArchivationINterval = setInterval(function () {
            if (triggers.subredditArchivationFinished.value) {
                console.log(triggers.subredditArchivationFinished.subredditTitle)
                clearInterval(checkArchivationINterval)
            }
        }, 1000)
    });
}


function communicator (key, value) {
    triggers[key] = value
}

module.exports = {
    init,
    communicator
};