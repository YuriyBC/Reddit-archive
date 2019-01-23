import {
    getSubredditsApi,
    storeSubredditToArchiveApi
} from '../../utils/api';

export const getSubreddits = () => {
    return function (dispatch) {
        getSubredditsApi().then((response) => {
            const result = response.data.map(post => {
                Object.keys(post).forEach(key => {
                    if (post[key] === 'null') {
                        post[key] = null
                    }
                });
                return post
            });
            dispatch({
                type: 'SET_SUBREDDITS',
                payload: result
            })
        }).catch(error => {
            console.log(error)
        })
    }
};

export const storeSubredditToArchive = (name) => {
    return function (dispatch) {
        return storeSubredditToArchiveApi(name).then((response) => {
            const result = response.data.map(post => {
                Object.keys(post).forEach(key => {
                    if (post[key] === 'null') {
                        post[key] = null
                    }
                });
                return post
            });
            dispatch({
                type: 'SET_SUBREDDITS',
                payload: result
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

