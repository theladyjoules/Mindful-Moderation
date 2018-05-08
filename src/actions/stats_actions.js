import { GET_STATS,  
         GET_STATS_BY_MONTH,
         SET_ACTIVE_STAT_TAB } from '../actions/types';
import { getCookie } from '../utilities/cookies';
import moment from 'moment'

const API_URL = 'http://localhost:3001/api';

export function getStats(month = 'all', year = 'all') {
  return function(dispatch) {
    fetch(`${API_URL}/stats/${month}/${year}`, {
      headers: { 'Authorization': getCookie('token') }
    })
    .then(function(response) { return response.json(); })
    .then(function(data){
      console.log(data);
      if('success' in data && data.success && Object.keys(data.stats).length > 0){
        dispatch({
          type: GET_STATS,
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

export function setActiveTab(tabIndex) {
  return function(dispatch) {
    dispatch({
      type: SET_ACTIVE_STAT_TAB,
      payload: tabIndex
    });
  }
}