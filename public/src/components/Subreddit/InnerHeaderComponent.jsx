import React from 'react';
export default class InnerHeaderComponent extends React.Component {
    constructor (props) {
        super(props);
        this.getHeaderStyle = this.getHeaderStyle.bind(this);
        this.getImage = this.getImage.bind(this);
        this.getTitle = this.getTitle.bind(this);
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
                    style={this.getHeaderStyle()}>
            <div className="subreddit-header__inner">
                {this.getTitle()}
                {this.getImage()}
            </div>
        </div>
    }

}
