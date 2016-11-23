import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clearNotifications } from '../actions/actions';

class NotificationManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.setTimer = this.setTimer.bind(this);
  }
 
  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== this.props.message && nextProps.message) {
      this.setTimer();
      this.setState({visible: true});
    }
  }

  setTimer() {
    setTimeout(() => {
      this.props.clearNotifications();
      this.setState({visible: false});
    }, 3000);
  }

  render() {
    let jsx = null;
    if (this.state.visible) jsx = (<p className="snackbar show"><i className="fa fa-check"></i> {this.props.message}</p>);
    return (
      <div>{jsx}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({clearNotifications}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationManager);

