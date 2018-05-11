import { GET_EXPORT_CSV,
         SET_IMPORT_MESSAGE,
         TOGGLE_HUNGER_SCALE_DRAWER } from '../actions/types';

const INITIAL_STATE = { exportFile: '', importMessage: '', hungerScaleDrawerOpen: false }

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case GET_EXPORT_CSV:
      const blob = new Blob([action.payload], {type: "text/csv"})
      return { ...state, 
        exportFile: window.URL.createObjectURL(blob)
      }
    case SET_IMPORT_MESSAGE:
      return { ...state, 
        importMessage: action.payload
      }
    case TOGGLE_HUNGER_SCALE_DRAWER:
      return { ...state, 
        hungerScaleDrawerOpen: !state.hungerScaleDrawerOpen
      }
    default:
      return state
  }

  return state;
}