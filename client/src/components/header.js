import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';

import { requestToken } from '../actions/actions';
import BannerImg from '../img/mountains.jpg';

class Header extends Component {
  render() {
    console.log(this.props);
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ requestToken }, dispatch);
}
export default connect(null, mapDispatchToProps)(Header);
