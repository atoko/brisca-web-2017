import React, { Component } from "react";

class PlayerOutline extends Component {
  renderBotLink = () => {
    let { tableOwner, currentUser, onRequestBot } = this.props;
    if (tableOwner === currentUser) {
      return (
        <a onClick={onRequestBot}>
          <h5>Click here to play with the computer</h5>
        </a>
      );
    }

    return null;
  };
  renderPlayerLink = () => {
    let { tableOwner, currentUser, onJoin } = this.props;
    if (tableOwner !== currentUser) {
      return (
        <a onClick={onJoin}>
          <h5>Click here to play!</h5>
        </a>
      );
    }

    return null;
  };
  render() {
    return (
      <div className="">
        <h3>Waiting for player..</h3>
        {this.renderBotLink()}
        {this.renderPlayerLink()}
      </div>
    );
  }
}

export default PlayerOutline;
