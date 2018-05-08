import { GET_EXPORT_CSV } from '../actions/types';
import { setCookie, getCookie, deleteCookie } from '../utilities/cookies';

const API_URL = 'http://localhost:3001/api';

export function importMealData(file) {

  const options = {
    method: 'POST',
    body: JSON.stringify(file),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': getCookie('token')
    },
  };

  return function(dispatch) {
    fetch(`${API_URL}/import`, options)
    .then(function(response) { return response.json(); })
    .then(function(data){
      console.log(data)
      // if('success' in data){
      //   dispatch({ 
      //     type: UPDATE_PASSWORD,
      //     payload: data
      //   });
      // }
      // else{
      //   console.log('error')
      //   dispatch({ 
      //     type: UPDATE_PASSWORD_ERROR,
      //     payload: data.error
      //   });
      // }
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