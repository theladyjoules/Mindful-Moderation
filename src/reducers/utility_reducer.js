import { ADD_VISITED_PAGE } from '../actions/types';

const INITIAL_STATE = { visitedPages: [] }

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case ADD_VISITED_PAGE:
      return { ...state, 
        visitedPages: [...state.visitedPages, action.payload]
      }
    default:
      return state
  }

  return state;
}