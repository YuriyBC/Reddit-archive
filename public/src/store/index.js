import { combineReducers } from 'redux';
import subreddits from './reducers/subreddits';
import posts from './reducers/posts';

export default combineReducers({
    subreddits,
    posts,
});
