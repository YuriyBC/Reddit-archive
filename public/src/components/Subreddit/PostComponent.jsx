import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAngleUp,
    faAngleDown,
    faCommentAlt,
    faShare,
    faBookmark,
    faStar
} from "@fortawesome/free-solid-svg-icons";

export default class PostComponent extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        console.log(this.props)
        return <div className="post box default_type">
            <div className="post-rating">
                <div className="post-rating__content">
                    <FontAwesomeIcon icon={faAngleUp} />
                    <div>{this.props.score}</div>
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
            </div>
            <div className="post-content">
                <small className="post-content__author">Posted byu/{this.props.author_fullname} 1 day ago</small>
                <h2 className="post-content__title">WTF Wednesday (January 16, 2019)</h2>
                <span className="post-content__text">
                    <p>Post a link to a GitHub repo that you would like to have reviewed, and brace yourself for the comments! Whether you're a junior wanting your code sharpened or a senior interested in giving some feedback and have some time to spare, this is the place.</p>
                </span>
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
