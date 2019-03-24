import BriscaApp from "./briscaApp";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<BriscaApp />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept("./briscaApp", () => {
    const NextApp = require("./briscaApp").default;
    ReactDOM.render(<NextApp />, document.getElementById("root"));
  });
}
