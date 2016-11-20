import axios from 'axios';
import { browserHistory } from 'react-router';

import storage from '../utils/localStorageUtils';
import apiConfig from '../utils/apiConfig';

export const BAD_CREDENTIALS = 'BAD_CREDENTIALS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const NOTIFICATION_CLEAR = 'NOTIFICATION_CLEAR';
export const POST_CREATED = 'POST_CREATED';
export const POST_UPDATED = 'POST_UPDATED';
export const POST_DELETED = 'POST_DELETED';
export const POST_FAILURE = 'POST_FAILURE';
export const SUCCESS_NOTIFICATION_ADD = 'SUCCESS_NOTIFICATION_ADD';
export const USER_RETRIEVED = 'USER_RETRIEVED';

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
    return axios.post(`${apiConfig}/accounts/sessions`, props).then((response) => {
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
    return axios.get(`${apiConfig}/accounts/users/retrieve`, config).then((response) => {
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
    return axios.post(`${apiConfig}/posts/create/`, text, config).then((response) => {
      dispatch(postCreated(response));
      browserHistory.push("/posts");
      dispatch(addSuccessNotification("Post Created!"));
    }).catch(error => {
      dispatch(postFailure(error.response.data));
    });
  };
}

export const editPost = (text, slug, token) => {
  return dispatch => {
    const config = {headers: {'Authorization': `JWT ${token}`}};
    return axios.patch(`${apiConfig}/posts/${slug}/edit/`, text, config).then((response) => {
      dispatch(postUpdated(response));
      browserHistory.push("/posts");
      dispatch(addSuccessNotification("Post Updated!"));
    }).catch(error => {
      dispatch(postFailure(error.response.data));
    });
  };
}

export const deletePost = (slug, token) => {
  return dispatch => {
    const config = {headers: {'Authorization': `JWT ${token}`}};
    return axios.delete(`${apiConfig}/posts/${slug}/edit/`, config).then((response) => {
      dispatch(postDeleted(response));
      browserHistory.push("/posts");
      dispatch(addSuccessNotification("Post Deleted!"));
    }).catch(error => {
      dispatch(postFailure(error.response.data));
    });
  };
}

const postCreated = (response) => {
  return {
    type: POST_CREATED,
    payload: response
  };
}

const postDeleted = (response) => {
  return {
    type: POST_DELETED,
    payload: response
  };
}

const postUpdated = (response) => {
  return {
    type: POST_UPDATED,
    payload: response
  };
}

const postFailure = (data) => {
  return {
    type: POST_FAILURE,
    payload: data
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
