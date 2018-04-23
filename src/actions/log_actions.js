import { LOG_MEAL,  
         LOG_MEAL_ERROR } from '../actions/types';

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