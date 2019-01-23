import React from 'react';
import HeaderComponent from '../components/HeaderComponent'
import FeedComponent from '../components/PostItem/FeedComponent'
import SidebarComponent from '../components/SidebarComponent'
import { connect } from 'react-redux'
import '../styles/post.scss'
import { getPost, getPostComments } from "../store/actions/postsActions";

class SubredditPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentSubreddit: {}
    }
  }

  componentDidMount() {
    if (this.props.match.params) {
      const {id, postId} = this.props.match.params;
      this.props.dispatch(getPost(id, postId));
      this.props.dispatch(getPostComments(id, postId));
    }
  }

  componentDidUpdate () {
    const currentSubreddit = this.props.subreddits.filter(subreddit => subreddit.id === +this.props.match.params.id );
    if (currentSubreddit.length && Object.keys(this.state.currentSubreddit).length === 0) {
      this.setState({
        currentSubreddit: currentSubreddit[0]
      })
    }
  }

  render () {
    return <div className="post">
        <HeaderComponent/>
        <div className="home-content post-content">
          <FeedComponent post={this.props.post}/>
          <SidebarComponent {...this.state.currentSubreddit}/>
        </div>
    </div>
  }

}

export default connect((state) => {
  return {
    post: state.posts.currentPostInfo,
    subreddits: state.subreddits.subreddits
  }
})(SubredditPage)