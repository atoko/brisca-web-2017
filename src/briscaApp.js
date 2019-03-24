import "./index.css";
import "./fonts.css";
import "./css/font-awesome.css";

import React from "react";
import { Router, Route, browserHistory } from "react-router";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

import LanguageProvider from "./App/hoc/language";
import RequiresAuthToken from "./App/hoc/requiresAuth";
import RequiresNoAuth from "./App/hoc/requiresNoAuth";
import BriscaLanding from "./App/landing";
import BriscaLobby from "./App/lobby";
import BriscaGame from "./App/game";
import Inventory from "./App/inventory";
//import {ChatWindow} from './App/chat';
import registerServiceWorker from "./registerServiceWorker";
registerServiceWorker();

let siteMap = () => (
  <ul>
    <li>Game</li>
    <li>
      Loot
      <ul>
        <li>Inventory</li>
        <li>Shop</li>
      </ul>
    </li>
    <li>
      Social
      <ul>
        <li>Profile</li>
        <li>History</li>
      </ul>
    </li>
  </ul>
);

export default () => {
  return (
    <Provider store={configureStore()}>
      <LanguageProvider>
        <Router history={browserHistory}>
          <Route path="/" component={RequiresNoAuth(BriscaLanding)} />
          <Route path="lobby" component={RequiresAuthToken(BriscaLobby)} />
          <Route path="player" component={RequiresAuthToken(BriscaLobby)} />
          <Route
            path="game/:gameId"
            component={BriscaGame}
          />
          <Route path="inventory" component={RequiresAuthToken(Inventory)} />
          <Route path="settings" component={RequiresAuthToken(BriscaLanding)} />
          <Route path="help" component={RequiresAuthToken(BriscaLanding)} />
        </Router>
      </LanguageProvider>
    </Provider>
  );
};
