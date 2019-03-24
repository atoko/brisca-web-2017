import test from "ava";
import nock from "nock";
import fetch from "node-fetch";
import { url } from "../../lib/accio";
import * as selectors from "../../store/auth/reducer";
import * as actions from "../../store/auth/actions";
import configureStore from "../../store/configureStore";

global.fetch = fetch;
test.cb("authenticate success returns with token and id", t => {
  let store = configureStore();

  nock(url(""))
    .post("/auth/login", {
      username: "success"
    })
    .reply(200, {
      success: true,
      id: "42",
      token: "test",
      message: "LOGIN_SUCCESS",
      error: null
    });

  store.dispatch(actions.authenticate("success"));
  store.replaceReducer((state = null, action) => {
    switch (action.type) {
      case actions.AUTH_LOGIN:
        t.is(typeof action.id, "string");
        t.is(typeof action.token, "string");
        return state;
      case actions.AUTH_ERROR:
      case actions.AUTH_SUCCESS:
        t.end(action.error);
      default:
        return state;
    }
  });
});

test.cb("authenticate error returns with error field", t => {
  let store = configureStore();

  nock(url(""))
    .post("/auth/login", {
      username: "error"
    })
    .reply(403, {
      error: {
        code: "AUTHENTICATION_FAILURE",
        message: "Could not authenticate user"
      }
    });

  store.dispatch(actions.authenticate("error"));
  store.replaceReducer((state = null, action) => {
    switch (action.type) {
      case actions.AUTH_ERROR:
        t.is(typeof action.error, "string");
        t.end();
      default:
        return state;
    }
  });
});

test.cb("anonymous returns token", t => {
  let store = configureStore();

  nock(url(""))
    .post("/auth/anonymous")
    .reply(200, {
      success: true,
      id: "1231",
      token: "new_token",
      message: "LOGIN_SUCCESS"
    });

  store.dispatch(actions.anonymous());
  store.replaceReducer((state = null, action) => {
    switch (action.type) {
      case actions.AUTH_LOGIN:
        t.is(typeof action.id, "string");
        t.is(typeof action.token, "string");
        return state;
      case actions.AUTH_ERROR:
      case actions.AUTH_SUCCESS:
        t.end(action.error);
      default:
        return state;
    }
  });
});

test.cb("facebook returns token", t => {
  let store = configureStore();

  nock(url(""))
    .post("/auth/facebook")
    .reply(200, {
      success: true,
      id: "12321",
      token: "helloFbUser",
      message: "LOGIN_SUCCESS"
    });

  store.dispatch(actions.facebook("access_token"));
  store.replaceReducer((state = null, action) => {
    switch (action.type) {
      case actions.AUTH_LOGIN:
        t.is(typeof action.id, "string");
        t.is(typeof action.token, "string");
        return state;
      case actions.AUTH_ERROR:
      case actions.AUTH_SUCCESS:
        t.end(action.error);
      default:
        return state;
    }
  });
});
