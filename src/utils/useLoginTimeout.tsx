import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { SESSION_EXPIRATION } from "./constants"
import moment from "moment"
import { showWarning } from "./ErrorUtils"

const useLoginTimeout = () => {
  const { logout } = useAuth()

  useEffect(() => {
    const lastExpTime = localStorage.getItem(SESSION_EXPIRATION)
    let timeoutId: any

    if (lastExpTime) {
      timeoutId = setTimeout(() => {
        logout()
        showWarning("You have been logged out because your session has expired.")
      }, Math.max(moment.utc(+lastExpTime).valueOf() - moment.utc().valueOf(), 0))
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [logout])
}

export default useLoginTimeout
