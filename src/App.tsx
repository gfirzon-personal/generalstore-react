import "./App.css"
import "./styles/bootstrap.min.css"
import "./styles/thru.css"
import "./styles/thru-ad-hock.css"
import "react-toastify/dist/ReactToastify.css"

import { CURRENT_USER } from "./utils/constants"
import { ModalProvider } from "./contexts/ModalContext"
import React, { useEffect } from "react"
import Spinner from "./components/spinner/Spinner"
import { ToastContainer } from "react-toastify"
import { authActionTypes } from "./utils/actionTypes"
import { useAuth } from "./contexts/AuthContext"
import LoginRoutes from "./screens/login/login-routes/LoginRoutes"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App: React.FC = () => {
  const { state, dispatch, resetSession } = useAuth()
  // const loading = useLoader();

  // pre-load the authenticated side in the background while the user's
  // filling out the login form.

  React.useEffect(() => {
    const encodedUser = window.localStorage.getItem(CURRENT_USER)

    if (encodedUser) {
      const decodedUser = atob(encodedUser)
      const localUser = JSON.parse(decodedUser)

      if (localUser && !state.user.isAuthorized) {
        resetSession()
        dispatch({
          type: authActionTypes.RECEIVE_AUTH,
          payload: localUser,
        })
      }
    }
  }, [dispatch, resetSession, state.user.isAuthorized, state.user.initialized])

  useEffect(() => {
    dispatch({
      type: authActionTypes.INIT,
    })
  }, [dispatch])

  if (!state.initialized) {
    return (
      <div
        className="text-center"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      ></div>
    )
  }

  return (
    <>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <Spinner />

          <ModalProvider>
            <React.Suspense
              fallback={
                <div
                  className="text-center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                  }}
                ></div>
              }
            >
              {<LoginRoutes authorized={state.user.isAuthorized} />}
            </React.Suspense>
          </ModalProvider>
          <footer
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <div className="copyright pr-1">
              <small>Copyright © 2021 Thru, Inc.</small>
            </div>
          </footer>
        </QueryClientProvider>
      </div>
    </>
  )
}

export default App