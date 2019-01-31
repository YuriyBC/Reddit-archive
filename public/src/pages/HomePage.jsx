import React from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../components/HeaderComponent';
import FeedComponent from '../components/Home/FeedComponent';
import SidebarComponent from '../components/Home/SidebarComponent';
import '../styles/home.scss';
import { storeSubredditToArchive, setSubreddits } from '../store/actions/subredditsActions';
import { removePosts } from '../store/actions/postsActions';
import PropTypes from "prop-types";
import { errorMessagesType, subredditType } from "../utils/propTypes";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.storeSubredditToArchive = this.storeSubredditToArchive.bind(this);
        this.removePosts = this.removePosts.bind(this);
    }

    storeSubredditToArchive(name) {
        const { dispatch, subreddits } = this.props;
        const activeSubreddit = subreddits.find(subreddit => subreddit.display_name === name);
        if (activeSubreddit) {
            activeSubreddit.isArchived = activeSubreddit.isArchived === 0 ? 1 : 0;
            if (activeSubreddit.isArchived === 1) { activeSubreddit.isLoading = true }
            dispatch(setSubreddits(subreddits));
        }
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

HomePage.propTypes = {
    dispatch: PropTypes.func,
    subreddits: PropTypes.arrayOf(PropTypes.shape(subredditType)),
    errorMessages: errorMessagesType,
};
