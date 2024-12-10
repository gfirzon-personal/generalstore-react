import React from "react"
import { Route, Switch } from "react-router-dom"
import AccountUserProfile from "../account-profile/UserProfile"
import ChangePassword from "../account-change-password/ChangePassword"

const AccountRoutes = () => {
  return (
    <Switch>
      <Route path="/account/profile" render={(routerProps) => <AccountUserProfile />} />
      <Route path="/account/changePassword" render={(routerProps) => <ChangePassword />} />
    </Switch>
  )
}

export default AccountRoutes
