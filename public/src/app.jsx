import React from 'react';
import 'normalize.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './pages/HomePage';
import SubredditPage from './pages/SubredditPage';
import PostItemPage from './pages/PostItemPage';
import constants from './utils/constants';
import methods from './utils/methods';
import { webSocketService } from './utils/websocketService';
import { getSubreddits, setSubreddits } from './store/actions/subredditsActions';

const { storage } = methods;
const {
    WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE,
    LOCAL_STORAGE_SUBREDDITS,
    LOCAL_STORAGE_POSTS,
} = constants;

class App extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        const localStorageSubreddits = storage(LOCAL_STORAGE_SUBREDDITS);
        const localStoragePosts = storage(LOCAL_STORAGE_POSTS);

        if (localStorageSubreddits) {
            dispatch(setSubreddits(JSON.parse(localStorageSubreddits)));
        }
        if (!localStoragePosts) {
            storage(LOCAL_STORAGE_POSTS, JSON.stringify({}));
        }
        dispatch(getSubreddits());

        webSocketService().onmessage = (message) => {
            if (message.data === WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE) {
                dispatch(getSubreddits());
            }
        };
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/subreddit/:id/:postId" component={PostItemPage} />
                    <Route exact path="/subreddit/:id" component={SubredditPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(state => state)(App));
