import axios from 'axios';

import storage from '../utils/localStorageUtils';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const BAD_CREDENTIALS = 'BAD_CREDENTIALS';
export const USER_RETRIEVED = 'USER_RETRIEVED';
export const POST_CREATED = 'POST_CREATED';

/*
 @param {Object} props :: {email: email, password: password}
 @param {Function} router :: router instance
*/
export const requestToken = (props, router) => {
  return (dispatch, getState) => {
    return axios.post("http://localhost:8000/api/v1/accounts/sessions", props).then((response) => {
      if (response.status === 201) {
        storage.setKey(response.data.jwt);
        console.log(storage);
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

/*
  Have a token, but not logged in (page refresh, etc.)
*/
export const fetchUser = (token) => {
  return dispatch => {
    const config = {headers: {'Authorization': `JWT ${token}`}};
    console.log("oh");
    return axios.get("http://localhost:8000/api/v1/accounts/users/retrieve", config).then((response) => {
      let jwt = response.data.jwt;
      dispatch(userRetrieved(response));
    });
  }
}

export const logout = (router) => {
  console.log('logging out');
  return (dispatch, getState) => {
    const { user } = getState();
    storage.setKey();
    dispatch(logoutSuccess());
    //router.push('/');
  };
}

export const createPost = (text, token) => {
  console.log('creating post...');
  return dispatch => {
    const config = {headers: {'Authorization': `JWT ${token}`}};
    return axios.post("http://localhost:8000/api/v1/posts/create/", text, config).then((response) => {
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

