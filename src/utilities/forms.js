import React from 'react'
import { strings } from './strings'
import moment from 'moment'

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

const isInvalidDate = (values, fieldKey) => {
  if(!(fieldKey in values) || values[fieldKey] === null || values[fieldKey] === ''){
    return false
  }
  const date = moment(values[fieldKey])
  return !date.isValid()
}

const isInvalidTime = (values, fieldKey) => {
  if(!(fieldKey in values) || values[fieldKey] === null || values[fieldKey] === ''){
    return false
  }
  console.log(values[fieldKey])
  return !moment(values[fieldKey],"HH:mm", true).isValid()
}

const isInvalidRequiredField = (values, fieldKey) => {
  return !(fieldKey in values) || values[fieldKey] === null || values[fieldKey] === '' 
}

const handleFormFieldFocus = () => {
}

const renderField = ({
  input,
  label,
  type,
  autoComplete,
  helpText,
  onFocus,
  required,
  meta: { touched, error, warning, active, visited }
}) => (
  <div className={"form-field" + (touched && error ? ' invalid' : '') + (active || visited ? ' active' : '') + (input.value.length ? ' has-value' : '')}>
      <input {...input} autoComplete={autoComplete} type={type} required={required} />
      <label>{label}</label>
      <hr />
      <div className={"input-message " + (touched && error ? 'error' : '')}>
        { touched && error
          ? error
          : ( helpText && (!error || !touched && error)
            ? helpText
            : null
          )
        }
      </div>
  </div>
)

const renderChipField = ({
  input,
  label,
  type,
  autoComplete,
  helpText,
  onFocus,
  required,
  handleAdd,
  handleKeyPress,
  meta: { touched, error, warning, active, visited }
}) => (
  <div className={"form-field" + (touched && error ? ' invalid' : '') + (active || visited || touched ? ' active' : '') + (input.value.length ? ' has-value' : '')}>
      <input {...input} autoComplete={autoComplete} type={type} required={required} onKeyPress={(e) => handleKeyPress(e, input.value)} />
      <label>{label}</label>
      <hr />
      <a className="btn-mood-add" onClick={() => handleAdd(input.value)}>Add</a>
      <div className={"input-message " + (touched && error ? 'error' : '')}>
        { touched && error
          ? error
          : ( helpText && (!error || !touched && error)
            ? helpText
            : null
          )
        }
      </div>
  </div>
)

const renderTextarea = ({
  input,
  label,
  type,
  autoComplete,
  helpText,
  onFocus,
  required,
  meta: { touched, error, warning, active, visited }
}) => (
  <div className={"form-field textarea" + (touched && error ? ' invalid' : '') + (active || visited  ? ' active' : '') + (input.value.length ? ' has-value' : '')}>
      <textarea {...input} autoComplete={autoComplete} type={type} required={required} rows="3"></textarea>
      <label>{label}</label>
      <hr />
      <div className={"input-message " + (touched && error ? 'error' : '')}>
        { touched && error
          ? error
          : ( helpText && (!error || !touched && error)
            ? helpText
            : null
          )
        }
      </div>
  </div>
)

const renderRadioInput = ({
  input,
  label,
  type,
  id,
  meta: { touched, error, warning, active }
}) => (
  <label className="radio-container">
    <div className="radio-label">{label}</div>
    <input {...input} id={id} type={type} />
    <span className="radio-button"></span>
  </label>
)

export {isInvalidEmail, isInvalidPassword, isInvalidPasswordConfirm, isInvalidDate, isInvalidTime, isInvalidRequiredField, handleFormFieldFocus, renderField, renderChipField, renderTextarea, renderRadioInput}