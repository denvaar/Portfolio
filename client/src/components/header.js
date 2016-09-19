import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import BannerImg from '../img/paint-bw.jpg';

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="top-nav">
          <span className="top-nav-content">Denver Smith&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <IndexLink to="/" activeClassName="active-nav-link">About</IndexLink>
          &nbsp;&nbsp;&nbsp;
          <Link to="/posts" activeClassName="active-nav-link">Posts</Link></span>
        </nav>
        <div className="banner-image">
          <img src={BannerImg}></img>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
