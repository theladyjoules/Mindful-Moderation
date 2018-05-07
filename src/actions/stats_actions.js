import { GET_BANNER_STATS,  
         GET_STATS_BY_MONTH,  
         GET_ALL_TIME_STATS } from '../actions/types';
import { getCookie } from '../utilities/cookies';
import moment from 'moment'

const API_URL = 'http://localhost:3001/api';

export function getStats() {
  return function(dispatch) {
    fetch(`${API_URL}/stats`, {
      headers: { 'Authorization': getCookie('token') }
    })
    .then(function(response) { return response.json(); })
    .then(function(data){
      console.log(data);
      // if('success' in data && data.success && Object.keys(data.meal).length > 0){
      //   dispatch({
      //     type: GET_BANNER_STATS,
      //     payload: data
      //   });
      // }
      // else{
      //   window.location.href = '/'
      // }
    })
    .catch((error) => {
      console.log(error)
    });
  }
}