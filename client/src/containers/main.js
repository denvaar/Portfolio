import React, { Component, PropTypes } from 'react';
import { createStore } from 'redux';

import About from '../components/about';
//import reducer from '../reducers/reducer';

class Main extends Component {
  render() {
    return (
      <div>
        <About />
        <br/>
        <p className='body-content'>- - - other sections will go here - - -</p>
      </div>
    );
  }
}

export default Main;
