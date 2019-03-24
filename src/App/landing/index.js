import runtimeEnv from "@mars/heroku-js-runtime-env";

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import LoginForm from "./components/login";
import * as AuthSelectors from "../../store/auth/reducer";
import * as AuthActions from "../../store/auth/actions";

import "./landing.css";

const { NODE_ENV, REACT_APP_API_URL } = runtimeEnv();
class BriscaLanding extends Component {
  renderDebugInfo = () => {
    if (NODE_ENV !== "development") {
      return null;
    }
    return (
      <div>
        <code>
          {NODE_ENV}
          <p />
          {REACT_APP_API_URL}
        </code>
      </div>
    );
  };
  render() {
    return (
      <div>
        <div className="landing-page">
          <div className="landing-page-hero">
            <h1>Brisca</h1>
          </div>
          <p>Play FREE online Briscas with friends</p>
          <LoginForm />
          <hr className="my-4" />
          <div className="landing-page-copy">
            <ul>
              <li>No sign-up required</li>
              <li>Works anywhere</li>
              <li>Play against real people</li>
              <li>Saves your game automatically</li>
              <li>Play any time</li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        {this.renderDebugInfo()}
      </div>
    );
  }
}
const mapStateToProps = state => ({});

const dispatches = (dispatch, ownProps) => ({});
export default connect(mapStateToProps, dispatches)(withRouter(BriscaLanding));
