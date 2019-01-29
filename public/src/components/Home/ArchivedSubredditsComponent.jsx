import React from 'react';
const ScrollArea = require('react-scrollbar').default;
import ArchivedSubredditItem from './ArchivedSubredditItem';

export default class ArchivedSubredditsComponent extends React.Component {
    constructor (props) {
        super(props);
    }

    getErrorMessages () {
        return this.props.errorMessages.map((message, index) => {
            return <div className="errorMessage" key={index}>{message}</div>
        })
    }

    getArchivedSubredditsList () {
        const subredditList = [...this.props.subreddits].map((subreddit, key) => {
            const formValue = this.props.archiveFormValue.toLowerCase().trim();
            const subredditTitle = subreddit.display_name.toLowerCase().trim();

            if (subredditTitle.search(formValue) > -1 && subreddit.isArchived) {
                return <ArchivedSubredditItem key={key}
                                              storeSubredditToArchive={this.props.storeSubredditToArchive}
                                              removePosts={this.props.removePosts}
                                              subreddit={subreddit}/>
            }
        });

        if (subredditList.some(subreddit => subreddit)) {
            return  <div className="subredditList-inner_container">
                <ScrollArea speed={0.8}
                            horizontal={false}>
                    {subredditList}
                </ScrollArea>
            </div>
        } else {
            return <span className="subredditList-inner_container empty">...</span>
        }
    }

    render () {
        return <div className="home-sidebar__archive-form__list">
            <span className="home-sidebar__archive-form__title">Archived subreddits:</span>
            {this.getArchivedSubredditsList.call(this)}
            {this.getErrorMessages.call(this)}
        </div>
    }
}