import React, { Component } from "react";
import { connect } from "react-redux";
import TablePlay from "./tablePlay";
import * as UserSelectors from "../../../store/user/reducer";
import briscaEngine from "../../../lib/brisca";
import { FormattedMessage } from "react-intl";
import Spinner from "../../components/spinner";

class Modal extends Component {
  componentDidMount() {
  }
  render() {
    const { onClick, cards, players, life, playerMap } = this.props;
    let cardA = cards[0].card;
    let cardB = cards[1].card;
    let reason = briscaEngine.determineWinner(life, cardA, cardB);
    let player_id = cards.filter(c => c.card === reason.card)[0].player_id;
    let player = playerMap[player_id];
    let title = null;
    if (!player) {
      title = <Spinner />;
    } else {
      title = `${player.name} wins round`;
    }

    return (
      <div className="modal fade" id="game-modal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-body">
              <FormattedMessage id={reason.message} />
              <TablePlay players={players} cards={cards} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={ onClick }                
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const propsFromState = state => ({
  playerMap: UserSelectors.getMembers(state)
});
const dispatchers = null;
export default connect(propsFromState, dispatchers)(Modal);
