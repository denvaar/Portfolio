import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/actions';
import storage from '../utils/localStorageUtils';

const requireAuth = (ComposedComponent) => {
  class Authentication extends Component {

    componentWillMount() {
      let token = storage.get('auth-token');
      if (!this.props.authenticated && !token) {
        this.context.router.push('/login');
      }
      else if (!this.props.authenticated && token) {
        this.props.fetchUser(token);
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
      let token = storage.get('auth-token');
      if (!this.props.authenticated && token)
        this.props.fetchUser(token);
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

