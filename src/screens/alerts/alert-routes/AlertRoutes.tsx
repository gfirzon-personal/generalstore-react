import React from "react"
import { Route, Switch } from "react-router-dom"
import AlertsList from "../AlertsList"

const AlertRoutes = () => {
  return (
    <Switch>
      <Route path="/alerts" render={() => <AlertsList />} />
    </Switch>
  )
}

export default AlertRoutes
