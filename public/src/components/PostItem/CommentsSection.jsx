import React from 'react';
import CommentComponent from './CommentComponent';
import methods from '../../utils/methods'
const { sortComments } = methods;

export default class CommentsSection extends React.Component {
    constructor (props) {
        super(props);
        this.commentToShowStep = 20;
        this.getComments = this.getComments.bind(this);
        this.showMoreComments = this.showMoreComments.bind(this);
        this.state = {
            commentsToShow: this.commentToShowStep
        }
    }

    getComments () {
        let comments = sortComments([...this.props.comments]);
        comments = comments.slice(0, this.state.commentsToShow);

        if (comments) {
            return comments.map((comment, index) => {
                if (comment.body !== 'null') {
                    return <CommentComponent key={index} {...comment} />
                }
            });
        }
    }

    getLoadMoreButtonStyle () {
        return {
            'display': this.state.commentsToShow < this.props.comments.length ? 'block' : 'none'
        }
    }

    showMoreComments () {
        this.setState({
            commentsToShow: this.state.commentsToShow + this.commentToShowStep
        })
    }

    render () {
        return <div className="comments-section box">
            {this.getComments()}
            <span onClick={this.showMoreComments}
                  style={this.getLoadMoreButtonStyle.call(this)}
                  className="comments-section__button">
                Load more comments
            </span>
        </div>
    }
}
