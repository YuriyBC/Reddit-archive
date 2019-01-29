import React from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../components/HeaderComponent';
import FeedComponent from '../components/Home/FeedComponent';
import SidebarComponent from '../components/Home/SidebarComponent';
import '../styles/home.scss';
import { storeSubredditToArchive } from '../store/actions/subredditsActions';
import { removePosts } from '../store/actions/postsActions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.storeSubredditToArchive = this.storeSubredditToArchive.bind(this);
        this.removePosts = this.removePosts.bind(this);
    }

    storeSubredditToArchive(name) {
        const { dispatch } = this.props;
        dispatch(storeSubredditToArchive(name));
    }

    removePosts() {
        const { dispatch } = this.props;
        dispatch(removePosts());
    }

    render() {
        const { errorMessages, subreddits } = this.props;
        return (
            <div className="home">
                <HeaderComponent />
                <div className="home-content">
                    <FeedComponent />
                    <SidebarComponent storeSubredditToArchive={this.storeSubredditToArchive}
                                      removePosts={this.removePosts}
                                      errorMessages={errorMessages}
                                      subreddits={subreddits}
                    />
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    subreddits: state.subreddits.subreddits,
    errorMessages: state.subreddits.errorMessages,
}))(HomePage);
