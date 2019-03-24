import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { mapCardToImage, appearCardTransition } from "../library";
import "../cardAnimation.css";

class TablePlay extends Component {
  constructor() {
    super();
    this.state = { selectedMap: undefined };
  }
  generateImageForCards = (tableCards, players, player = null) => {
    if (!tableCards) {
      return [];
    }
    return tableCards.map((tablePlay, i) => {
      let { card, player_id } = tablePlay;
      if (player == null) {
        player = players.filter(p => p.id === player_id)[0];
      }
      let { preferences } = player;
      let deck = undefined;
      if (preferences) {
        deck = preferences.deck;
      }
      return (
        <span key={card} className="briscaGame-card">
          <img alt={card} src={mapCardToImage(card, deck)} />
        </span>
      );
    });
  };
  render = () => {
    const { cards, players, label, player } = this.props;
    let table = this.generateImageForCards(cards, players, player);
    let message = null;

    if (label) {
      message = (
        <h3 className="display-5">
          <FormattedMessage id={label} />
        </h3>
      );
    }
    return (
      <div className="game-table container">
        <div className="game-table-label">{message}</div>
        {appearCardTransition(table)}
      </div>
    );
  };
}

export default TablePlay;
