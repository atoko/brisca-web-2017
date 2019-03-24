import * as actions from "./actions";
import { combineReducers } from "redux";

let member = (state = null, action) => {
  switch (action.type) {
    case actions.USER_RECEIVE:
      return action.user;
    default:
      return state;
  }
};

let users = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_RECEIVE:
      if (action.id) {
        return {
          ...state,
          [action.id]: member(state[action.id], action)
        };
      }
      return state;
    default:
      return state;
  }
};

let status = (state = null, action) => {
  switch (action.type) {
    case actions.USER_REQUEST:
      return "";
    case actions.USER_REQUEST_SUCCESS:
    case actions.USER_RECEIVE:
      return "200";
    default:
      return state;
  }
};

let message = (state = null, action) => {
  switch (action.type) {
    case actions.USER_REQUEST:
      return null;
    case actions.USER_REQUEST_SUCCESS:
    case actions.USER_RECEIVE:
      return null;
    default:
      return state;
  }
};

export const key = "member";
export default combineReducers({
  users,
  status,
  message
});

export const getMember = state => {
  return state[key];
};

export const isLoading = state => {
  return getMember(state).status === "";
};
export const isSent = state => {
  return getMember(state).status === "200";
};
export const getError = state => {
  return getMember(state).status !== "200" ? getMember(state).message : null;
};

export const getMembers = state => {
  return state[key].users;
};
export const getMemberById = (state, id) => {
  return getMember(state).users[id];
};

export const getMembersById = (state, ids) => {
  return ids.map(id => getMemberById(state, id));
};

export const getMemberNameById = (state, id) => {
  let member = getMemberById(state, id);
  if (member) {
    return member.name ? member.name : "Anonymous";
  }
  return "";
};
export const getMemberPhotoUrlById = (state, id) => {
  const { facebook_key } = getMemberById(state, id) || {};
  let url = "/static_content/anonymous_profile_picture.png";
  if (facebook_key) {
    return `http://graph.facebook.com/v2.8/${facebook_key}/picture?type=large`;
  }
  return url;
};
