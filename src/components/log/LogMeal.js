import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form';
import moment from 'moment'
import Loader from '../global/Loader';
// import MoodField from './MoodField';
import { strings } from '../../utilities/strings';
import { isInvalidRequiredField, handleFormFieldFocus, renderField, renderTextarea, renderRadioInput } from '../../utilities/forms';
import { logMeal } from '../../actions/log_actions';
import './styles/log.css';

class LogMeal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  handleFormSubmit(values) {
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="form-header">
                <h1>Log Meal</h1>
              </div>
              <div className="form-field-wrapper">
                <Field
                  name="mealDate"
                  label="Meal Date"
                  component={renderField}
                  onFocus={handleFormFieldFocus}
                  type="date"
                  required="required"
                />
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <Field
                      name="mealTime"
                      label="Meal Start Time"
                      component={renderField}
                      type="time" 
                      required="required"
                      onFocus={handleFormFieldFocus}
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <Field
                      name="mealDuration"
                      type="number"
                      label="Meal Duration"
                      helpText="in minutes"
                      component={renderField}
                      onFocus={handleFormFieldFocus}
                    />
                  </div>
                </div>
                <Field 
                  label="Meal Name"
                  name="mealName"
                  component="input" 
                  type="text"
                  component={renderField}
                  onFocus={handleFormFieldFocus}
                  helpText="ex: lunch, afternoon snack" />
                <Field
                  name="mealFoods"
                  type="text"
                  label="Food Eaten"
                  helpText="ex: apple, steak dinner"
                  component={renderTextarea}
                  onFocus={handleFormFieldFocus}
                />
                <div className="form-field radio-group">
                  <label className="hunger-label"><span>Hunger Before{this.props.mealHungerBefore ? ':' : null}</span> {this.props.mealHungerBefore ? (<span className="hunger-description">{this.props.mealHungerBefore} &ndash; {strings('hungerScaleWord'+this.props.mealHungerBefore)}</span>) : null}</label>
                  <div className="radio-button-wrapper">
                    <Field
                      name="mealHungerBefore"
                      id="1"
                      label="1"
                      value="1"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerBeforeChange}
                    />
                    <Field
                      name="mealHungerBefore"
                      id="2"
                      label="2"
                      value="2"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerBeforeChange}
                    />
                    <Field
                      name="mealHungerBefore"
                      id="3"
                      label="3"
                      value="3"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerBeforeChange}
                    />
                    <Field
                      name="mealHungerBefore"
                      id="4"
                      label="4"
                      value="4"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerBeforeChange}
                    />
                    <Field
                      name="mealHungerBefore"
                      id="5"
                      label="5"
                      value="5"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerBeforeChange}
                    />
                    <Field
                      name="mealHungerBefore"
                      id="6"
                      label="6"
                      value="6"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerBeforeChange}
                    />
                    <Field
                      name="mealHungerBefore"
                      id="7"
                      label="7"
                      value="7"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerBeforeChange}
                    />
                    <Field
                      name="mealHungerBefore"
                      id="8"
                      label="8"
                      value="8"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerBeforeChange}
                    />
                    <Field
                      name="mealHungerBefore"
                      id="9"
                      label="9"
                      value="9"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerBeforeChange}
                    />
                    <Field
                      id="10"
                      value="10"
                      name="mealHungerBefore"
                      label="10"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerBeforeChange}
                    />
                  </div>
                </div>
                <div className="form-field radio-group">
                  <label className="hunger-label"><span>Hunger After{this.props.mealHungerAfter ? ':' : null}</span> {this.props.mealHungerAfter ? (<span className="hunger-description">{this.props.mealHungerAfter} &ndash; {strings('hungerScaleWord'+this.props.mealHungerAfter)}</span>) : null}</label>
                  <div className="radio-button-wrapper">
                    <Field
                      name="mealHungerAfter"
                      id="1"
                      label="1"
                      value="1"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerAfterChange}
                    />
                    <Field
                      name="mealHungerAfter"
                      id="2"
                      label="2"
                      value="2"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerAfterChange}
                    />
                    <Field
                      name="mealHungerAfter"
                      id="3"
                      label="3"
                      value="3"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerAfterChange}
                    />
                    <Field
                      name="mealHungerAfter"
                      id="4"
                      label="4"
                      value="4"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerAfterChange}
                    />
                    <Field
                      name="mealHungerAfter"
                      id="5"
                      label="5"
                      value="5"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerAfterChange}
                    />
                    <Field
                      name="mealHungerAfter"
                      id="6"
                      label="6"
                      value="6"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerAfterChange}
                    />
                    <Field
                      name="mealHungerAfter"
                      id="7"
                      label="7"
                      value="7"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerAfterChange}
                    />
                    <Field
                      name="mealHungerAfter"
                      id="8"
                      label="8"
                      value="8"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerAfterChange}
                    />
                    <Field
                      name="mealHungerAfter"
                      id="9"
                      label="9"
                      value="9"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerAfterChange}
                    />
                    <Field
                      id="10"
                      value="10"
                      name="mealHungerAfter"
                      label="10"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerAfterChange}
                    />
                  </div>
                </div>
                <Field
                  name="mealSetting"
                  type="text"
                  label="Meal Setting"
                  helpText="Ex: park bench, dining room"
                  component={renderField}
                  onFocus={handleFormFieldFocus}
                />  
                <Field
                  name="mealNotes"
                  type="text"
                  label="Notes"
                  component={renderTextarea}
                  onFocus={handleFormFieldFocus}
                />
                <div className="submit-wrapper">
                  <button type="submit" className="btn btn-green" disabled={this.props.invalid || this.props.submitting}>Log</button>
                  <p><Link to='/'>Cancel</Link></p>
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
  const errors = {}
  // if (isInvalidRequiredField(values, 'firstName')){
  //   errors.firstName = strings('required')
  // }
  // if (isInvalidRequiredField(values, 'lastName')){
  //   errors.lastName = strings('required')
  // }
  // if (isInvalidRequiredField(values, 'email')){
  //   errors.email = strings('required')
  // }
  // if (isInvalidEmail(values, 'email')){
  //   errors.email = strings('email')
  // }
  return errors
}

LogMeal = reduxForm({  
  form: 'logMeal',
  enableReinitialize: true,
  validate
})(LogMeal)

LogMeal = connect(
  state => ({
    initialValues: ('logMeal' in state.form) ? state.form.logMeal.values : {mealDate: moment().format('YYYY-MM-DD'), mealTime: moment().format('kk:mm')},
    mealHungerBefore: ('logMeal' in state.form && 'values' in state.form.logMeal && 'mealHungerBefore' in state.form.logMeal.values) ? state.form.logMeal.values.mealHungerBefore : null,
    mealHungerAfter: ('logMeal' in state.form && 'values' in state.form.logMeal && 'mealHungerAfter' in state.form.logMeal.values) ? state.form.logMeal.values.mealHungerAfter : null
  }),
  { logMeal }
)(LogMeal)

export default LogMeal