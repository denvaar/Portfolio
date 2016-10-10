import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/actions';
import storage from '../utils/localStorageUtils';

const requireAuth = (ComposedComponent) => {
  class Authentication extends Component {
    
    componentWillMount() {
      let token = storage.get('auth-token');
      if (!this.props.authenticated && !token) {
        this.context.router.push('/');
      }
      else if (!this.props.authenticated && token) {
        console.log('fetchUser(token) next');
      }
    }
    
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }

  }

  const mapStateToProps = (state) => {
    return {authenticated: state.user.authenticated};
  }

  return connect(mapStateToProps, { fetchUser })(Authentication);
}

export default requireAuth;
