import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Field, reduxForm } from 'redux-form';
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
            <h1>Sign Up</h1>
            {this.renderAlert()}
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Field 
                label="First Name"
                name="firstName"
                className="form-control" 
                component="input" 
                type="text"
                component={renderField}
                onFocus={handleFormFieldFocus} />
              <Field 
                label="Last Name"
                name="lastName"
                className="form-control" 
                component="input" 
                type="text"
                component={renderField}
                onFocus={handleFormFieldFocus} />
              <Field 
                label="Email"
                name="email"
                className="form-control" 
                component="input" 
                type="email"
                component={renderField}
                onFocus={handleFormFieldFocus} />
              <Field 
                label="Password"
                name="password"
                className="form-control" 
                component="input" 
                type="password"
                component={renderField}
                onFocus={handleFormFieldFocus}
                helpText="Minimum 8 Characters" />
              <div className="button-floor">
                <button type="submit" className="btn btn-green" disabled={this.props.invalid || this.props.submitting}>Register</button>
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

function mapStateToProps(state) {  
  return {
  };
}

Register = connect(
  state => ({
    errorMessage: state.auth.error,
    message: state.auth.message,
    initialValues: ('register' in state.form) ? state.form.register.values : {}
  }),
  { registerUser}
)(Register)

export default Register