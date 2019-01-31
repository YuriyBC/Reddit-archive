import React from 'react';
import CommentComponent from './CommentComponent';
import methods from '../../utils/methods';

const { sortComments } = methods;

export default class CommentsSection extends React.Component {
    constructor(props) {
        super(props);
        this.commentToShowStep = 20;
        this.getComments = this.getComments.bind(this);
        this.showMoreComments = this.showMoreComments.bind(this);
        this.state = {
            commentsToShow: this.commentToShowStep,
        };
    }

    getComments() {
        const { commentsToShow } = this.state;
        const { comments } = this.props;
        const sortedComments = sortComments([...comments])
            .filter(comment => comment.body !== 'null')
            .slice(0, commentsToShow);

        if (sortedComments) {
            return sortedComments.map((comment) => (
                <CommentComponent key={comment.id}
                                  {...comment}
                />
            ));
        }
        return null;
    }

    getLoadMoreButtonStyle() {
        const { commentsToShow } = this.state;
        const { comments } = this.props;
        return {
            display: comments.length - commentsToShow > 10 ? 'block' : 'none',
        };
    }

    showMoreComments() {
        const { commentsToShow } = this.state;
        const { commentToShowStep } = this;
        this.setState({
            commentsToShow: commentsToShow + commentToShowStep,
        });
    }

    render() {
        return (
            <div className="comments-section box">
                {this.getComments()}
                <span onClick={this.showMoreComments}
                      style={this.getLoadMoreButtonStyle.call(this)}
                      className="comments-section__button"
                >
                Load more comments
                </span>
            </div>
        );
    }
}
