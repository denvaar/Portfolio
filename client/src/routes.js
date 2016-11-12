import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './containers/main';
import Header from './components/header';
import PostList from './containers/postList';
import Post from './components/post';
import PostCreate from './components/postCreate';
import Login from './components/login';
import requireAuth from './components/authentication';
import NotificationManager from './components/notificationManager';


export default (
  <Route path="/" component={Header}>
    <IndexRoute component={Main} />
    <Route path="/posts" component={requireAuth(PostList)} />
    <Route path="/posts/create" component={requireAuth(PostCreate)} />
    <Route path="/posts/:slug" component={requireAuth(Post)} />
    <Route path="/login" component={Login} />
  </Route>
);
