import { LOG_MEAL,
         LOG_MEAL_ERROR,
         ADD_MOOD,
         REMOVE_MOOD,
         GET_MEALS_BY_DAY } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', moods: ''}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case LOG_MEAL_ERROR:
      return { ...state, 
        message: '',
        error: action.payload
      };
    case LOG_MEAL:
      if(action.payload.formattedDate in state){
        return { ...state, 
          [action.payload.formattedDate]: [...state[action.payload.formattedDate], action.payload]
        }
      }
      else{
        return { ...state, 
          [action.payload.formattedDate]: [action.payload]
        }
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
    case GET_MEALS_BY_DAY:
      return { ...state,
        [action.payload.day]: action.payload.meals
      }
    default:
      return state
  }

  return state;
}