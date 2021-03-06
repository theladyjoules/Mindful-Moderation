import { LOG_MEAL,  
         LOG_MEAL_ERROR,
         ADD_MOOD,
         REMOVE_MOOD,
         RESET_MOODS,
         GET_MEALS_BY_DAY,
         GET_MEAL_BY_ID,
         SET_CURRENT_DAY_MEAL,
         SET_CURRENT_DATE_TIME,
         UPDATE_MEAL,
         GET_MEALS_BY_MONTH,
         DELETE_MEAL,
         TOGGLE_LOG_TYPE } from '../actions/types';
import { getCookie } from '../utilities/cookies';
import moment from 'moment'

export function getMealById(mealId) {
  return function(dispatch) {
    fetch(`${process.env.REACT_APP_API_URL}/meal/${mealId}`, {
      headers: { 'Authorization': getCookie('token') }
    })
    .then(function(response) { return response.json(); })
    .then(function(data){
      if('success' in data && data.success && Object.keys(data.meal).length > 0){
        console.log(data);
        dispatch({
          type: GET_MEAL_BY_ID,
          payload: data
        });
      }
      else{
        window.location.href = '/'
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }
}

export function getMealsByDay(day) {
  const offset = moment().utcOffset()
  return function(dispatch) {
    fetch(`${process.env.REACT_APP_API_URL}/day/${day}/${offset}`, {
      headers: { 'Authorization': getCookie('token') }
    })
    .then(function(response) {
      return response.json(); 
    })
    .then(function(data){
      if(data && 'success' in data && data.success && Object.keys(data.meals).length > 0){
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

export function getMealsByMonth(month, year) {
  return function(dispatch) {
    fetch(`${process.env.REACT_APP_API_URL}/month/${month}/${year}`, {
      headers: { 'Authorization': getCookie('token') }
    })
    .then(function(response) {
      return response.json(); 
    })
    .then(function(data){
      console.log(data)
      if(data && 'success' in data && data.success && Object.keys(data.meals).length > 0){
        dispatch({
          type: GET_MEALS_BY_MONTH,
          payload: data
        });
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }
}

export function logMeal({mealDate, mealTime, mealType, mealDuration, mealName, mealFoods, mealHungerBefore, mealHungerAfter, mealMood, mealSetting, mealNotes}) {  
  const mealDateFormFormat = mealDate
  const mealTimeFormFormat = mealTime
  mealDate = moment(mealDate + 'T' + mealTime)
  const mealDateHumanFormat = mealDate.format('MM-DD-YYYY')
  const mealTimeHumanFormat = mealDate.format('h:mm a')
  const options = {
    method: 'POST',
    body: JSON.stringify({mealDate, mealDateHumanFormat, mealTimeHumanFormat, mealDateFormFormat, mealTimeFormFormat, mealType, mealDuration, mealName, mealFoods, mealHungerBefore, mealHungerAfter, mealMood, mealSetting, mealNotes}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': getCookie('token')
    },
  };
  return function(dispatch) {
    fetch(`${process.env.REACT_APP_API_URL}/meal/create`, options)
    .then(function(response) { return response.json(); })
    .then(function(data){
      if('success' in data && data.success){
        dispatch({ 
          type: LOG_MEAL,
          payload: data.meal
        });
        let today = moment()
        let theDate = moment(data.meal.mealDate)
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

export function deleteMeal(mealId, mealDateHumanFormat) {
  const options = {
    method: 'POST',
    body: JSON.stringify({mealId: mealId}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': getCookie('token')
    },
  };
  return function(dispatch) {
    fetch(`${process.env.REACT_APP_API_URL}/meal/delete`, options)
    .then(function(response) { return response.json(); })
    .then(function(data){
      console.log(data)
      if('success' in data && data.success){
        window.location.href = '/day/'+mealDateHumanFormat
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }
}

export function editExistingMeal(changedFields) {
  console.log(JSON.stringify( changedFields))
  const options = {
    method: 'POST',
    body: JSON.stringify( changedFields),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': getCookie('token')
    },
  };
  return function(dispatch) {
    fetch(`${process.env.REACT_APP_API_URL}/meal/update`, options)
    .then(function(response) { return response.json(); })
    .then(function(data){
      console.log(data)
      if('success' in data && data.success){
        dispatch({ 
          type: UPDATE_MEAL,
          payload: data.meal
        });
      }
      window.location.href = '/meal/'+data.meal._id;
    })
    .catch((error) => {
      console.log(error)
    });
  }
}

export function setCurrentDayMeal(day, mealId) {  
  return function(dispatch) {
    const data ={
      day: day,
      mealId: mealId
    }
    dispatch({ 
      type: SET_CURRENT_DAY_MEAL,
      payload: data
    });
  }
}

export function setCurrentDateTime(date) {  
  return function(dispatch) {
    const data ={
      date: date,
      time: moment().format('HH:mm')
    }
    dispatch({ 
      type: SET_CURRENT_DATE_TIME,
      payload: data
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

export function resetMoods() {  
  return function(dispatch) {
    dispatch({ 
      type: RESET_MOODS,
    });
  }
}

export function toggleLogType(mood) {  
  return function(dispatch) {
    dispatch({ 
      type: TOGGLE_LOG_TYPE
    });
  }
}