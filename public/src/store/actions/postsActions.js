import {
    getPostsApi,
    getPostApi
} from '../../utils/api';

export const getPosts = (id) => {
    return function (dispatch) {
        getPostsApi(id).then((response) => {
            dispatch({
                type: 'SET_POSTS',
                payload: response.data
            })
        });
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

export const removePosts = () => {
    return function (dispatch) {
        dispatch({
            type: 'REMOVE_POSTS'
        })
    }
};
