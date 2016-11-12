import axios from 'axios';
import { browserHistory } from 'react-router';

import storage from '../utils/localStorageUtils';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const BAD_CREDENTIALS = 'BAD_CREDENTIALS';
export const USER_RETRIEVED = 'USER_RETRIEVED';
export const POST_CREATED = 'POST_CREATED';
export const SUCCESS_NOTIFICATION_ADD = 'SUCCESS_NOTIFICATION_ADD';
export const NOTIFICATION_CLEAR = 'NOTIFICATION_CLEAR';

export const clearNotifications = (props) => {
  return dispatch => {
    dispatch(notificationClear());
  }
}

/*
 @param {Object} props :: {email: email, password: password}
 @param {Function} router :: router instance
*/
export const requestToken = (props, router) => {
  return (dispatch, getState) => {
    return axios.post("http://localhost:8000/api/v1/accounts/sessions", props).then((response) => {
      if (response.status === 201) {
        storage.setKey(response.data.jwt);
        dispatch(loginSuccess(response));
        browserHistory.push("/");
        dispatch(addSuccessNotification("Login Successful!"));
      } else {
        dispatch(loginFailure(response));
      }
    }).catch((error) => {
      dispatch(loginFailure(error));
    });
  }
}

/*
  Have a token, but not logged in (page refresh, etc.)
*/
export const fetchUser = (token) => {
  return dispatch => {
    const config = {headers: {'Authorization': `JWT ${token}`}};
    return axios.get("http://localhost:8000/api/v1/accounts/users/retrieve", config).then((response) => {
      let jwt = response.data.jwt;
      dispatch(userRetrieved(response));
    });
  }
}

export const logout = (router) => {
  return (dispatch, getState) => {
    const { user } = getState();
    storage.setKey();
    dispatch(logoutSuccess());
    browserHistory.push("/login");
    dispatch(addSuccessNotification("Logout Successful!"));
  };
}

export const createPost = (text, token) => {
  return dispatch => {
    const config = {headers: {'Authorization': `JWT ${token}`}};
    console.log(config)
    return axios.post("http://localhost:8000/api/v1/posts/create/", text, config).then((response) => {
      console.log(response);
      dispatch(postCreated(response));
    }).catch((error) => {
      console.log(error);
    });
  };
}

const postCreated = (response) => {
  return {
    type: POST_CREATED,
    payload: response
  };
}

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
}

const userRetrieved = (response) => {
  return {
    type: USER_RETRIEVED,
    payload: response
  };
}

const loginSuccess = (response) => {
  return {
    type: LOGIN_SUCCESS,
    payload: response
  };
}

const loginFailure = (response) => {
  return {
    type: LOGIN_FAILURE,
    payload: response
  };
}

const badCredentials = (response) => {
  return {
    type: BAD_CREDENTIALS,
    payload: error
  };
}

const addSuccessNotification = (message) => {
  return {
    type: SUCCESS_NOTIFICATION_ADD,
    message: message
  };
}

const notificationClear = (message) => {
  return {
    type: NOTIFICATION_CLEAR
  };
}
