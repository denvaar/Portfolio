import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import apiConfig from '../utils/apiConfig';
import profilePic from '../img/profilePic.png';

class About extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get(`${apiConfig}/about-section/1/`).then(
      response => {
        this.setState({
          content: response.data.content
        });
      }
    );
  }

  render() {
    console.log("user about", this.props.user);
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {})(About);
