import {
  combineReducers
} from 'redux';

import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profileReducer from './profileReducer';
import postReducers from './postReducers';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  post: postReducers,
  errors: errorsReducer
});