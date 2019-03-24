import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as AuthSelectors from "../../store/auth/reducer";
import * as AuthActions from "../../store/auth/actions";

import Header from "../header";
import Spinner from "../components/spinner";

export default DecoratedComponent => {
  let RequiresNoAuth = class extends Component {
    routeIfLoggedIn = ({ isUserLoggedIn, router, location }) => {
      if (isUserLoggedIn) {
        router.replace(`/lobby?landing=true`);
      }
    };
    componentDidMount() {
      this.routeIfLoggedIn(this.props);
    }
    componentWillReceiveProps(newProps) {
      this.routeIfLoggedIn(newProps);
    }
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  };

  const mapStateToProps = state => ({
    isFetching: AuthSelectors.isFetching(state),
    isUserLoggedIn: AuthSelectors.isUserLoggedIn(state)
  });

  const dispatchers = {};

  return connect(mapStateToProps, dispatchers)(withRouter(RequiresNoAuth));
};
