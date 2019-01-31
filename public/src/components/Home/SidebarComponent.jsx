import React from 'react';
import ArchivedSubredditsComponent from './ArchivedSubredditsComponent';
import ScrollArea from 'react-scrollbar';
import constants from '../../utils/constants';

const { MINIMUM_ARCHIVED_LENGTH } = constants;

export default class SidebarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFormValue: '',
            archiveFormValue: '',
        };
        this.renderSubredditsList = this.renderSubredditsList.bind(this);
        this.onChangeSearchForm = this.onChangeSearchForm.bind(this);
        this.onChangeArchiveForm = this.onChangeArchiveForm.bind(this);
        this.getArchiveFormClass = this.getArchiveFormClass.bind(this);
        this.onKeyPressSearchForm = this.onKeyPressSearchForm.bind(this);
        this.setSearchValue = this.setSearchValue.bind(this);
    }

    onKeyPressSearchForm(event) {
        const { searchFormValue } = this.state;
        const { storeSubredditToArchive } = this.props;
        if (searchFormValue && event.key === 'Enter') {
            storeSubredditToArchive(searchFormValue);
            this.setState({
                searchFormValue: '',
            });
        }
    }

    onChangeSearchForm(event) {
        this.setState({
            searchFormValue: event.target.value,
        });
    }

    onChangeArchiveForm(event) {
        this.setState({
            archiveFormValue: event.target.value,
        });
    }

    setSearchValue(value) {
        this.setState({
            searchFormValue: value,
        });
    }

    getArchiveFormClass() {
        const { subreddits } = this.props;
        const archivedSubreddits = subreddits
            .filter(subreddit => subreddit.isArchived);
        return archivedSubreddits.length > MINIMUM_ARCHIVED_LENGTH
            ? 'home-sidebar__archive-form'
            : 'home-sidebar__archive-form disable';
    }

    renderSubredditsList() {
        const { subreddits } = this.props;
        const { searchFormValue } = this.state;
        const subredditList = subreddits.map((subreddit, key) => {
            const formValue = searchFormValue
                .replace(/\\/g, "\\\\")
                .toLowerCase()
                .trim();
            const subredditTitle = subreddit.display_name
                .toLowerCase()
                .trim()
                .slice(0, subreddit.display_name.length - 1);

            if (formValue && subredditTitle.includes(formValue) && !subreddit.isArchived) {
                return (
                    <div key={key}
                         tabIndex={0}
                         role="button"
                         onClick={() => this.setSearchValue(subreddit.display_name)}
                    >
                        {subreddit.display_name}
                    </div>
                );
            }
            return null;
        });

        let filteredSubredditList = subredditList.filter(subreddit => !!subreddit);
        if (filteredSubredditList.length) {
            const trueValue = true;
            const falseValue = true;
            return (
                <ScrollArea speed={0.8}
                            className="home-sidebar__search-form__scrollbar"
                            contentClassName="content"
                            stopScrollPropagation={trueValue}
                            horizontal={falseValue}
                >
                    {subredditList}
                </ScrollArea>
            );
        }
        return null;
    }

    render() {
        const { searchFormValue, archiveFormValue } = this.state;
        const {
            subreddits,
            storeSubredditToArchive,
            removePosts,
            errorMessages,
        } = this.props;
        return (
            <div className="home-sidebar box">
                <div className="home-sidebar__search-form__wrapper">
                    <input className="home-sidebar__search-form"
                           value={searchFormValue}
                           onKeyDown={this.onKeyPressSearchForm}
                           placeholder="Enter subreddit name"
                           onChange={this.onChangeSearchForm}
                           type="text"
                    />
                    <div className="home-sidebar__search-form__list">
                        {this.renderSubredditsList()}
                    </div>
                </div>

                <div className="home-sidebar__archive-form__wrapper">
                    <input className={this.getArchiveFormClass()}
                           value={archiveFormValue}
                           placeholder="Search archived subreddit"
                           onChange={this.onChangeArchiveForm}
                           type="text"
                    />
                    <ArchivedSubredditsComponent subreddits={subreddits}
                                                 storeSubredditToArchive={storeSubredditToArchive}
                                                 removePosts={removePosts}
                                                 archiveFormValue={archiveFormValue}
                                                 errorMessages={errorMessages}
                    />
                </div>
            </div>
        );
    }
}
