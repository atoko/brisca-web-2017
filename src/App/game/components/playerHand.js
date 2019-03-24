import React, { Component } from "react";
import Immutable from "immutable";
import { connect } from "react-redux";
//import { FormattedMessage } from 'react-intl';

import * as UserActions from "../../../store/user/actions";
import * as UserSelectors from "../../../store/user/reducer";
import * as AuthSelectors from "../../../store/auth/reducer";

import { mapCardToImage, swipeCardTransition } from "../library";
import "../cardAnimation.css";

class PlayerHand extends Component {
  constructor() {
    super();
    this.hand = Immutable.OrderedMap({
      "1": undefined,
      "2": undefined,
      "3": undefined
    });
  }
  componentWillMount() {
    const { player_id, fetchUser, hand } = this.props;
    this.updateHandWith(hand);
    //fetchUser(player_id);
  }
  updateHandWith(newHand) {
    //Remove cards
    this.hand = this.hand.map(card => {
      return newHand.indexOf(card) >= 0 ? card : undefined;
    });

    //Add new ones
    newHand.forEach(card => {
      if (!this.hand.contains(card)) {
        let firstEmpty = this.hand.keyOf(undefined);
        if (firstEmpty) {
          this.hand = this.hand.set(firstEmpty, card);
        }
      }
    });
  }
  render() {
    const {
      name,
      picture,
      points,
      preferences,
      nextToPlay,
      onCardClick,
      showCards,
      player_id
    } = this.props;
    let deck = undefined;
    if (preferences) {
      deck = preferences.deck;
    }
    this.updateHandWith(this.props.hand);
    const hand = this.hand.toArray();

    let handleClick = showCards
      ? card => {
          if (nextToPlay) {
            onCardClick(card, player_id);
          }
        }
      : () => {};

    let cards = hand.map(card => {
      const imgSrc = showCards
        ? mapCardToImage(card, deck)
        : `/fournier/respaldo.gif`;
      if (card === undefined) {
        return swipeCardTransition(name)(
          <div key={Date.now()} className="player-cards-card" />
        );
      }
      return swipeCardTransition(card)(
        <div className="player-cards-card">
          <img
            alt={card}
            className={`briscaGame-card`}
            src={imgSrc}
            onClick={() => handleClick(card)}
          />
        </div>
      );
    });

    return (
      <div className="player">
        <div className="player-info">
          <img
            width={42}
            height={42}
            src={picture}
            className={`profile ${nextToPlay ? "next" : ""}`}
            alt="profile"
          />
          <h3>{name}</h3>
          <h5>{points}</h5>
        </div>
        <div className="player-cards">
          {cards[0]}
          {cards[1]}
          {cards[2]}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoggedInUser: AuthSelectors.getId(state) === ownProps.player_id,
  name: UserSelectors.getMemberNameById(state, ownProps.player_id),
  picture: UserSelectors.getMemberPhotoUrlById(state, ownProps.player_id)
});
const mapDispatchToProps = {
  fetchUser: UserActions.loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerHand);
