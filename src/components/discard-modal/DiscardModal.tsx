import React, { useEffect } from "react"
import { useModal } from "../../contexts/ModalContext"

interface IDiscardModal {
  discardConfirm: () => Promise<void>
}

const DiscardModal: React.FC<IDiscardModal> = ({ discardConfirm }: IDiscardModal) => {
  const { closeModal } = useModal()

  useEffect(() => {
    console.log("discard-confirm")
    document.getElementById("open-discard-modal")?.click()
  }, [])

  return (
    <>
      <button
        hidden
        id="open-discard-modal"
        type="button"
        className="btn btn-primary mt-5"
        data-toggle="modal"
        data-target="#discard-confirm"
        data-backdrop="static"
        data-keyboard="false"
      >
        Launch Discard Changes Modal
      </button>
      <div
        className="modal fade"
        id="discard-confirm"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="rollbackConfirmLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content thru-generic-modal">
            <div className="modal-header thru-modal-header">
              <h5 className="modal-title">Discard Changes</h5>
              <button
                type="button"
                id="close-discard-modal-x"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body my-3 text-center px-5">
              You have made changes to this item. <br />
              Do you want to discard these changes?
            </div>
            <div className="modal-footer justify-content-start">
              <button
                id="submit-discard"
                className="btn btn-thru btn-thru-lg"
                onClick={() => {
                  setTimeout(async () => {
                    await discardConfirm()
                    document.getElementById("close-discard-modal-x")?.click()
                  }, 100)
                }}
              >
                Discard
              </button>
              <button
                id="close-discard-modal"
                className="btn btn-Cancel btn-thru-lg"
                data-dismiss="modal"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DiscardModal
