import ColorPicker from './colorPicker';
import React, { Component } from 'react';
import Remarkable from 'remarkable';
import apiConfig from '../utils/apiConfig';
import hljs from 'highlight.js';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createPost, editPost, deletePost } from '../actions/actions';
import storage from '../utils/localStorageUtils';
import axios from 'axios';
import Modal from './modal';


class PostCreate extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: '',
      color: undefined
    };
    this.rawMarkup = this.rawMarkup.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlePostDelete = this.handlePostDelete.bind(this);  
  }

  componentWillMount() {
    if (this.props.params.slug) {
      axios.get(`${apiConfig}/posts/${this.props.params.slug}`).then(response => {
        console.log(response.data)
        this.refs.title.value = response.data.title;
        this.refs.date.value = response.data.date_created;
        this.refs.summary.value = response.data.summary;
        this.refs.postBody.value = response.data.content;
        this.refs.publish.checked = response.data.is_published;
        this.setState({color: response.data.color, content: response.data.content });
      });
    }
  }

  handleSave() {
    const data = {
      title: this.refs.title.value,
      content: this.refs.postBody.value,
      summary: this.refs.summary.value,
      date_created: this.refs.date.value,
      color: this.state.color,
      is_published: this.refs.publish.checked,
    };
    const token = storage.get('auth-token');
    if (this.props.params.slug) {
      this.editPost(data, token);
    } else {
      this.createPost(data, token);
    }
  }

  editPost(data, token) {
    const config = {headers: {'Authorization': `JWT ${token}`}};
    axios.patch(`${apiConfig}/posts/${this.props.params.slug}/edit/`, data, config).then(response => {
      this.props.editPost();
    }).catch(error => {
      if (error.response.status != 500) {
        this.setState({errors: error.response.data})
      } else {
        this.setState({errors: {"": "Internal Server Error"}});
      }
    });
  }

  createPost(data, token) {
    const config = {headers: {'Authorization': `JWT ${token}`}};
    axios.post(`${apiConfig}/posts/create/`, data, config).then(response => {
      this.props.createPost();
    }).catch(error => {
      if (error.response.status != 500) {
        this.setState({errors: error.response.data})
      } else {
        this.setState({errors: {"": "Internal Server Error"}});
      }
    });
  }

  rawMarkup() {
    let md = new Remarkable({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (error) {}
        }
        try {
          return hljs.highlightAuto(str).value;
        } catch (error) {}
        return '';
      }
    });
    return { __html: md.render(this.state.content) };
  }

  handlePostDelete(event) {
    event.preventDefault();

    let token = storage.get('auth-token');
    this.props.deletePost(this.props.params.slug, token);
  }

  render() {
    let errors = Object.keys(this.state.errors).map((field, i) => {
      return <li key={i}>{field}: {this.state.errors[field]}</li>
    });
    
    let colorPickerProps = {
      color: this.state.color,
      handleColorChange: (color) => {this.setState({color: color.hex})},
      handleClick: () => {this.setState({displayColorPicker: !this.state.displayColorPicker})},
      showPicker: this.state.displayColorPicker
    };

    return (
      <div className="body-content">
        <div className="push--top" />
        {this.props.params.slug &&
         this.state.showModal &&
         <Modal text={`Are you sure you want to delete '${this.refs.title.value}' ?`}
           callback={this.handlePostDelete}
           cancel={() => {
             this.setState({
               showModal: !this.state.showModal 
             });}
           } />
        } 
        <div className="form-error"><ul>{errors}</ul></div>
        <input type="text" ref="title" placeholder="Title" />
        <input type="text" ref="date" placeholder="Date" defaultValue={this.props.params.slug ? "" : moment().format("YYYY-MM-DD")} />
        <input type="text" ref="summary" placeholder="Summary" />
        <ColorPicker {...colorPickerProps} />
        <input type="checkbox" ref="publish" id="publish" />
        <label htmlFor="publish"> Publish</label>
        <textarea ref="postBody" className="editor" placeholder="Write post here using markdown syntax..." onChange={(event) => {this.setState({content: event.target.value})}} />
        <div className="hr-1" />
        <div className="live-editor" dangerouslySetInnerHTML={this.rawMarkup()} />
        <div className="action-group">
          <input type="button" className="submit-button" value="Save" onClick={this.handleSave} />
          <input type="button" value="Cancel" className="form-button" onClick={() => browserHistory.push("/posts")} />
          <button className="delete-btn" onClick={() => this.setState({showModal: true})}><i className="fa fa-trash-o fa-2x"></i></button>
        </div>
      </div>
    );
  }
}
  
PostCreate.propTypes = {
  createPost: React.PropTypes.func.isRequired, 
  editPost: React.PropTypes.func.isRequired,
  deletePost: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, { createPost, editPost, deletePost})(PostCreate);
