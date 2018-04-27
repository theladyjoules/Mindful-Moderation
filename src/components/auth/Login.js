import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Field, reduxForm } from 'redux-form';  
import { strings } from '../../utilities/strings';
import { Link } from 'react-router-dom'
import { isInvalidRequiredField, handleFormFieldFocus, renderField } from '../../utilities/forms';
import { loginUser } from '../../actions/auth_actions';

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
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="form-header">
                <h1>Login</h1>
                <p>New to Mindful Moderation? <Link to="/register">Sign up for free.</Link></p>
              </div>
              {this.renderAlert()}
              <div className="form-field-wrapper">
                <Field 
                  label="Email"
                  name="email" 
                  component="input" 
                  type="text"
                  component={renderField}
                  onFocus={handleFormFieldFocus} />
                <Field 
                  label="Password"
                  name="password"  
                  component="input" 
                  type="password"
                  component={renderField}
                  onFocus={handleFormFieldFocus} />
                <div className="submit-wrapper">
                  <button type="submit" className="btn btn-green" disabled={this.props.invalid || this.props.submitting}>Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const validate = values =>{
  console.log(values)
  const errors = {}
  if (isInvalidRequiredField(values, 'email')){
    errors.email = strings('required')
  }
  if (isInvalidRequiredField(values, 'password')){
    errors.password = strings('required')
  }
  return errors
}

Login = reduxForm({  
  form: 'login',
  validate
})(Login)

Login = connect(
  state => ({
    errorMessage: state.auth.error,
    message: state.auth.message,
    initialValues: ('login' in state.form) ? state.form.login.values : {}
  }),
  { loginUser }
)(Login)

export default Login