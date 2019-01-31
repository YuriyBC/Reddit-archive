import React from 'react';
import ArchivedSubredditItem from './ArchivedSubredditItem';
import ScrollArea from 'react-scrollbar';

export default class ArchivedSubredditsComponent extends React.Component {
    getErrorMessages() {
        const { errorMessages } = this.props;
        return errorMessages.map((message, index) => (
            <div className="errorMessage" key={index}>{message}</div>
        ));
    }

    getArchivedSubredditsList() {
        const {
            subreddits,
            archiveFormValue,
            storeSubredditToArchive,
            removePosts,
        } = this.props;

        const subredditList = [...subreddits].map((subreddit, key) => {
            const formValue = archiveFormValue.toLowerCase().trim();
            const subredditTitle = subreddit.display_name.toLowerCase().trim();

            if (subredditTitle.search(formValue) > -1 && subreddit.isArchived) {
                return (
                    <ArchivedSubredditItem key={key}
                                           storeSubredditToArchive={storeSubredditToArchive}
                                           removePosts={removePosts}
                                           subreddit={subreddit}
                    />
                );
            }
            return null;
        });

        let filteredSubredditList = subredditList.filter(subreddit => !!subreddit);
        if (filteredSubredditList.length) {
            return (
                <div className="subredditList-inner_container">
                    <ScrollArea speed={0.8}
                                horizontal={false}
                    >
                        {subredditList}
                    </ScrollArea>
                </div>
            );
        }
        return <span className="subredditList-inner_container empty">...</span>;
    }

    render() {
        return (
            <div className="home-sidebar__archive-form__list">
                <span className="home-sidebar__archive-form__title">Archived subreddits:</span>
                {this.getArchivedSubredditsList.call(this)}
                {this.getErrorMessages.call(this)}
            </div>
        );
    }
}
