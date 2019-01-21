import React from 'react';
import HeaderComponent from '../components/HeaderComponent'
import FeedComponent from '../components/Home/FeedComponent'
import SidebarComponent from '../components/Home/SidebarComponent'
import { connect } from 'react-redux'
import '../styles/home.scss'

import {
  storeSubredditToArchive
} from '../store/actions/subredditsActions'

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.storeSubredditToArchive = this.storeSubredditToArchive.bind(this);
  }

  storeSubredditToArchive (name) {
    this.props.dispatch(storeSubredditToArchive(name));
  }

  render () {
    return <div className="home">
      <HeaderComponent/>
      <div className="home-content">
        <FeedComponent/>
        <SidebarComponent storeSubredditToArchive={this.storeSubredditToArchive}
                          errorMessages={this.props.errorMessages}
                          subreddits={this.props.subreddits}/>
      </div>
    </div>
  }

}

export default connect((state) => {
  return {
    subreddits: state.subreddits.subreddits,
    errorMessages: state.subreddits.errorMessages
  }
})(HomePage)