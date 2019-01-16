import axios from 'axios';
import constants from './constants';

const {
    URL_GET_SUBREDDITS
} = constants;

export const getAllSubreddits = () => {
    return axios.get(URL_GET_SUBREDDITS)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
};
