import {
    getSubredditsApi,
    storeSubredditToArchiveApi
} from '../../utils/api';

export const getSubreddits = () => {
    return function (dispatch) {
        getSubredditsApi().then((response) => {
            dispatch({
                type: 'SET_SUBREDDITS',
                payload: response.data
            })
        });
    }
};

export const storeOldSubredditToArchive = (id) => {
    return function (dispatch) {
        storeSubredditToArchiveApi(id).then((response) => {
            dispatch({
                type: 'SET_SUBREDDITS',
                payload: response.data
            })
        })
    }
};

export const storeNewSubredditToArchive = (name) => {
    return function (dispatch) {
        storeSubredditToArchiveApi(name).then((response) => {
            dispatch({
                type: 'SET_SUBREDDITS',
                payload: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }
};

