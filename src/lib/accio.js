import runtimeEnv from "@mars/heroku-js-runtime-env";

let fetchWithTimeout = (...args) => {
  let originalFetch = null;

  if (typeof window !== "undefined") {
    originalFetch = fetch;
  } else {
    originalFetch = global.fetch;
  }

  return new Promise((resolve, reject) => {
    let timeoutHandle = setTimeout(() => {
      reject({
        error: {
          code: "REQUEST_TIMEOUT",
          message: "Request timed out"
        }
      });
    }, 10000);

    return originalFetch(...args)
      .then(response => {
        clearTimeout(timeoutHandle);
        resolve(response);
      })
      .catch(reject);
  });
};

const returnJson = raw => {
  return raw.json();
};

const logger = json => {
  console.log("Fetch request returned", json);
  return json;
};

const throwIfNot2XX = response => {
  if (response.ok) {
    return response;
  }
  return response.json().then(error => Promise.reject(error));
};

const clientError = error => {
  //Initial catch, formats browser errors into common error format
  if (error.error) {
    // eslint-disable-next-line
    throw error;
  } else {
    // eslint-disable-next-line
    throw {
      error: {
        code: "CLIENT_FETCH_ERROR",
        message: error.message
      }
    };
  }
};

const serverError = error => {
  throw error.error;
};

export const put = (url, body) => {
  var config = {
    method: "PUT",
    body: JSON.stringify(body),
    cache: "default",
    headers: {
      "Content-Type": "application/json"
    }
  };

  return fetchWithTimeout(url, config)
    .then(throwIfNot2XX, clientError)
    .then(returnJson, serverError)
    .then(logger);
};

export const post = (url, body) => {
  var postConfig = {
    method: "POST",
    body: JSON.stringify(body),
    cache: "default",
    headers: {
      "Content-Type": "application/json"
    }
  };

  return fetchWithTimeout(url, postConfig)
    .then(throwIfNot2XX, clientError)
    .then(returnJson, serverError)
    .then(logger);
};

export const get = url => {
  return fetchWithTimeout(url)
    .then(throwIfNot2XX, clientError)
    .then(returnJson, serverError)
    .then(logger);
};

export const url = (path = "") => {
  let root = "";
  let env = runtimeEnv();

  if (env.REACT_APP_API_URL) {
    root = runtimeEnv().REACT_APP_API_URL;
  }
  return root + path;
};
