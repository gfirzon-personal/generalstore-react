import React, { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useModal } from "../../contexts/ModalContext"
import { showWarning } from "../../utils/ErrorUtils"

export const InactiveModal = () => {
  const [timeLeft, setTimeLeft] = useState(300)
  const { logout } = useAuth()
  const { closeModal } = useModal()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [setTimeLeft])

  // const doLogout = () => {
  //   logout()
  // }

  useEffect(() => {
    if (timeLeft === 0) {
      document.getElementById("close-inactive-modal")?.click()
      logout()
      showWarning("You have been logged out due to inactivity.")
    }
  }, [timeLeft])

  const timeLeftStr =
    Math.trunc(timeLeft / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    (timeLeft % 60).toString().padStart(2, "0")

  useEffect(() => {
    document.getElementById("open-inactive-modal")?.click()
  }, [])

  return (
    <>
      <button
        hidden
        id="open-inactive-modal"
        type="button"
        className="btn btn-primary mt-5"
        data-toggle="modal"
        data-target="#inactive-modal"
        data-backdrop="static"
        data-keyboard="false"
      >
        Launch Inactive Modal
      </button>
      <div
        className="modal fade"
        id="inactive-modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="rollbackConfirmLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content thru-generic-modal">
            <div className="modal-header thru-modal-header">
              <h5 className="modal-title">Session Timeout</h5>
              <button
                type="button"
                id="close-inactive-modal-x"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body my-3 text-center px-5">
              You are being logged out due to inactivity.
              <br />
              Do you want to stay logged in?
            </div>
            <div className="modal-footer justify-content-start">
              <button
                id="close-inactive-modal"
                className="btn btn-thru btn-thru-lg"
                data-dismiss="modal"
                onClick={closeModal}
              >
                {`Stay logged in (${timeLeftStr})`}
              </button>
              <button
                id="submit-inactive"
                className="btn btn-Cancel btn-thru-lg"
                data-dismiss="modal"
                onClick={() => {
                  closeModal()
                  logout()
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InactiveModal
