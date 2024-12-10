import React, { useCallback, useEffect } from "react"
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
  getAdminPermissionAssignedUserList,
  getAdminPermissionUnassignedUserList,
  createAdminPermissionUser,
  deleteAdminPermissionUser,
  getAdminPermissionList,
} from "../../../utils/AdminClient"
import { useData } from "../../../utils/useData"
import { showToast, showWarning } from "../../../utils/ErrorUtils"
import { ThruFormProvider } from "../../../contexts/ThruFormContext"
import SelectInputLabel from "../../../components/form/SelectInputLabel"
import TextInputLabel from "../../../components/form/TextInputLabel"
import { getPermissionAssignedUsersKey, getPermissionUnassignedUsersKey } from "../AdminConstants"
import { useQuery } from "react-query"
import useAddRemoveTable from "../../../utils/useAddRemoveTable"

interface IAdminPermissionUser {
  permId: number
}

const inputs = {
  NAME: "name",
  DESCRIPTION: "description",
  PERMISSION_OPTION: "permissionOption",
  UNASSIGN_SELECTED: "btn-unassign-selected",
  ASSIGN_SELECTED: "btn-assign-selected",
}

const AdminPermissionUser: React.FC<IAdminPermissionUser> = ({ permId }: IAdminPermissionUser) => {
  const form = useForm()
  const assignForm = useForm()
  const unassignForm = useForm()
  const saveForm = useForm()

  const endpoint = useCallback(() => getAdminPermissionList(), [])
  const { data: permissions, refresh }: any = useData(endpoint, {})

  const {
    data: assignedUsers,
    refetch: refetchAssigned,
    isFetching: isFetchingAssigned,
  } = useQuery(getPermissionAssignedUsersKey(permId), () => getAdminPermissionAssignedUserList(permId))
  const {
    data: unassignedUsers,
    refetch: refetchUnassigned,
    isFetching: isFetchingUnassigned,
  } = useQuery(getPermissionUnassignedUsersKey(permId), () => getAdminPermissionUnassignedUserList(permId))

  const loading = !permissions && permId > 0
  const { setLoading } = useLoader()
  const {
    toAdd,
    toRemove,
    clear,
    handleUserAdd,
    handleUserRemove,
    stagingAssigned,
    stagingUnassigned,
  } = useAddRemoveTable<AdminUserModel>(assignedUsers ?? [], unassignedUsers ?? [], (item) => item.id)

  const onSubmit = async (data: any) => {
    if (!assignedUsers || !unassignedUsers) {
      return
    }

    setLoading(true)
    Promise.allSettled([
      ...toAdd.map((e: AdminUserModel) => {
        const assignModel: AdminAssignModel = {
          permissionId: permId,
          userId: e.id,
        }

        return createAdminPermissionUser(assignModel).client()
      }),
      ...toRemove.map((e: AdminUserModel) => deleteAdminPermissionUser(permId, e.id).client()),
    ])
      .then((res) => {
        if (res.some((resItem: any) => resItem.value.status !== 200)) {
          throw new Error("Saved failed")
        }
        toast.success("Updated permission users.")
      })
      .catch((e) => {
        showToast(e, "Failed to update permission users.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const history = useHistory()

  const selectedPermissionId: number = useWatch({
    control: form.control,
    name: inputs.PERMISSION_OPTION,
    defaultValue: permId,
  })

  const { dispatch } = useDataCache()

  const selectedPermission: AdminGroupModel = useCallback(
    permissions?.find((u: AdminGroupModel) => u.id === +selectedPermissionId),
    [selectedPermissionId, permissions]
  )

  useEffect(() => {
    history.push(`/admin/permissions/${selectedPermissionId}/permission-users`)

    form.setValue(inputs.NAME, selectedPermission?.name)
    form.setValue(inputs.DESCRIPTION, selectedPermission?.description)
  }, [selectedPermissionId])

  const header = [
    {
      title: <CheckboxInput name="checkbox-main-unassign" isSwitch={false} />,
      getValue: (data: AdminUserModel) => <CheckboxInput name={`checkbox-unassign-${data.id}`} isSwitch={false} />,
    },
    {
      title: "Username",
      getValue: (data: AdminUserModel) => data.username,
    },
    {
      title: "First Name",
      getValue: (data: AdminUserModel) => data.firstName,
    },
    {
      title: "Last Name",
      getValue: (data: AdminUserModel) => data.lastName,
    },
  ]

  const headerUnassigned = [
    {
      title: <CheckboxInput name="checkbox-main-assign" isSwitch={false} />,
      getValue: (data: AdminUserModel) => <CheckboxInput name={`checkbox-assign-${data.id}`} isSwitch={false} />,
    },
    {
      title: "Username",
      getValue: (data: AdminUserModel) => data.username,
    },
    {
      title: "First Name",
      getValue: (data: AdminUserModel) => data.firstName,
    },
    {
      title: "Last Name",
      getValue: (data: AdminUserModel) => data.lastName,
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
        <h3 className="thruTitle ml-2">Permission Users</h3>
        <div className="ml-2 mr-2 d-flex align-items-center thruSubtitle-breadcrumb-separator" />
        <div className="thruSubtitle d-flex align-items-center">manage permission user assignment</div>
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
                  label="Select a permission to manage"
                  name={inputs.PERMISSION_OPTION}
                  required
                  valueAsNumber
                  defaultValue={permId}
                >
                  <option value={-1}>Select Permission</option>
                  {permissions?.map((item: any) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    )
                  })}
                </SelectInputLabel>
              </div>
              <div className="border-top" />
              <div className="form-group mb-4 mt-2">
                <TextInputLabel
                  label="Name"
                  name={inputs.NAME}
                  maxLength={128}
                  readOnly
                  defaultValue={selectedPermission?.name}
                />
              </div>
              <div className="form-group mb-4">
                <TextInputLabel
                  label="Description"
                  name={inputs.DESCRIPTION}
                  maxLength={200}
                  readOnly
                  defaultValue={selectedPermission?.description}
                />
              </div>
            </div>
          </ThruFormProvider>
        </div>
        <div className="col">
          <div className="thruCardContainer">
            <h4 className="ml-3 my-3">Assign Permission Users</h4>
            <div className="p-5 border-top">
              <div className="row">
                <div className="col ml-3 px-0 manageUGP-Container-L">
                  <div className="mb-4 px-0 manageUGP-L">
                    <h4 className="pb-3 pl-3 pt-3">Available Users</h4>
                  </div>
                  <div className="p-4">
                    <SearchableTable
                      header={headerUnassigned}
                      getSearchableContent={(data: AdminUserModel) => [data.firstName, data.lastName, data.username]}
                      getRowId={(data: AdminUserModel) => data.id}
                      data={stagingUnassigned}
                      createButton={addButton}
                      onFormSubmit={(data) =>
                        handleUserAdd(data, assignForm, "checkbox-main-assign", "checkbox-assign-")
                      }
                      mainCheckbox="checkbox-main-assign"
                      customForm={assignForm}
                      refresh={refetchUnassigned}
                      isFetching={isFetchingUnassigned}
                      idPrefix="unassigned"
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
                    <h4 className="pb-3 pl-3 pt-3">Assigned Permission Users</h4>
                  </div>
                  <div className="p-4">
                    <SearchableTable
                      header={header}
                      getSearchableContent={(data: AdminUserModel) => [data.firstName, data.lastName, data.username]}
                      getRowId={(data: AdminUserModel) => data.id}
                      data={stagingAssigned}
                      createButton={removeButton}
                      refresh={refetchAssigned}
                      onFormSubmit={(data) =>
                        handleUserRemove(data, unassignForm, "checkbox-main-unassign", "checkbox-unassign-")
                      }
                      mainCheckbox="checkbox-main-unassign"
                      customForm={unassignForm}
                      isFetching={isFetchingAssigned}
                      idPrefix="assigned"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="Thru-portlet-footer border-top">
              <ThruFormProvider customForm={saveForm} onSubmit={onSubmit} loading={loading}>
                <div className="row">
                  <div className="col d-flex">
                    <div className="mr-3">
                      <button type="submit" id="btnSavePermissionUsers" className="btn btn-Save btn-thru-lg">
                        Save
                      </button>
                    </div>
                    <div className="mr-3">
                      <button
                        id="btnResetPermissionUsers"
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

export default AdminPermissionUser
