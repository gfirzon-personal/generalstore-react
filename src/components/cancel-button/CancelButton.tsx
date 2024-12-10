import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useModal } from "../../contexts/ModalContext"
import DiscardModal from "../../components/discard-modal/DiscardModal"

const CancelButton: React.FC<ICancelButton> = ({ isDirty, goBack, to }) => {
  const { createModal, closeModal } = useModal()
  const history = useHistory()

  const button = (
    <button
      type="button"
      id="modal-cancel"
      onClick={() => {
        if (isDirty) {
          createModal(
            <DiscardModal
              discardConfirm={async () => {
                if (goBack) {
                  history.goBack()
                } else {
                  history.push(to ?? "")
                }
              }}
            />
          )
        } else if (goBack) {
          history.goBack()
        }
      }}
      className="btn btn-Cancel btn-thru-lg"
    >
      Cancel
    </button>
  )

  if (!isDirty) {
    if (to) {
      return <Link to={to}>{button}</Link>
    }

    return button
  }
  return button
}

interface ICancelButton {
  isDirty: boolean
  to?: string
  goBack?: boolean
}

export default CancelButton
