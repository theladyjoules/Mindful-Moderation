import { LOG_MEAL,
         LOG_MEAL_ERROR,
         ADD_MOOD,
         REMOVE_MOOD,
         RESET_MOODS,
         GET_MEALS_BY_DAY,
         GET_MEALS_BY_MONTH,
         GET_MEAL_FROM_STORE,
         GET_MEAL_BY_ID,
         SET_CURRENT_DAY_MEAL,
         UPDATE_MEAL,
         DELETE_MEAL,
         TOGGLE_LOG_TYPE } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', moods: [], loadedDays: {}, loadedMeals: {}, loadedMonths: {}, currentDay: '', currentMeal: '', logFormTypeMeal: true}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case TOGGLE_LOG_TYPE:
      return { ...state, 
        logFormTypeMeal: !state.logFormTypeMeal
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
    case RESET_MOODS:
      return { ...state, 
        moods: []
      }
    case SET_CURRENT_DAY_MEAL:
      return { ...state, 
        currentDay: action.payload.day,
        currentMeal: action.payload.mealId,
        moods: state.loadedMeals[action.payload.mealId].mealMood,
      };
    case LOG_MEAL_ERROR:
      return { ...state, 
        message: '',
        error: action.payload
      };
    case LOG_MEAL:
      if(action.payload.mealDateHumanFormat in state.loadedDays){
        return { ...state,
          loadedDays:{
            ...state.loadedDays,
            [action.payload.mealDateHumanFormat]: [...[action.payload.mealDateHumanFormat], action.payload._id],
          },
          loadedMeals:{
            ...state.loadedMeals,
            [action.payload._id]: action.payload
          }
        }
      }
      else{
        return { ...state, 
          loadedDays:{
            ...state.loadedMeals,
            [action.payload._id]: action.payload
          }
        }
      }
    case UPDATE_MEAL:
      return { ...state,
        loadedMeals:{
          ...state.loadedMeals,
          [action.payload._id]: action.payload
        }
      }
    case DELETE_MEAL:
      let newLoadedMeals = state.loadedMeals
      let newLoadedDays = state.loadedDays
      let newLoadedMonths = state.loadedMonths
      let newCurrentMeal = (state.currentMeal === action.payload) ? '' : state.currentMeal
      delete newLoadedMeals[action.payload]
      for(let day in newLoadedDays){
        if(action.payload in newLoadedDays[day]){
          delete newLoadedDays[day][action.payload]
          break
        }
      }
      monthLoop:
      for(let month in newLoadedMonths){
        for(let day in newLoadedMonths[month]){
          if(action.payload in newLoadedMonths[month][day]){
            delete newLoadedMonths[month][day][action.payload]
            break monthLoop
          }
        }
      }
      return { ...state,
        loadedMeals: newLoadedMeals,
        loadedDays: newLoadedDays,
        loadedMonths: newLoadedMonths,
        currentMeal: newCurrentMeal
      }
    case GET_MEALS_BY_DAY:
      let dayMeals = [];
      let newMeals = {}
      for(let m in action.payload.meals){
        dayMeals.push(action.payload.meals[m]._id)
        newMeals[action.payload.meals[m]._id] = action.payload.meals[m]
      }
      console.log(action.payload)
      return { ...state,
        loadedDays:{
          ...state.loadedDays,
          [action.payload.day]:  Object.assign({}, [action.payload.day], dayMeals)
        },
        loadedMeals: Object.assign({}, state.loadedMeals, newMeals)
      }
    case GET_MEALS_BY_MONTH:
      return { ...state,
        loadedMonths:{
          ...state.loadedMonths,
          [action.payload.month]: action.payload.meals
        }
      }
    case GET_MEAL_BY_ID:
      let mealId = Object.values(action.payload.meal)[0]._id
      return { ...state,
        loadedMeals: {
          ...state.loadedMeals,
          [Object.values(action.payload.meal)[0]._id]: Object.values(action.payload.meal)[0]
        },
        currentDay: action.payload.day,
        currentMeal: Object.values(action.payload.meal)[0]._id,
        moods: Object.values(action.payload.meal)[0].mealMood
      }
    default:
      return state
  }

  return state;
}