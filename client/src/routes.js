import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './containers/main';
import Header from './components/header';
import PostList from './containers/postList';
import Post from './components/post';
import Login from './components/login';
import requireAuth from './components/authentication';

export default (
  <Route path="/" component={Header}>
    <IndexRoute component={Main} />
    <Route path="/posts" component={PostList} />
    <Route path="/posts/:slug" component={Post} />
    <Route path="/login" component={Login} />
  </Route>
);
