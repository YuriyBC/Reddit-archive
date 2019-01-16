var snoowrap = require('snoowrap');
const fetch = require('node-fetch');

const r = new snoowrap({
    userAgent: 'best-comments-reader',
    clientId: 'YcIppZMUWm01JQ',
    clientSecret: 'w3HANpulAnjriz1pp8lo4XIEQ9g',
    refreshToken: '235262915388-m9d00d7_W7q5cY0zsxnsLaRr9nk'
});

const url = {
    getAllSubreddits: "https://www.reddit.com/subreddits.json?limit=500"
};

r.getSubreddit('snoowrap')

function getAllSubreddits () {
    // fetch(url.getAllSubreddits).then(res => res.json())
    //     .then(body => console.log(body.data.children));
}

function init () {
    getAllSubreddits()
}

module.exports = {
    init
};