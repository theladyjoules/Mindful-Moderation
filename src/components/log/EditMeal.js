import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Link } from 'react-router-dom'
import { Field, reduxForm, reset } from 'redux-form';
import moment from 'moment'
import $ from 'jquery'
import Loader from '../global/Loader';
import { strings } from '../../utilities/strings';
import { isInvalidDate, isInvalidTime, isInvalidRequiredField, handleFormFieldFocus, renderField, renderChipField, renderTextarea, renderRadioInput } from '../../utilities/forms';
import { editExistingMeal, addMood, removeMood, getMealById, deleteMeal, toggleLogType } from '../../actions/log_actions';

let pathname = window.location.pathname.split( '/' )

class EditMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moodsPristine: true,
      typePristine: true
    }
    this.handleAddMood = this.handleAddMood.bind(this);
    this.handleRemoveMood = this.handleRemoveMood.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleAddMoodClick = this.handleAddMoodClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDeleteMeal = this.handleDeleteMeal.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  componentDidMount(){
    console.log('mounting edit form')
    if(this.props.mealId in this.props.log.loadedMeals){
      console.log('getting meal from server: ' + this.props.mealId)
      this.props.getMealById(this.props.mealId)
    }
    this.props.dispatch(reset('editMeal'));
  }

  handleFormSubmit(values) {
    let changedFields = {}
    const thisMeal = this.props.log.loadedMeals[this.props.mealId]
    const valuesMealType = this.props.logFormTypeMeal ? 'meal' : 'snack'
    if(valuesMealType !== thisMeal.mealType){
      changedFields['mealType'] = valuesMealType
    }
    if(values.mealDateFormFormat !== thisMeal.mealDateFormFormat || values.mealTimeFormFormat !== thisMeal.mealTimeFormFormat){
      changedFields['mealDateFormFormat'] = values.mealDateFormFormat
      changedFields['mealTimeFormFormat'] = values.mealTimeFormFormat
      changedFields['mealDate'] = moment(values.mealDateFormFormat + 'T' + values.mealTimeFormFormat)
      changedFields['mealDateHumanFormat'] = changedFields['mealDate'].format('MM-DD-YYYY')
      changedFields['mealTimeHumanFormat'] = changedFields['mealDate'].format('h:mm a')
    }
    if(values.mealDuration !== thisMeal.mealDuration){
      changedFields['mealDuration'] = values.mealDuration
    }
    if(values.mealName !== thisMeal.mealName){
      changedFields['mealName'] = values.mealName
    }
    if(values.mealFoods !== thisMeal.mealFoods){
      changedFields['mealFoods'] = values.mealFoods
    }
    if(values.mealHungerBefore !== thisMeal.mealHungerBefore){
      changedFields['mealHungerBefore'] = values.mealHungerBefore
    }
    if(values.mealHungerAfter !== thisMeal.mealHungerAfter){
      changedFields['mealHungerAfter'] = values.mealHungerAfter
    }
    if(this.props.moods !== thisMeal.mealMood){
      changedFields['mealMood'] = this.props.moods
    }
    if(values.mealSetting !== thisMeal.mealSetting){
      changedFields['mealSetting'] = values.mealSetting
    }
    if(values.mealNotes !== thisMeal.mealNotes){
      changedFields['mealNotes'] = values.mealNotes
    }
    if(Object.keys(changedFields).length){
      changedFields['mealId'] = this.props.mealId
      this.props.editExistingMeal(changedFields)
    }
  }

  handleAddMood(value){
    if(value.length && this.props.moods.indexOf(value) === -1){
      $('#mealMood').val('')
      this.props.addMood(value)
      this.setState({moodsPristine:false})
    }
  }

  handleAddMoodClick(e){
    this.handleAddMood($('#mealMood').val())
  }

  handleRemoveMood(mood){
    if(this.props.moods.indexOf(mood) > -1){
      this.props.removeMood(mood)
      this.setState({moodsPristine:false})
    }
  }
  handleKeyPress(e){
    if(e.key === 'Enter'){
      this.handleAddMood($('#mealMood').val())
      e.preventDefault()
    }
  }

  handleDeleteMeal(){
    this.props.deleteMeal(this.props.mealId, this.props.log.loadedMeals[this.props.mealId].mealDateHumanFormat)
  }

  handleToggleClick(){
    this.props.toggleLogType()
    this.setState({typePristine:false})
  }

  render() {
    const { handleSubmit } = this.props;
    const chips = (this.props.moods.length) ? this.props.moods.map((mood) =>
      <div className="chip ion-close-round" key={mood} onClick={() => this.handleRemoveMood(mood)}>
        {mood}
      </div>
    ) : null;
    console.log(this.props.log)
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            {this.props.mealId in this.props.log.loadedMeals ? (
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="form-header edit-meal">
                  <h1></h1>
                  <a onClick={this.handleDeleteMeal}>Delete</a>
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
                  <Field
                    name="mealDateFormFormat"
                    label="Date"
                    component={renderField}
                    onFocus={handleFormFieldFocus}
                    type="date"
                    required="required"
                  />
                  <div className="row">
                    <div className="col-xs-12 col-sm-6">
                      <Field
                        name="mealTimeFormFormat"
                        label="Start Time"
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
                        label="Duration"
                        helpText="in minutes"
                        component={renderField}
                        onFocus={handleFormFieldFocus}
                      />
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
                  <div className="submit-wrapper">
                    <button type="submit" className="btn btn-green" disabled={ this.props.invalid || this.props.submitting || (this.props.pristine && (this.state.moodsPristine && this.state.typePristine))}>Update</button>
                    <p><Link to={'/meal/' + this.props.log.loadedMeals[this.props.mealId]._id}>Cancel</Link></p>
                  </div>
                </div>
              </form>
            ) : <Loader />}
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
  console.log(errors)
  return errors
}

EditMeal = reduxForm({  
  form: 'editMeal',
  enableReinitialize: true,
  validate
})(EditMeal)

EditMeal = connect(
  state => ({
    initialValues: state.log.loadedMeals[state.log.currentMeal],
    mealHungerBefore: ('editMeal' in state.form && 'values' in state.form.editMeal && 'mealHungerBefore' in state.form.editMeal.values) ? state.form.editMeal.values.mealHungerBefore : null,
    mealHungerAfter: ('editMeal' in state.form && 'values' in state.form.editMeal && 'mealHungerAfter' in state.form.editMeal.values) ? state.form.editMeal.values.mealHungerAfter : null,
    moods: state.log.moods,
    moodsField: ('editMeal' in state.form && 'values' in state.form.editMeal && 'mealMood' in state.form.editMeal.values) ? state.form.editMeal.values.mealMood : null,
    log: state.log,
    logFormTypeMeal: state.log.logFormTypeMeal
  }),
  { editExistingMeal, addMood, removeMood, getMealById, deleteMeal, toggleLogType }
)(EditMeal)

export default EditMeal