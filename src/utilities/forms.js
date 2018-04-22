import React from 'react'
import { strings } from './strings'

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
      <input {...input} autoComplete={autoComplete} type={type} />
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

const renderSelectField = ({ input, label, type, helpText, meta: { touched, error }, children }) => (
  <div className={"form-group " + (touched && (error && 'invalid'))}>
    <label>{label}</label>
      <select {...input}>
        {children}
      </select>
      <div className={"input-message " + (touched && (error && 'error'))}>
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

export {isInvalidEmail, isInvalidPassword, isInvalidRequiredField, renderField, renderSelectField}