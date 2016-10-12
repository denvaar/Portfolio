import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';

import { requestToken, logout } from '../actions/actions';
import BannerImg from '../img/mountains.jpg';

class Header extends Component {

  handleLogout() {
    this.props.logout(this.context.router);
    //this.update();
  }

  render() {
    console.log("user header", this.props.user);
    return (
      <div>
        <nav className="top-nav">
          <span className="top-nav-content">Denver Smith&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <IndexLink to="/" activeClassName="active-nav-link">About</IndexLink>
          &nbsp;&nbsp;&nbsp;
          <Link to="/posts" activeClassName="active-nav-link">Posts</Link>
          {this.props.user.authenticated && 
           <IndexLink to="/"
                      className="pull--right"
                      activeClassName="active-nav-link"
                      onClick={this.handleLogout.bind(this)}>Logout</IndexLink>}
          </span>
        </nav>
        <div className="banner-image">
          <img src={BannerImg}></img>
        </div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logout, requestToken }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
