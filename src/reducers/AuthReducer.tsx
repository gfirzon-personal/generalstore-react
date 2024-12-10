import { authActionTypes } from "../utils/actionTypes"

const initialState = {
  showSignup: false,
  successfulSignup: false,
  rememberUser: false,
  user: {
    isAuthorized: false,
    role: undefined,
    username: "",
    clientId: "",
  },
  initialized: false,
  loading: true,
  error: {},
}

function authReducer(state = initialState, { type, payload }: any) {
  switch (type) {
    case authActionTypes.REMEMBER_USER: {
      return {
        ...state,
        rememberUser: payload,
      }
    }
    case authActionTypes.SHOW_SIGNUP: {
      return {
        ...state,
        showSignup: payload,
        error: {},
        loading: false,
        user: initialState.user,
        successfulSignup: false,
      }
    }
    case authActionTypes.AUTH_LOADING: {
      return {
        ...state,
        successfulSignup: false,
        user: initialState.user,
        error: {},
        loading: true,
      }
    }
    case authActionTypes.RECEIVE_SIGNUP_STATUS: {
      return {
        ...state,
        successfulSignup: payload.successfulSignup,
        user: initialState.user,
        error: payload.error,
        loading: false,
        showSignup: false,
      }
    }
    case authActionTypes.RECEIVE_AUTH: {
      return {
        ...state,
        user: payload,
        error: {},
        loading: false,
        initialized: true,
      }
    }
    case authActionTypes.AUTH_ERROR: {
      return {
        ...state,
        user: initialState.user,
        successfulSignup: false,
        error: payload,
        loading: false,
      }
    }
    case authActionTypes.INIT: {
      return {
        ...state,
        initialized: true,
      }
    }
    case authActionTypes.LOGOUT: {
      return { ...initialState, initialized: true }
    }
    default: {
      throw new Error(`The type ${type} is not a known type...`)
    }
  }
}

export { initialState, authReducer }
