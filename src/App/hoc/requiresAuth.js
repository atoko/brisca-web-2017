import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as AuthSelectors from "../../store/auth/reducer";
import * as AuthActions from "../../store/auth/actions";

import Header from "../header";
import Spinner from "../components/spinner";

export default DecoratedComponent => {
  let RequiresAuth = class extends Component {
    routeIfNotLoggedIn({ isUserLoggedIn, router, location }) {
      if (!isUserLoggedIn) {
        router.replace(`/?redirect=${location.pathname}`);
      }
    }
    componentWillMount() {
      if (!this.props.isValid) {
        this.props.validateToken(this.props.token);
      }
    }
    componentDidMount() {
      this.routeIfNotLoggedIn(this.props);
    }
    componentWillReceiveProps(newProps) {
      this.routeIfNotLoggedIn(newProps);
    }
    render() {
      if (this.props.isFetching) {
        return (
          <div>
            <Header />
            <Spinner />
          </div>
        );
      }
      return <DecoratedComponent {...this.props} />;
    }
  };

  const mapStateToProps = state => ({
    isFetching: AuthSelectors.isFetching(state),
    isUserLoggedIn: AuthSelectors.isUserLoggedIn(state),
    isValid: AuthSelectors.isValidated(state),
    token: AuthSelectors.getToken(state)
  });

  const dispatchers = {
    validateToken: AuthActions.validateToken
  };

  return connect(mapStateToProps, dispatchers)(withRouter(RequiresAuth));
};
