import React from 'react';
import PostComponent from "../PostComponent";
import CommentsSection from './CommentsSection'

export default class FeedComponent extends React.Component {
  constructor (props) {
    super(props);
    this.getPost = this.getPost.bind(this);
    this.getLoadingStyle = this.getLoadingStyle.bind(this);
    this.getCommentsSection = this.getCommentsSection.bind(this);
  }

  getPost () {
    if (this.props.post && this.props.post.data) {
      const post = this.props.post.data;
      return <PostComponent {...post}/>
    }
  }

  getCommentsSection () {
    if (this.props.post && this.props.post.comments) {
      return <CommentsSection comments={this.props.post.comments}/>
    }
  }

  getLoadingStyle () {
    if (this.props.post && this.props.post.data) {
      return { display: 'none' }
    }
  }

  render () {
    return <div className="subreddit-feed post-feed box">
      {this.getPost()}
      {this.getCommentsSection()}
      <span style={this.getLoadingStyle()}>...Loading</span>
    </div>
  }
}
