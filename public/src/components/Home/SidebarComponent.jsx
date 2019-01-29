import React from 'react';
import ArchivedSubredditsComponent from './ArchivedSubredditsComponent'
const ScrollArea = require('react-scrollbar').default;

export default class SidebarComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchFormValue: '',
      archiveFormValue: '',
      keyDownStep: 2
    };
    this.getSubredditsList = this.getSubredditsList.bind(this);
    this.onChangeSearchForm = this.onChangeSearchForm.bind(this);
    this.onChangeArchiveForm = this.onChangeArchiveForm.bind(this);
    this.getArchiveFormClass  = this.getArchiveFormClass.bind(this);
    this.onKeyPressSearchForm  = this.onKeyPressSearchForm.bind(this);
    this.setSearchValue  = this.setSearchValue.bind(this);
  }

  getSubredditsList () {
    const subredditList = [...this.props.subreddits].map((subreddit, key) => {
      const formValue = this.state.searchFormValue.toLowerCase().trim();
      const subredditTitle = subreddit.display_name.toLowerCase().trim().slice(0, subreddit.display_name.length - 1);

      if (formValue && subredditTitle.search(formValue) > -1 && !subreddit.isArchived) {
        return <div key={key}
                    tabIndex="1"
                    onClick={() => this.setSearchValue(subreddit.display_name)}>
          {subreddit.display_name}
        </div>
      }
    });

    if (subredditList.some(subreddit => subreddit)) {
      return <ScrollArea speed={0.8}
                         className="home-sidebar__search-form__scrollbar"
                         contentClassName="content"
                         stopScrollPropagation={true}
                         horizontal={false}>
        {subredditList}
      </ScrollArea>
    }
  }

  onKeyPressSearchForm (event) {
    if (this.state.searchFormValue && event.key === 'Enter') {
      this.props.storeSubredditToArchive(this.state.searchFormValue)
      this.setState({searchFormValue: ''})
    }
  }

  getArchiveFormClass () {
    const minimumArchivedLength = 5;
    const archivedSubreddits = [...this.props.subreddits].filter(subreddit => subreddit.isArchived);
    return archivedSubreddits.length > minimumArchivedLength ?
        "home-sidebar__archive-form" :
        "home-sidebar__archive-form disable"
  }

  setSearchValue (value) {
    this.setState({
      searchFormValue: value
    });
  }

  onChangeSearchForm (event) {
    this.setState({
      searchFormValue: event.target.value
    });
  }

  onChangeArchiveForm (event) {
    this.setState({
      archiveFormValue: event.target.value
    });
  }

  render () {
    return <div className="home-sidebar box">
      <div className="home-sidebar__search-form__wrapper">
        <input className="home-sidebar__search-form"
               value={this.state.searchFormValue}
               onKeyDown={this.onKeyPressSearchForm}
               placeholder="Enter subreddit name"
               onChange={this.onChangeSearchForm}
               type="text"/>
        <div className="home-sidebar__search-form__list"
             ref={this.subredditsContainerRef}>
            {this.getSubredditsList()}
        </div>
      </div>

      <div className="home-sidebar__archive-form__wrapper">
        <input className={this.getArchiveFormClass()}
               value={this.state.archiveFormValue}
               placeholder="Search archived subreddit"
               onChange={this.onChangeArchiveForm}
               type="text"/>
        <ArchivedSubredditsComponent subreddits={this.props.subreddits}
                                     storeSubredditToArchive={this.props.storeSubredditToArchive}
                                     removePosts={this.props.removePosts}
                                     archiveFormValue={this.state.archiveFormValue}
                                     errorMessages={this.props.errorMessages}/>
      </div>
      <div>
      </div>
    </div>
  }
}