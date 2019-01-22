import React from 'react';
import HeaderComponent from '../components/HeaderComponent'
import FeedComponent from '../components/PostItem/FeedComponent'
import SidebarComponent from '../components/PostItem/SidebarComponent'
import { connect } from 'react-redux'
import '../styles/post.scss'
import { getPost } from "../store/actions/postsActions";

class SubredditPage extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.match.params) {
      const {id, postId} = this.props.match.params;
      this.props.dispatch(getPost(id, postId));
    }
  }

  render () {
    return <div className="post">
        <HeaderComponent/>
        <div className="subreddit-content post-content">
          <FeedComponent post={this.props.post}/>
          <SidebarComponent/>
        </div>
    </div>
  }

}

export default connect((state) => {
  return {
    post: state.posts.currentPostInfo
  }
})(SubredditPage)