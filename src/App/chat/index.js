import React, { Component } from "react";
import { connect } from "react-redux";
import * as UserSelectors from "../../store/user/reducer";
import * as UserActions from "../../store/user/actions";
import * as GameSelectors from "../../store/brisca/reducer";
import * as GameActions from "../../store/brisca/actions";
import * as AuthSelectors from "../../store/auth/reducer";
import parse from "date-fns/parse";
import format from "date-fns/format";

import "./chatbox.css";
import SockJS from "sockjs-client";

class Chatbox extends Component {
  componentWillMount() {
    this.state = {
      log: []
    };
    let { onMessage, game, fetchGame } = this.props;
    onMessage(this.onMessage);
    if (!game) {
      // fetchGame();
    }
  }
  onMessage = data => {
    this.setState(state => ({
      log: [...state.log, data]
    }));
    this.state.log.forEach(({ sender }) => {
      this.props.loadUser(sender);
    });
  };
  submit = () => {
    this.props.onSubmit({
      type: "CHAT_MESSAGE",
      roomId: this.props.roomId,
      sender: this.props.authUserId,
      message: this.refs.textbox.value
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.game) {
      nextProps.game.players.forEach(({ id }) => {
        this.props.loadUser(id);
      });
    }
  }
  renderListItems() {
    let messages = this.state.log.map(({ sender, message, timestamp }) => {
      const isFromLoggedInUser =
        sender === this.props.authUserId ? "message-item-from-sender" : "";
      return (
        <li key={timestamp} className={`message=item ${isFromLoggedInUser}`}>
          {/* <div className="message-item-sender">
							{sender}
						</div>				 */}
          <div className="message-item-timestamp">
            {format(parse(timestamp), "hh:mm")}
          </div>
          <div className="message-item-text">{message}</div>
        </li>
      );
    });
    return <ul>{messages}</ul>;
  }
  render() {
    return (
      <div className="chatbox">
        <div className="name-header">
          {this.props.game && this.props.game.id}
        </div>
        <div className="message-body">{this.renderListItems()}</div>
        <div className="input">
          <textarea className="message-input" ref="textbox" />
          <button className="submit-message" onClick={this.submit}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

let mapDispatchToProps = (dispatch, ownProps) => ({
  fetchGame: () => dispatch(GameActions.fetchGame(ownProps.roomId)),
  loadUser: userId => dispatch(UserActions.loadUser(userId))
});
Chatbox = connect(
  (state, props) => ({
    game: GameSelectors.getById(state, props.roomId),
    authUserId: AuthSelectors.getId(state),
    users: UserSelectors.getMembers(state)
  }),
  mapDispatchToProps
)(Chatbox);

export class ChatWindow extends Component {
  socket = null;
  componentWillMount() {
    this.socket = new SockJS("/_briscas/ws");
    this.socketHandlers = {};
    this.socket.onopen = () => {
      this.socket.send(
        JSON.stringify({ type: "JOIN_ROOM", roomId: this.props.params.gameId })
      );
    };
    this.socket.onmessage = e => {
      try {
        let command = JSON.parse(e.data);
        if (this.socketHandlers[command.type]) {
          this.socketHandlers[command.type](command);
        }
      } catch (e) {
        console.log("Unknown command received");
      }
    };
    this.socket.onclose = () => {
      console.log("close");
    };
  }
  sendSocketMessage = message => {
    this.socket.send(JSON.stringify(message));
  };
  registerMessageHandler = callback => {
    this.socketHandlers["RECEIVE_CHAT_MESSAGE"] = callback;
  };
  render() {
    return (
      <Chatbox
        onSubmit={this.sendSocketMessage}
        onMessage={this.registerMessageHandler}
        roomId={this.props.params.gameId}
      />
    );
  }
}
ChatWindow = connect(state => ({ authUserId: AuthSelectors.getId(state) }))(
  ChatWindow
);
export default Chatbox;
