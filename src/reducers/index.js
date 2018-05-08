import { combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';  
import authReducer from './auth_reducer';
import logReducer from './log_reducer';
import statsReducer from './stats_reducer';
import utilityReducer from './utility_reducer';

const rootReducer = combineReducers({  
  auth: authReducer,
  log: logReducer,
  form: formReducer,
  stats: statsReducer,
  utility: utilityReducer
});

export default rootReducer;  