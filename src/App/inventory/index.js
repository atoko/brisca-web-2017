import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../header";
import * as AuthSelectors from "../../store/auth/reducer";
import * as UserActions from "../../store/user/actions";
import * as UserSelectors from "../../store/user/reducer";
import "./inventory.css";

import DeckSelect from "./components/deckSelect";
import MatchHistory from "./components/matchHistory";
import Notification from "wix-style-react/Notification";

export class InventoryComponent extends Component {
  componentWillMount() {
    let { currentPlayerId } = this.props;
    let state = this.state;
    this.state = {
      ...state,
      loading: true
    };

    fetch(`/_briscas/member/${currentPlayerId}/stats`)
      .then(res => res.json())
      .then(data => {
        this.setState(state => {
          return {
            ...state,
            loading: false,
            data
          };
        });
      })
      .catch(() => {});
  }
  componentWillReceiveProps({ router, isSent }) {
    // if (isSent) {
    //   router.push("/lobby");
    // }
  }
  render() {
    let { savePreferences, message, error } = this.props;
    let { data } = this.state;
    
    return (
      <div>
        <Header title="Inventory \& Player stats" />
        <div className="jumbotron inventory-jumbotron">
          <div className="container">
            <h1>Perfil de Jugador</h1>
          </div>
        </div>
        <div className="container">
          <div className="">
            { message && <Notification
              onClose={null}
              show
              theme={ error ? "error" : "success" }
              type="global"
              zIndex={10000}
            >
              <Notification.TextLabel>
                { message }
              </Notification.TextLabel>
            </Notification>				
          }
          </div>        
          <DeckSelect onSave={ savePreferences } error={ error !== null } message={ message } />
          <MatchHistory data={ data }/>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  isLoading: UserSelectors.isLoading(state),
  message: UserSelectors.getError(state),
  error: UserSelectors.getError(state),
  currentPlayerId: AuthSelectors.getId(state)
});

let dispatchers = (dispatch, ownProps) => ({
  savePreferences: data => {
    dispatch(UserActions.saveUserPreferences(data));
  }
});

export default connect(mapStateToProps, dispatchers)(InventoryComponent);
