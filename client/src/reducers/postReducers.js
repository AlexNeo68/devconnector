import {
  ADD_POST,
  GET_POSTS,
  DELETE_POST,
  LOADING_POST,
  GET_POST
} from '../actions/types';

const initialState = {
  post: {},
  posts: [],
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case LOADING_POST:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}