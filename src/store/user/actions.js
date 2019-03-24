import * as api from "./api";
import * as selectors from "./reducer";
import * as authSelectors from "../auth/reducer";

export const USER_REQUEST = "USER/USER_REQUEST";
export const userRequest = () => ({
  type: USER_REQUEST
});

export const USER_REQUEST_SUCCESS = "USER/USER_REQUEST_SUCCESS";
export const userRequestSuccess = () => ({
  type: USER_REQUEST_SUCCESS
});

export const USER_RECEIVE = "USER/USER_RECEIVE";
export const userReceive = (id, user) => ({
  type: USER_RECEIVE,
  id,
  user
});

const ROBOT_REGEX = /^MR_ROBOT/;
export const fetchUser = id => dispatch => {
  if (id) {
    dispatch(userRequest());

    if (ROBOT_REGEX.test(id)) {
      dispatch(userReceive(id, {
        id,
        name: "Balthazar"
      }));
      return;
    }
    api.getOne(id).then(user => {
      dispatch(userReceive(user.id, user));
    });
  }
};

export const loadUser = id => (dispatch, getState) => {
  const user = selectors.getMemberById(getState(), id);
  if (user) {
    return;
  } else {
    dispatch(fetchUser(id));
  }
};

export const saveUserPreferences = data => (dispatch, getState) => {
  const token = authSelectors.getToken(getState());
  dispatch(userRequest());
  api.save(token, data).then(() => {
    dispatch(userRequestSuccess());
  });
};
