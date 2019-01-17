import React from 'react';
import HeaderComponent from '../components/Home/HeaderComponent'
import FeedComponent from '../components/FeedComponent'
import SidebarComponent from '../components/SidebarComponent'
import '../styles/home.scss'
import { connect } from 'react-redux'
import {webSocketService} from '../utils/websocketService'
import {
  getSubreddits,
  storeOldSubredditToArchive,
  storeNewSubredditToArchive
} from '../store/actions'
import constants from '../utils/constants'

const {
  WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE
} = constants;


class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.storeOldSubredditToArchive = this.storeOldSubredditToArchive.bind(this);
    this.storeNewSubredditToArchive = this.storeNewSubredditToArchive.bind(this);
  }

  componentDidMount () {
    webSocketService().onmessage = message => {
      if (message.data === WEBSOCKET_AVAILABLE_SUBREDDITS_MESSAGE) {
        this.props.dispatch(getSubreddits());
      }
    }
  }

  storeNewSubredditToArchive (name) {
    this.props.dispatch(storeNewSubredditToArchive(name));
  }

  storeOldSubredditToArchive (id) {
    this.props.dispatch(storeOldSubredditToArchive(id));
  }

  render () {
    return <div className="home">
      <HeaderComponent/>
      <div className="home-content">
        <FeedComponent/>
        <SidebarComponent storeOldSubredditToArchive={this.storeOldSubredditToArchive}
                          storeNewSubredditToArchive={this.storeNewSubredditToArchive}
                          subreddits={this.props.subreddits}/>
      </div>
    </div>
  }

}

export default connect((state) => {
  return {
    subreddits: state.subreddits
  }
})(HomePage)