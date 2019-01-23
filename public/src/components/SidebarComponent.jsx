import React from 'react';

export default class SidebarComponent extends React.Component {
  constructor (props) {
    super(props);
    this.getColor = this.getColor.bind(this);
    this.getSubredditInfo = this.getSubredditInfo.bind(this);
    this.getSubscribers = this.getSubscribers.bind(this);
  }

  getColor () {
    return {'backgroundColor': this.props.key_color ? this.props.key_color: 'black'};
  }

  getSubredditInfo () {
    if (this.props.icon_img && this.props.display_name_prefixed) {
      return <div className="sidebar-info">
        <img src={this.props.icon_img} alt=""/>
        <span>{this.props.display_name_prefixed}</span>
      </div>
    }
  }

  getSubscribers () {
    if (this.props.subscribers) {
      return <div className="subreddit-sidebar__subscribers">
        <b>{this.props.subscribers}</b>
        <span>Subscribers</span>
      </div>
    }
  }

  render () {
    return <div className="home-sidebar subreddit-sidebar box">
          <span className="sidebar-header" style={this.getColor()}>
            COMMUNITY DETAILS
          </span>
          <div className="subreddit-sidebar__body">
              {this.getSubredditInfo()}
              {this.getSubscribers()}
              <div className="subreddit-sidebar__description">
                {this.props.public_description}
              </div>
          </div>
    </div>
  }

}
