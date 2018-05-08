import { GET_EXPORT_CSV } from '../actions/types';

const INITIAL_STATE = { exportFile: '' }

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case GET_EXPORT_CSV:
      const blob = new Blob([action.payload], {type: "text/csv"})
      return { ...state, 
        exportFile: window.URL.createObjectURL(blob)
      }
    default:
      return state
  }

  return state;
}