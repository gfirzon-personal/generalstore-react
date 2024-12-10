import React, { ReactNode } from "react"

import { toast } from "react-toastify"
import { DEFAULT_ERROR } from "./constants"

function constructError(error: any) {
  const returnError = {
    error: true,
    message: error.message || DEFAULT_ERROR,
    type: error.type,
    statusCode: null,
  }

  if (error && error.response && error.response.data && !error.type) {
    returnError.message = error.response.data.message
  }
  if (error && error.response) {
    returnError.statusCode = error.response.status
  }

  return returnError
}

function showToast(title: string, e: any) {
  const error = constructError(e)
  showWarning(
    <>
      <p style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "18px" }}>{title}</p>
      <p>{error.message}</p>
    </>
  )
}

function showWarning(content: ReactNode, autoClose: false | number = false) {
  toast.warning(content, { autoClose: autoClose })
}

export { constructError, showToast, showWarning }
