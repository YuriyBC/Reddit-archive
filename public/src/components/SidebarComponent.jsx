import React from 'react';

export default class SidebarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getColor = this.getColor.bind(this);
        this.renderSubredditInfo = this.renderSubredditInfo.bind(this);
        this.renderSubscribers = this.renderSubscribers.bind(this);
    }

    getColor() {
        const { key_color } = this.props;
        return {
            backgroundColor: key_color || 'black',
        };
    }

    renderSubredditInfo() {
        const { icon_img, display_name_prefixed } = this.props;
        return icon_img && display_name_prefixed
            ? (
                <div className="sidebar-info">
                    <img src={icon_img} alt="" />
                    <span>{display_name_prefixed}</span>
                </div>
            )
            : null;
    }

    renderSubscribers() {
        const { subscribers } = this.props;
        return subscribers
            ? (
                <div className="subreddit-sidebar__subscribers">
                    <b>{subscribers}</b>
                    <span>Subscribers</span>
                </div>
            )
            : null;
    }

    render() {
        const { public_description } = this.props;
        return (
            <div className="home-sidebar subreddit-sidebar box">
                <span className="sidebar-header"
                      style={this.getColor()}
                >
                    COMMUNITY DETAILS
                </span>
                <div className="subreddit-sidebar__body">
                    {this.renderSubredditInfo()}
                    {this.renderSubscribers()}
                    <div className="subreddit-sidebar__description">
                        {public_description}
                    </div>
                </div>
            </div>
        );
    }
}
