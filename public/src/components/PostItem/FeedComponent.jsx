import React from 'react';
import PostComponent from "../PostComponent";
import CommentsSection from './CommentsSection'
import spinner from "../../assets/img/spinner.gif";

export default class FeedComponent extends React.Component {
  constructor (props) {
    super(props);
    this.getPost = this.getPost.bind(this);
    this.getCommentsSection = this.getCommentsSection.bind(this);
  }

  getPost () {
    if (this.props.post && this.props.post.data) {
      const post = this.props.post.data;
      return <PostComponent {...post}/>
    }
  }

  getCommentsSection () {
    if (this.props.post && this.props.post.comments && this.props.post.comments.length) {
      return <CommentsSection comments={this.props.post.comments}/>
    } else {
        return <img className="spinner comments-spinner"
                    src={spinner} alt="Spinner"/>
    }
  }

  render () {
    return <div className="subreddit-feed post-feed box">
      <div>
        {this.getPost()}
        {this.getCommentsSection()}
      </div>
    </div>
  }
}
