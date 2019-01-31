import React from 'react';
import { postType } from "../../utils/propTypes";

export default class InnerHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.renderTitle = this.renderTitle.bind(this);
        this.renderImage = this.renderImage.bind(this);
        this.getHeaderStyle = this.getHeaderStyle.bind(this);
    }

    getHeaderStyle() {
        const {
            banner_background_image,
            banner_background_color,
            key_color,
        } = this.props;
        const backgroundImage = banner_background_image;
        const color = banner_background_color || key_color;

        return {
            backgroundColor: color || 'none',
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        };
    }

    renderImage() {
        const { icon_img } = this.props;

        if (!icon_img) {
            return null;
        }

        return (
            <img
                className="subreddit-header__image"
                src={icon_img}
                alt="Subreddit icon"
            />
        )
    }

    renderTitle() {
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
                 style={this.getHeaderStyle()}
            >
                <div className="subreddit-header__inner">
                    {this.renderTitle()}
                    {this.renderImage()}
                </div>
            </div>
        );
    }
}

InnerHeaderComponent.propTypes = postType;
