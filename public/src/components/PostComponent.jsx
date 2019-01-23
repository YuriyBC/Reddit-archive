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
    getDate
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
        if (this.props.selftext !== 'null') {
            return this.props.selftext
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
                <span className="post-content__text">
                    <p>{this.getPostText()}</p>
                    <img src={this.props.thumbnail} alt=""/>
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
