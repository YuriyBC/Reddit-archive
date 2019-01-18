import React from 'react';
import {Link} from 'react-router-dom';

export default class SidebarComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchFormValue: '',
      archiveFormValue: ''
    };
    this.getSubredditsList = this.getSubredditsList.bind(this);
    this.getArchivedSubredditsList = this.getArchivedSubredditsList.bind(this);
    this.onChangeSearchForm = this.onChangeSearchForm.bind(this);
    this.onChangeArchiveForm = this.onChangeArchiveForm.bind(this);
    this.getArchiveFormClass  = this.getArchiveFormClass.bind(this);
    this.onKeyPressSearchForm  = this.onKeyPressSearchForm.bind(this);
    this.setSearchValue  = this.setSearchValue.bind(this);
  }

  getSubredditsList () {
    return [...this.props.subreddits].map((subreddit, key) => {
      const formValue = this.state.searchFormValue.toLowerCase().trim();
      const subredditTitle = subreddit.display_name.toLowerCase().trim().slice(0, subreddit.display_name.length - 1);

      if (formValue && subredditTitle.search(formValue) > -1 && !subreddit.isArchived) {
        return <div key={key}
                    onClick={() => this.setSearchValue(subreddit.display_name)}>
          {subreddit.display_name}
        </div>
      }
    })
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

  getArchivedSubredditsList () {
    return [...this.props.subreddits].map((subreddit, key) => {
      const formValue = this.state.archiveFormValue.toLowerCase().trim();
      const subredditTitle = subreddit.display_name.toLowerCase().trim();

      if (subredditTitle.search(formValue) > -1 && subreddit.isArchived) {
        return <div key={key}>
          <Link to={"/subreddit/" + subreddit.id}>
            {subreddit.display_name}
          </Link>
          <span onClick={() => this.props.storeSubredditToArchive(subreddit.display_name)}>X</span>
        </div>
      }
    })
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
               onKeyPress={this.onKeyPressSearchForm}
               onChange={this.onChangeSearchForm}
               type="text"/>
        <div className="home-sidebar__search-form__list">
          {this.getSubredditsList()}
        </div>
      </div>


      <div className="home-sidebar__archive-form__wrapper">
        <input className={this.getArchiveFormClass()}
               value={this.state.archiveFormValue}
               onChange={this.onChangeArchiveForm}
               type="text"/>
        <div className="home-sidebar__archive-form__list">
          {this.getArchivedSubredditsList()}
        </div>
      </div>
      <div>
      </div>
    </div>
  }

}
