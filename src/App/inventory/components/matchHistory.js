import React from "react";

export default ({data}) => {
    if (data) {
      const { gamesWon, gamesLost } = data;
      return (
        <div>
          <h2>Summary</h2>
          Games won: {gamesWon}
          <p />Games lost: {gamesLost}
          <hr className="my-4" />
          <h2>Match History</h2>
        </div>
      );
    }

    return <div />;
  };
