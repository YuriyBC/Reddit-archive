import React from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../components/HeaderComponent';
import FeedComponent from '../components/PostItem/FeedComponent';
import SidebarComponent from '../components/SidebarComponent';
import '../styles/post.scss';
import {
  getPost,
  getPostComments,
  getPostFromLocalStorage,
} from '../store/actions/postsActions';

class SubredditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSubreddit: {},
    };
  }

  componentDidMount() {
    const { match, subreddits, dispatch } = this.props;
    const { id, postId } = match.params;
    const { currentSubreddit } = this.state;
    if (match.params) {
      const subreddit = subreddits.filter(item => item.id === +match.params.id );

      if (subreddit.length && Object.keys(currentSubreddit).length === 0) {
        this.setState({
          currentSubreddit: subreddit[0],
        });
      }
      dispatch(getPostFromLocalStorage(id, postId));
      dispatch(getPost(id, postId));
      dispatch(getPostComments(id, postId));
    }
  }

  componentDidUpdate() {
    const { match, subreddits } = this.props;
    const { currentSubreddit } = this.state;
    const subreddit = subreddits.filter(item => item.id === +match.params.id );
    if (subreddit.length && Object.keys(currentSubreddit).length === 0) {
      this.setState({
        currentSubreddit: subreddit[0],
      });
    }
  }

  render() {
    const { post } = this.props;
    const { currentSubreddit } = this.state;
    return (
        <div className="post">
          <HeaderComponent />
          <div className="home-content post-content">
            <FeedComponent post={post} />
            <SidebarComponent {...currentSubreddit} />
          </div>
        </div>
    );
  }
}

export default connect(state => ({
    post: state.posts.currentPostInfo,
    subreddits: state.subreddits.subreddits,
}))(SubredditPage);
