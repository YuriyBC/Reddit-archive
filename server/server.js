require('dotenv').config();
const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const apiService = require('./services/apiService');
const databaseService = require('./services/database/databaseService');
const redditFetcherService = require('./services/redditService');
const websocketService = require('./services/websocketService');
const port = process.env.PORT || 8080;
const app = express();
const constants = require('./constants');
const {
  SUBREDDITS_TABLE_TITLE,
  INTERVAL_TO_FETCH_NEW_DATA,
  DATA_IS_ARCHIVATED_TIME
} = constants;

app.use(express.static(`${__dirname}/../public/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const server = http.createServer(app);

function getAndStoreSubreddits () {
  redditFetcherService.fetchSubreddits().then((subreddits) => {
    subreddits.forEach(el => {
      databaseService.insertDataInTable(SUBREDDITS_TABLE_TITLE, el.data)
    });
  });
}

function fetchDataOfArchivedSubreddits () {
  setInterval(() => {
    databaseService.getDataFromDatabase(SUBREDDITS_TABLE_TITLE).then((subreddits => {
      const archivedSubreddits = subreddits.filter(subreddit => subreddit.isArchived);
      if (archivedSubreddits.length) {
        archivedSubreddits.forEach(subreddit => {
          apiService.updateData(subreddit.display_name, subreddit.id);
          setTimeout(() => {
            websocketService.communicator('subredditArchivationFinished', {
              name: subreddit.display_name,
              id: subreddit.id
            })
          }, DATA_IS_ARCHIVATED_TIME)
        });

      }
    }));
  }, INTERVAL_TO_FETCH_NEW_DATA)
}

server.on('listening',function(){
  console.log('ok, server is running');
});

databaseService.init();
apiService.init(app);
websocketService.init(server);

getAndStoreSubreddits();
fetchDataOfArchivedSubreddits();
server.listen(port);
