import React, { Component } from "react";
import { Link, withRouter } from "react-router";
import { connect } from "react-redux";
import * as SettingSelectors from "../store/settings/reducer";
import * as SettingActions from "../store/settings/actions";
import * as AuthSelectors from "../store/auth/reducer";
import * as AuthActions from "../store/auth/actions";
import * as UserSelectors from "../store/user/reducer";

import "./header.css";

class Header extends Component {
  onLanguageChange = event => {
    const { value } = event.target;

    if (value === "noop") {
      return;
    }

    this.props.onLocaleChange(value);
  };
  renderNavlinks = () => {
    const { isUserLoggedIn, router } = this.props;
    let links = ["lobby", "inventory", "settings", "logout"];
    let markup = [];

    if (isUserLoggedIn) {
      links.forEach(function(link) {
        let css = "nav-item nav-link ";
        if (router.routes[0].path === link) {
          css += "active ";
        }

        markup.push(
          <Link key={link} to={`/${link}`}>
            <span className={css}>{link}</span>
          </Link>
        );
      }, this);
    }

    return <div className="">{markup}</div>;
  };
  renderProfileBubble = () => {
    const { isUserLoggedIn } = this.props;
    const logoutButton = (
      <button
        className="nav-link nav-item btn btn-primary"
        onClick={this.props.onLogout}
      >
        Logout
      </button>
    );

    return (
      <div className="profile-toolbar">
        {isUserLoggedIn ? logoutButton : null}
      </div>
    );
  };
  render() {
    return (
      <nav className="header">
        <span className="navbar-brand">
          <i className="fa fa-ok" /> Brisca
        </span>
        {this.renderProfileBubble()}
        <div className="">
          {this.renderNavlinks()}
        </div>
      </nav>
    );
  }
}

let mapStateToProps = state => {
  return {
    isUserLoggedIn: AuthSelectors.isUserLoggedIn(state),
    locale: SettingSelectors.getLocale(state),
    profilePhotoUrl: UserSelectors.getMemberPhotoUrlById(
      state,
      AuthSelectors.getId(state)
    )
  };
};
let dispatchers = {
  onLocaleChange: SettingActions.setLocale,
  onLogout: AuthActions.logout
};
export default connect(mapStateToProps, dispatchers)(withRouter(Header));

// const languageSelect = <div className="six columns">
//   <select defaultValue={this.props.locale} onInput={this.onLanguageChange}>
//     <option value="noop">Change Language</option>
//     <option value="en">English</option>
//     <option value="es">Español</option>
//   </select>
// </div>
