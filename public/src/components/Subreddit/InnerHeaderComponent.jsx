import React from 'react';

export default class InnerHeaderComponent extends React.Component {
    getHeaderStyle() {
        const {
            banner_background_image,
            banner_background_color,
            key_color,
        } = this.props;
        const backgroundImage = banner_background_image;
        const colorBackground = banner_background_color;
        const colorMain = key_color;
        const color = colorBackground || colorMain;

        return {
            backgroundColor: color || 'none',
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        };
    }

    getImage() {
        const { icon_img } = this.props;
        return icon_img
            ? (
                <img className="subreddit-header__image"
                     src={icon_img}
                     alt="Subreddit icon"
                />
            )
            : null;
    }

    getTitle() {
        const { display_name_prefixed } = this.props;
        return (
            <div className="subreddit-header__title">
                {display_name_prefixed || null}
            </div>
        );
    }

    render() {
        return (
            <div className="subreddit-header"
                 style={this.getHeaderStyle.call(this)}
            >
                <div className="subreddit-header__inner">
                    {this.getTitle.call(this)}
                    {this.getImage.call(this)}
                </div>
            </div>
        );
    }
}
