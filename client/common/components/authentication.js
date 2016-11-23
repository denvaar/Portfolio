import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/actions';

const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
  var storage = require('../utils/localStorageUtils');
} else {
  var storage = undefined;
}

const requireAuth = (ComposedComponent) => {
  class Authentication extends Component {

    componentWillMount() {
      if (storage) {
        console.log(storage);
        let token = storage.default.get('auth-token');
        if (!this.props.authenticated && !token) {
          this.context.router.push('/login');
        }
        else if (!this.props.authenticated && token) {
          this.props.fetchUser(token);
        }
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

  Authentication.contextTypes = {
    router: PropTypes.object
  };

  const mapStateToProps = (state) => {
    return {authenticated: state.user.authenticated};
  }
  return connect(mapStateToProps, { fetchUser })(Authentication);
}

export default requireAuth;



export const checkAuth = (ComposedComponent) => {
  class A extends Component {
    componentWillMount() {
      if (storage) {
        let token = storage.default.get('auth-token');
        if (!this.props.authenticated && token)
          this.props.fetchUser(token);
      }
    }
    
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  
  }
  
  const mapStateToProps = (state) => {
    return {
      authenticated: state.user.authenticated
    };
  }

  return connect(mapStateToProps, { fetchUser })(A);
}

