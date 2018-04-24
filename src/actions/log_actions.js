import { LOG_MEAL,  
         LOG_MEAL_ERROR,
         ADD_SELECTED_MOOD,
         REMOVE_SELECTED_MOOD } from '../actions/types';

export function logMeal() {  

  // const options = {
  //   method: 'POST',
  //   body: JSON.stringify({email, password}),
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   },
  // };

  // return function(dispatch) {
  //   fetch(`${API_URL}/login`, options)
  //   .then(function(response) { return response.json(); })
  //   .then(function(data){
  //     setCookie('token', data.token, '/')
  //     dispatch({ type: AUTH_USER });
  //     window.location.href = '/';
  //   })
  //   .catch((error) => {
  //     errorHandler(dispatch, error.response, AUTH_ERROR)
  //   });
  // }
}

export function addSelectedMood(mood) {  
  return function(dispatch) {
    dispatch({ 
      type: ADD_SELECTED_MOOD,
      payload: mood
    });
  }
}

export function removeSelectedMood(moodIndex) {  
  return function(dispatch) {
    dispatch({ 
      type: REMOVE_SELECTED_MOOD,
      payload: moodIndex
    });
  }
}