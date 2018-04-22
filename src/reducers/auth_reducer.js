import { AUTH_USER,  
         UNAUTH_USER,
         AUTH_ERROR,
         GET_ACCOUNT_DATA } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case GET_ACCOUNT_DATA:
      return { ...state, 
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email 
      };
  }

  return state;
}