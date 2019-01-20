import axios from 'axios';
import {
  PROFILE_GET,
  PROFILE_LOADING,
  PROFILE_CLEAR,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from './types'

export const profileGet = () => dispatch => {
  dispatch(profileLoading);
  axios.get('/api/profile').then(res => dispatch({
    type: PROFILE_GET,
    payload: res.data
  })).catch(err => dispatch({
    type: PROFILE_GET,
    payload: {}
  }));
}

export const profileCreate = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
      history.push('/dashboard');
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

export const profileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

export const profileClear = () => {
  return {
    type: PROFILE_CLEAR
  }
}

export const profileAddExperience = (expData, history) => dispatch => {
  axios.post('/api/profile/experience', expData)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
      history.push('/dashboard');
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}
export const profileAddEducation = (eduData, history) => dispatch => {
  axios.post('/api/profile/education', eduData)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
      history.push('/dashboard');
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

export const profileDelete = () => dispatch => {
  if (window.confirm('Are you shure delete profile and user? It not be undone!')) {
    axios.delete('api/profile').then(res => dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    })).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
  }
}

export const experienceDelete = id => dispatch => {
  if (window.confirm('Are you shure delete experience? It not be undone!')) {
    axios.delete(`api/profile/experience/${id}`)
      .then(res => dispatch({
        type: PROFILE_GET,
        payload: res.data
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
  }
}

export const educationDelete = id => dispatch => {
  if (window.confirm('Are you shure delete education? It not be undone!')) {
    axios.delete(`api/profile/education/${id}`)
      .then(res => dispatch({
        type: PROFILE_GET,
        payload: res.data
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
  }
}

export const getProfiles = () => dispatch => {
  dispatch(profileLoading());
  axios.get('/api/profile/all')
    .then(res => dispatch({
      type: GET_PROFILES,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILES,
      payload: null
    }));
}

export const getProfileByHandle = handle => dispatch => {
  dispatch(profileLoading());
  axios.get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: PROFILE_GET,
        payload: res.data
      })
    })
    .catch(err => dispatch({
      type: PROFILE_GET,
      payload: null
    }));
}