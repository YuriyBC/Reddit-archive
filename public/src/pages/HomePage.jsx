import React from 'react';
import HeaderComponent from '../components/HeaderComponent'
import FeedComponent from '../components/Home/FeedComponent'
import SidebarComponent from '../components/Home/SidebarComponent'
import { connect } from 'react-redux'
import {webSocketService} from '../utils/websocketService'
import '../styles/home.scss'

import {
  getSubreddits,
  storeSubredditToArchive
} from '../store/actions/subredditsActions'
import constants from '../utils/constants'

const {
  WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE
} = constants;


class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.storeSubredditToArchive = this.storeSubredditToArchive.bind(this);
  }

  componentDidMount () {
    webSocketService().onmessage = message => {
      if (message.data === WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE) {
        this.props.dispatch(getSubreddits());
      }
    }
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