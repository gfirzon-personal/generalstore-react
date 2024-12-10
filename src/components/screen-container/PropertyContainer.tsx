import React from "react"
import Center from "../center/Center"
import ErrorComponent from "../error-component/ErrorComponent"
import ScreenCard from "./ScreenCard"
import ScreenContainer, { IScreenContainer } from "./ScreenContainer"

interface IPropertyContainer extends IScreenContainer {
  error?: unknown
}

const PropertyContainer: React.FC<IPropertyContainer> = ({ error, children, ...rest }: IPropertyContainer) => {
  const errorComponent = error ? (
    <Center>
      <ErrorComponent error={error} />
    </Center>
  ) : undefined

  return (
    <ScreenContainer {...rest}>
      <ScreenCard>{error ? errorComponent : children}</ScreenCard>
    </ScreenContainer>
  )
}

export default PropertyContainer
