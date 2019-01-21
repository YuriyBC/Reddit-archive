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
        this.getText = this.getText.bind(this);
        this.getDate = this.getDate.bind(this);
    }

    getText () {
        if (this.props.selftext !== 'null') {
            return this.props.selftext
        }
    }

    getDate () {
        if (this.props.created) {
            let date = new Date(+this.props.created * 1000);
            let month = date.getUTCMonth() + 1; //months from 1-12
            let day = date.getUTCDate();
            let year = date.getUTCFullYear();

            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let seconds = "0" + date.getSeconds();
            return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)} ${day}/${month}/${year}`;
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
                <small className="post-content__author">Posted by/{this.props.author_fullname}  at  {this.getDate()}</small>
                <h2 className="post-content__title">{this.props.title}</h2>
                <span className="post-content__text">
                    <p>{this.getText()}</p>
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
