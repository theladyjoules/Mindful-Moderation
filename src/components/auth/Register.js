import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { strings } from '../../utilities/strings';
import { isInvalidEmail, isInvalidPassword, isInvalidRequiredField, handleFormFieldFocus, renderField } from '../../utilities/forms';
import { registerUser } from '../../actions/auth_actions';

class Register extends Component {  
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
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
                <h1>Sign Up</h1>
              </div>
              {this.renderAlert()}
              <div className="form-field-wrapper">
                <Field 
                  label="First Name"
                  name="firstName"
                  component="input" 
                  type="text"
                  component={renderField}
                  onFocus={handleFormFieldFocus} />
                <Field 
                  label="Last Name"
                  name="lastName"
                  component="input" 
                  type="text"
                  component={renderField}
                  onFocus={handleFormFieldFocus} />
                <Field 
                  label="Email"
                  name="email"
                  component="input" 
                  type="email"
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
                  <button type="submit" className="btn btn-green" disabled={this.props.invalid || this.props.submitting}>Get Started</button>
                  <p>Already have an account? <Link to="/login">Login.</Link></p>
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
  if (isInvalidRequiredField(values, 'firstName')){
    errors.firstName = strings('required')
  }
  if (isInvalidRequiredField(values, 'lastName')){
    errors.lastName = strings('required')
  }
  if (isInvalidRequiredField(values, 'email')){
    errors.email = strings('required')
  }
  if (isInvalidEmail(values, 'email')){
    errors.email = strings('email')
  }
  if (isInvalidRequiredField(values, 'password')){
    errors.password = strings('required')
  }
  if (isInvalidPassword(values, 'password')) {
    errors.password = strings('password')
  }
  return errors
}

Register = reduxForm({  
  form: 'register',
  validate
})(Register)

Register = connect(
  state => ({
    errorMessage: state.auth.error,
    message: state.auth.message,
    initialValues: ('register' in state.form) ? state.form.register.values : {}
  }),
  { registerUser}
)(Register)

export default Register