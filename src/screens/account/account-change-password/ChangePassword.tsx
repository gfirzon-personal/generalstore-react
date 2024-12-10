import React from "react"
import { useForm, useWatch } from "react-hook-form"
import PropertyContainer from "../../../components/screen-container/PropertyContainer"
import { changePassword as changePasswordCall } from "../../../utils/AccountClient"
import CancelButton from "../../../components/cancel-button/CancelButton"
import { toast } from "react-toastify"
import { useLoader } from "../../../contexts/LoaderContext"
import { ChangePasswordModel } from "../../../types/ChangePasswordModel"
import { useAuth } from "../../../contexts/AuthContext"
import { useHistory } from "react-router"
import { showToast } from "../../../utils/ErrorUtils"
import { ThruFormProvider } from "../../../contexts/ThruFormContext"
import PasswordInputLabel from "../../../components/form/PasswordInputLabel"
import { useMutation } from "react-query"

const inputs = {
  USER_ID: "userId",
  CURRENT_PASSWORD: "currentPassword",
  NEW_PASSWORD: "newPassword",
  CONFIRM_PASSWORD: "confirmPassword",
}

const ChangePassword: React.FC<IChangePassword> = () => {
  const form = useForm()

  const { setLoading } = useLoader()
  const { state: authData } = useAuth()
  const history = useHistory()

  const newPassword: any = useWatch({
    control: form.control,
    name: inputs.NEW_PASSWORD,
  })

  const changePassword = useMutation(
    (model: ChangePasswordModel) => {
      return changePasswordCall(model)
    },
    {
      onMutate: async (newOrg) => {
        setLoading(true)
      },
      onError: (err, newOrg, context: any) => {
        showToast("Failed to update password.", err)
      },
      onSuccess: (data, organizationId, context) => {
        toast.success("Successfully updated password.")
        history.goBack()
      },
      onSettled: (data, error, variables, context) => {
        setLoading(false)
      },
    }
  )

  const onSubmit = async (data: any) => {
    console.log(data)

    const user: ChangePasswordModel = {
      userId: +authData.user.clientId,
      currentPassword: data[inputs.CURRENT_PASSWORD],
      newPassword: data[inputs.NEW_PASSWORD],
      confirmPassword: data[inputs.CONFIRM_PASSWORD],
    }

    changePassword.mutate(user)
  }

  return (
    <PropertyContainer title="Change Password" description="change my password">
      <ThruFormProvider customForm={form} onSubmit={onSubmit} loading={false}>
        <div className="row Thru-Edit-Continer">
          <div className="col-lg-12">
            <div className="form-group mb-4">
              <PasswordInputLabel
                label="Current Password"
                name={inputs.CURRENT_PASSWORD}
                maxLength={128}
                minLength={8}
                placeholder="Enter current password"
                required
              />
            </div>
            <div className="form-group mb-4">
              <PasswordInputLabel
                label="New Password"
                name={inputs.NEW_PASSWORD}
                maxLength={128}
                minLength={8}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="form-group">
              <PasswordInputLabel
                label="Confirm Password"
                name={inputs.CONFIRM_PASSWORD}
                maxLength={128}
                minLength={8}
                validate={(value) => newPassword === value ? true : "Password does not match."}
                placeholder="Enter confirm password"
                required
              />
            </div>
          </div>
        </div>
        <div className="Thru-portlet-footer border-top">
          <div className="row">
            <div className="col d-flex">
              <div className="mr-3">
                <button id="btnChangePswd" className="btn btn-Save btn-thru-lg">
                  Save
                </button>
              </div>
              <CancelButton isDirty={form.formState.isDirty} goBack />
            </div>
          </div>
        </div>
      </ThruFormProvider>
    </PropertyContainer>
  )
}

interface IChangePassword { }

export default ChangePassword
