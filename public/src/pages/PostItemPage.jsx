import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent';
import FeedComponent from '../components/PostItem/FeedComponent';
import SidebarComponent from '../components/SidebarComponent';
import '../styles/post.scss';
import {
  getPost,
  getPostComments,
  getPostFromLocalStorage,
  removeComments,
} from '../store/actions/postsActions';
import { commentType, postType, subredditType } from '../utils/propTypes';

class SubredditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSubreddit: {},
    };
    this.setCurrentSubreddit = this.setCurrentSubreddit.bind(this);
    this.cancelToken = axios.CancelToken.source();
  }

  componentDidMount() {
    const GET_POST_INFO_TIMEOUT = 4000;
    const { cancelToken } = this;
    const { match, dispatch } = this.props;
    const { id, postId } = match.params;
    window.scrollTo(0, 0);
    if (match.params) {
      this.setCurrentSubreddit();
      dispatch(getPostComments(id, postId, cancelToken)).then((response) => {
        if (!response.comments.length) {
          setTimeout(() => { dispatch(getPostComments(id, postId, cancelToken)); }, 5000);
        }
      });
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

  componentWillUnmount() {
    const { dispatch } = this.props;
    const { cancelToken } = this;
    cancelToken.cancel('abort request by frontend');
    dispatch(removeComments());
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
                               post={post}
                />
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

SubredditPage.propTypes = {
  post: PropTypes.shape(postType).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentType)).isRequired,
  subreddits: PropTypes.arrayOf(PropTypes.shape(subredditType)).isRequired,
};
