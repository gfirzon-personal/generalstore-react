import React from "react"
import "./Spinner.scss"

import { useLoader } from "../../contexts/LoaderContext"

const Spinner = () => {
  const { loading } = useLoader()

  return (
    <div
      className={`page-overlay-wrapper d-flex align-items-center justify-content-center fade${loading ? " show" : ""}`}
      style={{ zIndex: 2000, pointerEvents: loading ? undefined : "none" }}
    >
      <div className="spinner-border bee-spinnerx" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
