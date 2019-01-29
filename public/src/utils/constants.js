// WEB SOCKETS
const WEBSOCKET_URL = 'ws://localhost:8080';
const WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE = 'subreddits have been stored';

const POSTS_TO_SHOW = 20;
const AVAILABLE_SORTING = [
    {
        id: 0,
        title: 'Hot',
        icon: 'faFire',
    },
    {
        id: 1,
        title: 'New',
        icon: 'faCertificate',
    },
    {
        id: 2,
        title: 'Top',
        icon: 'faChartLine',
    },
];
const LOCAL_STORAGE_SUBREDDITS = 'subreddits';
const LOCAL_STORAGE_POSTS = 'posts';

// API SERVER
const API = 'http://localhost:8080';
const URL_GET_SUBREDDITS = '/api/subreddits';
const URL_SET_SUBREDDIT_TO_ARCHIVE = '/api/subreddit';
const URL_GET_POSTS = '/api/posts';
const URL_GET_POST = '/api/post';
const URL_GET_POST_COMMENTS = '/api/comments';

export default {
    API,
    URL_GET_SUBREDDITS,
    WEBSOCKET_URL,
    WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE,
    URL_SET_SUBREDDIT_TO_ARCHIVE,
    URL_GET_POSTS,
    POSTS_TO_SHOW,
    URL_GET_POST,
    URL_GET_POST_COMMENTS,
    AVAILABLE_SORTING,
    LOCAL_STORAGE_SUBREDDITS,
    LOCAL_STORAGE_POSTS,
};
