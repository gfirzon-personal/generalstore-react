import React from "react"
import { useForm, UseFormMethods } from "react-hook-form"

interface IThruFormContext {
  form: UseFormMethods<Record<string, any>>
  loading: boolean
  idPrefix?: number
}

const ThruFormContext = React.createContext<IThruFormContext | undefined>(undefined)

interface IThruFormProvider {
  customForm?: any
  onSubmit: (data: any) => void
  children: React.ReactNode
  className?: string
  renderForm?: boolean
  loading: boolean
  idPrefix?: number
  autoComplete?: string
}

function ThruFormProvider({
  customForm,
  className,
  onSubmit,
  children,
  loading,
  idPrefix,
  autoComplete,
  renderForm = true,
}: IThruFormProvider) {
  const form = useForm()
  const handleSubmit = customForm?.handleSubmit ?? form.handleSubmit

  return (
    <ThruFormContext.Provider value={{ form: customForm ?? form, loading: loading, idPrefix: idPrefix }}>
      {renderForm && (
        <form autoComplete={autoComplete} className={className} onSubmit={handleSubmit(onSubmit)}>
          {children}
        </form>
      )}
      {!renderForm && children}
    </ThruFormContext.Provider>
  )
}

function useThruFormContext() {
  const context = React.useContext(ThruFormContext)

  if (context === undefined) {
    throw new Error("useThruFormContext must be used within a ThruFormProvider")
  }

  return context
}

export { ThruFormProvider, useThruFormContext }
