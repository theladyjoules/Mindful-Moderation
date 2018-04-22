import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import * as actions from '../../actions';

class Account extends Component {

  constructor(props) {
    super(props);

    this.props.getAccountData();
  }

  renderContent() {
    if(this.props) {
      return (
        <div>
          <p>First Name: {this.props.content.firstName}</p>
          <p>Last Name: {this.props.content.lastName}</p>
          <p>Email Name: {this.props.content.email}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return { content: state.auth };
}

export default connect(mapStateToProps, actions)(Account); 