import * as AuthClient from '../utils/AuthClient'

import {
    CURRENT_USER,
    SESSION_EXPIRATION,
    SESSION_ID,
    USER_CREDS,
    authConstants
} from '../utils/constants'
import { authReducer, initialState } from '../reducers/AuthReducer'

import React from 'react'
import { authActionTypes } from '../utils/actionTypes'
import { constructError } from '../utils/ErrorUtils'
import moment from 'moment'

const AuthContext = React.createContext(null)

function AuthProvider({ children }) {
    const [state, dispatch] = React.useReducer(
        authReducer,
        initialState,
        () => { // initialize remember me on refresh
            const rememberUser = window.localStorage.getItem('remember-user') === 'true'
            return {
                ...initialState,
                rememberUser
            }
        }
    )

    async function signup(userInfo) {
        try {
            dispatch({ type: authActionTypes.AUTH_LOADING })
            const signupResp = await AuthClient.signup(userInfo)
            if (signupResp.status === 200) {
                dispatch({
                    type: authActionTypes.RECEIVE_SIGNUP_STATUS,
                    payload: {
                        successfulSignup: true,
                        error: {}
                    }
                })
            } else {
                dispatch({
                    type: authActionTypes.RECEIVE_SIGNUP_STATUS,
                    payload: {
                        successfulSignup: false,
                        error: constructError({ message: signupResp.data.statusText })
                    }
                })
            }
        } catch (e) {
            dispatch({
                type: authActionTypes.AUTH_ERROR,
                payload: constructError(e)
            })
        }
    }

    async function login(credentials) {
        try {
            dispatch({ type: authActionTypes.AUTH_LOADING })
            const authResp = await AuthClient.authorizeUser(credentials)

            if (authResp.data.error) {
                console.log({ "authResp.error": authResp.data.error })
                dispatch({
                    type: authActionTypes.AUTH_ERROR,
                    payload: constructError({ message: authResp.data.error.message })
                })
                return
            }

            let token = authResp.data.token
            let base64Url = token.split('.')[1]
            let decodedValue = JSON.parse(window.atob(base64Url))
            let roles = decodedValue['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
            let clientId = decodedValue.UserId

            if (authResp.status === 200 && authResp.data) {
                const payload = {
                    isAuthorized: true,
                    roles: roles,
                    //role: roles,
                    email: credentials.email,
                    userName: decodedValue.UserName,
                    clientId: clientId,
                    token
                }

                // store the current user
                const paylaodStr = JSON.stringify(payload, null)
                window.localStorage.setItem(CURRENT_USER, btoa(paylaodStr))
                window.localStorage.setItem(SESSION_EXPIRATION, moment.utc(decodedValue.exp * 1000).valueOf())

                // store the users creds if remember user is true
                if (state.rememberUser) {
                    const credsStr = JSON.stringify(credentials, null)
                    window.localStorage.setItem(USER_CREDS, btoa(credsStr))
                }

                resetSession()
                dispatch({ type: authActionTypes.RECEIVE_AUTH, payload })
            } else {
                dispatch({
                    type: authActionTypes.AUTH_ERROR,
                    payload: constructError({ message: authConstants.BAD_CREDENTIALS_MSG })
                })
            }
        } catch (e) {
            dispatch({ type: authActionTypes.AUTH_ERROR, payload: constructError(e) })
        }
    }

    async function logout() {
        try {
            const logoutResp = await AuthClient.logout(state.user)

            if (logoutResp.status === 200) {
                const localSessionIntervalId = window.localStorage.getItem(SESSION_ID)

                if (localSessionIntervalId) {
                    console.log("clearing the interval...")
                    clearInterval(localSessionIntervalId)
                }

                window.localStorage.removeItem(SESSION_ID)
                window.localStorage.removeItem(SESSION_EXPIRATION)
                window.localStorage.removeItem(CURRENT_USER)
                dispatch({ type: authActionTypes.LOGOUT })
            }
        } catch (e) {
            dispatch({ type: authActionTypes.AUTH_ERROR, payload: constructError(e) })
        }
    }

    function toggleRememberUser(e) {
        const remember = e.target.checked
        if (!remember) {
            window.localStorage.removeItem(USER_CREDS)
        }

        dispatch({
            type: authActionTypes.REMEMBER_USER,
            payload: remember
        })

        window.localStorage.setItem('remember-user', remember)
    }

    function resetSession() {
        const localSessionIntervalId = window.localStorage.getItem(SESSION_ID)

        if (localSessionIntervalId) {
            clearInterval(parseInt(localSessionIntervalId))

            window.localStorage.removeItem(SESSION_ID)
        }
    }

    return (
        <AuthContext.Provider value={{
            state,
            dispatch,
            signup,
            login,
            logout,
            toggleRememberUser,
            resetSession
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}

export { AuthProvider, useAuth }
