import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class NotificationManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.setTimer = this.setTimer.bind(this);
  }
 
  componentWillReceiveProps(nextProps) {
    console.log('!!', nextProps.message, this.props.message)
    if (nextProps.message !== this.props.message) {
      this.setTimer();
      this.setState({visible: true});
    }
  }

  setTimer() {
    setTimeout(() => {
      this.setState({visible: false});
    }, 3000);
  }

  render() {
    let jsx = null;
    if (this.state.visible) jsx = (<p className="snackbar show"><i className="fa fa-check"></i> Success!</p>);
    return (
      <div>{jsx}</div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    message: state.notification.message
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationManager);

