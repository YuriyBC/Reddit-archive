import React from 'react';
import {Link} from 'react-router-dom';
const ScrollArea = require('react-scrollbar').default;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faBars
} from "@fortawesome/free-solid-svg-icons";

export default class SidebarComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchFormValue: '',
      archiveFormValue: '',
      keyDownStep: 2
    };
    this.subredditsContainerRef = React.createRef();
    this.getSubredditsList = this.getSubredditsList.bind(this);
    this.getArchivedSubredditsList = this.getArchivedSubredditsList.bind(this);
    this.onChangeSearchForm = this.onChangeSearchForm.bind(this);
    this.onChangeArchiveForm = this.onChangeArchiveForm.bind(this);
    this.getArchiveFormClass  = this.getArchiveFormClass.bind(this);
    this.onKeyPressSearchForm  = this.onKeyPressSearchForm.bind(this);
    this.setSearchValue  = this.setSearchValue.bind(this);
    this.getErrorMessages  = this.getErrorMessages.bind(this);
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

  getArchivedSubredditsList () {
    const subredditList = [...this.props.subreddits].map((subreddit, key) => {

      const formValue = this.state.archiveFormValue.toLowerCase().trim();
      const subredditTitle = subreddit.display_name.toLowerCase().trim();

      const getIcon = () => {
        if (subreddit.icon_img) {
          return <img className="subreddit-icon" src={subreddit.icon_img} alt=""/>
        } else {
          return <FontAwesomeIcon className="subreddit-icon" icon={faBars}/>
        }
      };

      if (subredditTitle.search(formValue) > -1 && subreddit.isArchived) {
        return <div key={key}>
          <Link to={`/subreddit/${subreddit.id}`}>
            {getIcon()}
            {subreddit.display_name}
          </Link>
          <span onClick={() => this.props.storeSubredditToArchive(subreddit.display_name)}>
            <FontAwesomeIcon icon={faTimes}/>
          </span>
        </div>
      }
    });

    if (subredditList.some(subreddit => subreddit)) {
    return  <div className="subredditList-inner_container">
                <ScrollArea speed={0.8}
                         horizontal={false}>
                    {subredditList}
                </ScrollArea>
        </div>
    }
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

  getErrorMessages () {
    return this.props.errorMessages.map((message, index) => {
      return <div className="errorMessage" key={index}>{message}</div>
    })
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
        <div className="home-sidebar__archive-form__list">
          <span className="home-sidebar__archive-form__title">Archived subreddits:</span>
          {this.getArchivedSubredditsList()}
          {this.getErrorMessages()}
        </div>
      </div>
      <div>
      </div>
    </div>
  }
}