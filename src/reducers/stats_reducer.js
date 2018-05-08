import { GET_STATS,  
         GET_STATS_BY_MONTH,
         SET_ACTIVE_STAT_TAB } from '../actions/types';

const INITIAL_STATE = { activeTab: 'allTimeStats', allTimeStats: {} }

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case GET_STATS:
      return { ...state, 
        [action.payload.key]: action.payload.stats
      }
    case SET_ACTIVE_STAT_TAB:
      return { ...state, 
        activeTab: action.payload
      }
    default:
      return state
  }

  return state;
}