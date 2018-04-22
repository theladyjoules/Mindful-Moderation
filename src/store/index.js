import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from '../reducers/index'; 
import reduxThunk from 'redux-thunk'; 
import { AUTH_USER } from '../actions/types';

const persistedState = localStorage.getItem('mindfulModerationReduxState') ? JSON.parse(localStorage.getItem('mindfulModerationReduxState')) : {}

const token = document.cookie.replace(/(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/, "$1");

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);  
const store = createStoreWithMiddleware(reducers, persistedState);

if (token) {  
  store.dispatch({ type: AUTH_USER });
}

store.subscribe(()=>{
  localStorage.setItem('mindfulModerationReduxState', JSON.stringify(store.getState()))
})

export default store;