import React, { Component } from "react";
//import {connect} from 'react-redux';
import Spinner from "../../components/spinner";
import { FormattedMessage } from "react-intl";
import { mapCardToImage, appearCardTransition } from "../library";
import TablePlay from "./tablePlay";
import PlayerHand from "./playerHand";
import PlayerOutline from "./playerOutline";
import Modal from "./modal";

let arraysEqual = (a, b) => {
  return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
};

class Table extends Component {
  constructor() {
    super();
    this.state = { modal: false, lastTableCards: [] };
  }
  componentWillReceiveProps(newProps) {
    let { lastTable } = newProps;
    if (!arraysEqual(this.state.lastTableCards, lastTable)) {
      this.setState({ ...this.state, lastTableCards: lastTable, modal: true });
    }
  }
  renderPlayerHands() {
    let {
      players,
      tableOwner,
      currentUser,
      nextToPlay,
      onCardClick,
      onJoin,
      onRequestBot
    } = this.props;
    if (players.map(p => p.id).indexOf(currentUser) < 0) {
      players = players.sort((a, b) => a.id > b.id);
    } else {
      players = players.sort((a, b) => (a.id === currentUser ? -1 : 1));
    }

    let playerHands = players.map((player, i) => {
      return (
        <PlayerHand
          key={player.id}
          player_id={player.id}
          hand={player.hand}
          points={player.points}
          showCards={true}
          nextToPlay={nextToPlay === player.id}
          onCardClick={this.state.modal ? () => {} : onCardClick}
          preferences={player.preferences}
        />
      );
    });

    if (players.length < 2) {
      playerHands.push(
        <PlayerOutline
          key={`waiting_for_${playerHands.length}`}
          tableOwner={tableOwner}
          currentUser={currentUser}
          canJoin={players.filter(player => player.id)[0] === false}
          onJoin={onJoin}
          onRequestBot={onRequestBot}
        />
      );
    }

    return playerHands;
  }
  renderModal = () => {
    const { players, lastTable, pausePolling, life } = this.props;
    let modal = null;
    if (this.state.modal === true) {
      modal = (
        <Modal
          onClick={() => {
            this.onModalDismiss();
          }}
          cards={lastTable}
          players={players}
          life={life}
        />
      );
      pausePolling();
    }

    return modal;
  };
  onModalDismiss = () => {
    this.props.resumePolling();
    this.setState({ ...this.state, modal: false });
  };
  renderWinScreen = () => {
    const { currentUser, players } = this.props;
    let win = false;
    let tie = false;

    if (players[currentUser].points > 60) {
      win = true;
    }
    if (players[currentUser].points == 60) {
      tie = true;
    }
    //todo language keys
    const result = win ? "You won" : (tie ? "You tied!" : "You lost");
    return <div>
      <h1>{result}!</h1>
    </div>
  }
  render() {
    let {
      currentUser,
      players,
      table,
      lifeCard,
      isLoading,
      isGameEnded
    } = this.props;

    let lifeCardPlayer = players.filter(p => currentUser === p.id)[0];
    if (!lifeCardPlayer) {
      lifeCardPlayer = { id: currentUser };
    }
    let lifeCardPlay = { card: lifeCard, player_id: lifeCardPlayer.id };
    let spinner = isLoading ? <Spinner /> : null;

    if (isGameEnded) {
      return this.renderWinScreen();
    }

    return (
      <div>
        <hr className="my-1" />
        <div className="game-spinner">{spinner}</div>
        <div className="game-body row">
          <div className="col-10 col-md-6 justify-content-center">
            <TablePlay
              label={"CURRENT_PLAY"}
              players={players}
              cards={table}
            />
            <TablePlay
              label={"LIFE_CARD"}
              player={lifeCardPlayer}
              cards={[lifeCardPlay]}
            />
          </div>
          <hr/>
          <p />
          {this.renderModal()}          
          <hr/>
          <div className="col-md-6">{this.renderPlayerHands()}</div>
        </div>
      </div>
    );
  }
}

export default Table;
