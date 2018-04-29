import { LOG_MEAL,  
         LOG_MEAL_ERROR,
         ADD_MOOD,
         REMOVE_MOOD,
         GET_MEALS_BY_DAY} from '../actions/types';
import { getCookie } from '../utilities/cookies';
import moment from 'moment'

const API_URL = 'http://localhost:3001/api';

export function getMealById() {
  return function(dispatch) {
  }
}

export function getMealsByDay(day) {
  console.log(day)
  return function(dispatch) {
    fetch(`${API_URL}/day/${day}`, {
      headers: { 'Authorization': getCookie('token') }
    })
    .then(function(response) { return response.json(); })
    .then(function(data){
      console.log(data)
      if('success' in data && data.success){
        dispatch({
          type: GET_MEALS_BY_DAY,
          payload: data
        });
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }
}

export function logMeal({mealDate, mealTime, mealDuration, mealName, mealFoods, mealHungerBefore, mealHungerAfter, mealMood, mealSetting, mealNotes}) {  

  // let mealUtc = moment.utc(mealDate + ' '+ mealTime);
  mealDate = moment(mealDate + 'T' + mealTime)
  const mealDateFormatted = mealDate.format('MM-DD-YYYY')
  const mealTimeFormatted = mealDate.format('h:mm a')
  console.log(mealDate)
  const options = {
    method: 'POST',
    body: JSON.stringify({mealDate, mealDateFormatted, mealTimeFormatted, mealDuration, mealName, mealFoods, mealHungerBefore, mealHungerAfter, mealMood, mealSetting, mealNotes}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': getCookie('token')
    },
  };
  return function(dispatch) {
    fetch(`${API_URL}/meal/create`, options)
    .then(function(response) { return response.json(); })
    .then(function(data){
      if('success' in data && data.success){
        const theDate = moment(data.meal.mealDate);
        data.meal.formattedTime = theDate.format('hh:mm');
        data.meal.formattedDate = theDate.format('MM-DD-YYYY');
        dispatch({ 
          type: LOG_MEAL,
          payload: data.meal
        });
        let today = moment()
        if (today.isSame(theDate, 'd')) {
          window.location.href = '/';
        } else {
          window.location.href = '/day/'+theDate.format('MM-DD-YYYY');
        }
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }
}

export function addMood(mood) {  
  return function(dispatch) {
    dispatch({ 
      type: ADD_MOOD,
      payload: mood
    });
  }
}

export function removeMood(mood) {  
  return function(dispatch) {
    dispatch({ 
      type: REMOVE_MOOD,
      payload: mood
    });
  }
}