import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import Loader from '../global/Loader'
import { isInvalidRequiredField, renderField } from '../../utilities/forms'
import { strings } from '../../utilities/strings'
import { setStatemealData } from '../../actions/index'

class LogMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      errorMessage:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setErrorMessage = this.setErrorMessage.bind(this);
  }

  componentWillMount(){
    document.body.classList.add('log');
    // let advanceMessage = getUrlParameter('advancemessage');
    // if(this.props.user.duplicateRegistrationAttempted && this.props.visitedPages[this.props.visitedPages.length - 2] === 'join/personalinformation'){
    //   this.setErrorMessage(getMessage('emailAlreadyRegistered'));
    // }
    // if(advanceMessage){
    //   this.setErrorMessage(getMessage(advanceMessage));
    // }
  }

  componentDidMount(){
    document.body.classList.add('auth');
  }

  componentWillUnmount() {
    document.body.classList.remove('auth');
  }

  toggleLoader(){
    this.setState({isLoading:!this.state.isLoading});
  }

  setErrorMessage(em){
    this.setState({errorMessage: em});
  }

  handleSubmit(values){
    this.toggleLoader();

    this.props.setStateUserData({isAuthenticated:true});
    // setAuthToken(values.email, values.password).then((data) => {
    //   if(isAuthenticated()){
    //     sessionStorage.setItem('username', values.email);
    //     loginUser(values.email, values.password).then((data) => {
    //       if(data.CustomerId){
    //         this.toggleLoader();
    //         sessionStorage.setItem('customerId', data.CustomerId);
    //         this.props.setStateUserData({isAuthenticated:true});
    //       }
    //       else{
    //         this.setErrorMessage(getMessage('login'));
    //       }
    //     });
    //   }
    //   else{
    //     this.setErrorMessage(getMessage('login'));
    //   }
    // });
  }

  render() {
    let message = (this.state.errorMessage.length) ? (<div className="error-message-box">{this.state.errorMessage}</div>) : null;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-7 col-lg-5">
              {message}
              {this.isLoading ? (
                <Loader />
              ) : (
                <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                  <Field
                    name="email"
                    type="text"
                    autoComplete="email"
                    component={renderField}
                    label="Email"
                  />
                  <Field
                    name="password"
                    type="password"
                    autoComplete="password"
                    component={renderField}
                    label="Password"
                  />
                  <div className="input-sub-link">
                    <Link to='/forgot-password'>Forgot Password?</Link>
                  </div>
                  <button type="submit" disabled={this.props.invalid || this.props.submitting} className="btn btn-amaranth">Submit</button>
                  <div className="button-wrapper">
                    <p>Not a member? <Link to='/sign-up'>Sign Up</Link></p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const MapStateToProps = dispatch => {
  // return {
  //   setStateUserData: data => dispatch(setStateUserData(data))
  // };
};

const validate = values =>{
  const errors = {}
  // if (isInvalidRequiredField(values, 'email')){
  //   errors.email = getMessage('required')
  // }
  // if (isInvalidRequiredField(values, 'password')) {
  //   errors.password = getMessage('required')
  // }
  return errors
}

LogMeal = reduxForm({
  // a unique name for the form
  form: 'login',
  validate,
})(LogMeal)

LogMeal = connect(
  state => ({
    initialValues: ('login' in state.form) ? state.form.login.values : {},
    user: state.mainReducer.user,
    visitedPages: state.mainReducer.visitedPages
  }),
  MapStateToProps
)(LogMeal)

export default LogMeal