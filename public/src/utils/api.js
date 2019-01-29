import axios from 'axios';
import constants from './constants';

const {
    API,
    URL_GET_SUBREDDITS,
    URL_SET_SUBREDDIT_TO_ARCHIVE,
    URL_GET_POSTS,
    URL_GET_POST,
    URL_GET_POST_COMMENTS,
} = constants;

export const getSubredditsApi = () => axios.get(API + URL_GET_SUBREDDITS);

export const storeSubredditToArchiveApi = payload => axios.post(API + URL_SET_SUBREDDIT_TO_ARCHIVE, { payload });

export const getPostsApi = (subredditId, source) => axios.get(`${API}${URL_GET_POSTS}/${subredditId}`, {
    cancelToken: source.token
});

export const getPostApi = (subredditId, postId) => axios.get(`${API}${URL_GET_POST}/${subredditId}/${postId}`);

export const getPostCommentsApi = (subredditId, postId) => axios.get(`${API}${URL_GET_POST_COMMENTS}/${subredditId}/${postId}`);
