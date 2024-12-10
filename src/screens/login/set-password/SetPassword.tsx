import React, { useCallback, useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { Link } from "react-router-dom"
import PasswordInputLabel from "../../../components/form/PasswordInputLabel"
import TextInputLabel from "../../../components/form/TextInputLabel"
import { ThruFormProvider } from "../../../contexts/ThruFormContext"
import { PasswordModel } from "../../../types/PasswordModel"
import { validateSetPswdLink, setPassword, validateResetPswdLink, resetPassword } from "../../../utils/PasswordClient"
import { useData } from "../../../utils/useData"
import { useHistory } from "react-router"
import ErrorComponent from "../../../components/error-component/ErrorComponent"
import { useLoader } from "../../../contexts/LoaderContext"
import { showToast } from "../../../utils/ErrorUtils"
import { useAuth } from "../../../contexts/AuthContext"

const inputs = {
  USERNAME: "username",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
}

interface ISetPassword {
  token: string
  isReset: boolean
}

const SetPassword: React.FC<ISetPassword> = ({ token, isReset }: ISetPassword) => {
  const { state, logout } = useAuth()
  const [submitted, setSubmitted] = useState(false)
  const form = useForm()
  const history = useHistory()
  const { setLoading } = useLoader()

  const validateSetPswdCall = useCallback(() => (isReset ? validateResetPswdLink(token) : validateSetPswdLink(token)), [
    token,
  ])

  const { data: setPswdResponseData, makeRequest: validateSetPswdData, error }: any = useData(validateSetPswdCall, {
    requestOnMount: false,
    requestCache: true,
  })

  useEffect(() => {
    if (state.user.isAuthorized) {
      logout()
    }
  }, [state.user.isAuthorized])

  const onSubmit = async (data: any) => {
    console.log(data)

    const pswdModel: PasswordModel = {
      username: setPswdResponseData.username,
      key: token,
      password: data[inputs.PASSWORD],
      confirmPassword: data[inputs.CONFIRM_PASSWORD],
    }

    const func = isReset ? resetPassword : setPassword

    setLoading(true)
    await func(pswdModel)
      .client()
      .then((res: any) => {
        if (res.status === 200 || res.status === 204) {
          setSubmitted(true)
        } else {
          throw new Error(`Error changing the password ${res.status}`)
        }
      })
      .catch((e: any) => {
        showToast(`Failed to ${isReset ? "reset" : "set"} new password.`, e)
        form.reset()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    validateSetPswdData()
  }, [token, validateSetPswdData])

  console.log({ setPswdResponseData: setPswdResponseData })

  const newPassword: any = useWatch({
    control: form.control,
    name: inputs.PASSWORD,
  })

  return (
    <ThruFormProvider
      loading={false}
      customForm={form}
      onSubmit={onSubmit}
      className="pswd-reset-container mt-auto d-flex"
    >
      <div className="thru-pswd-reset-Container">
        <div className="thru-pswd-reset-header" hidden={submitted ? true : undefined}>
          {" "}
          {/* from here will be hidden*/}
          <h1 className="text-center mt-3">{isReset ? "Reset Password" : "Set Password"}</h1>
          <div className="circleLogo-outer">
            <img
              className="img-fluid"
              src="/images/white-thru-logo.svg"
              alt="Thru Logo"
              width="75px"
              style={{ marginTop: "34%", marginLeft: "8%" }}
            />
          </div>
        </div>
        {/* Below is part of the confirmation animation that will need to be visible (and the above part hidden) once the user successfully resets password */}
        <div className="thru-pswd-reset-header" hidden={!submitted ? true : undefined}>
          <h1 className="text-center mt-3">Password Set</h1>
          <svg className="circleLogo-outer checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        {/* *********************************************************************************************************************************************** */}
        {error?.error && (
          <div className="thru-pswd-reset-body" style={{ marginTop: "6rem" }}>
            <ErrorComponent error={error} />
          </div>
        )}
        <div className="thru-pswd-reset-body" hidden={error?.error ? true : undefined}>
          <div className="mt-5" hidden={submitted ? true : undefined}>
            {" "}
            {/*  from here will be hidden */}
            <div className="form-group col">
              <TextInputLabel
                label="Username"
                name={inputs.USERNAME}
                placeholder="username"
                defaultValue={setPswdResponseData?.username}
                readOnly
              />
            </div>
            <div className="form-group col">
              <PasswordInputLabel label="New Password" name={inputs.PASSWORD} required />
            </div>
            <div className="form-group col">
              <PasswordInputLabel
                label="Confirm Password"
                name={inputs.CONFIRM_PASSWORD}
                required
                validate={(value) => (newPassword === value ? true : "Password does not match.")}
              />
            </div>
          </div>
          {/* Below is part of the confirmation animation that will need to be visible (and the above part hidden) once the user successfully resets password */}
          <div
            className="my-5 text-center"
            style={{ color: "#00b0f0", fontSize: "2rem", marginTop: "5rem" }}
            hidden={!submitted ? true : undefined}
          >
            Your Password has been set.
          </div>
          {/* *********************************************************************************************************************************************** */}
        </div>
        <div className="Thru-portlet-footer border-top" hidden={error?.error ? true : undefined}>
          <div className="row" hidden={submitted ? true : undefined}>
            {" "}
            {/* from here will be hidden */}
            <div className="col d-flex">
              <div className="mr-3">
                <button id="btnSetPswd" className="btn btn-Reset btn-thru-lg">
                  {isReset ? "Reset" : "Set"}
                </button>
              </div>
              <div className="mr-3">
                <button id="btnCancel" type="reset" className="btn btn-Cancel btn-thru-lg" data-dismiss="modal">
                  Clear
                </button>
              </div>
            </div>
          </div>
          {/* Below is part of the confirmation animation that will need to be visible (and the above part hidden) once the user successfully resets password */}
          <div className="row" hidden={!submitted ? true : undefined}>
            <div className="col d-flex">
              <div className="mr-3">
                <Link to="/">
                  <button id="btnLogin" className="btn btn-Reset btn-thru-lg" style={{ whiteSpace: "nowrap" }}>
                    Continue to Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* *********************************************************************************************************************************************** */}
        </div>{" "}
        {/* End of footer */}
      </div>
    </ThruFormProvider>
  )
}

export default SetPassword
