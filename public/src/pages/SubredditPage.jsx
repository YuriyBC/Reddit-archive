import React from 'react';
import '../styles/home.scss'
import HeaderComponent from '../components/HeaderComponent'
import FeedComponent from '../components/Subreddit/FeedComponent'
import SidebarComponent from '../components/Subreddit/SidebarComponent'
import {getPosts} from '../store/actions/postsActions'
import { connect } from 'react-redux'
import '../styles/subreddit.scss'
import methods from '../utils/methods'

const {
  throttle
} = methods;


class SubredditPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      scrollStep: 1
    };
    this.containerScrollHandler = this.containerScrollHandler.bind(this);
    this.increaseScrollStep = this.increaseScrollStep.bind(this);
  }

  componentDidMount () {
    if (this.props.match &&
        this.props.match.params &&
        this.props.match.params.id) {
      const id = this.props.match.params.id;
      this.props.dispatch(getPosts(id));
    }
    window.addEventListener('scroll', this.containerScrollHandler)
  }

  increaseScrollStep () {
    this.setState({
      scrollStep: this.state.scrollStep + 1
    })
  }

  containerScrollHandler () {
    const offsetBottom = 400;
    if ((window.innerHeight + window.scrollY + offsetBottom) >= document.body.offsetHeight) {
      throttle(this.increaseScrollStep(), 1000)
    }
  }


  render () {
    return <div className="subreddit" onScroll={this.containerScrollHandler}>
        <HeaderComponent/>
        <div className="subreddit-content">
          <FeedComponent currentPostsStep={this.state.scrollStep}
                         posts={this.props.posts}/>
          <SidebarComponent/>
        </div>
    </div>
  }

}

export default connect((state) => {
  return {
    posts: state.posts
  }
})(SubredditPage)