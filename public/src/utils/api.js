import axios from 'axios';
import constants from './constants';

const {
    API,
    URL_GET_SUBREDDITS,
    URL_SET_SUBREDDIT_TO_ARCHIVE
} = constants;

export const getSubredditsApi = () => {
    return axios.get(API + URL_GET_SUBREDDITS)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
};


export const storeSubredditToArchiveApi = (payload) => {
    return axios.post(API + URL_SET_SUBREDDIT_TO_ARCHIVE, {payload: payload})
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
};