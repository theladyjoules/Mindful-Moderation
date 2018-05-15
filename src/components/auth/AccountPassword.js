import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Field, reduxForm } from 'redux-form';
import Loader from '../global/Loader';
import { strings } from '../../utilities/strings';
import { isInvalidPassword, isInvalidPasswordConfirm, isInvalidRequiredField, renderField } from '../../utilities/forms';
import { updatePassword, toggleUpdatePasswordView } from '../../actions/auth_actions';

class AccountPassword extends Component {
  constructor(props) {
    super(props);
  }

  handleFormSubmit(formProps) {
    this.props.updatePassword(formProps);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="account-section col-xs-12 col-md-6">
        <h2>Password</h2>
          {this.props.isEditingPassword ? (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="row">
                <div className="col-xs-12">
                  <Field
                    name="currentPassword"
                    type="text"
                    component={renderField}
                    label="Current Password"
                  />
                </div>
                <div className="col-xs-12">
                  <Field
                    name="password"
                    type="text"
                    component={renderField}
                    label="New Password"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                <Field
                  name="passwordConfirm"
                  type="text"
                  component={renderField}
                  label="Confirm New Password"
                />
                </div>
              </div>
              <div className="btn-wrapper">
                <a className="link-pair" onClick={this.props.toggleUpdatePasswordView}>cancel</a>
                <button type="submit" className="btn btn-green" disabled={this.props.invalid || this.props.submitting}>Update</button>
              </div>
            </form>
          ) : (
            <div className="btn-wrapper">
              <a className="btn btn-green" onClick={this.props.toggleUpdatePasswordView}>Edit</a>
            </div>
          )}
      </div>
    );
  }
}

const validate = values =>{
  const errors = {}
  if (isInvalidRequiredField(values, 'currentPassword')){
    errors.currentPassword = strings('required')
  }
  if (isInvalidRequiredField(values, 'password')){
    errors.password = strings('required')
  }
  if (isInvalidPassword(values, 'password')) {
    errors.password = strings('password')
  }
  if (isInvalidRequiredField(values, 'passwordConfirm')){
    errors.passwordConfirm = strings('required')
  }
  if (isInvalidPasswordConfirm(values, 'password', 'passwordConfirm')) {
    errors.passwordConfirm = strings('passwordConfirm')
  }
  return errors
}

AccountPassword = reduxForm({  
  form: 'updatePassword',
  enableReinitialize: true,
  validate
})(AccountPassword)

AccountPassword = connect(
  state => ({
    isEditingPassword: state.auth.isEditingPassword
  }),
  { updatePassword, toggleUpdatePasswordView }
)(AccountPassword)

export default AccountPassword