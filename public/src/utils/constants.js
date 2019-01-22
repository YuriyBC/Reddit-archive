// WEB SOCKETS
const WEBSOCKET_URL = 'ws://localhost:8080';
const WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE = 'subreddits have been stored';

const POSTS_TO_SHOW = 20;

// API SERVER
const API = 'http://localhost:8080';
const URL_GET_SUBREDDITS = '/api/subreddits';
const URL_SET_SUBREDDIT_TO_ARCHIVE = '/api/subreddit';
const URL_GET_POSTS = '/api/posts';
const URL_GET_POST = '/api/post';

export default {
    API,
    URL_GET_SUBREDDITS,
    WEBSOCKET_URL,
    WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE,
    URL_SET_SUBREDDIT_TO_ARCHIVE,
    URL_GET_POSTS,
    POSTS_TO_SHOW,
    URL_GET_POST
}