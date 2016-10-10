import axios from 'axios';

import storage from '../utils/localStorageUtils';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const BAD_CREDENTIALS = 'BAD_CREDENTIALS';
export const USER_RETRIEVED = 'USER_RETRIEVED';

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
      } else {
        dispatch(loginFailure(response));
      }
    }).catch((error) => {
      if (error.status === 400) {
        dispatch(badCredentials(error));
      } else {
        dispatch(loginFailure(error));
      }
    });
  }
}

export const fetchUser = (token) => {
  return dispatch => {
    const config = {headers: {'Authorization': `JWT ${token}`}};
    return axios.get("", config).then((response) => {
      let jwt = response.data.jwt;
      dispatch(userRetrieved(response));
    });
  }
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

