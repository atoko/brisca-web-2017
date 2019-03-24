import React, { Component } from "react";
import Header from "../header";
import { connect } from "react-redux";
import * as briscaSelectors from "../../store/brisca/reducer";
import * as authSelectors from "../../store/auth/reducer";
import * as userSelectors from "../../store/user/reducer";
import * as BriscaActions from "../../store/brisca/actions";
import Table from "./components/table";
import briscaSelector from "../../store/brisca-local/get";
import * as briscaLocalActions from '../../store/brisca-local/briscaActions';

import Chatbox from "../chat";
import PlayerHand from "./components/playerHand";
import "./index.css";
import SockJS from "sockjs-client";

class Game extends Component {
  polling = false;
  socket = null;
  componentWillMount() {
    this.socket = new SockJS("/_briscas/ws");
    this.socketHandlers = {};

    const { id, currentUser } = this.props;

    // this.socket.onopen = () => {
    //   this.socket.send(
    //     JSON.stringify({
    //       type: "JOIN_ROOM",
    //       roomId: id,
    //       memberId: currentUser
    //     })
    //   );
    // };
    // this.socket.onmessage = e => {
    //   try {
    //     let command = JSON.parse(e.data);
    //     console.log(command);
    //     if (this.socketHandlers[command.type]) {
    //       this.socketHandlers[command.type](command);
    //     }
    //   } catch (e) {
    //     console.log("Unknown command received");
    //   }
    // };
    // this.socket.onclose = () => {
    //   console.log("close");
    // };
    this.props.loadGame(this.props.id);
    this.registerMessageHandler("GAME_UPDATED")(() => {
      this.props.fetchGame();
    });
  }
  sendSocketMessage = message => {
    //this.socket.send(JSON.stringify(message));
  };
  registerMessageHandler = type => callback => {
    //this.socketHandlers[type] = callback;
  };
  componentWillUnmount() {
    if (this.socket) {
      this.socket.close();
    }
    this.pausePolling();
  }
  resumePolling = () => {
    // if (this.polling === false) {
    //   this.polling = true;
    //   this.props.fetchGame();
    // }
  };
  pausePolling = () => {
    this.polling = false;
  };
  render() {
    const {
      brisca,
      token,
      currentUser,
      playCard,
      joinGame,
      requestBot,
      users,
      isLoading
    } = this.props;
    if (!brisca || (brisca && brisca.players.length === 0)) {
      return <div>Connecting to server..</div>;
    }
    let remainingPlayerCards = brisca.players.reduce((total, player) => {
      return total + player.hand.length;
    }, 0);
    if (
      brisca.cardsLeft <= 0 &&
      remainingPlayerCards <= 0 &&
      this.pollingTimer
    ) {
      let sortedPlayers = brisca.players.sort((a, b) => a.points < b.points);
      let playerHands = sortedPlayers.map((player, i) => {
        return (
          <PlayerHand
            key={player.id}
            player_id={player.id}
            hand={player.hand}
            points={player.points}
            showCards={currentUser === player.id}
            nextToPlay={brisca.nextToPlay === player.id}
            onCardClick={() => {}}
          />
        );
      });
      let winningPlayer = userSelectors.getMemberNameById(
        { [userSelectors.key]: users },
        sortedPlayers[0].id
      );
      let message =
        sortedPlayers[0].id === currentUser ? "CONGRATULATIONS" : "TRY_AGAIN";

      return (
        <div className="game-container content">
          <div className="post-game-body">
            <h1>{winningPlayer} HAS_WON</h1>
            <p>{message}</p>
            <button>RETURN_TO_LOBBY</button>
          </div>
          <div className="">{playerHands}</div>
        </div>
      );
    }

    return (
      <div className="game-container container">
        <Table
          {...brisca}
          currentUser={currentUser}
          onCardClick={playCard(token)}
          onRequestBot={requestBot(token)}
          onJoin={joinGame(token)}
          pausePolling={this.pausePolling}
          resumePolling={this.resumePolling}
          isLoading={isLoading}
        />
        <Chatbox
          onSubmit={this.sendSocketMessage}
          onMessage={this.registerMessageHandler("RECEIVE_CHAT_MESSAGE")}
          roomId={this.props.id}
        />
      </div>
    );
  }
}

// let mapStateToProps = (state, ownProps) => ({
//   brisca: briscaSelectors.getById(state, ownProps.id),
//   token: authSelectors.getToken(state),
//   currentUser: authSelectors.getId(state),
//   users: userSelectors.getMember(state),
//   isLoading: briscaSelectors.getIsPosting(state)
// });
let mapStateToProps = (state, ownProps) => ({
  brisca: briscaSelector(state),
  currentUser: 54321,
  users: {
    66: {

    },
    54321: {

    }
  },
  isLoading: false
})

let mapDispatchToProps = (dispatch) => ({
  loadGame: () => { 
    dispatch(briscaLocalActions.createNewGame(2));
    dispatch(briscaLocalActions.joinGame(54321));
  },
  playCard: (token) => (card, player_id) => { dispatch(briscaLocalActions.playCard(player_id, card)) },
  joinGame: () => { },
  requestBot: (token) => () => { dispatch(briscaLocalActions.joinGame(66)) }
})

// let mapDispatchToProps = (dispatch, ownProps) => ({
//   fetchGame: () => dispatch(BriscaActions.fetchGame(ownProps.id)),
//   loadGame: () => dispatch(BriscaActions.loadGame(ownProps.id)),
//   playCard: token => card =>
//     dispatch(BriscaActions.playCard(token, ownProps.id, card)),
//   joinGame: token => () => dispatch(BriscaActions.joinGame(token, ownProps.id)),
//   requestBot: token => () =>
//     dispatch(BriscaActions.requestBot(token, ownProps.id))
// });
Game = connect(mapStateToProps, mapDispatchToProps)(Game);

class BriscaGame extends Component {
  render() {
    return (
      <div>
        <Header title="game" />
        <Game id={this.props.params.gameId} />
      </div>
    );
  }
}
export default BriscaGame;
