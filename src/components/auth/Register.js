import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Field, reduxForm } from 'redux-form';
import { strings } from '../../utilities/strings';
import { isInvalidEmail, isInvalidPassword, isInvalidRequiredField, renderField } from '../../utilities/forms';
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
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      {this.renderAlert()}
      <div className="row">
        <div className="col-md-6">
          <Field
            name="firstName"
            type="text"
            autoComplete="given-name"
            component={renderField}
            label="First Name"
          />
        </div>
        <div className="col-md-6">
          <Field
            name="lastName"
            type="text"
            autoComplete="family-name"
            component={renderField}
            label="First Name"
          />
        </div>
      </div>
        <div className="row">
          <div className="col-md-12">
          <Field
            name="email"
            type="text"
            autoComplete="email"
            component={renderField}
            label="Email"
          />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Field
              name="password"
              type="password"
              autoComplete="password"
              helpText="8 characters, 1 uppercase, 1 lowercase, 1 number"
              component={renderField}
              label="Password"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={this.props.invalid || this.props.submitting}>Register</button>
      </form>
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