const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const apiService = require('./services/apiService');
const databaseService = require('./services/databaseService');
const redditFetcherService = require('./services/redditService');
const websocketService = require('./services/websocketService');
const port = process.env.PORT || 8080;
const app = express();
const constants = require('./constants');
const {
  SUBREDDITS_TABLE_TITLE,
  INTERVAL_TO_FETCH_NEW_DATA
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
          apiService.updateData(subreddit.display_name, subreddit.id)
        })
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
