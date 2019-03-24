import React from "react";
import "./spinner.css";
export default ({ prefix = "" }) => (
  <span className={`rotating ${prefix === "" ? prefix : `${prefix}-`}spinner`}>
    <span className="fa fa-spinner display-3" aria-hidden="true" />
  </span>
);
