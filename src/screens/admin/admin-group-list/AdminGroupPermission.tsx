import React, { useEffect, useMemo } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useHistory } from "react-router"
import { toast } from "react-toastify"
import CheckboxInput from "../../../components/form/CheckboxInput"
import SearchableTable from "../../../components/searchable-table/SearchableTable"
import { useLoader } from "../../../contexts/LoaderContext"
import { AdminGroupModel } from "../../../types/AdminGroupModel"
import { AdminAssignModel } from "../../../types/AdminAssignModel"
import {
  getAdminGroupList,
  getAdminGroupAssignedPermissionList,
  getAdminGroupUnassignedPermissionList,
  createAdminGroupPermission,
  deleteAdminGroupPermission,
} from "../../../utils/AdminClient"
import { showToast, showWarning } from "../../../utils/ErrorUtils"
import { ThruFormProvider } from "../../../contexts/ThruFormContext"
import SelectInputLabel from "../../../components/form/SelectInputLabel"
import TextInputLabel from "../../../components/form/TextInputLabel"
import { getGroupAssignedPermissionsKey, getGroupUnassignedPermissionsKey } from "../AdminConstants"
import { useQuery } from "react-query"
import useAddRemoveTable from "../../../utils/useAddRemoveTable"

interface IAdminGroupPermission {
  grpId: number
}

const inputs = {
  NAME: "name",
  DESCRIPTION: "description",
  GROUP_OPTION: "groupOption",
  UNASSIGN_SELECTED: "btn-unassign-selected",
  ASSIGN_SELECTED: "btn-assign-selected",
}

const AdminGroupPermission: React.FC<IAdminGroupPermission> = ({ grpId }: IAdminGroupPermission) => {
  const form = useForm()
  const assignForm = useForm()
  const unassignForm = useForm()
  const saveForm = useForm()

  const baseUrl = "/admin/groups"
  const { data: groups, refetch } = useQuery(["admin-groups"], () => getAdminGroupList())

  const {
    data: assignedPermissions,
    refetch: refetchAssigned,
    isFetching: isFetchingAssigned,
  } = useQuery(getGroupAssignedPermissionsKey(grpId), () => getAdminGroupAssignedPermissionList(grpId))
  const {
    data: unassignedPermissions,
    refetch: refetchUnassigned,
    isFetching: isFetchingUnassigned,
  } = useQuery(getGroupUnassignedPermissionsKey(grpId), () => getAdminGroupUnassignedPermissionList(grpId))
  const {
    toAdd,
    toRemove,
    clear,
    handleUserAdd,
    handleUserRemove,
    stagingAssigned,
    stagingUnassigned,
  } = useAddRemoveTable<AdminGroupModel>(assignedPermissions ?? [], unassignedPermissions ?? [], (item) => item.id)
  const loading = !groups && grpId > 0
  const { setLoading } = useLoader()

  const onSubmit = async (data: any) => {
    if (!assignedPermissions || !unassignedPermissions) {
      return
    }

    setLoading(true)
    Promise.allSettled([
      ...toAdd.map((e: AdminGroupModel) => {
        const assignModel: AdminAssignModel = {
          groupId: grpId,
          permissionId: e.id,
        }

        return createAdminGroupPermission(assignModel).client()
      }),
      ...toRemove.map((e: AdminGroupModel) => deleteAdminGroupPermission(grpId, e.id).client()),
    ])
      .then((res) => {
        if (res.some((resItem: any) => resItem.value.status !== 200)) {
          throw new Error("Saved failed")
        }
        toast.success("Updated group permissions.")
      })
      .catch((e) => {
        showToast(e, "Failed to update group permissions.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const history = useHistory()

  const selectedGroupId: number = useWatch({
    control: form.control,
    name: inputs.GROUP_OPTION,
    defaultValue: grpId,
  })

  const selectedGroup = useMemo(() => groups?.find((u: AdminGroupModel) => u.id === +selectedGroupId), [
    selectedGroupId,
    groups,
  ])

  useEffect(() => {
    if (selectedGroup) {
      history.push(`/admin/groups/${selectedGroupId}/group-Permissions`)
      form.setValue(inputs.NAME, selectedGroup?.name)
      form.setValue(inputs.DESCRIPTION, selectedGroup?.description)
    }
  }, [selectedGroup])

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
      <button id="btn-unassign-selected" className="btn btn-label-thru mr-3" title="Remove permission from the group">
        REMOVE
      </button>
    </div>,
  ]

  const addButton = [
    <div key={1}>
      <button id="btn-assign-selected" className="btn btn-label-thru mr-3" title="Add permission to the group">
        ADD
      </button>
    </div>,
  ]

  return (
    <div className="mt-4">
      <div className="d-flex ml-3 pl-3 mb-4">
        <h3 className="thruTitle ml-2">Group Permissions</h3>
        <div className="ml-2 mr-2 d-flex align-items-center thruSubtitle-breadcrumb-separator" />
        <div className="thruSubtitle d-flex align-items-center">manage group permission assignment</div>
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
                  label="Select a group to manage"
                  name={inputs.GROUP_OPTION}
                  required
                  valueAsNumber
                  defaultValue={grpId}
                >
                  <option value={-1}>Select Group</option>
                  {groups?.map((item: any) => {
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
                  defaultValue={selectedGroup?.name}
                />
              </div>
              <div className="form-group mb-4">
                <TextInputLabel
                  label="Description"
                  name={inputs.DESCRIPTION}
                  maxLength={200}
                  readOnly
                  defaultValue={selectedGroup?.description}
                />
              </div>
            </div>
          </ThruFormProvider>
        </div>
        <div className="col">
          <div className="thruCardContainer">
            <h4 className="ml-3 my-3">Assign Group Permissions</h4>
            <div className="p-5 border-top">
              <div className="row">
                <div className="col ml-3 px-0 manageUGP-Container-L">
                  <div className="mb-4 px-0 manageUGP-L">
                    <h4 className="pb-3 pl-3 pt-3">Available Permissions</h4>
                  </div>
                  <div className="p-4">
                    <SearchableTable
                      header={headerUnassigned}
                      getSearchableContent={(data: AdminGroupModel) => [data.name]}
                      getRowId={(data: AdminGroupModel) => data.id}
                      data={stagingUnassigned}
                      createButton={addButton}
                      refresh={refetchUnassigned}
                      onFormSubmit={(data) =>
                        handleUserAdd(data, assignForm, "checkbox-main-assign", "checkbox-assign-")
                      }
                      mainCheckbox="checkbox-main-assign"
                      customForm={assignForm}
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
                    <h4 className="pb-3 pl-3 pt-3">Assigned Group Permissions</h4>
                  </div>
                  <div className="p-4">
                    <SearchableTable
                      header={header}
                      getSearchableContent={(data: AdminGroupModel) => [data.name]}
                      getRowId={(data: AdminGroupModel) => data.id}
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
                      <button type="submit" id="btnSaveGroupPermissions" className="btn btn-Save btn-thru-lg">
                        Save
                      </button>
                    </div>
                    <div className="mr-3">
                      <button
                        id="btnResetGroupPermissions"
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

export default AdminGroupPermission
