import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import methods from '../../utils/methods';
import {
    faAngleUp,
    faAngleDown,
    faCommentAlt
} from "@fortawesome/free-solid-svg-icons";
const {
    getDate,
    reformatTextToHtml
} = methods;


export default class CommentsComponent extends React.Component {
    constructor (props) {
        super(props);
        this.calculateDate = this.calculateDate.bind(this);
        this.getCommentClassName = this.getCommentClassName.bind(this);
        this.getOffsetLines = this.getOffsetLines.bind(this);
    }

    calculateDate () {
        if (this.props.created && this.props.created !== 'null') {
            return getDate(this.props.created)
        }
    }

    getCommentMessageHtml () {
        let message = this.props.body;
        return reformatTextToHtml(message);
    }
    

    getOffsetLines () {
        let elementsToReturn = [];
        for (let i = 0; i < this.props.depth; i++) {
            let element = <div key={i} className="offsetLine"/>;
            elementsToReturn.push(element)
        }
        return elementsToReturn;
    }

    getCommentClassName () {
        return this.props.depth === 'null' ? 'parent' : 'child';
    }

    render () {
        return <div className={'comment ' + this.getCommentClassName()}>
            {this.getOffsetLines()}
            <div className="comment-rating">
                <div className="comment-rating__body">
                    <FontAwesomeIcon icon={faAngleUp} />
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
            </div>
            <div className="comment-body">
                <div className="comment-body__info">
                    <span>{this.props.author}</span>
                    <span>{this.props.score} points</span>
                    <span>{this.calculateDate()}</span>
                </div>
                <div className="comment-body__text"
                     dangerouslySetInnerHTML={{ __html: this.getCommentMessageHtml.call(this) }}>
                </div>
                <div className="comment-body__navigation">
                    <span>
                        <FontAwesomeIcon icon={faCommentAlt} />
                        Reply
                    </span>
                    <span>Share</span>
                    <span>Report</span>
                    <span>Save</span>
                    <span>Give Award</span>
                </div>
            </div>
        </div>
    }
}
