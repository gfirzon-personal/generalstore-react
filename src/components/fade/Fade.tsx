import React, { ReactElement, useEffect, useState } from "react"

export interface IFade {
  children: ReactElement
}

const Fade: React.FC<IFade> = ({ children }: IFade) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <>
      {React.cloneElement(children, {
        className: (children.props?.className ?? "") + " fade" + (show ? " show" : ""),
      })}
    </>
  )
}

export default Fade
