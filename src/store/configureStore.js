import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import promise from "redux-promise";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import * as brisca from "./brisca/reducer";
import * as local from "./brisca-local/briscaReducer";
import * as auth from "./auth/reducer";
import * as user from "./user/reducer";
import settings from "./settings/reducer";

export default (middlewares = [], initialState = {}) => {
  const devTools =
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  let state = {
    [auth.key]: auth.load(),
    ...initialState
  };

  middlewares = [
    thunk,
    promise,
    devTools ? createLogger : store => next => action => next(action)
  ].concat(middlewares);

  const store = createStore(
    combineReducers({
      [brisca.key]: brisca.default,
      [auth.key]: auth.default,
      [user.key]: user.default,
      ["local"]: local.default,
      settings
    }),
    state,
    compose(
      applyMiddleware(...middlewares),
      devTools
        ? devTools
        : () => {
            return createStore;
          }
    )
  );

  //Subscribe to token changes
  store.subscribe(() => {
    let currentAuth = auth.getAuth(store.getState());
    if (auth.isFetching(store.getState()) === false) {
      auth.save(currentAuth);
    }
  });

  return store;
};
