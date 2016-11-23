import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class PostCard extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    let styles = {
      borderLeft: "6px solid " + this.props.color
    };
  
    return (
    <div className="post-card" style={styles}>
      {this.props.user.authenticated &&
        <Link to={`/posts/${this.props.slug}/edit`}>
          <i className="fa fa-pencil fa-2x" style={{float: "right"}}></i>
        </Link>
      }
      <h3><Link to={`/posts/${this.props.slug}`}>{this.props.title}</Link></h3>
      <div className="date">{this.props.date}</div>
      <p>{this.props.summary}</p>
    </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(PostCard);
