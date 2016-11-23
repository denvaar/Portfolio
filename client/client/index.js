import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk'

import reducers from '../common/reducers';
import routes from '../common/routes';
import '../style/style.css'; 

const initialState = window.__INITIAL_STATE__;
//const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = applyMiddleware(thunkMiddleware)(createStore)(reducers, initialState);
/*const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);*/


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('app'));

if (module.hot) module.hot.accept();

