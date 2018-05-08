import React, { Component } from 'react';  
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { getCookie } from '../../utilities/cookies';

export default function(ComposedComponent) {  
  class Authentication extends Component {

    componentWillMount() {
      // console.log(getCookie('token'))
      if(!getCookie('token')) {
        this.props.history.push('/login')
      }
    }

    componentWillUpdate(nextProps) {
      if(!getCookie('token')) {
        this.props.history.push('/login')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(withRouter(Authentication));

}