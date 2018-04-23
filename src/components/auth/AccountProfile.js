import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Field, reduxForm } from 'redux-form';
import Loader from '../global/Loader';
import { strings } from '../../utilities/strings';
import { isInvalidEmail, isInvalidRequiredField, renderField } from '../../utilities/forms';
import { updateUser, getAccountData, toggleUpdateUserView } from '../../actions/auth_actions';

class AccountProfile extends Component {
  constructor(props) {
    super(props);
    this.props.getAccountData();
  }

  handleFormSubmit(formProps) {
    this.props.updateUser(formProps);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h2>Profile</h2>
          {this.props.isEditingProfile ? (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
              <button type="submit" className="btn btn-primary" disabled={this.props.invalid || this.props.submitting}>Update</button>
              <a className="btn" onClick={this.props.toggleUpdateUserView}>Cancel</a>
            </form>
          ) : (
            <div>
              <p>First Name: {this.props.content.firstName}</p>
              <p>Last Name: {this.props.content.lastName}</p>
              <p>Email Name: {this.props.content.email}</p>
              <a className="btn" onClick={this.props.toggleUpdateUserView}>Edit</a>
            </div>
          )}
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
  return errors
}

AccountProfile = reduxForm({  
  form: 'profile',
  enableReinitialize: true,
  validate
})(AccountProfile)

AccountProfile = connect(
  state => ({
    content: state.auth,
    isEditingProfile: state.auth.isEditingProfile,
    initialValues: state.auth,
  }),
  { updateUser, getAccountData, toggleUpdateUserView }
)(AccountProfile)

export default AccountProfile