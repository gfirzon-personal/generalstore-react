import React, { useState } from "react"
import { ValidateResult } from "react-hook-form"
import { useThruFormContext } from "../../contexts/ThruFormContext"
import SkeletonFormControl from "../skeleton-form-control/SkeletonFormControl"

export interface IPasswordInput {
  name: string
  defaultValue?: string
  placeholder?: string
  minLength?: number
  maxLength?: number
  readOnly?: boolean
  required?: boolean
  autoComplete?: string
  newPassword?: boolean
  buttonIdPrefix?: string
  validate?: (data: any) => ValidateResult | Promise<ValidateResult>
}

const PasswordInput: React.FC<IPasswordInput> = ({
  name,
  defaultValue,
  minLength,
  maxLength,
  placeholder,
  readOnly,
  validate,
  autoComplete,
  newPassword,
  buttonIdPrefix,
  required = false,
}: IPasswordInput) => {
  const { form, loading, idPrefix } = useThruFormContext()

  const id = `${idPrefix ?? ""}${name}`
  const error = form?.errors[name]

  const props = {
    id: id,
    name: name,
    ref: form?.register({
      required: { value: required, message: "Please supply a value." },
      minLength: minLength,
      maxLength: maxLength,
      validate: validate,
    }),
    type: "text",
    defaultValue: defaultValue,
    className: `form-control${form?.errors[name] ? " validationError" : ""}`,
    minLength: minLength,
    maxLength: maxLength,
    placeholder: placeholder,
    readOnly: readOnly,
    autoComplete: autoComplete,
    "data-toggle": "tooltip",
  }

  const [obfuscatePassword, setObfuscatePassword] = useState<boolean>(true)

  const buttonId = buttonIdPrefix ?? "" + "password-show"

  return (
    <SkeletonFormControl loading={loading ?? false}>
      <div className="input-group">
        <input
          {...props}
          type={obfuscatePassword ? "password" : "text"}
          autoComplete={newPassword ? "new-password" : undefined}
        />
        <div className="input-group-append">
          <button
            onClick={() => setObfuscatePassword(!obfuscatePassword)}
            className="btn btn-Thru-password"
            type="button"
            id={buttonId}
          >
            <i className="fad fa-eye-slash fa-swap-opacity"></i>
          </button>
        </div>
      </div>
      {error && (
        <small id={`error-${id}`} className="form-text" style={{ color: "#e9666f" }}>
          {error.message}
        </small>
      )}
    </SkeletonFormControl>
  )
}

export default PasswordInput
