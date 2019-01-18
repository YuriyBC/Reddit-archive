const WebSocket = require('ws');
const databaseService = require('./databaseService');
const constants = require('../constants');
const {SUBREDDITS_TABLE_TITLE} = constants;

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
        }, 500)
    });
}

module.exports = {
    init
};