import React, { Component } from 'react';
import { Link } from 'react-router';

class PostCard extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="post-card">
      <h3><Link to={`/posts/${this.props.slug}`}>{this.props.title}</Link></h3>
      <div className="date">{this.props.date}</div>
      <p>{this.props.summary}</p>
    </div>
    );
  }

}

export default PostCard;
