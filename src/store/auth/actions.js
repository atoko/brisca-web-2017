import * as api from "./api";
import * as selectors from "./reducer";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_LOGIN = "AUTH_LOGIN";
export const authLogin = (id, token) => ({
  type: AUTH_LOGIN,
  id,
  token
});

export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const authLogout = () => ({
  type: AUTH_LOGOUT
});

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const authSuccess = message => ({
  type: AUTH_SUCCESS,
  message
});

export const AUTH_ERROR = "AUTH_ERROR";
export const authError = error => ({
  type: AUTH_ERROR,
  error
});

export const AUTH_VALIDATION_SUCCESS = "AUTH_VALIDATION_SUCCESS";
export const authValidationSuccess = data => ({
  type: AUTH_VALIDATION_SUCCESS,
  ...data
});

export const AUTH_VALIDATION_ERROR = "AUTH_VALIDATION_ERROR";
export const authValidationError = error => ({
  type: AUTH_VALIDATION_ERROR,
  error
});

const authResponse = dispatch => response => {
  if (response.success) {
    dispatch(authLogin(response.id, response.token));
    dispatch(authSuccess(response.message));
  } else {
    dispatch(authError(response.error));
  }
};

const errorResponse = dispatch => error => {
  dispatch(authError(error));
};

export const validateToken = token => (dispatch, getState) => {
  //const auth = selectors.getAuth(getState());

  dispatch(authRequest());
  api.Validate(token).then(
    response => {
      if (!response.success) {
        dispatch(authValidationError(response.error));
      } else {
        dispatch(authValidationSuccess(response));
      }
    },
    error => {
      dispatch(authValidationError(error));
    }
  );
};

export const anonymous = () => (dispatch, getState) => {
  // const auth = selectors.getAuth(getState());

  if (!selectors.isFetching(getState())) {
    dispatch(authRequest());
    api.Anonymous().then(authResponse(dispatch), errorResponse(dispatch));
  }
};

export const authenticate = (username, password) => (dispatch, getState) => {
  //const auth = selectors.getAuth(getState());

  if (!selectors.isFetching(getState())) {
    dispatch(authRequest());
    api
      .Login({ username, password })
      .then(authResponse(dispatch), errorResponse(dispatch));
  }
};

export const register = (username, password) => (dispatch, getState) => {
  //const auth = selectors.getAuth(getState());

  if (!selectors.isFetching(getState())) {
    dispatch(authRequest());
    return api
      .Register({ username, password, confirm: password })
      .then(authResponse(dispatch), errorResponse(dispatch));
  }
};

export const facebook = accessToken => (dispatch, getState) => {
  //const auth = selectors.getAuth(getState());
  if (!selectors.isFetching(getState())) {
    dispatch(authRequest());
    api
      .Facebook(accessToken)
      .then(authResponse(dispatch), errorResponse(dispatch));
  }
};

export const logout = () => (dispatch, getState) => {
  //const auth = selectors.getAuth(getState());

  if (!selectors.isFetching(getState())) {
    dispatch(authRequest());
    dispatch(authLogout());
    dispatch(authSuccess("USER_LOGGED_OUT"));
  }
};
