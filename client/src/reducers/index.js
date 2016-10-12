import { combineReducers } from 'redux';

import DemoReducer from './reducerDemo';
import {
  POST_CREATED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAILURE,
  BAD_CREDENTIALS
} from '../actions/actions';

const INITIAL_STATE = {
  authenticated: false
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        errorMessage: 'An error occurred trying to log in.'
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

const rootReducer = combineReducers({
  user,
  post
});

export default rootReducer;
