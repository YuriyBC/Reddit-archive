import { getAllSubreddits } from '../../utils/api';

export const action = (payload) => {
    getAllSubreddits().then((response) => {
        console.log(response.data.data.children)
    });
    return ({
        type: 'ACTION',
        payload
    });
};
