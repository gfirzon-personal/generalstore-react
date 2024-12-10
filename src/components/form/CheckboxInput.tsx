import React from "react"
import { useThruFormContext } from "../../contexts/ThruFormContext"
import SkeletonFormControl from "../skeleton-form-control/SkeletonFormControl"

export interface ICheckboxInput {
  name: string
  defaultChecked?: boolean
  readOnly?: boolean
  required?: boolean
  isSwitch?: boolean
  labelText?: string
  customControl?: boolean
}

const CheckboxInput: React.FC<ICheckboxInput> = ({
  name,
  defaultChecked,
  readOnly,
  labelText,
  required = false,
  isSwitch = true,
  customControl = true,
}: ICheckboxInput) => {
  const { form, loading, idPrefix } = useThruFormContext()

  const props = {
    id: `${idPrefix ?? ""}${name}`,
    name: name,
    ref: form?.register({ required: required }),
    type: "text",
    defaultChecked: defaultChecked,
    className: `${"custom-control-input"}${form?.errors[name] ? " validationError" : ""}`,
    readOnly: readOnly,
    disabled: readOnly,
    "data-toggle": "tooltip",
  }

  const input = (
    <>
      <input {...props} type="checkbox" />

      <label className="custom-control-label p-1" htmlFor={props.name}>
        {labelText}
      </label>
    </>
  )

  return (
    <SkeletonFormControl loading={loading ?? false} height={35}>
      {customControl ? (
        <div className={`${customControl ? "custom-control " : ""}${isSwitch ? "custom-switch" : "custom-checkbox"}`}>
          {input}
        </div>
      ) : (
        input
      )}
    </SkeletonFormControl>
  )
}

export default CheckboxInput
