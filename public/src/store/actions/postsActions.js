import {
    getPostsApi
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
