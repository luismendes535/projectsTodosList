import axios from "axios";
import * as actionTypes from "./actionTypes";
import { setAuthorizationToken } from "../../utils/utility";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: user._id,
    userName: user.name
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const auth = (name, email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password
    };
    let url = "http://localhost:5000/auth";
    if (!isSignup) {
      authData.name = name;
      url = "http://localhost:5000/users";
    }
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.token.expiresIn
        );
        localStorage.setItem("token", response.data.token.token);
        localStorage.setItem("expirationDate", expirationDate.getTime());
        localStorage.setItem("userId", response.data.user._id);
        setAuthorizationToken(response.data.token.token);
        dispatch(authSuccess(response.data.token, response.data.user));
        dispatch(checkAuthTimeout(response.data.token.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = localStorage.getItem("expirationDate");
      if (expirationDate >= new Date().getTime()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expirationDate - new Date().getTime()));
      } else {
        dispatch(logout());
      }
    }
  };
};
