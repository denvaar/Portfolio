import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';

import { requestToken, logout } from '../actions/actions';
import BannerImg from '../img/mountains.jpg';
import NotificationManager from './notificationManager';

class Header extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout(this.context.router);
  }

  render() {
    return (
      <div>
        <nav className="top-nav">
          <span className="top-nav-content">Denver Smith&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <IndexLink to="/" activeClassName="active-nav-link">About</IndexLink>
            &nbsp;&nbsp;&nbsp;
            <Link to="/posts" activeClassName="active-nav-link">Posts</Link>
            {this.props.user.authenticated && 
             <button className="pull--right logout"
                     onClick={this.handleLogout}>
               Logout
             </button>}
            </span>
        </nav>
        {this.props.children}
        <NotificationManager />
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
