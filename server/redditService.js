var snoowrap = require('snoowrap');
const fetch = require('node-fetch');

const r = new snoowrap({
    userAgent: 'best-comments-reader',
    clientId: 'YcIppZMUWm01JQ',
    clientSecret: 'w3HANpulAnjriz1pp8lo4XIEQ9g',
    refreshToken: '235262915388-m9d00d7_W7q5cY0zsxnsLaRr9nk'
});

const url = {
    getAllSubreddits: "https://www.reddit.com/subreddits.json?limit=150"
};

r.getSubreddit('AskReddit').getRecommendedSubreddits([]).then(console.log);
function fetchSubreddits () {
    return fetch(url.getAllSubreddits).then(res => res.json())
        .then(body => body.data.children)
        .catch(error => {
            console.log(error)
    })
}

function checkIsSubredditExists (subredditTitle) {
    return new Promise (resolve => {
        r.getSubreddit(subredditTitle).body.then((response) => {
            console.log(response)
        })
    });
}

module.exports = {
    fetchSubreddits,
    checkIsSubredditExists
};