import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

import Remarkable from 'remarkable';
import hljs from 'highlight.js';

import apiConfig from '../utils/apiConfig';

class Post extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    var slug = this.props.params.slug;
    axios.get(`${apiConfig}/posts/${slug}`).then(
      response => {
        this.setState(response.data);
      }
    );
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
  
  render() {
    return (
      <div>
        <div className="push--top" />
        <div className="post post-content">
          <div className="post-nav-container">
            <Link to="/posts">
              <i className="fa fa-list"></i>
              <span className="post-nav">All posts</span>
            </Link>
            <Link to="/posts">
              <i className="fa fa-file-o"></i>
              <span className="post-nav">Previous</span>
            </Link>
            <Link to="/posts">
              <i className="fa fa-file-o"></i>
              <span className="post-nav">Next</span>
            </Link>
          </div>
          <h1>{this.state.title}</h1>
          <p className="italic-text">{this.state.date_created}</p>
          <hr className="hr1" style={{color: this.state.color}}/>
          <div dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      </div>
    );
  }
}

export default Post;
