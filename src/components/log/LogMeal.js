import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Link } from 'react-router-dom'
import { Field, reduxForm, reset } from 'redux-form';
import moment from 'moment'
import $ from 'jquery'
import Loader from '../global/Loader';
// import MoodField from './MoodField';
import { strings } from '../../utilities/strings';
import { getUrlParameter } from '../../utilities/getUrlParameter';
import { isInvalidDate, isInvalidTime, isInvalidRequiredField, handleFormFieldFocus, renderField, renderChipField, renderTextarea, renderRadioInput } from '../../utilities/forms';
import { logMeal, addMood, removeMood, toggleLogType, resetMoods } from '../../actions/log_actions';

class LogMeal extends Component {
  constructor(props) {
    super(props);
    this.handleAddMood = this.handleAddMood.bind(this);
    this.handleRemoveMood = this.handleRemoveMood.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleAddMoodClick = this.handleAddMoodClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  componentWillMount(){
    this.props.dispatch(reset('logMeal'));
  }

  handleFormSubmit(values) {
    values['mealMood'] = this.props.moods
    values['mealType'] = this.props.logFormTypeMeal ? 'meal' : 'snack'
    this.props.logMeal(values)
  }

  handleAddMood(value){
    if(value.length && this.props.moods.indexOf(value) === -1){
      $('#mealMood').val('')
      this.props.addMood(value)
    }
  }

  handleAddMoodClick(e){
    this.handleAddMood($('#mealMood').val())
  }

  handleRemoveMood(mood){
    if(this.props.moods.indexOf(mood) > -1){
      this.props.removeMood(mood)
    }
  }
  handleKeyPress(e){
    if(e.key === 'Enter'){
      this.handleAddMood($('#mealMood').val())
      e.preventDefault()
    }
  }

  handleToggleClick(){
    this.props.toggleLogType()
  }

  handleCancelClick(){
    this.props.resetMoods()
    window.location.href = '/'
  }

  render() {
    const { handleSubmit } = this.props;
    const chips = (this.props.moods.length) ? this.props.moods.map((mood) =>
      <div className="chip ion-close-round" key={mood} onClick={() => this.handleRemoveMood(mood)}>
        {mood}
      </div>
    ) : null;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="form-header">
                <h1>Log</h1>
              </div>
              <div className={"form-field-wrapper" + (!this.props.logFormTypeMeal ? ' snack-theme' : '')}>
                <div className={"toggle-wrapper" + (this.props.logFormTypeMeal ? ' off' : '')} onClick={this.handleToggleClick}>
                  <div className="toggle-label">Meal</div>
                  <div className="toggle">
                    <div className="toggle-track"></div>
                    <div className="toggle-handle"></div>
                  </div>
                  <div className="toggle-label">Snack</div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-4">
                    <Field
                      name="mealDate"
                      label="Date"
                      component={renderField}
                      onFocus={handleFormFieldFocus}
                      type="date"
                      required="required"
                    />
                  </div>
                  <div className="col-xs-12 col-sm-4">
                    <Field
                      name="mealTime"
                      label="Start Time"
                      component={renderField}
                      type="time" 
                      required="required"
                      onFocus={handleFormFieldFocus}
                    />
                  </div>
                  <div className="col-xs-12 col-sm-4">
                    <Field
                      name="mealDuration"
                      type="number"
                      label="Duration"
                      helpText="minutes"
                      component={renderField}
                      onFocus={handleFormFieldFocus} />
                  </div>
                </div>
                <Field 
                  label="Name"
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
                  <label className="hunger-label">
                    <span className="label">Hunger Before{this.props.mealHungerBefore ? ':' : null}<span className="tooltip ion-help" onClick={this.props.toggleHungerScaleDrawer}></span></span> 
                    {this.props.mealHungerBefore ? (<span className="hunger-description">{this.props.mealHungerBefore} &ndash; {strings('hungerScaleWord'+this.props.mealHungerBefore)}</span>) : null}
                  </label>
                  <div className="radio-button-wrapper">
                    <Field
                      name="mealHungerBefore"
                      id="0"
                      label="0"
                      value="0"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerBeforeChange}
                    />
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
                  <label className="hunger-label">
                    <span className="label">Hunger After{this.props.mealHungerAfter ? ':' : null}<span className="tooltip ion-help" onClick={this.props.toggleHungerScaleDrawer}></span></span> 
                    {this.props.mealHungerAfter ? (<span className="hunger-description">{this.props.mealHungerAfter} &ndash; {strings('hungerScaleWord'+this.props.mealHungerAfter)}</span>) : null}
                  </label>
                  <div className="radio-button-wrapper">
                    <Field
                      name="mealHungerAfter"
                      id="0"
                      label="0"
                      value="0"
                      type="radio"
                      component={renderRadioInput}
                      onChange={this.handleHungerAfterChange}
                    />
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
                <div className="mood-field-wrapper">
                  <div className={"form-field" + (this.props.moods.length ? ' active' : '')}>
                    <input type="text" name="mealMood" id="mealMood" onKeyPress={(e) => this.handleKeyPress(e)} />
                    <label>Mood</label>
                    <hr />
                    <a className="btn-mood-add" onClick={this.handleAddMoodClick}>Add</a>
                    <div className="input-message">ex: happy, stressed, calm</div>
                  </div>
                  <div className="chip-wrapper">
                    {chips}
                  </div>
                </div>
                <Field
                  name="mealSetting"
                  type="text"
                  label="Setting"
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
                <div className="submit-wrapper clearfix">
                  <button type="submit" className={"btn " + (this.props.logFormTypeMeal ? 'btn-dark-green' : 'btn-green')} disabled={this.props.invalid || this.props.submitting}>Log</button>
                  <a onClick={this.handleCancelClick}>Cancel</a>
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
  if (isInvalidRequiredField(values, 'mealDate')){
    errors.mealDate = strings('required')
  }
  if (isInvalidDate(values, 'mealDate')){
    errors.mealDate = strings('mealDate')
  }
  if (isInvalidRequiredField(values, 'mealTime')){
    errors.mealTime = strings('required')
  }
  if (isInvalidTime(values, 'mealTime')){
    errors.mealTime = strings('mealTime')
  }
  if (isInvalidRequiredField(values, 'mealHungerBefore')){
    errors.mealHungerBefore = strings('required')
  }
  if (isInvalidRequiredField(values, 'mealHungerAfter')){
    errors.mealHungerAfter = strings('required')
  }
  return errors
}

LogMeal = reduxForm({  
  form: 'logMeal',
  enableReinitialize: false,
  validate
})(LogMeal)

LogMeal = connect(
  state => ({
    initialValues: {mealDate: getUrlParameter('date') ? moment(getUrlParameter('date')).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'), mealTime: moment().format('kk:mm'), mealDuration: 15},
    mealHungerBefore: ('logMeal' in state.form && 'values' in state.form.logMeal && 'mealHungerBefore' in state.form.logMeal.values) ? state.form.logMeal.values.mealHungerBefore : null,
    mealHungerAfter: ('logMeal' in state.form && 'values' in state.form.logMeal && 'mealHungerAfter' in state.form.logMeal.values) ? state.form.logMeal.values.mealHungerAfter : null,
    moods: state.log.moods,
    moodsField: ('logMeal' in state.form && 'values' in state.form.logMeal && 'mealMood' in state.form.logMeal.values) ? state.form.logMeal.values.mealMood : null,
    logFormTypeMeal: state.log.logFormTypeMeal
  }),
  { logMeal, addMood, removeMood, toggleLogType, resetMoods }
)(LogMeal)

export default LogMeal