import { LOG_MEAL,
         LOG_MEAL_ERROR,
         ADD_MOOD,
         REMOVE_MOOD } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', moods: ''}

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
    case ADD_MOOD:
      return { ...state, 
        moods: [...state.moods, action.payload]
      }
    case REMOVE_MOOD:
      return { ...state, 
        moods: [
          ...state.moods.slice(0, state.moods.indexOf(action.payload)),
          ...state.moods.slice(state.moods.indexOf(action.payload) + 1)
        ]
      }
    default:
      return state
  }

  return state;
}