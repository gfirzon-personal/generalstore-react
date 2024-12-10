import React from "react"
import { constructError } from "../../utils/ErrorUtils"

const ErrorComponent: React.FC<IErrorComponent> = ({ error }: any) => {
  const formattedError = constructError?.(error)

  return (
    <div>
      <h1
        style={{
          fontSize: "1.5em",
          textAlign: "center",
          paddingBottom: "10px",
        }}
      >
        {"Oops. Something went wrong 😞"}
      </h1>
      <p style={{ textAlign: "center" }}>{formattedError.message}</p>
    </div>
  )
}

interface IErrorComponent {
  error: any
}

export default ErrorComponent
