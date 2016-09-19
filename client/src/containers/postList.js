import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class PostList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        {/* hard-code some posts for now */}
        <ul>
          <li><Link to="/posts/first-post">First Post</Link></li>
          <li><Link to="/posts/second-post">Second Post</Link></li>
          <li><Link to="/posts/third-post">Third Post</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default PostList;
