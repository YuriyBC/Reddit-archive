import React from 'react';

export default class NavigationBar extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return <div className="subreddit-navbar">
            <div className="subreddit-navbar__buttons">
                <div className="subreddit-navbar__sorting">
                    <span>SORT</span>
                    <div className="subreddit-navbar__dropdown-container">
                        <div>Hot</div>
                        <div className="subreddit-navbar__dropdown">
                            <span>Hot</span>
                            <span>New</span>
                            <span>Controversial</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

}
