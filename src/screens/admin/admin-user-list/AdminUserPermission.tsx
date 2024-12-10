import React, { useEffect, useMemo } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useHistory } from "react-router"
import { toast } from "react-toastify"
import CheckboxInput from "../../../components/form/CheckboxInput"
import SearchableTable from "../../../components/searchable-table/SearchableTable"
import { useDataCache } from "../../../contexts/DataCacheContext"
import { useLoader } from "../../../contexts/LoaderContext"
import { AdminGroupModel } from "../../../types/AdminGroupModel"
import { AdminUserModel } from "../../../types/AdminUserModel"
import { AdminAssignModel } from "../../../types/AdminAssignModel"
import {
  getAdminUserList,
  getAdminUserAssignedPermissionList,
  getAdminUserUnassignedPermissionList,
  createAdminPermissionUser,
  deleteAdminPermissionUser,
} from "../../../utils/AdminClient"
import { showToast, showWarning } from "../../../utils/ErrorUtils"
import { ThruFormProvider } from "../../../contexts/ThruFormContext"
import SelectInputLabel from "../../../components/form/SelectInputLabel"
import TextInputLabel from "../../../components/form/TextInputLabel"
import { getUserAssignedPermissionsKey, getUserUnassignedPermissionsKey } from "../AdminConstants"
import { useQuery } from "react-query"
import useAddRemoveTable from "../../../utils/useAddRemoveTable"

