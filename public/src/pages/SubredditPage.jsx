import React from 'react';
import HeaderComponent from '../components/HeaderComponent'
import FeedComponent from '../components/Subreddit/FeedComponent'
import SidebarComponent from '../components/SidebarComponent'
import InnerHeaderComponent from '../components/Subreddit/InnerHeaderComponent'
import NavigationBar from '../components/Subreddit/NavigationBar'
import { getPosts } from '../store/actions/postsActions'
import { connect } from 'react-redux'
import '../styles/subreddit.scss'
import methods from '../utils/methods'
import spinner from '../assets/img/spinner.gif'

const { throttle } = methods;

class SubredditPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      scrollStep: 1,
      currentSubreddit: {},
      currentSortingId: 2
    };
    this.containerScrollHandler = this.containerScrollHandler.bind(this);
    this.increaseScrollStep = this.increaseScrollStep.bind(this);
    this.changeSorting = this.changeSorting.bind(this);
  }

  componentDidMount () {
    if (this.props.match &&
        this.props.match.params &&
        this.props.match.params.id) {
      const id = this.props.match.params.id;
      this.props.dispatch(getPosts(id));
    }
    window.addEventListener('scroll', this.containerScrollHandler);
  }

  changeSorting (id) {
    this.setState({
      currentSortingId: id
    })
  }

  componentDidUpdate () {
    const currentSubreddit = this.props.subreddits.filter(subreddit => subreddit.id === +this.props.match.params.id );
    if (currentSubreddit.length && Object.keys(this.state.currentSubreddit).length === 0) {
      this.setState({
        ...this.state,
        currentSubreddit: currentSubreddit[0]
      })
    }
  }

  getSortedPosts () {
    if (this.state.currentSortingId === 0) {
      return [...this.props.posts]
    }
    if (this.state.currentSortingId === 1) {
      return [...this.props.posts].sort((currentItem, nextItem) => {
        return +nextItem.created - +currentItem.created;
      });
    }
    if (this.state.currentSortingId === 2) {
        return [...this.props.posts].sort((currentItem, nextItem) => {
            return +nextItem.score - +currentItem.score;
        });
    }
    return [...this.props.posts]
  }

  increaseScrollStep () {
    const state = {...this.state};

    state.scrollStep += state.scrollStep;
    this.setState(state)
  }

  containerScrollHandler () {
    const throttleScrollingTime = 1000;
    const offsetBottom = 400;

    if ((window.innerHeight + window.scrollY + offsetBottom) >= document.body.offsetHeight) {
      throttle(this.increaseScrollStep(), throttleScrollingTime)
    }
  }

  getSidebar () {
      if (Object.keys(this.state.currentSubreddit).length) {
        return  <SidebarComponent {...this.state.currentSubreddit}/>
      }
  }

  getFeedComponent () {
    const posts = this.getSortedPosts.call(this);
    if (posts.length) {
      return <FeedComponent currentPostsStep={this.state.scrollStep}
                            posts={posts}/>
    }
    return null
  }

  getSpinnerStyle () {
      if (Object.keys(this.state.currentSubreddit).length && this.props.posts.length) {
          return {
              'display': 'none'
          }
      }
  }

  render () {
    return <div className="subreddit"
                onScroll={this.containerScrollHandler}>
        <HeaderComponent/>
        <div className="subreddit-content">
          <InnerHeaderComponent {...this.state.currentSubreddit}/>
          <NavigationBar changeSorting={this.changeSorting}
                         currentSortingId={this.state.currentSortingId}/>
          <div className="subreddit-content__wrapper">
            {this.getFeedComponent.call(this)}
            {this.getSidebar.call(this)}
            <img style={this.getSpinnerStyle.call(this)}
                 className="spinner subreddit-spinner"
                 src={spinner} alt="Spinner"/>
          </div>
        </div>
    </div>
  }
}

export default connect((state) => {
  return {
    posts: state.posts.allPosts,
    subreddits: state.subreddits.subreddits
  }
})(SubredditPage)