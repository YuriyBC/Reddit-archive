import React from 'react';
import '../../styles/header.scss'
import logo from '../../assets/svg/logo.svg'
import websiteTitle from '../../assets/svg/reddit.svg'

export default class Header extends React.Component {
  constructor () {
    super();
  }

  render () {
    return <div className="header">
      <div className="header-logo">
        <a href="/">
          <img className="header-logo_image" src={logo} alt="Logo"/>
        </a>
        <a href="/">
          <img className="header-logo_title" src={websiteTitle} alt="Title"/>
        </a>
      </div>
    </div>
  }
}
