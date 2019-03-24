import * as actions from "./actions";
const defaults = {
  locale: "en"
};
const locale = (state = "en", action) => {
  switch (action.type) {
    case actions.SETTINGS_LOCALE:
      return action.locale;
    default:
      return state;
  }
};

const reducer = (state = defaults, action) => {
  return {
    locale: locale(state.locale, action)
  };
};

export default reducer;

export const getSettings = state => {
  return state["settings"];
};
export const getLocale = state => {
  return getSettings(state).locale;
};
