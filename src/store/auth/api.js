import { post, url } from "../../lib/accio";

export const apiModel = ({ token, id, message, error }) => {
  return {
    success: !error,
    id,
    error,
    token,
    message
  };
};

export const errorModel = ({ code }) => {
  return {
    success: false,
    error: code,
    token: null,
    message: null
  };
};

export const Validate = token => {
  return post(url("/_auth/validate/token"), { access_token: token })
    .then(apiModel)
    .catch(errorModel);
};

export const Login = credentials => {
  return post(url("/_auth/login"), credentials)
    .then(apiModel)
    .catch(errorModel);
};

export const Register = credentials => {
  return post(url("/_auth/register"), credentials)
    .then(apiModel)
    .catch(errorModel);
};

export const Facebook = token => {
  return post(url("/_auth/facebook"), token)
    .then(apiModel)
    .catch(errorModel);
};

export const Anonymous = () => {
  return post(url("/_auth/anonymous"))
    .then(apiModel)
    .catch(errorModel);
};
