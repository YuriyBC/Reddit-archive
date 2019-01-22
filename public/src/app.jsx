import React from 'react';
import 'normalize.css';
import {Route, Switch} from "react-router-dom";
import HomePage from './pages/HomePage'
import SubredditPage from './pages/SubredditPage'
import PostItemPage from './pages/PostItemPage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {webSocketService} from './utils/websocketService'
import constants from './utils/constants'
import {
    faAngleUp,
    faAngleDown,
    faCommentAlt,
    faShare,
    faBookmark
} from '@fortawesome/free-solid-svg-icons'
import {getSubreddits} from "./store/actions/subredditsActions";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom'

library.add(
    faAngleUp,
    faAngleDown,
    faCommentAlt,
    faShare,
    faBookmark
);

const {
    WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE
} = constants;

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount () {
        webSocketService().onmessage = message => {
            if (message.data === WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE) {
                this.props.dispatch(getSubreddits());
            }
        }
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
