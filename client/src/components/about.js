import React, { Component, PropTypes } from 'react';
import axios from 'axios';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/v1/about-section/1/").then(
      response => {
        console.log(response.data);
        this.setState({
          content: response.data.content
        });
      }
    );
  }

  render() {
    return (
      <div className="body-content" dangerouslySetInnerHTML={this.state.content}>
        <p><i>Updated: September 2016</i></p>
      </div>
    );
  }
}

export default About;
