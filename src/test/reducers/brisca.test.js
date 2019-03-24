import test from "ava";
import * as selectors from "../../store/brisca/reducer";
import * as actions from "../../store/brisca/actions";
import { combineReducers } from "redux";
const reducer = combineReducers({
  [selectors.key]: selectors.default
});

test("isFetching on request", t => {
  var state = reducer(undefined, {});
  t.is(selectors.getIsFetching(state), false);

  state = reducer(state, actions.gameRequest());
  t.is(selectors.getIsFetching(state), true);

  state = reducer(state, actions.gameReceive(1, {}));
  t.is(selectors.getIsFetching(state), false);
});

test("can load game", t => {
  var state = reducer(undefined, {});
  state = reducer(
    state,
    actions.gameReceive("id", { id: "id", players: [], game: [] })
  );
  t.is(typeof selectors.getById(state, "id"), "object");
});
