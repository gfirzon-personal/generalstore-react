import React from "react"
import { useThruFormContext } from "../../contexts/ThruFormContext"
import SkeletonFormControl from "../skeleton-form-control/SkeletonFormControl"

export interface ISelectInput {
  name: string
  textArea?: boolean
  defaultValue?: string | number
  valueAsNumber?: boolean
  readOnly?: boolean
  required?: boolean
  children?: React.ReactNode
  loadingOverride?: boolean
}

const SelectInput: React.FC<ISelectInput> = ({
  name,
  defaultValue,
  valueAsNumber,
  readOnly,
  required = false,
  children,
  loadingOverride,
}: ISelectInput) => {
  const { form, loading: contextLoading, idPrefix } = useThruFormContext()

  const loading = loadingOverride ?? contextLoading
  const id = `${idPrefix ?? ""}${name}`
  const error = form?.errors[name]

  const props = {
    id: id,
    name: name,
    ref: form?.register({
      required: { value: required, message: "Please supply a value." },
      valueAsNumber: valueAsNumber,
    }),
    type: "text",
    defaultValue: defaultValue,
    className: `form-control${form?.errors[name] ? " validationError" : ""}`,
    readOnly: readOnly,
    disabled: readOnly,
    "data-toggle": "tooltip",
  }

  return (
    <SkeletonFormControl loading={loading ?? false}>
      <select {...props}>{children}</select>
      {error && (
        <small id={`error-${id}`} className="form-text" style={{ color: "#e9666f" }}>
          {error.message}
        </small>
      )}
    </SkeletonFormControl>
  )
}

export default SelectInput
