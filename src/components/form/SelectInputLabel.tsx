import React from "react"
import InputLabel from "./InputLabel"
import SelectInput, { ISelectInput } from "./SelectInput"

interface ISelectInputLabel extends ISelectInput {
  label: string
}

const SelectInputLabel: React.FC<ISelectInputLabel> = ({ label, name, required, ...rest }: ISelectInputLabel) => {
  return (
    <InputLabel label={label} required={required ?? false}>
      <SelectInput {...rest} name={name} required={required} />
    </InputLabel>
  )
}

export default SelectInputLabel
