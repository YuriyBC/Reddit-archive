import React from 'react';
import CommentComponent from './CommentComponent';
import methods from '../../utils/methods'
const { sortComments } = methods;

export default class CommentsSection extends React.Component {
    constructor (props) {
        super(props);
        this.getComments = this.getComments.bind(this);
    }

    getComments () {
        let comments = sortComments([...this.props.comments]);
        if (comments) {
            return comments.map((comment, index) => {
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
