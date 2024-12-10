import React from "react"

import { useModal } from "../../contexts/ModalContext"
import DeleteModal from "../delete-modal/DeleteModal"

interface IDeleteButton {
  doDelete: () => any
  hidden?: boolean
  id?: string
  to: string
  successMessage: string
  entityTypeName: string
}

const DeleteButton: React.FC<IDeleteButton> = ({
  doDelete,
  hidden = false,
  id = "btnDelete",
  entityTypeName,
}: IDeleteButton) => {
  const { createModal } = useModal()

  if (hidden) {
    return <></>
  }

  return (
    <button
      type="button"
      id={id}
      className="btn btn-trashcan"
      onClick={async () => {
        createModal(<DeleteModal entityTypeName={entityTypeName} doDelete={doDelete} />)
      }}
    >
      <i
        className="fad fa-trash-alt fa-2x fa-swap-opacity"
        data-toggle="tooltip"
        data-placement="top"
        title={`Delete this ${entityTypeName}`}
      />
    </button>
  )
}

export default DeleteButton
