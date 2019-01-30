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
    this.setCurrentSubreddit = this.setCurrentSubreddit.bind(this);
    this.getComments = this.getComments.bind(this);
  }

  componentDidMount() {
    const GET_POST_INFO_TIMEOUT = 4000;
    const { match, dispatch } = this.props;
    const { id, postId } = match.params;
    window.scrollTo(0, 0);
    if (match.params) {
      this.setCurrentSubreddit();
      this.getComments(id, postId);
      dispatch(getPostFromLocalStorage(id, postId));
      setTimeout(() => {
        const { post } = this.props;
        if (!Object.keys(post).length) {
            dispatch(getPost(id, postId));
        }
      }, GET_POST_INFO_TIMEOUT);
    }
  }

  componentDidUpdate() {
    this.setCurrentSubreddit();
  }

  getComments(id, postId) {
    let iteration = 0;
    const { dispatch, comments } = this.props;

    dispatch(getPostComments(id, postId));
    const interval = setInterval(() => {
      if (!comments.length) dispatch(getPostComments(id, postId));
      if (comments) {
        if (iteration > 15 || comments.length) clearInterval(interval);
      }
      iteration += 1;
    }, 5000);
  }

  setCurrentSubreddit() {
    const { match, subreddits } = this.props;
    const { currentSubreddit } = this.state;
    const subreddit = subreddits.filter(item => item.id === +match.params.id);
    if (subreddit.length && Object.keys(currentSubreddit).length === 0) {
      this.setState({
        currentSubreddit: subreddit[0],
      });
    }
  }

  render() {
    const { post, comments } = this.props;
    const { currentSubreddit } = this.state;
    return (
        <div className="post">
          <HeaderComponent />
          <div className="home-content post-content">
            <FeedComponent comments={comments}
                           post={post} />
            <SidebarComponent {...currentSubreddit} />
          </div>
        </div>
    );
  }
}

export default connect(state => ({
    post: state.posts.currentPost,
    comments: state.posts.currentComments,
    subreddits: state.subreddits.subreddits,
}))(SubredditPage);
