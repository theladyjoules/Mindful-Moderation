import { LOG_MEAL,
         LOG_MEAL_ERROR,
         ADD_MOOD,
         REMOVE_MOOD,
         GET_MEALS_BY_DAY,
         GET_MEAL_FROM_STORE,
         GET_MEAL_BY_ID,
         SET_CURRENT_DAY_MEAL } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', moods: [], loadedDays: [], loadedMeals: [], currentDay: '', currentMeal: ''}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case SET_CURRENT_DAY_MEAL:
      return { ...state, 
        currentDay: action.payload.day,
        currentMeal: action.payload.mealId,
        moods: state[action.payload.day][action.payload.mealId].mealMood
      };
    case LOG_MEAL_ERROR:
      return { ...state, 
        message: '',
        error: action.payload
      };
    case LOG_MEAL:
      if(action.payload.mealDateHumanFormat in state){
        return { ...state, 
          [action.payload.mealDateHumanFormat]: [...state[action.payload.mealDateHumanFormat], action.payload]
        }
      }
      else{
        return { ...state, 
          [action.payload.mealDateHumanFormat]: [action.payload]
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
      let loadedMeals = [];
      for(let m in action.payload.meals){
        loadedMeals.push(action.payload.meals[m]._id)
      }
      return { ...state,
        [action.payload.day]: action.payload.meals,
        loadedDays: [...new Set([...state.loadedDays, action.payload.day])],
        loadedMeals: [...new Set([...state.loadedMeals, ...loadedMeals])],
      }
    case GET_MEAL_BY_ID:
      let mealId = Object.values(action.payload.meal)[0]._id
      return { ...state,
        [action.payload.day]: action.payload.meal,
        loadedMeals: [...state.loadedMeals, Object.keys(action.payload.meal)[0]],
        currentDay: action.payload.day,
        currentMeal: Object.values(action.payload.meal)[0]._id,
        moods: Object.values(action.payload.meal)[0].mealMood
      }
    default:
      return state
  }

  return state;
}