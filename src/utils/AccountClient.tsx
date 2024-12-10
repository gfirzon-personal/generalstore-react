import { ProfileModel } from "../types/ProfileModel"
import { ChangePasswordModel } from "../types/ChangePasswordModel"
import client from "./ApiClient"
import vanillaClient from "./AxiosClient"

const _account = "/account"

const getUserProfile = () => {
  return client(`${_account}`)
}

const updateUserProfile = (profile: ProfileModel) => {
  return client(`${_account}/updateProfile`, { method: "PUT", body: profile })
}

const changePassword = (changePassword: ChangePasswordModel) => {
  return vanillaClient(`${_account}/changePassword`, {
    method: "POST",
    body: changePassword,
  })
}
export { getUserProfile, updateUserProfile, changePassword }
