const WebSocket = require('ws');
const constants = require('../constants');
const {
    WEBSOCKET_MESSAGE_SUBREDDIT_UPDATED,
} = constants;

const triggers = {
  subredditArchivationFinished: {
      name: null,
      id: null
  }
};

function init (server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection (ws) {
        setInterval(function () {
            if (triggers.subredditArchivationFinished.name) {
                triggers.subredditArchivationFinished.message = WEBSOCKET_MESSAGE_SUBREDDIT_UPDATED;
                ws.send(JSON.stringify(triggers.subredditArchivationFinished), function(error) {});
                triggers.subredditArchivationFinished = {};
            }
        }, 5000)
    });
}

function communicator (key, value) {
    triggers[key] = value
}

module.exports = {
    init,
    communicator
};