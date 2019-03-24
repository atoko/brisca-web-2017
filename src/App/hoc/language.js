import React from "react";
import { connect } from "react-redux";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import es from "react-intl/locale-data/es";
import messages from "../../lib/translations";
import * as settingsSelectors from "../../store/settings/reducer";

addLocaleData([...en, ...es]);

const RenderWithProvider = props => {
  const locale = props.locale || "en";
  let localeMessages = messages["en"];
  if (messages[locale]) {
    localeMessages = messages[locale];
  }

  return (
    <IntlProvider locale={locale} messages={localeMessages}>
      <div>{props.children}</div>
    </IntlProvider>
  );
};

let mapStateToProps = state => {
  return {
    locale: settingsSelectors.getLocale(state)
  };
};
export default connect(mapStateToProps, null)(RenderWithProvider);
