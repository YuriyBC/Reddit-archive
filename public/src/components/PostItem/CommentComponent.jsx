import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleUp,
    faAngleDown,
    faCommentAlt,
} from '@fortawesome/free-solid-svg-icons';
import methods from '../../utils/methods';

const {
    getDate,
    reformatTextToHtml,
} = methods;

export default class CommentsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.calculateDate = this.calculateDate.bind(this);
        this.getCommentClassName = this.getCommentClassName.bind(this);
        this.getOffsetLines = this.getOffsetLines.bind(this);
        this.renderCommentMessageHtml = this.renderCommentMessageHtml.bind(this);
    }

    renderCommentMessageHtml() {
        const { body } = this.props;
        return (
            <div className="comment-body__text"
                 dangerouslySetInnerHTML={{ __html: reformatTextToHtml(body) }}
            />
        );
    }

    getOffsetLines() {
        const { depth } = this.props;
        return Array.from({ length: depth}, (value, i) => (
            <div key={i} className="offsetLine" />
        ));
    }

    getCommentClassName() {
        const { depth } = this.props;
        return depth === 'null' || depth === '0'  ? 'parent' : 'child';
    }

    calculateDate() {
        const { created } = this.props;
        return created && created !== 'null' ? getDate(created) : null;
    }

    render() {
        const { author, score } = this.props;
        return (
            <div className={`comment ${this.getCommentClassName()}`}>
                {this.getOffsetLines()}
                <div className="comment-rating">
                    <div className="comment-rating__body">
                        <FontAwesomeIcon icon={faAngleUp} />
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                </div>
                <div className="comment-body">
                    <div className="comment-body__info">
                        <span>
                            {author}
                        </span>
                        <span>
                            {score} points
                        </span>
                        <span>
                            {this.calculateDate()}
                        </span>
                    </div>
                    {this.renderCommentMessageHtml()}
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
        );
    }
}
