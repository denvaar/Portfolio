import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import axios from 'axios';


class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: []};
  }

  componentWillMount() {
    var posts = [];
    axios.get("http://localhost:8000/api/v1/posts/").then(
      response => {
        response.data.map((post) => {
          posts.push({
            'slug': post.slug,
            'title': post.title
          });
        });
        this.setState({
          posts: posts,
        });
        console.log('^^^', this.state);
      }
    );
  }

  render() {
    console.log(this.state.posts);
    return (
      <div>
        <h2>Posts</h2>
        <ul>
          { this.state.posts.map((post) => {
              return <li><Link to={"/posts/"+post.slug}>{post.title}</Link></li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default PostList;
