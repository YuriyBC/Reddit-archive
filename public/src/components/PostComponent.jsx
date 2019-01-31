import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import constants from '../utils/constants';
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
const { REDDIT_THUMBNAIL_STATE } = constants;

export default class PostComponent extends React.Component {
    constructor(props) {
        super(props);
        this.calculateDate = this.calculateDate.bind(this);
        this.renderPostImage = this.renderPostImage.bind(this);
        this.getPostTextHtml = this.getPostTextHtml.bind(this);
    }

    renderPostImage() {
        const { thumbnail, thumbnail_height, thumbnail_width } = this.props;
        const { SELF, NULL, SPOILER } = REDDIT_THUMBNAIL_STATE;

        if (!thumbnail || thumbnail === NULL || thumbnail === SELF || thumbnail === SPOILER) {
            return null
        }

        return (
            <img width={thumbnail_width}
                 height={thumbnail_height}
                 src={thumbnail}
                 alt="PostImage"
            />
        );
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
                        <p dangerouslySetInnerHTML={{ __html: this.getPostTextHtml() }} />
                        {this.renderPostImage()}
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
