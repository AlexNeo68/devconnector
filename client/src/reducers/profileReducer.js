import {
  PROFILE_GET,
  PROFILE_LOADING,
  PROFILE_CLEAR,
  GET_PROFILES
} from '../actions/types';

const initialState = {
  profiles: null,
  profile: null,
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return { ...state,
        loading: true
      }
    case PROFILE_CLEAR:
      return { ...state,
        profile: null
      }
    case PROFILE_GET:
      return { ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    default:
      return state;
  }
}