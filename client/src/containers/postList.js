import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

import PostCard from '../components/postCard';
import SearchForm from '../components/searchForm';

class PostList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {posts: [], filterPosts: []};
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    var posts = this.getPosts();
  }

  getPosts() {
    var posts = [];
    return axios.get("http://localhost:8000/api/v1/posts/").then(
      response => {
        response.data.map((post) => {
          posts.push({
            'slug': post.slug,
            'title': post.title,
            'summary': post.summary,
            'date': post.date_created,
            'key': post.id
          });
        });
        this.setState({
          posts: posts,
          filterPosts: posts
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
    var postCards = this.state.filterPosts.map((post) => {
      return (
        <PostCard key={post.key}
                  title={post.title}
                  date={post.date}
                  slug={post.slug}
                  summary={post.summary} />
      );
    });
    var m, n;
    m = Math.ceil(postCards.length/3);
    n = Math.ceil(2* postCards.length/3);
    var firstColumn = postCards.slice(0, m);
    var secondColumn = postCards.slice(m, n);
    var thirdColumn = postCards.slice(n, postCards.length);
    console.log(this.props.user)
    return (
      <div className="body-content">
        <h2>Posts</h2>
        {this.props.user.authenticated &&
          <Link to={"/posts/create"}>New Post</Link>
        }
        <SearchForm onSearch={this.onSearch} />
        <div className="post-list-container">
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

