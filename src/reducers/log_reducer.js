import { LOG_MEAL,
         LOG_MEAL_ERROR } from '../actions/types';

const INITIAL_STATE = { error: '', message: ''}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case LOG_MEAL_ERROR:
      return { ...state, 
        message: '',
        error: action.payload
      };
    case LOG_MEAL:
      return { ...state, 
        message: action.payload.success,
        error:''
      }
    default:
      return state
  }

  return state;
}