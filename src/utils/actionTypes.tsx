/* istanbul ignore file */
const authActionTypes = {
  REMEMBER_USER: "remember-user",
  SHOW_SIGNUP: "show-signup",
  RECEIVE_SIGNUP_STATUS: "receive-signup-status",
  RECEIVE_AUTH: "receive-auth",
  LOGOUT: "logout",
  AUTH_LOADING: "auth-loading",
  AUTH_ERROR: "auth-error",
  INIT: "init",
}

const protocolsActionTypes = {
  SEARCH_PROTOCOLS: "search-protocols",
  RECEIVE_PROTOCOLS: "receive-protocols",
  PROTOCOLS_ERROR: "protocols-error",
}

const sortActionTypes = {
  SET_SORT: "set-sort",
}

const pgpOptionsActionTypes = {
  SEARCH_PGP_OPTIONS: "search-pgp-options",
  RECEIVE_PGP_OPTIONS: "receive-pgp-options",
  PGP_OPTIONS_ERROR: "pgp-options-error",
}

const feedbackActionTypes = {
  SEARCH_FEEDBACKS: "search-feedbacks",
  RECEIVE_FEEDBACKS: "receive-feedbacks",
  FEEDBACKS_ERROR: "feedbacks-error",
}

const coverageActionTypes = {
  SEARCH_COVERAGE_MAKES: "search-coverage-makes",
  RECEIVE_COVERAGE_MAKES: "receive-coverage-makes",
  COVERAGE_MAKES_ERROR: "coverage-makes-error",

  SEARCH_COVERAGE_MODELS: "search-coverage-models",
  RECEIVE_COVERAGE_MODELS: "receive-coverage-models",
  COVERAGE_MODELS_ERROR: "coverage-models-error",
}

export {
  authActionTypes,
  sortActionTypes,
  pgpOptionsActionTypes,
  feedbackActionTypes,
  coverageActionTypes,
  protocolsActionTypes,
}
