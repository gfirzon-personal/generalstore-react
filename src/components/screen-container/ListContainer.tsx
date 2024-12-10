import React from "react"
import Center from "../center/Center"
import ErrorComponent from "../error-component/ErrorComponent"

import ScreenCard from "./ScreenCard"
import ScreenContainer, { IScreenContainer } from "./ScreenContainer"

interface IListContainer extends IScreenContainer {
  error?: unknown
}

const ListContainer: React.FC<IListContainer> = ({ error, children, ...rest }: IListContainer) => {
  const errorComponent = error ? (
    <Center>
      <ErrorComponent error={error} />
    </Center>
  ) : undefined

  return (
    <ScreenContainer {...rest}>
      <ScreenCard>{error ? errorComponent : <div className="thruCardHead">{children}</div>}</ScreenCard>
    </ScreenContainer>
  )
}

export default ListContainer
