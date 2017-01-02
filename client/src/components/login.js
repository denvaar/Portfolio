import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { requestToken, fetchUser } from '../actions/actions';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      errorMessage: nextProps.user.errorMessage
    });
  }

  handleClick(event) {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = {
      username: username.value.trim(),
      password: password.value.trim()
    };

    if (creds.username.length > 0 && creds.password.length > 0) {   
      this.props.requestToken(creds, this.context.router)
    } else {
      this.setState({
        errorMessage: "Username and password cannot be blank."
      });
    } 
  }

  render() {
    let { errorMessage, successMessage } = this.state;
    return (
      <div className="body-content center--200">
          <div className="form-success">{successMessage}</div>
          <form>
            <div className="form-error">{errorMessage}</div>
            <input type='text'
                   ref='username'
                   placeholder='Username' />
            <input type='password'
                   ref='password'
                   placeholder='Password' />
              <div className="action-group">
              <input type="submit"
                     className="submit-button stretchy-pants"
                     value="Login" 
                     onClick={this.handleClick} />
            </div>
        </form> 
      </div>
    );
  }
}

Login.propTypes = {
  errorMessage: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {user: state.user};
}

export default connect(mapStateToProps, { requestToken, fetchUser })(Login);

