import React from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../components/HeaderComponent';
import FeedComponent from '../components/Subreddit/FeedComponent';
import SidebarComponent from '../components/SidebarComponent';
import InnerHeaderComponent from '../components/Subreddit/InnerHeaderComponent';
import NavigationBar from '../components/Subreddit/NavigationBar';
import { getPosts, setPostsFromLocalStorage } from '../store/actions/postsActions';
import '../styles/subreddit.scss';
import methods from '../utils/methods';
import spinner from '../assets/img/spinner.gif';

const { throttle } = methods;

class SubredditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollStep: 1,
            currentSubreddit: {},
            currentSortingId: 0,
        };
        this.containerScrollHandler = this.containerScrollHandler.bind(this);
        this.increaseScrollStep = this.increaseScrollStep.bind(this);
        this.changeSorting = this.changeSorting.bind(this);
        this.isDataLoaded = this.isDataLoaded.bind(this);
        this.setCurrentSubreddit = this.setCurrentSubreddit.bind(this);
    }

    componentDidMount() {
        const { match, dispatch } = this.props;
        const { params } = match;
        const { id } = params;
        if (match && params && id) {
            dispatch(setPostsFromLocalStorage(id));
            dispatch(getPosts(id)).catch(() => {
                setTimeout(() => {
                    dispatch(getPosts(id))
                }, 4000)
            })
        }
        window.addEventListener('scroll', this.containerScrollHandler);
        this.setCurrentSubreddit();
    }

    componentDidUpdate() {
        this.setCurrentSubreddit();
    }

    getSpinnerStyle() {
        return this.isDataLoaded()
            ? {
                display: 'none',
            }
            : null;
    }

    setCurrentSubreddit() {
        const { subreddits, match } = this.props;
        const { currentSubreddit } = this.state;
        const subreddit = subreddits.find(item => item.id === +match.params.id);
        if (subreddit && Object.keys(currentSubreddit).length === 0) {
            this.setState({
                currentSubreddit: subreddit,
            });
        }
    }

    getSortedPosts() {
        const { posts } = this.props;
        const { currentSortingId } = this.state;
        if (currentSortingId === 0) {
            return [...posts].sort((currentItem, nextItem) => (
                currentItem.sorting - nextItem.sorting
            ));
        }
        if (currentSortingId === 1) {
            return [...posts].sort((currentItem, nextItem) => (
                +nextItem.created - +currentItem.created
            ));
        }
        if (currentSortingId === 2) {
            return [...posts].sort((currentItem, nextItem) => (
                +nextItem.score - +currentItem.score
            ));
        }
        return [...posts];
    }

    getSidebar() {
        const { currentSubreddit } = this.state;
        return Object.keys(currentSubreddit).length
            ? <SidebarComponent {...currentSubreddit} />
            : null;
    }

    getFeedComponent() {
        const { scrollStep } = this.state;
        const posts = this.getSortedPosts.call(this);
        return (
            <FeedComponent currentPostsStep={scrollStep}
                           posts={posts}
            />
        );
    }

    isDataLoaded() {
        const { currentSubreddit } = this.state;
        const { posts } = this.props;
        return Object.keys(currentSubreddit).length && posts.length;
    }

    containerScrollHandler() {
        const throttleScrollingTime = 1000;
        const offsetBottom = 400;

        if ((window.innerHeight + window.scrollY + offsetBottom) >= document.body.offsetHeight) {
            throttle(this.increaseScrollStep(), throttleScrollingTime);
        }
    }

    increaseScrollStep() {
        const { state } = this;
        const newState = { ...state };

        newState.scrollStep += newState.scrollStep;
        this.setState(newState);
    }

    changeSorting(id) {
        this.setState({
            currentSortingId: id,
        });
    }

    render() {
        const { currentSubreddit, currentSortingId } = this.state;
        return (
            <div className="subreddit"
                 onScroll={this.containerScrollHandler}
            >
                <HeaderComponent />
                <div className="subreddit-content">
                    <InnerHeaderComponent {...currentSubreddit} />
                    <NavigationBar changeSorting={this.changeSorting}
                                   isDataLoaded={this.isDataLoaded}
                                   currentSortingId={currentSortingId}
                    />
                    <div className="subreddit-content__wrapper">
                        {this.getFeedComponent.call(this)}
                        {this.getSidebar.call(this)}
                        <img style={this.getSpinnerStyle.call(this)}
                             className="spinner subreddit-spinner"
                             src={spinner}
                             alt="Spinner"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    posts: state.posts.allPosts,
    subreddits: state.subreddits.subreddits,
}))(SubredditPage);
