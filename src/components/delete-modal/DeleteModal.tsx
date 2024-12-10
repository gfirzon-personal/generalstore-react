import React, { useEffect } from "react"
import { useModal } from "../../contexts/ModalContext"

interface IDeleteModal {
  doDelete: () => any
  entityTypeName?: string
  entityName?: string
}

const DeleteModal: React.FC<IDeleteModal> = ({ entityTypeName, doDelete, entityName }: IDeleteModal) => {
  const { closeModal } = useModal()

  useEffect(() => {
    document.getElementById("open-delete-modal")?.click()
  }, [])

  return (
    <>
      <button
        hidden
        id="open-delete-modal"
        type="button"
        className="btn btn-primary mt-5"
        data-toggle="modal"
        data-target="#delete-confirm"
        data-backdrop="static"
        data-keyboard="false"
      >
        Launch Delete Changes Modal
      </button>
      <div
        className="modal fade"
        id="delete-confirm"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="rollbackConfirmLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content thru-generic-modal">
            <div className="modal-header thru-modal-header-delete">
              <h5 className="modal-title">
                Delete {entityTypeName} {entityName ? ` - ${entityName}` : ""}
              </h5>
              <button
                type="button"
                id="close-delete-modal-x"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body my-3 text-center px-5">
              <p className="m-0" style={{ fontWeight: "bold" }}>
                Are you sure?
              </p>
              <small>This process cannot be undone.</small>
            </div>
            <div className="modal-footer justify-content-start">
              <button
                id="close-delete-modal"
                className="btn btn-Cancel btn-thru-lg"
                data-dismiss="modal"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                id="delete-modal-confirm"
                className="btn btn-thru-delete btn-thru-lg"
                onClick={() => {
                  setTimeout(async () => {
                    await doDelete()
                    document.getElementById("close-delete-modal-x")?.click()
                  }, 100)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteModal
