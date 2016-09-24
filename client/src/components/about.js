import React, { Component, PropTypes } from 'react';
import axios from 'axios';

class About extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/v1/about-section/1/").then(
      response => {
        this.setState({
          content: response.data.content
        });
      }
    );
  }

  render() {
    return React.createElement('div',
      {
        className: 'body-content',
        dangerouslySetInnerHTML: {__html: this.state.content}
      }
    );
  }
}

export default About;
