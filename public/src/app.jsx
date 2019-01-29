import React from 'react';
import 'normalize.css';
import {Route, Switch} from "react-router-dom";
import HomePage from './pages/HomePage'
import SubredditPage from './pages/SubredditPage'
import PostItemPage from './pages/PostItemPage'
import {webSocketService} from './utils/websocketService'
import constants from './utils/constants'
import methods from './utils/methods'
const { storage } = methods;
import { getSubreddits, setSubreddits } from "./store/actions/subredditsActions";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom'

const {
    WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE,
    LOCAL_STORAGE_SUBREDDITS,
    LOCAL_STORAGE_POSTS
} = constants;

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount () {
        let localStorageSubreddits = storage(LOCAL_STORAGE_SUBREDDITS);
        let localStoragePosts = storage(LOCAL_STORAGE_POSTS);
        if (localStorageSubreddits) {
            this.props.dispatch(setSubreddits(JSON.parse(localStorageSubreddits)))
        }
        if (!localStoragePosts) {
            storage(LOCAL_STORAGE_POSTS, JSON.stringify({}))
        }
        this.props.dispatch(getSubreddits());
        webSocketService().onmessage = message => {
            if (message.data === WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE) {
                this.props.dispatch(getSubreddits());
            }
        };
    }

    render () {
        return <div className='App'>
            <Switch>
                <Route exact path="/subreddit/:id/:postId" component={PostItemPage} />
                <Route exact path="/subreddit/:id" component={SubredditPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </div>
    }
};

export default withRouter(connect(state => state)(App));
