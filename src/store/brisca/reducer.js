import * as actions from "./actions";
import { combineReducers } from "redux";

let brisca = (state = null, action) => {
  let { type } = action;
  switch (type) {
    case actions.GAME_RECEIVE:
      return action.game;
    default:
      return state;
  }
};

let games = (state = {}, action) => {
  switch (action.type) {
    case actions.GAME_RECEIVE:
      if (action.id) {
        return {
          ...state,
          [action.id]: brisca(state[action.id], action)
        };
      }
      return state;
    default:
      return state;
  }
};

let isFetching = (state = false, action) => {
  switch (action.type) {
    case actions.GAME_REQUEST:
      return state || action.request === "fetch";
    case actions.GAME_RECEIVE:
    case actions.GAME_ERROR:
      return false;
    default:
      return state;
  }
};

let isPosting = (state = false, action) => {
  switch (action.type) {
    case actions.GAME_REQUEST:
      return state || action.request === "post";
    case actions.GAME_RECEIVE:
    case actions.GAME_ERROR:
      return false;
    default:
      return state;
  }
};

let error = (state = null, action) => {
  switch (action.type) {
    case actions.GAME_REQUEST:
    case actions.GAME_RECEIVE:
      return null;
    case actions.GAME_ERROR:
      return action.error;
    default:
      return state;
  }
};

let createdGameId = (state = null, action) => {
  switch (action.type) {
    case actions.GAME_ROOM_CREATED:
      return action.id;
    default:
      return state;
  }
};

let member = (state = {}, action) => {
  switch (action.type) {
    case actions.GAME_MEMBER_SUCCESS:
      let { data } = action;
      return { ...data };
    default:
      return state;
  }
};

let members = (state = {}, action) => {
  switch (action.type) {
    case actions.GAME_MEMBER_SUCCESS:
      let { member_id } = action;
      return {
        ...state,
        [member_id]: member(state[member_id], action)
      };
    default:
      return state;
  }
};

export const key = "briscas";
export default combineReducers({
  members,
  games,
  createdGameId,
  isFetching,
  isPosting,
  error
});

///Selectors
export const getBriscas = state => {
  return state[key];
};

export const getIsFetching = state => {
  return getBriscas(state).isFetching;
};

export const getIsPosting = state => {
  return getBriscas(state).isPosting;
};

export const getGames = (state, root) => {
  return getBriscas(state).games;
};

export const getById = (state, id) => {
  return getGames(state)[id];
};

export const getCreatedGameId = state => {
  return getBriscas(state).createdGameId;
};
