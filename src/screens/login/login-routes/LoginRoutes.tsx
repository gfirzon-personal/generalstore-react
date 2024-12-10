import React from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import Login from "../Login"
import SetPassword from "../set-password/SetPassword"
const loadAuthenticatedApp = () => import("../../../components/authenticated-app/AuthenticatedApp.js")
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
export interface ILoginRoutes {
  authorized: boolean
}

const LoginRoutes: React.FC<ILoginRoutes> = ({ authorized }: ILoginRoutes) => {
  React.useEffect(() => {
    loadAuthenticatedApp()
  }, [])

  return (
    <Router>
      <Switch>
        <Route
          path="/set-password/:key"
          render={(routerProps) => <SetPassword token={routerProps.match.params.key} isReset={false} />}
        />
        <Route
          path="/reset-password/:key"
          render={(routerProps) => <SetPassword token={routerProps.match.params.key} isReset={true} />}
        />
        <Route path="" render={() => (authorized ? <AuthenticatedApp /> : <Login />)} />
      </Switch>
    </Router>
  )
}

export default LoginRoutes