interface IAdminUserPermission {
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

const AdminUserPermission: React.FC<IAdminUserPermission> = ({ uId }: IAdminUserPermission) => {
  const form = useForm()
  const assignForm = useForm()
  const unassignForm = useForm()
  const saveForm = useForm()

  const { data: users }: any = useQuery(["admin-user-group", 0], () => getAdminUserList(0))
  const {
    data: assignedPermissions,
    refetch: refetchAssigned,
    isFetching: isFetchingAssigned,
  } = useQuery(getUserAssignedPermissionsKey(uId), () => getAdminUserAssignedPermissionList(uId))
  const {
    data: unassignedPermissions,
    refetch: refetchUnassigned,
    isFetching: isFetchingUnassigned,
  } = useQuery(getUserUnassignedPermissionsKey(uId), () => getAdminUserUnassignedPermissionList(uId))

  const {
    toAdd,
    toRemove,
    clear,
    handleUserAdd,
    handleUserRemove,
    stagingAssigned,
    stagingUnassigned,
  } = useAddRemoveTable<AdminGroupModel>(assignedPermissions ?? [], unassignedPermissions ?? [], (item) => item.id)

  const loading = !users && uId > 0
  const { setLoading } = useLoader()

  const onSubmit = async (data: any) => {
    if (!assignedPermissions || !unassignedPermissions) {
      return
    }

    setLoading(true)
    Promise.allSettled([
      ...toAdd.map((e: AdminGroupModel) => {
        const assignModel: AdminAssignModel = {
          userId: uId,
          permissionId: e.id,
        }

        return createAdminPermissionUser(assignModel).client()
      }),
      ...toRemove.map((e: AdminGroupModel) => deleteAdminPermissionUser(e.id, uId).client()),
    ])
      .then((res) => {
        if (res.some((resItem: any) => resItem.value.status !== 200)) {
          throw new Error("Saved failed")
        }
        toast.success("Updated user permissions.")
      })
      .catch((e) => {
        showToast(e, "Failed to update user permissions.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const history = useHistory()

  const selectedUserId: number = useWatch({
    control: form.control,
    name: inputs.USERNAME_OPTION,
    defaultValue: uId,
  })

  const { dispatch } = useDataCache()

  const selectedUser = useMemo(() => users?.find((u: AdminUserModel) => u.id === +selectedUserId), [
    selectedUserId,
    users,
  ])

  useEffect(() => {
    if (selectedUser) {
      history.push(`/admin/${selectedUserId}/user-permissions`)
      form.setValue(inputs.FIRST_NAME, selectedUser.firstName)
      form.setValue(inputs.LAST_NAME, selectedUser.lastName)
      form.setValue(inputs.USERNAME, selectedUser.username)
      clear()
    }
  }, [selectedUser])

  const header = [
    {
      title: <CheckboxInput name="checkbox-main-unassign" isSwitch={false} />,
      getValue: (data: AdminGroupModel) => <CheckboxInput name={`checkbox-unassign-${data.id}`} isSwitch={false} />,
    },
    {
      title: "Name",
      getValue: (data: AdminGroupModel) => data.name,
    },
  ]

  const headerUnassigned = [
    {
      title: <CheckboxInput name="checkbox-main-assign" isSwitch={false} />,
      getValue: (data: AdminGroupModel) => <CheckboxInput name={`checkbox-assign-${data.id}`} isSwitch={false} />,
    },
    {
      title: "Name",
      getValue: (data: AdminGroupModel) => data.name,
    },
  ]

  const removeButton = [
    <div key={1}>
      <button id="btn-unassign-selected" className="btn btn-label-thru mr-3" title="Remove permission from the user">
        REMOVE
      </button>
    </div>,
  ]

  const addButton = [
    <div key={1}>
      <button id="btn-assign-selected" className="btn btn-label-thru mr-3" title="Add permission to the user">
        ADD
      </button>
    </div>,
  ]

  return (
    <div className="mt-4">
      <div className="d-flex ml-3 pl-3 mb-4">
        <h3 className="thruTitle ml-2">User Permissions</h3>
        <div className="ml-2 mr-2 d-flex align-items-center thruSubtitle-breadcrumb-separator" />
        <div className="thruSubtitle d-flex align-items-center">manage user permission assignment</div>
      </div>
      <div className="row ml-3 mr-4">
        <div className="col-3">
          <ThruFormProvider
            customForm={form}
            onSubmit={() => {
              showWarning("Submit not implemented")
            }}
            loading={loading}
          >
            <div className="thruCardContainer p-5">
              <div className="p-0 mb-4">
                <SelectInputLabel
                  label="Select a user to manage"
                  name={inputs.USERNAME_OPTION}
                  required
                  valueAsNumber
                  defaultValue={uId}
                >
                  <option value={-1}>Select User</option>
                  {users?.map((item: any) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.username}
                      </option>
                    )
                  })}
                </SelectInputLabel>
              </div>
              <div className="border-top" />
              <div className="form-group mb-4 mt-2">
                <TextInputLabel
                  label="First Name"
                  name={inputs.FIRST_NAME}
                  maxLength={128}
                  readOnly
                  defaultValue={selectedUser?.firstName}
                />
              </div>
              <div className="form-group mb-4">
                <TextInputLabel
                  label="Last Name"
                  name={inputs.LAST_NAME}
                  maxLength={128}
                  readOnly
                  defaultValue={selectedUser?.lastName}
                />
              </div>
              <div className="form-group mb-4">
                <TextInputLabel
                  label="Username"
                  name={inputs.USERNAME}
                  maxLength={128}
                  readOnly
                  defaultValue={selectedUser?.username}
                />
              </div>
            </div>
          </ThruFormProvider>
        </div>
        <div className="col">
          <div className="thruCardContainer">
            <h4 className="ml-3 my-3">Assign User Permissions</h4>
            <div className="p-5 border-top">
              <div className="row">
                <div className="col ml-3 px-0 manageUGP-Container-L">
                  <div className="mb-4 px-0 manageUGP-L">
                    <h4 className="pb-3 pl-3 pt-3">Available Permissions</h4>
                  </div>
                  <div className="p-4">
                    <SearchableTable
                      header={headerUnassigned}
                      getRowId={(data: AdminGroupModel) => data.id}
                      data={stagingUnassigned}
                      createButton={addButton}
                      refresh={refetchUnassigned}
                      isFetching={isFetchingUnassigned}
                      onFormSubmit={(data) =>
                        handleUserAdd(data, assignForm, "checkbox-main-assign", "checkbox-assign-")
                      }
                      mainCheckbox="checkbox-main-assign"
                      customForm={assignForm}
                      idPrefix="assigned"
                    />
                  </div>
                </div>
                <div
                  className="col ml-3 px-0 manageUGP-Container-R"
                  style={{ minHeight: 400, border: "1px solid rgba(40, 167, 69, 0.30)" }}
                >
                  <div
                    className="mb-4 px-0 manageUGP-R"
                    style={{
                      backgroundColor: "#f4fff5",
                      color: "#28a745",
                      borderBottom: "1px solid rgba(40, 167, 69, 0.30)",
                    }}
                  >
                    <h4 className="pb-3 pl-3 pt-3">Assigned User Permissions</h4>
                  </div>
                  <div className="p-4">
                    <SearchableTable
                      header={header}
                      getRowId={(data: AdminGroupModel) => data.id}
                      data={stagingAssigned}
                      createButton={removeButton}
                      refresh={refetchAssigned}
                      isFetching={isFetchingAssigned}
                      onFormSubmit={(data) =>
                        handleUserRemove(data, unassignForm, "checkbox-main-unassign", "checkbox-unassign-")
                      }
                      mainCheckbox="checkbox-main-unassign"
                      customForm={unassignForm}
                      idPrefix="unassigned"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="Thru-portlet-footer border-top">
              {/* <form onSubmit={form.handleSubmit(onSubmitForm)}>
               */}
              <ThruFormProvider customForm={saveForm} onSubmit={onSubmit} loading={loading}>
                <div className="row">
                  <div className="col d-flex">
                    <div className="mr-3">
                      <button type="submit" id="btnSaveUserGroups" className="btn btn-Save btn-thru-lg">
                        Save
                      </button>
                    </div>
                    <div className="mr-3">
                      <button
                        id="btnResetUserGroups"
                        type="button"
                        onClick={() => clear()}
                        className="btn btn-Cancel btn-thru-lg"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </ThruFormProvider>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUserPermission
