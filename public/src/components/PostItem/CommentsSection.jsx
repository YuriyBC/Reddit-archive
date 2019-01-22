import React from 'react';
import CommentComponent from './CommentComponent';

export default class CommentsSection extends React.Component {
    constructor (props) {
        super(props);
        this.getComments = this.getComments.bind(this);
    }

    getComments () {
        if (this.props.comments) {
            return this.props.comments.map((comment, index) => {
                if (comment.body !== 'null') {
                    return <CommentComponent key={index} {...comment} />
                }
            });
        }
    }

    render () {
        return <div className="comments-section box">
            {this.getComments()}
        </div>
    }
}
