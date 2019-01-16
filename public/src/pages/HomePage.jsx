import React from 'react';
import HeaderComponent from '../components/Home/HeaderComponent'
import FeedComponent from '../components/FeedComponent'
import SidebarComponent from '../components/SidebarComponent'
import '../styles/home.scss'
import { connect } from 'react-redux'
import {action} from '../store/actions'

class HomePage extends React.Component {
  constructor () {
    super();
  }
  componentDidMount() {
    this.props.dispatch(action('sdcsdc'))
  }

  render () {
    return <div className="home">
      <HeaderComponent></HeaderComponent>
      <div className="home-content">
        <FeedComponent/>
        <SidebarComponent/>
      </div>
    </div>
  }

}

export default connect((state) => state)(HomePage)