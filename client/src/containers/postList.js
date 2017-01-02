import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

import apiConfig from '../utils/apiConfig';
import PostCard from '../components/postCard';
import SearchForm from '../components/searchForm';

class PostList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {posts: [], filterPosts: [], fetched: false};
    this.onSearch = this.onSearch.bind(this);
    this.handlePostCreate = this.handlePostCreate.bind(this);
  }

  componentDidMount() {
    var posts = this.getPosts();
  }

  handlePostCreate() {
    browserHistory.push("/posts/create");
  }

  getPosts() {
    let posts = [];
    return axios.get(`${apiConfig}/posts/`).then(
      response => {
        response.data.map((post) => {
          posts.push({
            'slug': post.slug,
            'title': post.title,
            'summary': post.summary,
            'date': post.date_created,
            'color': post.color,
            'published': post.is_published,
            'key': post.id
          });
        });
        this.setState({
          posts: posts,
          filterPosts: posts,
          fetched: true
        });
      }
    );
  }
  
  onSearch(text) {
    var filterPosts = this.state.posts.filter((obj) => {
      return obj.title.toLowerCase().includes(text.toLowerCase());
    });
    this.setState({filterPosts: filterPosts});
  }

  render() {
    let posts = this.state.filterPosts;
    if (!this.props.user.authenticated) {
      posts = posts.filter(obj => obj.published);
    }
    var postCards = posts.map((post) => {
      return (
        <PostCard key={post.key}
                  title={post.title}
                  date={post.date}
                  published={post.published}
                  slug={post.slug}
                  color={post.color}
                  summary={post.summary} />
      );
    });
    var m, n;
    m = Math.ceil(postCards.length/3);
    n = Math.ceil(2* postCards.length/3);
    var firstColumn = postCards.slice(0, m);
    var secondColumn = postCards.slice(m, n);
    var thirdColumn = postCards.slice(n, postCards.length);
    return (
      <div className="post-container">
        <div className="push--top" />
        <h2>Posts</h2>
        
        {this.props.user.authenticated &&
          <button className="post-create"
                  onClick={this.handlePostCreate}>
            New Post
          </button>
        }
        
        <SearchForm onSearch={this.onSearch} />
        <div className="hr-1" />
        <div className={this.state.fetched ? "post-list-container" : "loading-container"}>
          {!this.state.fetched &&
            <div className="loading-display">
              <i className="fa fa-snowflake-o fa-3x fa-spin"></i>
              <p>Loading...</p>
            </div>
          }
          <div className="column">
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {firstColumn}
            </ReactCSSTransitionGroup>
          </div>
          <div className="column">
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {secondColumn}
            </ReactCSSTransitionGroup>
          </div>
          <div className="column">
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {thirdColumn}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(PostList);

