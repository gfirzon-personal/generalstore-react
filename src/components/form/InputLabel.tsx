import React from "react"

const InputLabel: React.FC<IInputLabel> = ({ label, required, htmlFor, children }: IInputLabel) => {
  return (
    <>
      <label>
        {label} {required && <i className="Thru-required">*</i>}
      </label>
      {children}
    </>
  )
}

interface IInputLabel {
  label: string
  required: boolean
  htmlFor?: string
  children: React.ReactNode
}

export default InputLabel
