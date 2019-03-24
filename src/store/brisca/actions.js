import * as api from "./api";
import * as briscaSelectors from "./reducer";
import * as authActions from "../auth/actions";

export const GAME_ERROR = "GAME_ERROR";
export const gameError = error => {
  return {
    type: GAME_ERROR,
    error
  };
};

export const GAME_SUCCESS = "GAME_SUCCESS";
export const gameSuccess = message => ({
  type: GAME_SUCCESS,
  message
});

export const GAME_REQUEST = "GAME_REQUEST";
export const gameRequest = (request = "fetch") => {
  return {
    type: GAME_REQUEST,
    request
  };
};

export const GAME_RECEIVE = "GAME_RECEIVE";
export const gameReceive = (id, game) => {
  return {
    type: GAME_RECEIVE,
    id,
    game
  };
};

export const GAME_ROOM_CREATED = "GAME_ROOM_CREATED";
export const gameRoomCreated = id => ({
  type: GAME_ROOM_CREATED,
  id
});

export const GAME_MEMBER_SUCCESS = "GAME_MEMBER_SUCCESS";
export const gameMemberSuccess = id => ({
  type: GAME_MEMBER_SUCCESS,
  id
});

export const listGames = page => (dispatch, getState) => {
  dispatch(gameRequest());
  return api.GetList(page).then(
    response => {
      response.forEach(function(game) {
        dispatch(gameReceive(game.id, game));
      }, this);

      dispatch(gameSuccess("LIST_GAMES_SUCCESS"));
    },
    error => {
      dispatch(gameError(error.code));
    }
  );
};

export const fetchGame = id => (dispatch, getState) => {
  dispatch(gameRequest());
  api.GetById(id).then(
    response => {
      dispatch(gameReceive(id, response));
      dispatch(gameSuccess("FETCH_GAME_SUCCESS"));
    },
    error => {
      dispatch(gameError(error.code));
    }
  );
};

export const newGame = token => (dispatch, getState) => {
  dispatch(gameRequest("post"));
  api.PostNewGame(token).then(
    game => {
      dispatch(gameRoomCreated(game.id));
      dispatch(gameSuccess("NEW_GAME_SUCCESS"));

      fetchGame(game.id)(dispatch, getState);
    },
    error => {
      if (error && error.code) {
        dispatch(gameError(error.code));
      } else if (error) {
        dispatch(gameError(error));
      }
      dispatch(authActions.authLogout());
    }
  );
};

export const publicGame = token => (dispatch, getState) => {
  dispatch(gameRequest("post"));
  api.PostPublicGame(token).then(
    game => {
      dispatch(gameRoomCreated(game.id));
      dispatch(gameSuccess("NEW_GAME_SUCCESS"));

      fetchGame(game.id)(dispatch, getState);
    },
    error => {
      dispatch(gameError(error.code));
      dispatch(authActions.authLogout());
    }
  );
};

export const loadGame = id => (dispatch, getState) => {
  const brisca = briscaSelectors.getById(getState(), id);
  const loadedOrLoading = brisca || briscaSelectors.getIsFetching(getState());
  if (loadedOrLoading) {
    return;
  } else {
    dispatch(fetchGame(id));
  }
};

export const playCard = (token, id, card) => (dispatch, getState) => {
  dispatch(gameRequest("post"));
  api.PostPlayCard(token, id, card).then(
    game => {
      dispatch(gameSuccess("PLAY_CARD_SUCCESS"));
      fetchGame(game.id)(dispatch, getState);
    },
    error => {
      dispatch(gameError(error.code));
    }
  );
};

export const joinGame = (token, id) => (dispatch, getState) => {
  dispatch(gameRequest("post"));
  return api.PostJoinGame(token, id).then(
    game => {
      dispatch(gameSuccess("JOIN_GAME_SUCCESS"));
      fetchGame(game.id)(dispatch, getState);
    },
    error => {
      dispatch(gameError(error.code));
    }
  );
};

export const requestBot = (token, id) => (dispatch, getState) => {
  dispatch(gameRequest("post"));
  return api.PostRequestBot(token, id).then(
    game => {
      dispatch(gameSuccess("JOIN_GAME_SUCCESS"));
      fetchGame(game.id)(dispatch, getState);
    },
    response => {
      dispatch(gameError(response.error));
    }
  );
};
