import React, { Component, PropTypes } from 'react';
import { createStore } from 'redux';

import About from '../components/about';
//import reducer from '../reducers/reducer';

class Main extends Component {
  render() {
    return (
      <div>
        <About />
      
      </div>
    );
  }
}

export default Main;
