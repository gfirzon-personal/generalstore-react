import React from "react"
import { useThruFormContext } from "../../contexts/ThruFormContext"
import SkeletonFormControl from "../skeleton-form-control/SkeletonFormControl"

export interface ICheckboxOutlineInput {
  label: string
  name: string
  defaultChecked?: boolean
  required?: boolean
}

const CheckboxOutlineInput: React.FC<ICheckboxOutlineInput> = ({
  label,
  name,
  defaultChecked,
  required = false,
}: ICheckboxOutlineInput) => {
  const { form, loading } = useThruFormContext()

  const props = {
    id: name,
    name: name,
    ref: form?.register({ required: required }),
    type: "checkbox",
    defaultChecked: defaultChecked,
    className: `custom-control-input${form?.errors[name] ? " validationError" : ""}`,
    "data-toggle": "tooltip",
  }

  return (
    <SkeletonFormControl loading={loading ?? false} height={35}>
      <label className={`btn btn-outline-primary${defaultChecked ? " active" : ""}`}>
        <input {...props} />
        {label}
      </label>
    </SkeletonFormControl>
  )
}

export default CheckboxOutlineInput
