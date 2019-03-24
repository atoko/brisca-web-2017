import * as actions from "./actions";
import { combineReducers } from "redux";

let validated = (state = null, action) => {
  switch (action.type) {
    case actions.AUTH_VALIDATION_SUCCESS:
      return true;
    case actions.AUTH_VALIDATION_ERROR:
      return null;
    default:
      return state;
  }
};
let id = (state = null, action) => {
  switch (action.type) {
    case actions.AUTH_VALIDATION_ERROR:
    case actions.AUTH_LOGOUT:
      return null;
    case actions.AUTH_LOGIN:
      return action.id;
    default:
      return state;
  }
};

let token = (state = null, action) => {
  switch (action.type) {
    case actions.AUTH_VALIDATION_ERROR:
    case actions.AUTH_LOGOUT:
      return null;
    case actions.AUTH_LOGIN:
      return action.token;
    default:
      return state;
  }
};

let busy = (state = false, action) => {
  switch (action.type) {
    case actions.AUTH_REQUEST:
      return true;

    case actions.AUTH_VALIDATION_SUCCESS:
    case actions.AUTH_VALIDATION_ERROR:
    case actions.AUTH_SUCCESS:
    case actions.AUTH_ERROR:
      return false;
    default:
      return state;
  }
};
let error = (state = null, action) => {
  switch (action.type) {
    case actions.AUTH_REQUEST:
      return null;

    case actions.AUTH_VALIDATION_ERROR:
    case actions.AUTH_ERROR:
      return action.error;
    default:
      return state;
  }
};

let message = (state = null, action) => {
  switch (action.type) {
    case actions.AUTH_REQUEST:
      return null;
    case actions.AUTH_VALIDATION_SUCCESS:
    case actions.AUTH_SUCCESS:
      return action.message;
    default:
      return state;
  }
};

export const key = "auth";
const reducer = combineReducers({
  id,
  token,
  busy,
  error,
  message,
  validated
});
export default reducer;

export const save = state => {
  if (typeof window !== "undefined") {
    state.validated = null;
    state.busy = false;
    localStorage.setItem("authData", JSON.stringify(state));
  }
};
export const load = () => {
  if (typeof window !== "undefined") {
    return (
      JSON.parse(localStorage.getItem("authData")) || reducer(undefined, {})
    );
  }

  return reducer(undefined, {});
};

export const getAuth = state => {
  return state[key];
};

export const isFetching = state => {
  return getAuth(state).busy;
};

export const getToken = state => {
  return getAuth(state).token;
};

export const getId = state => {
  return getAuth(state).id;
};

export const isUserLoggedIn = state => {
  return getAuth(state).token !== null;
};

export const isValidated = state => {
  return getAuth(state).validated === true;
};
