import React from "react"
import { useThruFormContext } from "../../contexts/ThruFormContext"
import SkeletonFormControl from "../skeleton-form-control/SkeletonFormControl"

export interface IRadioInput {
  name: string
  id?: string
  readOnly?: boolean
  required?: boolean
  value?: string
  defaultChecked?: boolean
}

const RadioInput: React.FC<IRadioInput> = ({ name, id, readOnly, value, defaultChecked, required = false }: IRadioInput) => {
  const { form, loading, idPrefix } = useThruFormContext()

  const props = {
    id: `${idPrefix ?? ""}${id ?? name}`,
    name: name,
    ref: form?.register({ required: required }),
    type: "radio",
    value: value,
    className: `form-check-input${form?.errors[name] ? " validationError" : ""}`,
    readOnly: readOnly,
    "data-toggle": "tooltip",
  }

  return (
    <SkeletonFormControl loading={loading ?? false} height={35}>
      <input {...props} defaultChecked={defaultChecked} />
    </SkeletonFormControl>
  )
}

export default RadioInput
