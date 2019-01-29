import methods from '../../utils/methods';
import constants from '../../utils/constants';
import {
    getSubredditsApi,
    storeSubredditToArchiveApi,
} from '../../utils/api';

const { storage } = methods;
const { LOCAL_STORAGE_SUBREDDITS } = constants;

export const getSubreddits = () => function dispatchSubreddits(dispatch) {
    getSubredditsApi().then((response) => {
        const result = response.data.map((post) => {
            Object.keys(post).forEach((key) => {
                if (post[key] === 'null') {
                    post[key] = null;
                }
            });
            return post;
        });
        dispatch({
            type: 'SET_SUBREDDITS',
            payload: result,
        });
    });
};

export const setSubreddits = payload => function dispatchSubreddits(dispatch) {
    dispatch({
        type: 'SET_SUBREDDITS',
        payload,
    });
};

export const storeSubredditToArchive = (name) => {
    const ERROR_SHOWTIME = 5000;

    return function dispatchSubreddit(dispatch) {
        return storeSubredditToArchiveApi(name).then((response) => {
            const result = response.data.map((post) => {
                Object.keys(post).forEach((key) => {
                    if (post[key] === 'null') {
                        post[key] = null;
                    }
                });
                return post;
            });
            dispatch({
                type: 'SET_SUBREDDITS',
                payload: result,
            });
            storage(LOCAL_STORAGE_SUBREDDITS, JSON.stringify(result));
            return response.data;
        }).catch((error) => {
            if (error.response && error.response.data.error) {
                dispatch({
                    type: 'SET_ERROR_MESSAGE',
                    payload: [error.response.data.error],
                });

                setTimeout(() => {
                    dispatch({
                        type: 'SET_ERROR_MESSAGE',
                        payload: [],
                    });
                }, ERROR_SHOWTIME);
            }
        });
    };
};
