import test from "ava";
import nock from "nock";
import fetch from "node-fetch";

import { url } from "../../lib/accio";
import * as selectors from "../../store/brisca/reducer";
import * as actions from "../../store/brisca/actions";
import configureStore from "../../store/configureStore";

global.fetch = fetch;
test.cb("fetchGame returns game", t => {
  let store = configureStore();

  nock(url(""))
    .get("/briscas/query/uuid")
    .reply(200, { id: "uuid", players: [], error: null });

  store.dispatch(actions.fetchGame("uuid"));
  store.replaceReducer((state = null, action) => {
    switch (action.type) {
      case actions.GAME_RECEIVE:
        t.is(typeof action.game, "object");
        return state;
      case actions.GAME_ERROR:
      case actions.GAME_SUCCESS:
        t.end(action.error);
      default:
        return state;
    }
  });
});
test.cb("newGame returns game", t => {
  let store = configureStore();

  nock(url(""))
    .post("/briscas/new")
    .reply(200, { id: "uuid", players: [], error: null });

  store.dispatch(actions.newGame(null));
  store.replaceReducer((state = null, action) => {
    switch (action.type) {
      case actions.GAME_ROOM_CREATED:
        t.is(typeof action.id, "string");
        return state;
      case actions.GAME_RECEIVE:
        t.is(typeof action.game, "object");
        return state;
      case actions.GAME_ERROR:
      case actions.GAME_SUCCESS:
        t.end(action.error);
      default:
        return state;
    }
  });
});

test.cb("play card returns game", t => {
  let store = configureStore();

  nock(url(""))
    .post("/briscas/card/uuid", { card: "22" })
    .reply(200, { id: "uuid", players: [], error: null });

  store.dispatch(actions.playCard(null, "uuid", "22"));
  store.replaceReducer((state = null, action) => {
    switch (action.type) {
      case actions.GAME_RECEIVE:
        t.is(typeof action.game, "object");
        return state;
      case actions.GAME_ERROR:
      case actions.GAME_SUCCESS:
        t.end(action.error);
      default:
        return state;
    }
  });
});
