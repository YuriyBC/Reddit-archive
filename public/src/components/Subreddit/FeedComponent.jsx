import React from 'react';
import { Link } from 'react-router-dom';
import PostComponent from '../PostComponent';
import constants from '../../utils/constants';

const { POSTS_TO_SHOW } = constants;

export default class FeedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.subredditFeed = React.createRef();
    this.renderPostList = this.renderPostList.bind(this);
  }

  renderPostList() {
    const { posts, currentPostsStep } = this.props;
    return [...posts]
        .slice(0, POSTS_TO_SHOW * currentPostsStep)
        .map((post, index) => (
            <Link key={index} to={`/subreddit/${post.subreddit_id}/${post.reddit_id}`}>
                <PostComponent{...post}
                              key={index}
                />
            </Link>
            ));
  }

  render() {
    return (
        <div ref={this.subredditFeed}
             className="subreddit-feed box"
        >
          {this.renderPostList()}
        </div>
    );
  }
}
