import React from "react"
import CheckboxInput, { ICheckboxInput } from "./CheckboxInput"
import InputLabel from "./InputLabel"

interface ICheckboxInputLabel extends ICheckboxInput {
  label: string
}

const CheckboxInputLabel: React.FC<ICheckboxInputLabel> = ({ label, required, name, ...rest }: ICheckboxInputLabel) => {
  return (
    <InputLabel label={label} required={required ?? false}>
      <CheckboxInput {...rest} name={name} required={required} />
    </InputLabel>
  )
}

export default CheckboxInputLabel
