import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import methods from '../utils/methods';
import {
    faAngleUp,
    faAngleDown,
    faCommentAlt,
    faShare,
    faBookmark,
    faStar
} from "@fortawesome/free-solid-svg-icons";
const {
    getDate,
    getLinksFromString
} = methods;

export default class PostComponent extends React.Component {
    constructor (props) {
        super(props);
        this.getPostText = this.getPostText.bind(this);
        this.calculateDate = this.calculateDate.bind(this);
    }

    calculateDate () {
        if (this.props.created) {
            return getDate(this.props.created)
        }
    }

    getPostText () {
        const {thumbnail, thumbnail_height, thumbnail_width, selftext} = this.props;
        const imageWidth = thumbnail_width !== 'null' ? +thumbnail_width : 'auto';
        const imageHeight = thumbnail_height !== 'null' ? +thumbnail_height : 'auto';

        let text = selftext !== 'null' ? <p>{selftext}</p> : null;
        let image = thumbnail !== 'null' ?
            <img width={imageWidth}
                 height={imageHeight}
                 src={thumbnail}
                 alt="PostImage"/>
            : null;
        if (text || image) {
            return  <span className="post-content__text">
                            {text}
                            {image}
                     </span>
        }
    }

    render () {
        return <div className="post box default_type">
            <div className="post-rating">
                <div className="post-rating__content">
                    <FontAwesomeIcon icon={faAngleUp} />
                    <div>{this.props.score}</div>
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
            </div>
            <div className="post-content">
                <small className="post-content__author">Posted by/{this.props.author_fullname}  at  {this.calculateDate()}</small>
                <h2 className="post-content__title">{this.props.title}</h2>
                {this.getPostText()}
                <div className="post-content__bottom">
                    <div>
                        <FontAwesomeIcon icon={faCommentAlt} />
                        <span>{this.props.num_comments} Comments</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faShare} />
                        <span>Share</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBookmark} />
                        <span>Save</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faStar} />
                        <span>Give Award</span>
                    </div>
                    <div>...</div>
                </div>
            </div>
        </div>
    }
}
