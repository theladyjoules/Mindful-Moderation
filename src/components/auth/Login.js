import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Field, reduxForm } from 'redux-form';  
import { Link } from 'react-router';  
import { isInvalidRequiredField, handleFormFieldFocus, renderField } from '../../utilities/forms';
import { loginUser } from '../../actions/auth_actions';

const form = reduxForm({  
  form: 'login'
});

class Login extends Component {  
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
              <Field 
                label="Email"
                name="email" 
                className="form-control" 
                component="input" 
                type="text"
                component={renderField}
                onFocus={handleFormFieldFocus} />
              <Field 
                label="Password"
                name="password" 
                className="form-control" 
                component="input" 
                type="password"
                component={renderField}
                onFocus={handleFormFieldFocus} />
              <div className="button-floor">
                <button type="submit" className="btn btn-green" disabled={this.props.invalid || this.props.submitting}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));  