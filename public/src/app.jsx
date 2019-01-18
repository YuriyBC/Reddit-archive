import React from 'react';
import 'normalize.css';
import {Route, Switch} from "react-router-dom";
import HomePage from './pages/HomePage'
import SubredditPage from './pages/SubredditPage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAngleUp,
    faAngleDown,
    faCommentAlt,
    faShare,
    faBookmark
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faAngleUp,
    faAngleDown,
    faCommentAlt,
    faShare,
    faBookmark
);

const App = () => (
  <div className='App'>
      <Switch>
        <Route exact path="/subreddit/:id" component={SubredditPage} />
        <Route path="/" component={HomePage} />
      </Switch>
  </div>
);

export default App;
