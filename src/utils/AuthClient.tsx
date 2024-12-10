import { authConstants, signupConstants } from './constants'

import client from './ApiClient'

function create(endpoint: any, params: any) {
    return client(endpoint, params)
}

function validateUserInfo({ password, role }: any) {
    const validPassword = password && password.length > 0
    let type = undefined

    if (!validPassword) {
        type = signupConstants.INVALID_PASSWORD
    }

    return type
}

function signup(userInfo: any) {
    const type = validateUserInfo(userInfo)

    if (type) {
        return Promise.reject({
            error: true,
            message: signupConstants.BAD_USER_INFO,
            type
        })
    }

    return create('PortalUsers', { body: userInfo })
}

function validateCredentials(credentials: any) {
    const validUsername = credentials.username && credentials.username.length > 0
    const validPassword = credentials.password && credentials.password.length > 0

    return { validUsername, validPassword }
}

function authorizeUser(credentials: any) {
    const validCredentials = validateCredentials(credentials)
    if (!validCredentials.validUsername) {
        return Promise.reject({
            error: true,
            type: authConstants.BAD_USERNAME,
            message: authConstants.BAD_CREDENTIALS_MSG
        })
    }

    if (!validCredentials.validPassword) {
        return Promise.reject({
            error: true,
            type: authConstants.BAD_PASSWORD,
            message: authConstants.BAD_CREDENTIALS_MSG
        })
    }

    //return create('PortalUsers/Validate', {...credentials})
    //return client('/users/authenticate', { body: credentials },).client()
    return client('', {  ...credentials },).client()
   // return client('?userName=""&password=""', { body: credentials },).client()
    // return create('users/authenticate', { ...credentials })
}

function logout(credentials: any) {
    // return create('logout', credentials)
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve({ status: 200 })
        }, 100)
    )
}

export { signup, authorizeUser, logout }
