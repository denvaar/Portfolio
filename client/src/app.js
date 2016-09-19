import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory, IndexRoute, Route } from 'react-router';

import reducers from './reducers';

import Main from './containers/main';
import Main from './components/header';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={Header}>
        <IndexRoute component={Main}/>
        {/*
        <Route path="/posts" component={PostList}>
          <Route path="/posts/:postTitle" component={Post}/>
        </Route>
        */}
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
