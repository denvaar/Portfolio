import { combineReducers } from 'redux';

import DemoReducer from './reducerDemo';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  BAD_CREDENTIALS
} from '../actions/actions';

const INITIAL_STATE = {
  authenticated: false
};

const auth = (state = INITIAL_STATE, action) => {
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
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  auth
});

export default rootReducer;
