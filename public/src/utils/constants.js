// WEB SOCKETS
const WEBSOCKET_URL = 'ws://localhost:8080';

const POSTS_TO_SHOW = 20;
const MINIMUM_ARCHIVED_LENGTH = 5;
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

const REDDIT_THUMBNAIL_STATE = {
    SELF: 'self',
    NULL: 'null'
};

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
    URL_SET_SUBREDDIT_TO_ARCHIVE,
    URL_GET_POSTS,
    POSTS_TO_SHOW,
    URL_GET_POST,
    URL_GET_POST_COMMENTS,
    AVAILABLE_SORTING,
    LOCAL_STORAGE_SUBREDDITS,
    LOCAL_STORAGE_POSTS,
    MINIMUM_ARCHIVED_LENGTH,
    REDDIT_THUMBNAIL_STATE,
};
