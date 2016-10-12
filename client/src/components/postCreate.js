import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import Remarkable from 'remarkable';
import hljs from 'highlight.js';

import { createPost } from '../actions/actions';
import storage from '../utils/localStorageUtils';

class PostCreate extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handlePostSave(event) {
    event.preventDefault();
    const text = this.refs.postBody.value;
    let token = storage.get('auth-token');
    console.log(`sending ${text} to api...`);
    let data = {
      title: "TEST",
      content: text,
      slug: "TEST",
      summary: "A TEST",
    };
    
    this.props.createPost(data, token);
  }

  rawMarkup() {
    var md = new Remarkable({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {}
        }   

        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {}

        return ''; // use external default escaping
      }   
    }); 
    return { __html: md.render(this.state.content) };
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  render() {
    return (
      <div className="posts body-content">
        <div dangerouslySetInnerHTML={this.rawMarkup()} /> 
        <textarea onChange={this.handleChange} ref="postBody" placeholder="Write your post here..." />
        <button onClick={(event) => {this.handlePostSave(event)}}>Save</button>
      </div>
    );
  }
}

export default connect(null, { createPost })(PostCreate);
