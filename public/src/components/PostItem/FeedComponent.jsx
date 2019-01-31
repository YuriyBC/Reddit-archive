import React from 'react';
import PropTypes from 'prop-types';
import PostComponent from '../PostComponent';
import CommentsSection from './CommentsSection';
import spinner from '../../assets/img/spinner.gif';
import { postType, commentType } from '../../utils/propTypes';

export default class FeedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.renderPost = this.renderPost.bind(this);
        this.renderCommentsSection = this.renderCommentsSection.bind(this);
    }

    renderPost() {
        const { post } = this.props;
        return Object.keys(post).length ? <PostComponent {...post} /> : null;
    }

    renderCommentsSection() {
        const { comments } = this.props;
        if (!comments || !comments.length) {
            return (
                <img className="spinner comments-spinner"
                     src={spinner}
                     alt="Spinner"
                />
            );
        }
        return <CommentsSection comments={comments} />;
    }

    render() {
        return (
            <div className="subreddit-feed post-feed box">
                <div>
                    {this.renderPost()}
                    {this.renderCommentsSection()}
                </div>
            </div>
        );
    }
}

FeedComponent.propTypes = {
    post: PropTypes.shape(postType).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape(commentType)).isRequired,
};
