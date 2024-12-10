import React from "react"
import InputLabel from "./InputLabel"
import PasswordInput, { IPasswordInput } from "./PasswordInput"

interface IPasswordInputLabel extends IPasswordInput {
  label: string
}

const PasswordInputLabel: React.FC<IPasswordInputLabel> = ({
  label,
  required,
  name,
  ...rest
}: IPasswordInputLabel) => {
  return (
    <InputLabel label={label} htmlFor={name} required={required ?? false}>
      <PasswordInput {...rest} name={name} required={required} />
    </InputLabel>
  )
}

export default PasswordInputLabel
