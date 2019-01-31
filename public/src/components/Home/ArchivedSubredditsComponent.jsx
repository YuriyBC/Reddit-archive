import React from 'react';
import ScrollArea from 'react-scrollbar';
import PropTypes from 'prop-types';
import ArchivedSubredditItem from './ArchivedSubredditItem';
import { subredditType, errorMessagesType } from '../../utils/propTypes';

export default class ArchivedSubredditsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.renderArchivedSubredditsList = this.renderArchivedSubredditsList.bind(this);
        this.renderErrorMessages = this.renderErrorMessages.bind(this);
    }

    renderErrorMessages() {
        const { errorMessages } = this.props;
        return errorMessages.map((message, index) => (
            <div className="errorMessage" key={index}>{message}</div>
        ));
    }

    renderArchivedSubredditsList() {
        const {
            subreddits,
            archiveFormValue,
            storeSubredditToArchive,
            removePosts,
        } = this.props;

        const subredditList = subreddits.map((subreddit, key) => {
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

        const filteredSubredditList = subredditList.filter(subreddit => !!subreddit);
        if (filteredSubredditList.length) {
            return (
                <div className="subredditList-inner_container">
                    <ScrollArea
speed={0.8}
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
                {this.renderArchivedSubredditsList()}
                {this.renderErrorMessages()}
            </div>
        );
    }
}

ArchivedSubredditsComponent.propTypes = {
    subreddits: PropTypes.arrayOf(PropTypes.shape(subredditType)).isRequired,
    archiveFormValue: PropTypes.string.isRequired,
    storeSubredditToArchive: PropTypes.func.isRequired,
    removePosts: PropTypes.func.isRequired,
    errorMessages: errorMessagesType.isRequired,
};
