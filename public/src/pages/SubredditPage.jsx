import React from 'react';
import '../styles/home.scss'
import HeaderComponent from '../components/HeaderComponent'
import FeedComponent from '../components/Subreddit/FeedComponent'
import SidebarComponent from '../components/Subreddit/SidebarComponent'
import constants from '../utils/constants'
import {getPosts} from '../store/actions/postsActions'
import { connect } from 'react-redux'
import '../styles/subreddit.scss'

const {
} = constants;


class SubredditPage extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    if (this.props.match &&
        this.props.match.params &&
        this.props.match.params.id) {
      const id = this.props.match.params.id;
      this.props.dispatch(getPosts(id));
    }
  }

  render () {
    return <div className="subreddit">
        <HeaderComponent/>
        <div className="subreddit-content">
          <FeedComponent posts={this.props.posts}/>
          <SidebarComponent/>
        </div>
    </div>
  }

}

export default connect((state) => {
  return {
    posts: state.posts
  }
})(SubredditPage)