import { GET_BANNER_STATS,  
         GET_STATS_BY_MONTH,  
         GET_ALL_TIME_STATS } from '../actions/types';

const INITIAL_STATE = { streak: '', total: '', statsMonths: {}, allTime: {}}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case GET_BANNER_STATS:
      return { ...state, 
        streak: action.payload.streak,
        total: action.payload.total
      }
    default:
      return state
  }

  return state;
}