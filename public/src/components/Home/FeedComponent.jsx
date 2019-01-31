import React from 'react';
import redditBanner from '../../assets/img/reddit-banner.png';
import redditAnimalImage from '../../assets/img/reddit-kid.png';

export default class FeedComponent extends React.Component {
    constructor (props) {
        super(props);
        this.getContainerStyle = this.getContainerStyle.bind(this);
        this.getFaqStyle = this.getFaqStyle.bind(this);
    }

    getContainerStyle() {
        return {
            background: `white url(${redditBanner}) -2px -2px no-repeat`,
            backgroundSize: '105%',
        };
    }

    getFaqStyle() {
        return {
            background: `url(${redditAnimalImage}) 15% 80% no-repeat`,
            backgroundSize: '60px 88px',
        };
    }

    render() {
        return (
            <div className="home-feed box" style={this.getContainerStyle()}>
                <div className="home-feed__faq" style={this.getFaqStyle()}>
                    This application is designed to store data from Reddit.
                    To store information about the subreddit,
                    enter the name of the subreddit in the form.
                    Data archiving starts and you can view subreddit data.
                    <span>Have fun!</span>
                </div>
            </div>
        );
    }
}
