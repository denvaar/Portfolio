import React, { Component, PropTypes } from 'react';
import axios from 'axios';

import profilePic from '../img/profilePic.png';

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
    return (
      <div className="body-content">
        <br/>
        <br/>
        <br/>
        <br/>
        <img className="profile-pic" src={profilePic}></img>
        <div dangerouslySetInnerHTML={{__html: this.state.content}} />
      </div>
    );
  }
}

export default About;
