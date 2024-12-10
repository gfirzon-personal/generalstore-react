import React from "react"

interface IScreenCard {
  children: React.ReactNode
}

const ScreenCard: React.FC<IScreenCard> = ({ children }: IScreenCard) => {
  return <div className="thruCardContainer">{children}</div>
}

export default ScreenCard
