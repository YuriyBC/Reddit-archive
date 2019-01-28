import {
    getPostsApi,
    getPostApi,
    getPostCommentsApi
} from '../../utils/api';

export const getPosts = (id) => {
    const REDIRECT_TIME_AFTER_ERROR = 1000;

    return function (dispatch) {
        getPostsApi(id).then((response) => {
            dispatch({
                type: 'SET_POSTS',
                payload: response.data
            });
        }).catch(() => {
            setTimeout(() => {
                window.location = '/'
            }, REDIRECT_TIME_AFTER_ERROR)
        })
    }
};

export const getPost = (subredditId, postId) => {
    return function (dispatch) {
        getPostApi(subredditId, postId).then((response) => {
            dispatch({
                type: 'SET_POST_DATA',
                payload: response.data
            })
        });
    }
};

export const getPostComments = (subredditId, postId) => {
    return function (dispatch) {
        getPostCommentsApi(subredditId, postId).then((response) => {
            dispatch({
                type: 'SET_POST_COMMENTS',
                payload: response.data
            })
        });
    }
};


export const removePosts = () => {
    return function (dispatch) {
        dispatch({
            type: 'REMOVE_POSTS'
        })
    }
};
