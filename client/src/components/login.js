import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { requestToken, fetchUser } from '../actions/actions';

class Login extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  handleClick(event) {
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = {
      username: username.value.trim(),
      password: password.value.trim()
    };
    this.props.requestToken(creds, this.context.router);
    //console.log(this.props);
    //dispatch(requestToken(creds));
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <div>
        <input type='text'
               ref='username'
               className="form-control"
               placeholder='Username' />
        <input type='password'
               ref='password'
               className="form-control"
               placeholder='Password' />
        <button onClick={(event) => this.handleClick(event)}
                className="btn btn-primary">
          Login
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  errorMessage: PropTypes.string,
  //dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {user: state.user};
}

export default connect(mapStateToProps, { requestToken, fetchUser })(Login);

