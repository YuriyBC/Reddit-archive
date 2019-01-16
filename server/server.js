const express = require('express');
const path = require('path');
const app = express();
const redditFetcher = require('./redditService');
const port = process.env.PORT || 8080;

redditFetcher.init();

app.use(express.static(`${__dirname}/../public/public`));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../public/public', 'index.html'));
});

app.listen(port);
console.log(`server started on port ${port}`);
