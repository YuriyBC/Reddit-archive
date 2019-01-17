const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require("body-parser");
const redditFetcher = require('./redditService');
const databaseService = require('./databaseService');
const port = process.env.PORT || 8080;
const app = express();
const constants = require('./constants');
const {
  DATABASE_NAME,
  SUBREDDITS_TABLE_TITLE
} = constants;


app.use(express.static(`${__dirname}/../public/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const server = http.createServer(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

databaseService.init();

function getAndStoreSubreddits () {
  redditFetcher.fetchSubreddits().then((subreddits) => {
    subreddits.forEach(el => {
      databaseService.insertDataInTable('subreddits', el.data)
    });
  });
}

function allowCors () {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

wss.on('connection', function connection (ws) {
  let interval = setInterval(function () {
    const subreddits = databaseService.getDataFromDatabase('subreddits');

    subreddits.then(subreddits => {
      if (subreddits.length) {
        ws.send('subreddits have been stored')
        clearInterval(interval)
      }
    });
  }, 500)
});


allowCors();
getAndStoreSubreddits();

app.get('/api/subreddits', (request, response) => {
  const subreddits = databaseService.getDataFromDatabase('subreddits');
  subreddits.then(subreddits => {
    response.send(subreddits)
  });
});

app.post('/api/subreddit', (request, response) => {
  if (typeof request.body.payload === 'string') {
    const potentialSubreddit = request.body.payload;
    redditFetcher.checkIsSubredditExists(potentialSubreddit).then(response => {
      //


    })

  } else {
    const subredditId = request.body.payload;
    if (subredditId) {
      databaseService.getRowById(SUBREDDITS_TABLE_TITLE, subredditId).then((subreddit) => {
        const isArchived = subreddit ? subreddit.isArchived : 0;
        const newValue = isArchived === 0 ? 1 : 0;
        databaseService.updateTable(SUBREDDITS_TABLE_TITLE, 'isArchived', subredditId, newValue).then(resolve => {
          const subreddits = databaseService.getDataFromDatabase('subreddits');
          subreddits.then(subreddits => {
            response.send(subreddits)
            response.send(300)
          });
        }).catch(() => {
          response.send(404)
        })
      })
    }
  }
});

app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../public/public', 'index.html'));
});

server.listen(port);
console.log(`server started on port ${port}`);

module.exports = {
  app
};