/* istanbul ignore file */
const DATE_FORMAT = 'MM/DD/YYYY HH:mm:SS'
const SIMPLE_DATE_FORMAT = 'MM/DD/YYYY'
const SORTABLE_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm'

const authConstants = {
    BAD_USERNAME: 'bad-username',
    BAD_PASSWORD: 'bad-password',
    BAD_CREDENTIALS: 'bad-credentials',
    BAD_CREDENTIALS_MSG: 'User ID or password is incorrect. Please contact RightGlass 2.0 administrator',
}

// TODO: make this longer when pushing to env
// const SESSION_TIMEOUT = 60 * 1000 * 60 * 4 //4 hours

const signupConstants = {
    BAD_USER_INFO: 'Everything needs to be entered into user info fields.',
    INVALID_USERNAME: 'invalid-username',
    INVALID_PASSWORD: 'invalid-password',
}

const DEFAULT_ERROR = 'This is embarrassing...'

// #region local storage variables
const CURRENT_USER = 'current-user'
const USER_CREDS = 'user-creds'
const SESSION_ID = 'session-interval-id'
const SESSION_EXPIRATION = 'session-expiration-time'
// #endregion

export {
    DATE_FORMAT,
    SIMPLE_DATE_FORMAT,
    SORTABLE_DATETIME_FORMAT,

    authConstants,
    signupConstants,

    DEFAULT_ERROR,

    CURRENT_USER,
    USER_CREDS,
    SESSION_ID,
    SESSION_EXPIRATION,
}
