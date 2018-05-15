import { AUTH_USER,  
         UNAUTH_USER,
         AUTH_ERROR,
         TOGGLE_UPDATE_USER_VIEW,
         UPDATE_USER,
         UPDATE_USER_ERROR,
         TOGGLE_UPDATE_PASSWORD_VIEW,
         UPDATE_PASSWORD_ERROR,
         UPDATE_PASSWORD,
         GET_ACCOUNT_DATA,
         UPDATE_MEAL } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false, isEditingProfile: false, isEditingPassword: false}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case AUTH_USER:
    console.log(action.payload)
      return { ...state, 
        error: '', 
        message: '', 
        authenticated: true,  
        firstName: (action.payload) ? action.payload : 'User'
      };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case GET_ACCOUNT_DATA:
      return { ...state, 
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        error: '',
        message: ''
      };
    case TOGGLE_UPDATE_USER_VIEW:
      return { ...state, isEditingProfile:!state.isEditingProfile};
    case UPDATE_USER_ERROR:
      return { ...state, 
        error: action.payload,
        message: '',
      };
    case UPDATE_USER:
      return { ...state, 
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        error:'',
        message: action.payload.success,
        isEditingProfile: false
      }
    case TOGGLE_UPDATE_PASSWORD_VIEW:
      return { ...state, isEditingPassword:!state.isEditingPassword};
    case UPDATE_PASSWORD_ERROR:
      return { ...state, 
        message: '',
        error: action.payload
      };
    case UPDATE_PASSWORD:
      return { ...state, 
        message: action.payload.success,
        error:'',
        isEditingPassword: false
      }
    default:
      return state
  }

  return state;
}