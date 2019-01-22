import React from 'react';
import PostComponent from '../PostComponent'
import constants from '../../utils/constants'
import {Link} from "react-router-dom";

const {
  POSTS_TO_SHOW
} = constants;

export default class FeedComponent extends React.Component {
  constructor (props) {
    super(props);
    this.subredditFeed = React.createRef();
    this.getPostList = this.getPostList.bind(this);
    this.getLoadingStyle = this.getLoadingStyle.bind(this);
  }

  getLoadingStyle () {
    if (this.subredditFeed && this.subredditFeed.current) {
      return {
        display: 'none'
      }
    }
  }

  getPostList () {
    return [...this.props.posts]
        .slice(0, POSTS_TO_SHOW * this.props.currentPostsStep)
        .map((post, index) => {
          return <Link key={index} to={`/subreddit/${post.subreddit_id}/${post.reddit_id}`}>
                    <PostComponent {...post}
                                   key={index}/>
                </Link>
    })
  }

  render () {
    return <div ref={this.subredditFeed}
                className="subreddit-feed box">
      {this.getPostList()}
      <span style={this.getLoadingStyle()}>...Loading</span>
    </div>
  }

}
