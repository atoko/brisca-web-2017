import React, { Component } from "react";
import { connect } from "react-redux";
import * as AuthActions from "../../../store/auth/actions";
import * as AuthSelect from "../../../store/auth/reducer";

import Spinner from "../../components/spinner";
import FacebookLogin from "./facebook";

import Button from "wix-style-react/Button";

const ACTION_LOGIN = "login";
const ACTION_LANDING = "landing";

export class LoginForm extends Component {
  state = {
    action: ACTION_LANDING
  };
  setAction = action => {
    this.setState({ ...this.state, action });
  };
  doLogin = () => {
    const { username, password } = this.refs;
    this.props.onLogin(username.value, password.value);
  };
  doRegister = () => {
    const { username, password } = this.refs;
    this.props.onRegister(username.value, password.value);
  };
  doAnonymous = () => {
    this.props.onAnonymous();
  };
  doProceed = () => {
    this.props.onLobby();
  };
  doFacebook = (error, response) => {
    if (!error) {
      this.props.onFacebook({ facebook_token: response.accessToken });
    }
  };
  doLogout = () => {
    this.props.onLogout();
  };
  render() {
    let { isFetching } = this.props;
    let content = null;
    switch (this.state.action) {
      case ACTION_LOGIN:
        content = (
          <div>
            <input ref="username" />
            <input ref="password" />
            <Button onClick={this.doLogin}>Login</Button>
            <Button
              onClick={() => {
                this.setAction(ACTION_LANDING);
              }}
            >
              Back
            </Button>
          </div>
        );
        break;
      case ACTION_LANDING:
        content = (
          <div className="login-form-buttons">
            <FacebookLogin
              autoLoad={true}
              onLogin={this.doFacebook}
              appId="1201115049955824"
            />
            <Button onClick={this.doAnonymous}>Continue as guest</Button>
          </div>
        );
        break;
      default:
        content = <span> </span>;
    }

    if (isFetching) {
      var spinner = <Spinner prefix="login-form" />;
    }
    return (
      <div className="login-form">
        {content}
        {spinner}
      </div>
    );
  }
}
let mapStateToProps = state => ({
  isFetching: AuthSelect.isFetching(state),
  errorMessage: AuthSelect.getAuth(state).error
});

let dispatchers = {
  onLogin: AuthActions.authenticate,
  onAnonymous: AuthActions.anonymous,
  onRegister: AuthActions.register,
  onLogout: AuthActions.logout,
  onFacebook: AuthActions.facebook
};
export default connect(mapStateToProps, dispatchers)(LoginForm);
