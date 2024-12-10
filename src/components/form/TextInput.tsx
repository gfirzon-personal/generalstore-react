import React, { CSSProperties } from "react"
import { Validate } from "react-hook-form"
import { useThruFormContext } from "../../contexts/ThruFormContext"
import SkeletonFormControl from "../skeleton-form-control/SkeletonFormControl"

export interface ITextInput {
  name: string
  textArea?: boolean
  defaultValue?: string
  valueAsNumber?: boolean
  placeholder?: string
  maxLength?: number
  readOnly?: boolean
  required?: boolean
  typeOverride?: string
  style?: CSSProperties
  className?: string
  rows?: number
  validate?: Validate | Record<string, Validate>
}

const TextInput: React.FC<ITextInput> = ({
  name,
  textArea,
  defaultValue,
  valueAsNumber,
  maxLength,
  placeholder,
  readOnly,
  required = false,
  typeOverride,
  style,
  className,
  validate,
  rows = 4,
}: ITextInput) => {
  const { form, loading, idPrefix } = useThruFormContext()

  const id = `${idPrefix ?? ""}${name}`
  const error = form?.errors[name]
  const props = {
    id: id,
    name: name,
    ref: form?.register({
      required: { value: required, message: "Please supply a value." },
      valueAsNumber: valueAsNumber,
      validate: validate,
    }),
    type: typeOverride || "text",
    defaultValue: defaultValue,
    className: `${className ? className : "form-control"} ${error ? " validationError" : ""}`,
    maxLength: maxLength,
    placeholder: placeholder,
    readOnly: readOnly,
    "data-toggle": "tooltip",
    style: style,
  }

  return (
    <SkeletonFormControl loading={loading ?? false} height={textArea ? 21 * rows + 12.5 : undefined}>
      {!textArea && <input {...props} />}
      {textArea && <textarea {...props} rows={rows} />}
      {error && (
        <small id={`error-${id}`} className="form-text" style={{ color: "#e9666f" }}>
          {error.message}
        </small>
      )}
    </SkeletonFormControl>
  )
}

export default TextInput
