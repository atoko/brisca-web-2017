import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import * as BriscaSelectors from "../../../store/brisca/reducer";

const LobbySheet = ({ lastGameId }) => {
  if (lastGameId) {
    return (
      <div className="lobby-bottom-sheet">
        <Link to={"/game/" + lastGameId}>Click here to continue</Link>
      </div>
    );
  }

  return null;
};

const mapStateToProps = state => ({
  lastGameId: BriscaSelectors.getCreatedGameId(state)
});

export default connect(mapStateToProps)(LobbySheet);
