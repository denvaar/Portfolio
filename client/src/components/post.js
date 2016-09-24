import React, { Component, PropTypes } from 'react';

class Post extends Component {
  render() {
    return (
      <div className='posts'>
        <p>{this.props.params.slug}</p>
      </div>
    );
  }
}

export default Post;
