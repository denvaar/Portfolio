import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import Remarkable from 'remarkable';
import hljs from 'highlight.js';
import { BlockPicker } from 'react-color';

import { createPost } from '../actions/actions';
import storage from '../utils/localStorageUtils';

class PostCreate extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {

  }

  handlePostSave(event) {
    event.preventDefault();
    const text = this.refs.postBody.value;
    const title = this.refs.title.value;
    const date = this.refs.date.value;
    const summary = this.refs.summary.value;
    const publish = this.refs.publish.value;

    let token = storage.get('auth-token');
    let data = {
      title: title,
      content: text,
      summary: summary,
      is_published: true, //publish === "publish" ? true : false
      date_created: date
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
    if (this.props.errors) {
      var errors = Object.keys(this.props.errors).map((f, index) => {
        return (<div key={index}>{f}: {this.props.errors[f]}</div>)
      });
    }

    return (
      <div className="posts body-content">
        <form>
          <div className="form-error">{this.props.errors && errors}</div>
          <input type="text" ref="title" placeholder="Title" />
          <input type="text" ref="date" placeholder="Date" />
          <input type="text" ref="summary" placeholder="Summary" />
          
          <div className="swatch--outer">
            <div className="swatch--inner" style={{background: `${this.state.color}`}} onClick={() => {
              this.setState({ displayColorPicker: !this.state.displayColorPicker });
            }}/>
          </div>
          
          
          {this.state.displayColorPicker && <BlockPicker onChange={(color) => {
            console.log(color.hex);
            this.setState({color: color.hex });
          }} />}
          <input type="checkbox"
                 id="publish"
                 ref="publish"
                 value="publish" />
            <label htmlFor="publish" style={{top: 2+"px", position: "relative"}}>
              &nbsp;Publish <i className="fa fa-newspaper-o"></i>
            </label>
          <textarea onChange={this.handleChange} ref="postBody" className="editor" placeholder="Write your post here using markdown syntax..." />
          <div className="hr-1" />
          <div className="posts live-editor"
               dangerouslySetInnerHTML={this.rawMarkup()} />
          <div className="action-group">
            <input type="submit" value="Save" onClick={(event) => {this.handlePostSave(event)}} />
            <input type="button" value="Cancel" />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.post.errors
  }
}

export default connect(mapStateToProps, { createPost })(PostCreate);

