import React from 'react';

export default class SidebarComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }


  render () {
    return <div className="home-sidebar box">
      {this.props.currentSubreddit.display_name}
    </div>
  }

}
