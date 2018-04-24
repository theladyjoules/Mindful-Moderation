import { LOG_MEAL,
         LOG_MEAL_ERROR,
         ADD_SELECTED_MOOD,
         REMOVE_SELECTED_MOOD } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', selectedMoods: ''}

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
    case ADD_SELECTED_MOOD:
      return { ...state, 
        selectedMoods: [...state.selectedMoods, action.payload]
      }
    case REMOVE_SELECTED_MOOD:
      return { ...state, 
        selectedMoods: [
          ...state.selectedMoods.slice(0, action.payload),
          ...state.selectedMoods.slice(action.payload + 1)
        ]
      }
    default:
      return state
  }

  return state;
}