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
        }).catch(error => {
            console.log(error)
        })
    }
};

export const storeSubredditToArchive = (name) => {
    return function (dispatch) {
        return storeSubredditToArchiveApi(name).then((response) => {
            dispatch({
                type: 'SET_SUBREDDITS',
                payload: response.data
            });
            return response.data
        }).catch(error => {
            if (error.response && error.response.data.error) {
                dispatch({
                    type: 'SET_ERROR_MESSAGE',
                    payload: [error.response.data.error]
                });

                setTimeout(() => {
                    dispatch({
                        type: 'SET_ERROR_MESSAGE',
                        payload: []
                    });
                }, 5000)
            }
        })
    }
};

