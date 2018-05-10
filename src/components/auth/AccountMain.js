import React, { Component } from 'react';
import { connect } from 'react-redux';  
import AccountProfile from './AccountProfile';
import AccountPassword from './AccountPassword';
import AccountData from './AccountData';

class Account extends Component {

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
    if(this.props.message) {
      return (
        <div>
          {this.props.message}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="account container">
        {this.renderAlert()}
        <AccountProfile />
        <AccountPassword />
        <AccountData />
      </div>
    );
  }
}

Account = connect(
  state => ({
    errorMessage: state.auth.error,
    message: state.auth.message
  }),
  null
)(Account)

export default Account 