import React from 'react';
import PostComponent from '../PostComponent';
import CommentsSection from './CommentsSection';
import spinner from '../../assets/img/spinner.gif';

export default class FeedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getPost = this.getPost.bind(this);
        this.getCommentsSection = this.getCommentsSection.bind(this);
    }

    getPost() {
        const { post } = this.props;
        return Object.keys(post).length ? <PostComponent {...post} /> : null;
    }

    getCommentsSection() {
        const { comments } = this.props;
        return comments && comments.length
            ? <CommentsSection comments={comments} />
            : <img className="spinner comments-spinner"
                   src={spinner}
                   alt="Spinner" />;
    }

    render() {
        return (
            <div className="subreddit-feed post-feed box">
                <div>
                    {this.getPost()}
                    {this.getCommentsSection()}
                </div>
            </div>
        );
    }
}
