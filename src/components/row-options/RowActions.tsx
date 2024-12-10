import React, { ReactNode } from "react"
import { useModal } from "../../contexts/ModalContext"
import DeleteModal from "../delete-modal/DeleteModal"

export interface ActionItem<T> {
  title: string
  icon: ReactNode
  onClick: (data: T) => void
  confirm?: {
    entityTypeName: string
    entityName?: string
  }
}

interface IRowActions<T> {
  generateActions?: (data: T) => ActionItem<T>[]
  data: T
  idPrefix?: string
}

function RowActions<T>({ generateActions, data, idPrefix }: IRowActions<T>) {
  const actions = generateActions?.(data)
  const { createModal } = useModal()

  let generatedActions = actions?.map((action, index) => {
    return (
      <a
        id={`action-${index}-${idPrefix ? idPrefix : ""}${action.title.replaceAll(" ", "")}`}
        key={index}
        onClick={() =>
          action.confirm
            ? createModal(
                <DeleteModal
                  entityTypeName={action.confirm.entityTypeName}
                  entityName={action.confirm.entityName}
                  doDelete={() => action.onClick(data)}
                />
              )
            : action.onClick(data)
        }
        className="dropdown-item mb-2 d-flex"
        href="#"
      >
        {action.icon}
        <div className="iconText-align">{action.title}</div>
      </a>
    )
  })

  if (generatedActions?.length === 0) {
    generatedActions = [
      <a key={0} className="dropdown-item mb-2 d-flex" href="#">
        <i className="fad fa-ban" />
        <div className="iconText-align">No actions available</div>
      </a>,
    ]
  }

  return (
    <div className="dropleft">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fad fa-ellipsis-v" />
      </a>
      <div className="dropdown-menu ddStyle orgDD-menu-leftSide ddmenu-shadow" aria-labelledby="navbarDropdown">
        {generatedActions}
      </div>
    </div>
  )
}

export default RowActions
