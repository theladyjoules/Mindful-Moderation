import React from 'react'
import { strings } from './strings'
import { TextField } from 'react-md/lib/TextFields';
import moment from 'moment'
import { DatePicker, TimePicker, SelectField, SelectionControlGroup, Chip } from  'react-md';

const isInvalidEmail = (values, fieldKey) => {
  if(!(fieldKey in values) || values[fieldKey] === null || values[fieldKey] === ''){
    return false
  }
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(values[fieldKey])
}

const isInvalidPassword = (values, fieldKey) => {
  if(!(fieldKey in values) || values[fieldKey] === null || values[fieldKey] === ''){
    return false
  }
  return values[fieldKey].length<8
}

const isInvalidPasswordConfirm = (values, fieldKeyPassword, fieldKeyPasswordConfirm) => {
  if(!(fieldKeyPassword in values) || values[fieldKeyPassword] === null || values[fieldKeyPassword] === '' || !(fieldKeyPasswordConfirm in values) || values[fieldKeyPasswordConfirm] === null || values[fieldKeyPasswordConfirm] === ''){
    return false
  }
  return values[fieldKeyPassword] !== values[fieldKeyPasswordConfirm]
}

const isInvalidRequiredField = (values, fieldKey) => {
  return !(fieldKey in values) || values[fieldKey] === null || values[fieldKey] === '' 
}

const renderField = ({
  input,
  label,
  type,
  autoComplete,
  helpText,
  meta: { touched, error, warning }
}) => (
  <div className={"form-group " + (touched && error && 'invalid')}>
    <label>{label}
      <TextField {...input} autoComplete={autoComplete} type={type} />
      <div className={"input-message " + (touched && (error && 'error'))}>
        { touched && error
          ? error
          : ( helpText && (!error || !touched && error)
            ? helpText
            : null
          )
        }
      </div>
    </label>
  </div>
)

const renderTextField = ({ input, meta: { touched, error }, ...others }) => (
  <TextField {...input} {...others} error={touched && !!error} errorText={error} />
);

const renderTextarea = ({ input, rows, meta: { touched, error }, ...others }) => (
  <TextField {...input} {...others} error={touched && !!error} errorText={error} rows={rows} />
);

const renderSelectField = ({ input, menuItems, meta: { touched, error }, ...others }) => (
  <SelectField 
    {...input} 
    {...others} 
    error={touched && !!error} 
    errorText={error} 
    menuItems={menuItems} 
    className="md-cell"
  />
);

function renderDatePicker ({ id, label, placeholder, input, maxDate, minDate, defaultValue, className, type }) {
  return (
    <DatePicker
      id={id}
      label={label}
      lineDirection="center"
      className="md-cell"
      maxDate={maxDate}
      minDate={minDate}
      defaultValue={new Date()}
      {...input}
    />
  )
}

const renderTimePicker  = ({ id, input, label, defaultValue, meta: { touched, error },  ...other }) => (
  <TimePicker 
    id={id}
    label={label}
    errorText = {touched && error} 
    {...input}
    container="inline"
    mode="landscape"
    value = {input.value != '' ? moment(moment().format('DD MMM YYYY')+' '+input.value).toDate() : null}
    autoComplete="off"  
    onChange = {(event, value) => {input.onChange(moment(value).format('h:mm a'))}} 
    className="md-cell"
    {...other}
  />
)

const renderRadioGroup = ({ id, input, label, defaultValue, meta: { touched, error },  ...other }) => (
  <SelectionControlGroup
    id={id}
    name="radio-example"
    type="radio"
    label={label}
    defaultValue="5"
    controls={[{
      label: '1',
      value: '1',
    }, {
      label: '2',
      value: '2',
    }, {
      label: '3',
      value: '3',
    }, {
      label: '4',
      value: '4',
    }, {
      label: '5',
      value: '5',
    }, {
      label: '6',
      value: '6',
    }, {
      label: '7',
      value: '7',
    }, {
      label: '8',
      value: '8',
    }, {
      label: '9',
      value: '9',
    }, {
      label: '10',
      value: '10'
    }]}
    {...input}
    {...other}
  />
);

export {isInvalidEmail, isInvalidPassword, isInvalidPasswordConfirm, isInvalidRequiredField, renderField, renderTextField, renderSelectField, renderDatePicker, renderTimePicker, renderTextarea, renderRadioGroup}