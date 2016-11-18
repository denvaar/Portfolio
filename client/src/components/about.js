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
    return (
      <div className="body-content">
        <img className="profile-pic" src={profilePic}></img>
        <div className="skinny" dangerouslySetInnerHTML={{__html: this.state.content}} />
        
        <h2 className="center">Projects</h2>
        
        <div className="container-project skinny">
          <h4>STEM Fair System</h4>
          <p>Commissioned to create software for the 2016 Bridgerland Science and Technology Fair.
             Developed a <a href="https://github.com/denvaar/STEM-Fair-System">web application</a>
             to automate and help with the judging of entries and presentation of results.</p>
          <h5><u>Tools &amp; Technologies:</u><br/>Python, Django, Javascript</h5>
        </div>
        
        <div className="container-project skinny">
          <h4>Streaming Data Loader</h4>
          <p>Worked with Civil and Environmental Engineering Professor Jeffery Horsburgh
             to answer the question of how streaming time series data from environmental
             sensors can be efficiently and automatically loaded into relational databases 
             for publication, management, and sharing.</p>
          <h5><u>Tools &amp; Technologies:</u><br/>Python, Pandas, NumPy, wx, SQL</h5>
        </div>

        <div className="container-project skinny">
          <h4>Divvy</h4>
          <p>A fun and intuitive way to manage personal finances.
           This is a <a href="https://github.com/denvaar/divvy">work in progress</a>.</p>
          <h5><u>Tools &amp; Technologies:</u><br/>Python, Django, Javascript</h5>
        </div>

        <div className="container-project skinny">
          <h4>ODM2 Controlled Vocabulaies System</h4>
          <p>Contributed to an open source web application for managing Observation Data Model (ODM) Controlled Vocabularies.&nbsp;
          <a href="http://vocabulary.odm2.org">vocabulary.odm2.org</a></p>
          <h5><u>Tools &amp; Technologies:</u><br/>Python, Django, Apache, SQL, Tastypie</h5>
        </div>
        
        <div className="container-project skinny">
          <h4>Capital One Challenge</h4>
          <p>Submitted a proposal for a small data mining consulting project through <a href="http://www.mindsumo.com">MindSumo</a>
          &nbsp;for Capital One Financial Corporation. Direct link <a href="https://www.mindsumo.com/solutions/93928">here</a>.</p>
          <h5><u>Tools &amp; Technologies:</u><br/>Python, Pandas, NumPy</h5>
        </div>
       
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
