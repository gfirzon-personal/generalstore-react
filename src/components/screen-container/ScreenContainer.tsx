import React from "react"

export interface IScreenContainer {
  title: string
  description: string
  children: React.ReactNode
  expand?: boolean
}

const ScreenContainer: React.FC<IScreenContainer> = ({
  title,
  description,
  children,
  expand = false,
}: IScreenContainer) => {
  if (expand) {
    return (
      <div className="wrapper mt-4">
        <div className="d-flex mb-4 ml-4 pl-3">
          <h3 className="thruTitle">{title}</h3>
          <span className="ml-2 mr-2 pt-3 thruSubtitle-breadcrumb-separator" />
          <span className="thruSubtitle mt-2">{description}</span>
        </div>

        {children}
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <div className="d-flex mb-4" style={{ marginLeft: 20 }}>
        <h3 className="thruTitle">{title}</h3>
        <span className="ml-2 mr-2 pt-3 thruSubtitle-breadcrumb-separator" />
        <span className="thruSubtitle mt-2">{description}</span>
      </div>
      {children}
    </div>
  )
}

export default ScreenContainer
