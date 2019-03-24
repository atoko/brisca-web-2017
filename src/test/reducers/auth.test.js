import test from "ava";
import * as selectors from "../../store/auth/reducer";
import * as actions from "../../store/auth/actions";
import { combineReducers } from "redux";
const reducer = combineReducers({
  [selectors.key]: selectors.default
});

test("isFetching sets on request", t => {
  let state = reducer(undefined, {});
  {
    state = reducer(state, actions.authRequest());
  }
  t.deepEqual(selectors.getAuth(state).isFetching, true);
});

test("isFetching false after success / failure", t => {
  let state = reducer(undefined, {});
  state = reducer(state, actions.authRequest());
  state = reducer(state, actions.authSuccess("good!"));
  t.deepEqual(selectors.getAuth(state).isFetching, false);

  state = reducer(state, actions.authRequest());
  state = reducer(state, actions.authError("Testing mode"));
  t.deepEqual(selectors.getAuth(state).isFetching, false);
});

test("login saves token", t => {
  let state = reducer(undefined, {});
  state = reducer(state, actions.authLogin("11", "token!"));
  t.deepEqual(selectors.getAuth(state).token, "token!");
});

test("logout clears token", t => {
  let state = reducer(undefined, {});
  state = reducer(state, actions.authLogin("42", "token!"));
  state = reducer(state, actions.authLogout());
  t.deepEqual(selectors.getAuth(state).token, null);
});

test("error sets error message", t => {
  let state = reducer(undefined, {});
  {
    state = reducer(state, actions.authError("error!"));
  }
  t.deepEqual(selectors.getAuth(state).error, "error!");
});
