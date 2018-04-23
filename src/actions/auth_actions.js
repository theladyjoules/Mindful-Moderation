import { AUTH_USER,  
         UNAUTH_USER,
         AUTH_ERROR,
         GET_ACCOUNT_DATA,
         TOGGLE_UPDATE_USER_VIEW,
         UPDATE_USER_ERROR,
         UPDATE_USER,
         TOGGLE_UPDATE_PASSWORD_VIEW,
         UPDATE_PASSWORD_ERROR,
         UPDATE_PASSWORD } from '../actions/types';
import { setCookie, getCookie, deleteCookie } from '../utilities/cookies';

const API_URL = 'http://localhost:3001/api';

export function errorHandler(dispatch, error, type) {  
  let errorMessage = '';
  if(error){
    if(error.data.error) {
      errorMessage = error.data.error;
    } else if(error.data){
      errorMessage = error.data;
    } else {
      errorMessage = error;
    }

    if(error.status === 401) {
      dispatch({
        type: type,
        payload: 'You are not authorized to do this. Please login and try again.'
      });
      logoutUser();
    } else {
      dispatch({
        type: type,
        payload: errorMessage
      });
    }
  }
}

export function loginUser({ email, password }) {  

  const options = {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  };

  return function(dispatch) {
    fetch(`${API_URL}/login`, options)
    .then(function(response) { return response.json(); })
    .then(function(data){
      setCookie('token', data.token, '/')
      dispatch({ type: AUTH_USER });
      window.location.href = '/';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function registerUser({ email, firstName, lastName, password }) {

  const options = {
    method: 'POST',
    body: JSON.stringify({ email, firstName, lastName, password }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  };

  return function(dispatch) {
    fetch(`${API_URL}/register`, options)
    .then(function(response) { return response.json(); })
    .then(function(data){
      setCookie('token', data.token, '/')
      dispatch({ type: AUTH_USER });
      window.location.href = '/';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function logoutUser() {  
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    deleteCookie('token')
    window.location.href =  '/login';
  }
}

export function getAccountData() {  
  return function(dispatch) {
    fetch(`${API_URL}/account`, {
      headers: { 'Authorization': getCookie('token') }
    })
    .then(function(response) { return response.json(); })
    .then(function(data){
      dispatch({
        type: GET_ACCOUNT_DATA,
        payload: data
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function toggleUpdateUserView() {
  return function (dispatch) {
    dispatch({ type: TOGGLE_UPDATE_USER_VIEW });
  }
}

export function updateUser({email, firstName, lastName}) {

  const options = {
    method: 'POST',
    body: JSON.stringify({ email, firstName, lastName }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': getCookie('token')
    },
  };

  return function(dispatch) {
    fetch(`${API_URL}/update_user`, options)
    .then(function(response) { return response.json(); })
    .then(function(data){
      if('success' in data){
        dispatch({ 
          type: UPDATE_USER,
          payload: data
        });
      }
      else{
        dispatch({ 
          type: UPDATE_USER_ERROR,
          payload: data.error
        });
      }
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function toggleUpdatePasswordView() {
  return function (dispatch) {
    dispatch({ type: TOGGLE_UPDATE_PASSWORD_VIEW });
  }
}

export function updatePassword({currentPassword, password}) {

  const options = {
    method: 'POST',
    body: JSON.stringify({currentPassword, password}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': getCookie('token')
    },
  };

  return function(dispatch) {
    fetch(`${API_URL}/update_password`, options)
    .then(function(response) { return response.json(); })
    .then(function(data){
      if('success' in data){
        dispatch({ 
          type: UPDATE_PASSWORD,
          payload: data
        });
      }
      else{
        console.log('error')
        dispatch({ 
          type: UPDATE_PASSWORD_ERROR,
          payload: data.error
        });
      }
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}