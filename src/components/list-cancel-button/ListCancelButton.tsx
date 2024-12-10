import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useModal } from "../../contexts/ModalContext"
import DiscardModal from "../discard-modal/DiscardModal"

const ListCancelButton: React.FC<any> = ({ isDirty, to }) => {
  const { createModal, closeModal } = useModal()
  const history = useHistory()

  const button = (
    <button
      id="btnCancel"
      onClick={() => {
        isDirty && createModal(<DiscardModal discardConfirm={async () => {
          history.push(to ?? "")
        }} />)
      }}
      type="button"
      className="btn btn-label-thru mr-3"
      title="Select this customer for this user session"
    >
      CANCEL
    </button>
  )

  if (!isDirty) {
    return <Link to={to}>{button}</Link>
  }
  return button
}

export default ListCancelButton
