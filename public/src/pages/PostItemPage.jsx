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
  removeComments,
} from '../store/actions/postsActions';

class SubredditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSubreddit: {},
    };
    this.setCurrentSubreddit = this.setCurrentSubreddit.bind(this);
  }

  componentDidMount() {
    const GET_POST_INFO_TIMEOUT = 4000;
    const { match, dispatch } = this.props;
    const { id, postId } = match.params;
    window.scrollTo(0, 0);
    if (match.params) {
      this.setCurrentSubreddit();
      dispatch(getPostComments(id, postId)).then(response => {
        if (!response.comments.length) {
          setTimeout(() => { dispatch(getPostComments(id, postId)) }, 5000)
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

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(removeComments())
  }

  componentDidUpdate() {
    this.setCurrentSubreddit();
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
