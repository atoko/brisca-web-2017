import React, { Component } from "react";
import LobbyForm from "./components/lobby";
import LobbySheet from "./components/lobbySheet";
import Header from "../header";
import "./index.css";
class BriscaLobby extends Component {
  render() {
    return (
      <div>
        <Header title="" />
        <div className="lobby-root">
          <h1>Play briscas online</h1>
          <LobbyForm onJoin={this.joinGame} />
          <LobbySheet />
        </div>
      </div>        
    );
  }
}
export default BriscaLobby;
