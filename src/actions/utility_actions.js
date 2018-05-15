import { GET_EXPORT_CSV,
         SET_IMPORT_MESSAGE,
         TOGGLE_HUNGER_SCALE_DRAWER } from '../actions/types';
import  store  from '../store/index';
import { setCookie, getCookie, deleteCookie } from '../utilities/cookies';

const API_URL = 'http://localhost:3001/api';

export function importMealData(form) {
  var formData = new FormData(form);
  const options = {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'Authorization': getCookie('token')
    },
  };

  return function(dispatch) {
    fetch(`${API_URL}/import`, options)
    .then(function(response) { return response.json(); })
    .then(function(data){
      console.log(data)
      if('success' in data){
        dispatch({ 
          type: SET_IMPORT_MESSAGE,
          payload: 'Successfully imported ' + data.importCount + ' meals and snacks.'
        });
      }
      else{
        dispatch({ 
          type: SET_IMPORT_MESSAGE,
          payload: 'An error occurred. Please check the structure of your file and try again.'
        });
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }
}

export function exportMealData() {  
  return function(dispatch) {
    fetch(`${API_URL}/export`, {
      headers: { 'Authorization': getCookie('token') }
    })
    .then(function(response) { return response.text(); })
    .then(function(data){
      console.log(data)
      dispatch({
        type: GET_EXPORT_CSV,
        payload: data
      });
    })
    .catch((error) => {
      console.log(error)
    });
  }
}

export function setImportMessage(message) {  
  return function(dispatch) {
    dispatch({
      type: SET_IMPORT_MESSAGE,
      payload: message
    });
  }
}