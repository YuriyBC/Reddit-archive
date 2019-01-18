import React from 'react';
import PostComponent from './PostComponent'

export default class FeedComponent extends React.Component {
  constructor (props) {
    super(props);
    this.getPostList = this.getPostList.bind(this);
  }

  getPostList () {
    return [...this.props.posts].map((post, index) => {
      return <PostComponent {...post}
                            key={index}/>
    })
  }

  render () {
    return <div className="subreddit-feed box">
      {this.getPostList()}
    </div>
  }

}
