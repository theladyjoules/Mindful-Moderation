import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form';
import $ from 'jquery';
import moment from 'moment'
import Loader from '../global/Loader';
import MoodField from './MoodField';
import { strings } from '../../utilities/strings';
import { isInvalidRequiredField, renderTextField, renderDatePicker, renderTimePicker, renderSelectField, renderTextarea, renderRadioGroup } from '../../utilities/forms';
import { logMeal } from '../../actions/log_actions';
import './styles/log.css';

class LogMeal extends Component {
  constructor(props) {
    super(props);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
  }

  componentDidMount(){
    $('.ion-clock.im-btn').trigger('click');
  }

  handleFormSubmit(formProps) {
    this.props.logMeal(formProps);
  }

  handleDatePickerChange(m){
    this.setState({ m });
    console.log(m)
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h1>Log Meal</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <MoodField />
          <Field
            id="mealName"
            name="mealName"
            type="text"
            label="Meal Name"
            helpText="Ex: Lunch, Afternoon Snack"
            component={renderTextField}
            className="md-cell md-cell--12"
          />
          <Field
            id="mealDate"
            name="mealDate"
            label="Meal Date"
            maxDate={new Date()}
            className=""
            component={renderDatePicker}
          />
          <Field
            id="mealStartTime"
            name="mealStartTime"
            label="Meal Start Time"
            component={renderTimePicker}
            floatingLabelText="Meal Start Time"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            type="text" 
          />
          <Field
            id="mealDuration"
            name="mealDuration"
            type="text"
            label="Meal Duration"
            helpText="In Minutes"
            component={renderTextField}
            className="md-cell md-cell--12"
          />
          <Field
            id="mealFoods"
            name="mealFoods"
            type="text"
            label="Food Eaten"
            helpText="Ex: apple, steak dinner"
            component={renderTextarea}
            className="md-cell md-cell--12"
            rows={2}
          />
          <Field
            id="mealHungerBefore"
            name="mealHungerBefore"
            label="Hunger Before"
            type="radio"
            component={renderRadioGroup}
            className="md-cell md-cell--12"
          />
          <Field
            id="mealHungerAfter"
            name="mealHungerAfter"
            label="Hunger After"
            type="radio"
            component={renderRadioGroup}
            className="md-cell md-cell--12"
          />
          <Field
            id="mealSetting"
            name="mealSetting"
            type="text"
            label="Meal Setting"
            helpText="Ex: park bench, dining room"
            component={renderTextField}
            className="md-cell md-cell--12"
          />
          <Field
            id="mealMoods"
            name="mealMoods"
            type="text"
            label="Mood"
            helpText="Ex: happy, stressed out"
            component={renderTextField}
            className="md-cell md-cell--12"
          />          
          <Field
            id="mealNotes"
            name="mealNotes"
            type="text"
            label="Notes"
            component={renderTextarea}
            className="md-cell md-cell--12"
            rows={2}
          />
          
          <button type="submit" className="btn btn-primary" disabled={this.props.invalid || this.props.submitting}>Log</button>
          <Link to='/' className="btn">Cancel</Link>
        </form>
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
    initialValues: ('logMeal' in state.form) ? state.form.logMeal.values : {}
  }),
  { logMeal }
)(LogMeal)

export default LogMeal