import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as UserActions from "../../../store/user/actions";
import * as UserSelectors from "../../../store/user/reducer";
import * as AuthSelectors from "../../../store/auth/reducer";
import * as BriscaActions from "../../../store/brisca/actions";
import * as BriscaSelectors from "../../../store/brisca/reducer";

import Spinner from "../../components/spinner";
import Button from "wix-style-react/Button";
import Card from "wix-style-react/Card";
import * as Icons from "wix-style-react/Icons";


class Lobby extends Component {
  componentWillMount = () => {
    const { authId } = this.props;
    this.props.fetchLoggedInUser(authId);
    this.props.setLastCreatedGame(null);
  };
  componentWillReceiveProps = ({ newGameId, router }) => {
    if (newGameId) {
      router.push(`game/${newGameId}`);
    }
  };
  icon = iconName => {
    return <i className={`fa fa-${iconName}`} />;
  };
  render() {
    const { authToken, isFetching } = this.props;
    let spinner = null;
    if (isFetching) {
      spinner = <Spinner />;
    }

    let LobbyButton = ({ children, onClick }) => {
      return (
        <div className="card lobby-card">
          <div className="lobby-card-header">Online Play </div>
          <div className="lobby-card-icon"><Icons.Finder size="4em"/></div>
          <div className="lobby-card-button" onClick={onClick}>
            <Button>Click to Play</Button>
          </div>
        </div>
      );
    };

    return (
      <div className="lobby-container">
        <div className="lobby-spinner">{spinner}</div>
        <div className="lobby-container">
          <LobbyButton onClick={() => this.props.publicGame(authToken)} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isFetching: BriscaSelectors.getIsPosting(state),
  authId: AuthSelectors.getId(state),
  authToken: AuthSelectors.getToken(state),
  pictureURL: UserSelectors.getMemberPhotoUrlById(
    state,
    AuthSelectors.getId(state)
  ),
  userName: UserSelectors.getMemberNameById(state, AuthSelectors.getId(state)),
  newGameId: BriscaSelectors.getCreatedGameId(state)
});
const mapDispatchToProps = {
  createGame: BriscaActions.newGame,
  publicGame: BriscaActions.publicGame,
  fetchLoggedInUser: UserActions.fetchUser,
  setLastCreatedGame: BriscaActions.gameRoomCreated
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Lobby));
