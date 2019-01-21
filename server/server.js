const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const apiService = require('./services/apiService');
const databaseService = require('./services/databaseService');
const redditFetcherService = require('./services/redditService');
const mysqlApostrophe = require("mysql-apostrophe");
const websocketService = require('./services/websocketService');
const port = process.env.PORT || 8080;
const app = express();
const constants = require('./constants');
const {SUBREDDITS_TABLE_TITLE} = constants;

app.use(express.static(`${__dirname}/../public/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(mysqlApostrophe)

const server = http.createServer(app);

function getAndStoreSubreddits () {
  redditFetcherService.fetchSubreddits().then((subreddits) => {
    subreddits.forEach(el => {
      databaseService.insertDataInTable(SUBREDDITS_TABLE_TITLE, el.data)
    });
    // checkAreNewSubredditsArchived()
  });
}

// function checkAreNewSubredditsArchived () {
//   const localStorage = [];
//   const interval = setInterval(() => {
//     redditFetcherService.fetchSubreddits(SUBREDDITS_TABLE_TITLE).then((subreddits) => {
//
//     })
//
//   }, 3000)
//
// }

server.on('listening',function(){
  console.log('ok, server is running');
});


databaseService.init();
apiService.init(app);
websocketService.init(server);

getAndStoreSubreddits();
server.listen(port);
