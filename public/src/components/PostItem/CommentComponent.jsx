import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import methods from '../../utils/methods';
import {
    faAngleUp,
    faAngleDown,
    faCommentAlt
} from "@fortawesome/free-solid-svg-icons";
const {
    getDate
} = methods;


function removeLinksFromText (message) {
    let text = message.slice(message.indexOf('['), message.indexOf(']') + 1);
    let link = message.slice(message.indexOf('('), message.indexOf(')') + 1);
    message = message.replace(text, '');
    message = message.replace(link, '');

    return message
}

function getLinksFromText (message) {
    let lastIndex = 0;
    let links = [];

    function storeLink (message, index) {
        let text = message.slice(message.indexOf('[', index) + 1, message.indexOf(']', index));
        let link = message.slice(message.indexOf('(', index) + 1, message.indexOf(')', index));
        lastIndex = message.indexOf(link);
        links.push(<a key={lastIndex} href={link}>{text}</a>);
    }

    storeLink(message, lastIndex)

    return links
}

export default class CommentsComponent extends React.Component {
    constructor (props) {
        super(props);
        this.calculateDate = this.calculateDate.bind(this);
        this.getCommentClassName = this.getCommentClassName.bind(this);
        this.getOffsetLines = this.getOffsetLines.bind(this);
        this.getCommentMessageText = this.getCommentMessageText.bind(this);
        this.getCommentMessageLinks = this.getCommentMessageLinks.bind(this);
    }

    calculateDate () {
        if (this.props.created && this.props.created !== 'null') {
            return getDate(this.props.created)
        }
    }

    getCommentMessageText () {
        let message = this.props.body;
        if (message) {
            while (message.indexOf('[') > -1) {
                message = removeLinksFromText(message)
            }
        }
        return message
    }

    getCommentMessageLinks () {
        let message = this.props.body;
        if (message) {
            if (message.indexOf('[') > -1) {
                return getLinksFromText(message)
            }
        }
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
                <div className="comment-body__text">
                    {this.getCommentMessageText()}
                    {this.getCommentMessageLinks()}
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
