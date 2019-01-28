import React from 'react';

export default class InnerHeaderComponent extends React.Component {
    constructor (props) {
        super(props);
    }

    getHeaderStyle () {
        return this.props.key_color ? {'backgroundColor': this.props.key_color} : null;
    }

    getImage () {
        if (this.props.icon_img) {
            return <img className="subreddit-header__image"
                        src={this.props.icon_img}
                        alt="Subreddit icon"/>
        }
    }

    getTitle () {
        return <div className="subreddit-header__title">
            {this.props.display_name_prefixed ? this.props.display_name_prefixed : null}
        </div>
    }

    render () {
        return <div className="subreddit-header"
                    style={this.getHeaderStyle.call(this)}>
            <div className="subreddit-header__inner">
                {this.getTitle.call(this)}
                {this.getImage.call(this)}
            </div>
        </div>
    }

}
