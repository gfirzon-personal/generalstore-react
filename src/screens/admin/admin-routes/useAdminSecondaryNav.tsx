import React from "react"
import { useEffect } from "react"

import AdminNav from "./AdminNav"
import { useSecondaryNav } from "../../../contexts/SecondaryNavContext"

function useThruAdminSecondaryNav() {
  const { setNavComponent } = useSecondaryNav()

  useEffect(() => {
    setNavComponent(<AdminNav />)

    return () => {
      setNavComponent(<div />)
    }
  }, [setNavComponent])
}

export default useThruAdminSecondaryNav
