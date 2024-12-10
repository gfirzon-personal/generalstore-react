import React from "react"
import { useForm } from "react-hook-form"
import PropertyContainer from "../../../components/screen-container/PropertyContainer"
import { createAdminUser, getAdminUser, updateAdminUser } from "../../../utils/AdminClient"
import CancelButton from "../../../components/cancel-button/CancelButton"
import DeleteButton from "../../../components/delete-button/DeleteButton"
import { toast } from "react-toastify"
import { useLoader } from "../../../contexts/LoaderContext"
import { AdminUserModel } from "../../../types/AdminUserModel"
import { showToast } from "../../../utils/ErrorUtils"
import { useHistory } from "react-router"
import { validateEmail } from "../../../utils/Validate"
import { useQuery, useQueryClient } from "react-query"
import { ThruFormProvider } from "../../../contexts/ThruFormContext"
import TextInputLabel from "../../../components/form/TextInputLabel"
import CheckboxInputLabel from "../../../components/form/CheckboxInputLabel"
import { useAdminUserDelete } from "../useAdminUserDelete"

const inputs = {
  USERNAME: "username",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  ENABLED: "isEnabled",
  ACTIVE: "isActive",
  LOG_SESSION: "isLogSession",
}

interface IAdminUserEdit {
  userId: number
}

const AdminUserEdit: React.FC<IAdminUserEdit> = ({ userId }: IAdminUserEdit) => {
  const form = useForm()
  const { register, formState, handleSubmit, errors } = form

  const deleteAdminUser = useAdminUserDelete()
  const queryClient = useQueryClient()

  const { data: adminUserData, isLoading } = useQuery(["admin-user", userId], () => getAdminUser(userId), {
    enabled: userId > 0,
  })

  const loading = !adminUserData && userId > 0

  const { setLoading } = useLoader()
  const history = useHistory()

  const onSubmit = async (data: any) => {
    const user: AdminUserModel = {
      id: userId === -1 ? 0 : userId,
      firstName: data[inputs.FIRST_NAME],
      lastName: data[inputs.LAST_NAME],
      username: data[inputs.USERNAME],
      email: data[inputs.EMAIL],
      isEnabled: data[inputs.ENABLED],
      isActive: data[inputs.ACTIVE],
      isLogSession: data[inputs.LOG_SESSION],
      created: "",
    }

    const func = userId > 0 ? updateAdminUser : createAdminUser

    setLoading(true)
    func(user)
      .client()
      .then((res: any) => {
        if (res.status === 200) {
          toast.success(userId > 0 ? "User updated." : "User created.")

          const newUserId = res.data.customerUser.user.id

          queryClient.setQueryData(["admin-user", newUserId], (old: any) => {
            return { ...res, data: res.data.customerUser.user, email: res.data.customerUser.email }
          })
          queryClient.invalidateQueries(["admin-user-list", 0])

          history.push(`/admin/users`)
        } else {
          throw new Error(`Failed to update user ${res.status}`)
        }
      })
      .catch((e: any) => {
        showToast("Failed to update user.", e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <PropertyContainer title="User" description="add or edit user settings">
      <ThruFormProvider customForm={form} onSubmit={onSubmit} loading={isLoading}>
        <div className="row Thru-Edit-Continer">
          <div className="col-lg-12">
            <div className="form-group mb-5">
              <div className="col-2 p-0">
                <CheckboxInputLabel
                  label="Enable"
                  name={inputs.ENABLED}
                  defaultChecked={adminUserData ? adminUserData?.isEnabled : true}
                />
              </div>
            </div>
            <div className="form-group mb-4">
              <TextInputLabel
                label="Username"
                name={inputs.USERNAME}
                placeholder="Enter username"
                maxLength={128}
                defaultValue={adminUserData?.username}
                required
              />
            </div>
            <div className="form-group mb-4">
              <TextInputLabel
                label="First Name"
                name={inputs.FIRST_NAME}
                placeholder="Enter first name"
                maxLength={128}
                defaultValue={adminUserData?.firstName}
                required
              />
            </div>
            <div className="form-group mb-4">
              <TextInputLabel
                label="Last Name"
                name={inputs.LAST_NAME}
                placeholder="Enter last name"
                maxLength={128}
                defaultValue={adminUserData?.lastName}
                required
              />
            </div>
            <div className="form-group mb-4">
              <TextInputLabel
                label="Email"
                name={inputs.EMAIL}
                placeholder="Enter email"
                maxLength={128}
                defaultValue={adminUserData?.email}
                validate={(value: string) => (!validateEmail(value) ? "Invalid email format." : true)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label>Active</label>
              <div className="custom-control custom-switch">
                <input
                  id={inputs.ACTIVE}
                  name={inputs.ACTIVE}
                  ref={register()}
                  type="checkbox"
                  className="custom-control-input"
                  defaultChecked={adminUserData?.isActive}
                  data-toggle="tooltip"
                />
                <label className="custom-control-label " htmlFor="isActive"></label>
              </div>
            </div>
            <div className="form-group mb-3">
              <div className="col-2 p-0">
                <label>Log Session</label>
                <div className="custom-control custom-switch">
                  <input
                    id={inputs.LOG_SESSION}
                    name={inputs.LOG_SESSION}
                    ref={register()}
                    type="checkbox"
                    className="custom-control-input"
                    defaultChecked={adminUserData?.isLogSession}
                    data-toggle="tooltip"
                  />
                  <label className="custom-control-label " htmlFor="isLogSession"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Thru-portlet-footer border-top">
          <div className="row">
            <div className="col d-flex">
              <div className="mr-3">
                <button id="btnSaveAdminUser" className="btn btn-Save btn-thru-lg">
                  Save
                </button>
              </div>
              <CancelButton isDirty={formState.isDirty} to="/admin/users" />
              {/* <DeleteButton
                id="btnAdminUserDelete"
                doDelete={doDelete}
                hidden={userId < 0}
                to={`/admin/users`}
                successMessage={`Deleted user ${adminUserData?.username}`}
                entityTypeName="User"
              /> */}
              <DeleteButton
                id="btnDeleteCertificate"
                doDelete={() => deleteAdminUser({ customerId: 0, userId: userId })}
                hidden={userId <= 0}
                to={`/admin/users`}
                successMessage={`Deleted customer user ${adminUserData?.username}`}
                entityTypeName="Customer User"
              />
            </div>
          </div>
        </div>
      </ThruFormProvider>
    </PropertyContainer>
  )
}

export default AdminUserEdit
