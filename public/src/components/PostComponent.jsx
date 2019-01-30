import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleUp,
    faAngleDown,
    faCommentAlt,
    faShare,
    faBookmark,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import methods from '../utils/methods';

const {
    getDate,
    reformatTextToHtml,
} = methods;

export default class PostComponent extends React.Component {
    constructor(props) {
        super(props);
        this.calculateDate = this.calculateDate.bind(this);
    }

    getPostImage() {
        const { thumbnail, thumbnail_height, thumbnail_width } = this.props;
        const imageWidth = thumbnail_width !== 'null' ? +thumbnail_width : 'auto';
        const imageHeight = thumbnail_height !== 'null' ? +thumbnail_height : 'auto';

        return thumbnail && thumbnail !== 'null' && thumbnail !== 'self'
            ? (
                <img width={imageWidth}
                     height={imageHeight}
                     src={thumbnail}
                     alt="PostImage"
                />
            )
            : null;
    }

    getPostTextHtml() {
        const { selftext } = this.props;
        return selftext !== 'null' ? reformatTextToHtml(selftext) : null;
    }

    calculateDate() {
        const { created } = this.props;
        return created ? getDate(created) : null;
    }

    render() {
        const {
            score,
            author_fullname,
            title,
            num_comments,
        } = this.props;
        return (
            <div className="post box default_type">
                <div className="post-rating">
                    <div className="post-rating__content">
                        <FontAwesomeIcon icon={faAngleUp} />
                        <div>{score}</div>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                </div>
                <div className="post-content">
                    <small className="post-content__author">
                        Posted by/
                        {author_fullname}
                        at
                        {this.calculateDate()}
                    </small>
                    <h2 className="post-content__title">
                        {title}
                    </h2>
                    <span className="post-content__text">
                        <p dangerouslySetInnerHTML={{ __html: this.getPostTextHtml.call(this) }} />
                        {this.getPostImage.call(this)}
                    </span>
                    <div className="post-content__bottom">
                        <div>
                            <FontAwesomeIcon icon={faCommentAlt} />
                            <span>
                                {num_comments} Comments
                            </span>
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
        );
    }
}
