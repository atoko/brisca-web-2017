import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export const mapCardToImage = (card, deck = "fournier") =>
  `/decks/${deck}/${card + 1}.gif`;

export const swipeCardTransition = key => cards => {
  return (
    <ReactCSSTransitionGroup
      transitionName="card-animation-swipe"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={600}
    >
      {cards}
    </ReactCSSTransitionGroup>
  );
};

export const appearCardTransition = cards => {
  return (
    <ReactCSSTransitionGroup
      transitionName="card-animation-appear"
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
    >
      {cards}
    </ReactCSSTransitionGroup>
  );
};
