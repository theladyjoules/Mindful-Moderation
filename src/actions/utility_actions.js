import { ADD_VISITED_PAGE } from '../actions/types';

export function addVisitedPage(pageSlug) {  
  return function(dispatch) {
    dispatch({ 
      type: ADD_VISITED_PAGE,
      payload: pageSlug
    });
  }
}