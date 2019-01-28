const snoowrap = require('snoowrap');
const fetch = require('node-fetch');
const constants = require('../constants');
const {
    SUBREDDITS_LIMIT,
    POSTS_LIMIT
} = constants;

const r = new snoowrap({
    userAgent: 'best-comments-reader',
    clientId: 'YcIppZMUWm01JQ',
    clientSecret: 'w3HANpulAnjriz1pp8lo4XIEQ9g',
    refreshToken: '235262915388-m9d00d7_W7q5cY0zsxnsLaRr9nk'
});

const url = {
    getAllSubreddits: `https://www.reddit.com/subreddits.json?limit=${SUBREDDITS_LIMIT}`,
    getAllComments: (subredditTitle, postId) => `https://www.reddit.com/r/${subredditTitle}/comments/${postId}.json?limit=1000`
};

function fetchSubreddits () {
    return fetch(url.getAllSubreddits)
        .then(res => res.json())
        .then(body => body.data.children)
        .catch(error => {
            console.log(error)
    })
}

function checkIsSubredditExists (subredditTitle) {
    return r.getSubreddit(subredditTitle).getHot({limit: 1})
}

function getSubredditPosts (subredditTitle) {
    return r.getSubreddit(subredditTitle).getHot({limit: POSTS_LIMIT})
}

function fetchPostSubmission (subredditTitle, postId) {
    return fetch(url.getAllComments(subredditTitle, postId)).then(res => res.json())
}

module.exports = {
    fetchSubreddits,
    checkIsSubredditExists,
    getSubredditPosts,
    fetchPostSubmission
};

// console.log(r.getSubreddit('javascript'))
// r.getSubreddit('javascript').getHot({limit: 500}).then((response) => {
//     console.log(response.length)
//     console.log(response[0])
// })