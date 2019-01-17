// WEB SOCKETS
const WEBSOCKET_URL = 'ws://localhost:8080';
const WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE = 'subreddits have been stored';

// API SERVER
const API = 'http://localhost:8080';
const URL_GET_SUBREDDITS = '/api/subreddits';
const URL_SET_SUBREDDIT_TO_ARCHIVE = '/api/subreddit';

export default {
    API,
    URL_GET_SUBREDDITS,
    WEBSOCKET_URL,
    WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE,
    URL_SET_SUBREDDIT_TO_ARCHIVE
}