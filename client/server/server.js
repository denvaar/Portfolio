/* eslint-disable no-console, no-use-before-define */
import path from 'path'
import Express from 'express'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { match, RouterContext } from 'react-router';
import routes from '../common/routes';
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../common/reducers';

const app = new Express()
const port = 3000
const isDev = true;
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))


// This is fired every time the server side receives a request
app.use(handleRender)

function handleRender(req, res) {
  match({ routes, location: req.url },
    (err, redirect, props) => {
      if (err) res.status(500).send(err.message);
      else if (redirect) res.redirect(302, redirect.pathname + redirect.search);
      else if (props) {
        // RoutingContext ??
        const store = createStoreWithMiddleware(reducers);
        
        const initialView = (
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        );
        
        const state = store.getState();
        const html = renderToString(initialView);
        res.send(renderFullPage(html, state));
      
      } else res.status(404).send('Not Found');
    });
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script type="application/javascript" src="/static/bundle.js"></script>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
      </body>
    </html>
    `
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

