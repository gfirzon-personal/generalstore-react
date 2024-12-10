import React from "react"
import InputLabel from "./InputLabel"
import TextInput, { ITextInput } from "./TextInput"

interface ITextInputLabel extends ITextInput {
  label: string
  defaultValue?: string
}

const TextInputLabel: React.FC<ITextInputLabel> = ({
  label,
  required,
  name,
  defaultValue,
  ...rest
}: ITextInputLabel) => {
  return (
    <InputLabel label={label} htmlFor={name} required={required ?? false}>
      <TextInput {...rest} name={name} required={required} defaultValue={defaultValue} />
    </InputLabel>
  )
}

export default TextInputLabel
