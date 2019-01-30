import methods from '../../utils/methods';
import constants from '../../utils/constants';
import {
    getPostsApi,
    getPostApi,
    getPostCommentsApi,
} from '../../utils/api';

const { storage } = methods;
const { LOCAL_STORAGE_POSTS } = constants;

export const getPosts = id => (
    function dispatchPosts(dispatch) {
        return getPostsApi(id).then((response) => {
            dispatch({
                type: 'SET_POSTS',
                payload: response.data,
            });
            const data = { [id]: response.data };
            const localStorageData = storage(LOCAL_STORAGE_POSTS);
            const newData = { ...JSON.parse(localStorageData), ...data };
            storage(LOCAL_STORAGE_POSTS, JSON.stringify(newData));
        })
    }
);

export const setPostsFromLocalStorage = id => function dispatchPosts(dispatch) {
    const localStorageData = JSON.parse(storage(LOCAL_STORAGE_POSTS));
    if (localStorageData[id] && localStorageData[id].length) {
        dispatch({
            type: 'SET_POSTS',
            payload: localStorageData[id],
        });
    }
};

export const getPostFromLocalStorage = (id, postId) => function dispatchPosts(dispatch) {
    const localStorageData = JSON.parse(storage(LOCAL_STORAGE_POSTS));
    if (localStorageData[id] && localStorageData[id].length) {
        const item = localStorageData[id].find(post => post.reddit_id === postId);
        dispatch({
            type: 'SET_POST_DATA',
            payload: {
                data: item,
            },
        });
    }
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
    return getPostCommentsApi(subredditId, postId).then((response) => {
        dispatch({
            type: 'SET_POST_COMMENTS',
            payload: response.data,
        });
        return response.data;
    });
};

export const removePosts = () => function dispatchRemovePost(dispatch) {
    dispatch({
        type: 'REMOVE_POSTS',
    });
};

export const removeComments = () => function dispatchRemovePost(dispatch) {
    dispatch({
        type: 'REMOVE_COMMENTS',
    });
};
