import React from 'react';
import CommentComponent from './CommentComponent';
import methods from '../../utils/methods';

const { sortComments } = methods;

export default class CommentsSection extends React.Component {
    constructor(props) {
        super(props);
        this.commentToShowStep = 20;
        this.showMoreComments = this.showMoreComments.bind(this);
        this.getLoadMoreButtonStyle = this.getLoadMoreButtonStyle.bind(this);
        this.renderComments = this.renderComments.bind(this);
        this.state = {
            commentsToShow: this.commentToShowStep,
        };
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

    renderComments() {
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

    render() {
        return (
            <div className="comments-section box">
                {this.renderComments()}
                <span onClick={this.showMoreComments}
                      style={this.getLoadMoreButtonStyle()}
                      className="comments-section__button"
                >
                Load more comments
                </span>
            </div>
        );
    }
}
