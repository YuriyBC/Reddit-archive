import React from 'react';
import { Link } from 'react-router-dom';
import PostComponent from '../PostComponent';
import constants from '../../utils/constants';
import { postType } from "../../utils/propTypes";
import PropTypes from "prop-types";

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
        .map(post => (
            <Link key={post.id} to={`/subreddit/${post.subreddit_id}/${post.reddit_id}`}>
                <PostComponent {...post} />
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

FeedComponent.propTypes = {
    post: PropTypes.shape(postType),
    currentPostsStep: PropTypes.number,
};
