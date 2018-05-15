import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from '../reducers/index'; 
import reduxThunk from 'redux-thunk'; 
import { AUTH_USER } from '../actions/types';
import { getCookie } from '../utilities/cookies';

const persistedState = localStorage.getItem('mindfulModerationReduxState') ? JSON.parse(localStorage.getItem('mindfulModerationReduxState')) : {}

const token = getCookie('token')

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers, persistedState)

if (token) {  
  const firstName = getCookie('firstName');
  console.log(firstName)
  store.dispatch({ type: AUTH_USER, payload: firstName })
}

store.subscribe(()=>{
  let fullStore = store.getState()
  console.log(fullStore)
  localStorage.setItem('mindfulModerationReduxState', JSON.stringify({form: fullStore.form}))
})

export default store;