import { PasswordModel } from "../types/PasswordModel"
import client from "./ApiClient"

const _passwordUrl = "/Password"

const validateSetPswdLink = (token: string) => {
  return client(`${_passwordUrl}/validate`, { key: token })
}

const setPassword = (passwordModel: PasswordModel) => {
  return client<any>(`${_passwordUrl}/setPassword`, {
    method: "POST",
    body: passwordModel,
  })
}

const validateResetPswdLink = (key: string) => {
  return client(`${_passwordUrl}/validateReset`, { key: key })
}

const resetPassword = (passwordModel: PasswordModel) => {
  return client<any>(`${_passwordUrl}/resetPassword`, {
    method: "POST",
    body: passwordModel,
  })
}

export { validateSetPswdLink, setPassword, validateResetPswdLink, resetPassword }
