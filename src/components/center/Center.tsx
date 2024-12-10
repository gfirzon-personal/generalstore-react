import React, { ReactNode } from "react"

interface ICenter {
  children: ReactNode
}

const Center: React.FC<ICenter> = (props: ICenter) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flex: "1" }}>
      {props.children}
    </div>
  )
}

export default Center
