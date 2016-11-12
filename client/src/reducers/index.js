import { combineReducers } from 'redux';

import DemoReducer from './reducerDemo';
import {
  BAD_CREDENTIALS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  POST_CREATED,
  USER_RETRIEVED,
  SUCCESS_NOTIFICATION_ADD,
  NOTIFICATION_CLEAR,
} from '../actions/actions';

const INITIAL_STATE = {
  authenticated: false,
  errorMessage: ""
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_RETRIEVED:
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        errorMessage: "Nope."
      });
    case BAD_CREDENTIALS:
      return Object.assign({}, state, {
        errorMessage: action.payload.data.non_field_errors[0]
      });
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
}

const post = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATED:
      return Object.assign({}, state, {
        text: action.payload.data.text
      });
    default:
      return state;
  }
}

const notification = (state = {message: null}, action) => {
  switch (action.type) {
    case SUCCESS_NOTIFICATION_ADD:
      return Object.assign({}, state, {
        message: action.message
      });
    case NOTIFICATION_CLEAR:
      return Object.assign({}, state, {
        message: null
      });
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  user,
  post,
  notification,
});

export default rootReducer;
