import {
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

import axios from "axios";
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export const userRegister = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const userLogin = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const {
        token
      } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decode = jwt_decode(token);
      dispatch(setCurrentUser(decode));
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decode => {
  return {
    type: SET_CURRENT_USER,
    payload: decode
  }
}

export const userLogout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setCurrentUser(false);
  dispatch(setCurrentUser({}));
}