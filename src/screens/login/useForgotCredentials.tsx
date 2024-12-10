import { useHistory } from "react-router"
import { toast } from "react-toastify"
import { useLoader } from "../../contexts/LoaderContext"
import { CertificateModel } from "../../types/ForgotCredentialsModel"
import { showToast } from "../../utils/ErrorUtils"

const inputs = {
  EMAIL_ADDRESS: "emailAddress",
  USERNAME: "username",
}

const useForgotCredentials = (forgotFunction: any) => {
  const history = useHistory()
  const { setLoading } = useLoader()

  const submitData = (data: CertificateModel) => {
    setLoading(true)
    forgotFunction(data)
      .client()
      .then((res: any) => {
        if (res.status === 204) {
          history.push("/")
          toast.success(`Email successfully sent.`)
        } else {
          throw new Error(`Failed to send recovery email.`)
        }
      })
      .catch((e: any) => {
        showToast("Failed to send recovery email.", e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    submitData: submitData,
    inputs: inputs,
  }
}

export { useForgotCredentials }
