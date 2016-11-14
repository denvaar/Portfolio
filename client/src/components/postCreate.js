import React, { Component, PropTypes } from 'react';
import Remarkable from 'remarkable';
import axios from 'axios';
import hljs from 'highlight.js';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import ColorPicker from './colorPicker';
import storage from '../utils/localStorageUtils';
import { createPost } from '../actions/actions';


class PostCreate extends Component {
  
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  componentWillMount() {
    let slug = this.props.params.slug;
    if (this.props.params.slug) {
      axios.get(`http://localhost:8000/api/v1/posts/${slug}`).then(
        response => {
          console.log(response.data)
          this.setState(response.data);
        }
      );
    }
  }

  handlePostSave(event) {
    event.preventDefault();
    let token = storage.get('auth-token');
    let data = {
      title: this.refs.title.value,
      content: this.refs.postBody.value,
      summary: this.refs.summary.value,
      color: this.state.color,
      is_published: true, //publish === "publish" ? true : false
      date_created: this.refs.date.value
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

  handleColorChange(color) {
    this.setState({color: color.hex });
  }

  render() {
    if (this.props.errors) {
      var errors = Object.keys(this.props.errors).map((f, index) => {
        return (<div key={index}>{f}: {this.props.errors[f]}</div>)
      });
    }

    let colorPickerProps = {
      color: this.state.color,
      handleColorChange: (color) => { this.setState({color: color.hex}) },
      handleClick: () => { this.setState({ displayColorPicker: !this.state.displayColorPicker }) },
      showPicker: this.state.displayColorPicker
    };

    return (
      <div className="posts body-content">
        <form>
          <div className="form-error">{this.props.errors && errors}</div>
          <input type="text" ref="title" placeholder="Title" value={this.state.title} />
          <input type="text" ref="date" placeholder="Date" value={this.state.date_created} />
          <input type="text" ref="summary" placeholder="Summary" value={this.state.summary} />
         
          <ColorPicker {...colorPickerProps} />

          <input type="checkbox"
                 id="publish"
                 ref="publish"
                 value="publish" />
            <label htmlFor="publish" style={{top: 2+"px", position: "relative"}}>
              &nbsp;Publish <i className="fa fa-newspaper-o"></i>
            </label>
          <textarea onChange={this.handleChange}
                    ref="postBody"
                    value={this.state.content}
                    className="editor"
                    placeholder="Write your post here using markdown syntax..." />
          <div className="hr-1" />
          <div className="posts live-editor"
               dangerouslySetInnerHTML={this.rawMarkup()} />
          <div className="action-group">
            <input type="submit" value="Save" onClick={(event) => {this.handlePostSave(event)}} />
            <input type="button" value="Cancel" onClick={() => { browserHistory.push("/posts"); }} />
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

