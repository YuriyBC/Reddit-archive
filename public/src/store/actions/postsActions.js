import {
    getPostsApi,
    getPostApi,
    getPostCommentsApi,
} from '../../utils/api';

export const getPosts = (id, cancelToken) => {
    const REDIRECT_TIME_AFTER_ERROR = 1000;

    return function dispatchPosts(dispatch) {
        getPostsApi(id, cancelToken).then((response) => {
            dispatch({
                type: 'SET_POSTS',
                payload: response.data,
            });
        }).catch((error) => {
            if (error.message !== 'Abort request') {
                setTimeout(() => {
                    window.location = '/';
                }, REDIRECT_TIME_AFTER_ERROR);
            }
        });
    };
};

export const getPost = (subredditId, postId) => function dispatchPost(dispatch) {
    getPostApi(subredditId, postId).then((response) => {
        dispatch({
            type: 'SET_POST_DATA',
            payload: response.data,
        });
    });
};

export const getPostComments = (subredditId, postId) => function dispatchComments(dispatch) {
    getPostCommentsApi(subredditId, postId).then((response) => {
        dispatch({
            type: 'SET_POST_COMMENTS',
            payload: response.data,
        });
    });
};


export const removePosts = () => function dispatchRemovePost(dispatch) {
    dispatch({
        type: 'REMOVE_POSTS',
    });
};
