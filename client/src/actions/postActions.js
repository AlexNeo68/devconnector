import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  LOADING_POST,
  DELETE_POST,
  GET_POST
} from './types';
import Axios from 'axios';

export const addPost = postData => dispatch => {
  Axios.post('/api/posts', postData).then(res => {
    dispatch({
      type: ADD_POST,
      payload: res.data
    })
    dispatch(clearErrors())
  }).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}

export const getPosts = () => dispatch => {
  dispatch(loadingPost());
  Axios.get('/api/posts').then(res => {
    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  }).catch(err => dispatch({
    type: GET_POSTS,
    payload: null
  }));
}

export const getPost = id => dispatch => {
  dispatch(loadingPost());
  Axios.get(`/api/posts/${id}`).then(res => dispatch({
    type: GET_POST,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_POST,
    payload: null
  }))
}

export const deletePost = id => dispatch => {
  Axios.delete(`/api/posts/${id}`).then(res => dispatch({
    type: DELETE_POST,
    payload: id
  })).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

export const likePost = id => dispatch => {
  Axios.post(`/api/posts/${id}/like`).then(res => dispatch(getPosts())).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

export const unLikePost = id => dispatch => {
  Axios.post(`/api/posts/${id}/unlike`).then(res => dispatch(getPosts())).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

export const addComment = (id, commentData) => dispatch => {
  dispatch(clearErrors())
  Axios.post(`/api/posts/${id}/comment`, commentData).then(res =>
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  ).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

export const deleteComment = (id, comment_id) => dispatch => {
  Axios.delete(`/api/posts/${id}/comment/${comment_id}`).then(res => dispatch({
    type: GET_POST,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

export const clearErrors = () => ({
  type: GET_ERRORS,
  payload: {}
})

export const loadingPost = () => ({
  type: LOADING_POST
})