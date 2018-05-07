import { combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';  
import authReducer from './auth_reducer';
import logReducer from './log_reducer';
import statsReducer from './stats_reducer';

const rootReducer = combineReducers({  
  auth: authReducer,
  log: logReducer,
  form: formReducer,
  stats: statsReducer
});

export default rootReducer;  