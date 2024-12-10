import React, { useEffect, useMemo } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useQuery } from "react-query"
import { useHistory } from "react-router"
import SearchableTable from "../../../components/searchable-table/SearchableTable"
import SkeletonFormControl from "../../../components/skeleton-form-control/SkeletonFormControl"
import { useDataCache } from "../../../contexts/DataCacheContext"
import { useLoader } from "../../../contexts/LoaderContext"
import { AdminSessionModel } from "../../../types/AdminSessionModel"
import { AdminUserModel } from "../../../types/AdminUserModel"
import { getAdminUserList, getAdminUserSessions } from "../../../utils/AdminClient"
import { getUserSessionsKey } from "../AdminConstants"

interface IAdminUserSession {
  uId: number
}

const inputs = {
  USERNAME: "username",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  USERNAME_OPTION: "usernameOption",
  UNASSIGN_SELECTED: "btn-unassign-selected",
  ASSIGN_SELECTED: "btn-assign-selected",
}

const AdminUserSession: React.FC<IAdminUserSession> = ({ uId }: IAdminUserSession) => {
  console.log("here")
  const { register, handleSubmit, control, formState, errors, setValue } = useForm()

  const baseUrl = "/admin/user-sessions"
  const { data: users }: any = useQuery(["admin-user-group", 0], () => getAdminUserList(0))

  // const endpointUserSessions = useCallback(() => getAdminUserSessions(uId), [])
  // const { data: userSessions, set }: any = useData<AdminSessionModel>(endpointUserSessions, {})
  const { data: userSessions, refetch: refetch, isFetching, error } = useQuery(getUserSessionsKey(uId), () =>
    getAdminUserSessions(uId)
  )

  const loading = !users && uId > 0
  const { setLoading } = useLoader()

  const onSubmit = async (data: any) => {
    console.log({ data: data })
  }

  const selectedUserId: number = useWatch({
    control,
    name: inputs.USERNAME_OPTION,
    defaultValue: uId,
  })

  const { dispatch } = useDataCache()
  const history = useHistory()

  const selectedUser = useMemo(() => users?.find((u: AdminUserModel) => u.id === +selectedUserId), [
    selectedUserId,
    users,
  ])

  useEffect(() => {
    if (selectedUser) {
      history.push(`${baseUrl}/${selectedUserId}`)
      setValue(inputs.FIRST_NAME, selectedUser.firstName)
      setValue(inputs.LAST_NAME, selectedUser.lastName)
      setValue(inputs.USERNAME, selectedUser.username)
    }
  }, [selectedUser])

  const header = [
    {
      title: "Last Action",
      getValue: (data: AdminSessionModel) => data.lastAction,
    },
    {
      title: "Created",
      getValue: (data: AdminSessionModel) => data.created,
    },
  ]

  return (
    <div className="mt-4">
      <div className="d-flex ml-3 pl-3 mb-4">
        <h3 className="thruTitle ml-2">User Sessions</h3>
        <div className="ml-2 mr-2 d-flex align-items-center thruSubtitle-breadcrumb-separator" />
        <div className="thruSubtitle d-flex align-items-center">view user sessions</div>
      </div>
      <div className="row ml-3 mr-4">
        <div className="col-3">
          <form>
            <div className="thruCardContainer p-5">
              <div className="p-0 mb-4">
                <label htmlFor="exampleFormControlSelect1">
                  <h5>Select a user to manage </h5>
                </label>
                <SkeletonFormControl loading={loading}>
                  <select
                    className={`form-control${errors[inputs.USERNAME_OPTION] ? " validationError" : ""}`}
                    name={inputs.USERNAME_OPTION}
                    id={inputs.USERNAME_OPTION}
                    ref={register({ required: true })}
                    defaultValue={uId}
                  >
                    <option value="">Select User</option>
                    {users?.map((item: any) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.username}
                        </option>
                      )
                    })}
                  </select>
                </SkeletonFormControl>
              </div>
              <div className="border-top" />
              <div className="form-group mb-4 mt-2">
                <label>First Name </label>
                <input
                  type="text"
                  ref={register}
                  id={inputs.FIRST_NAME}
                  name={inputs.FIRST_NAME}
                  className="form-control"
                  maxLength={128}
                  data-toggle="tooltip"
                  readOnly
                />
              </div>
              <div className="form-group mb-4">
                <label>Last Name </label>
                <input
                  type="text"
                  ref={register}
                  id={inputs.LAST_NAME}
                  name={inputs.LAST_NAME}
                  className="form-control"
                  maxLength={128}
                  data-toggle="tooltip"
                  readOnly
                />
              </div>
              <div className="form-group mb-4">
                <label>Username</label>
                <input
                  type="text"
                  ref={register}
                  id={inputs.USERNAME}
                  name={inputs.USERNAME}
                  className="form-control"
                  maxLength={128}
                  data-toggle="tooltip"
                  readOnly
                />
              </div>
            </div>
          </form>
        </div>
        <div className="col">
          <div className="thruCardContainer">
            <div className="thruCardHead">
              <SearchableTable
                getSearchableContent={(data: AdminSessionModel) => [data.lastAction, data.created]}
                getRowId={(data: any) => data.id}
                refresh={refetch}
                header={header}
                data={userSessions}
                isFetching={isFetching}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUserSession
