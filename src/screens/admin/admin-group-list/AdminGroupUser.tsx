import React, { useEffect, useMemo } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useHistory } from "react-router"
import { toast } from "react-toastify"
import CheckboxInput from "../../../components/form/CheckboxInput"
import SearchableTable from "../../../components/searchable-table/SearchableTable"
import { useLoader } from "../../../contexts/LoaderContext"
import { AdminGroupModel } from "../../../types/AdminGroupModel"
import { AdminUserModel } from "../../../types/AdminUserModel"
import { AdminAssignModel } from "../../../types/AdminAssignModel"
import {
  getAdminGroupList,
  getAdminGroupAssignedUserList,
  getAdminGroupUnassignedUserList,
  createAdminGroupUser,
  deleteAdminGroupUser,
} from "../../../utils/AdminClient"
import { showToast, showWarning } from "../../../utils/ErrorUtils"
import { ThruFormProvider } from "../../../contexts/ThruFormContext"
import SelectInputLabel from "../../../components/form/SelectInputLabel"
import TextInputLabel from "../../../components/form/TextInputLabel"
import { getGroupAssignedUsersKey, getGroupUnassignedUsersKey } from "../AdminConstants"
import { useQuery } from "react-query"
import useAddRemoveTable from "../../../utils/useAddRemoveTable"

interface IAdminGroupUser {
  grpId: number
}

const inputs = {
  NAME: "name",
  DESCRIPTION: "description",
  GROUP_OPTION: "groupOption",
  UNASSIGN_SELECTED: "btn-unassign-selected",
  ASSIGN_SELECTED: "btn-assign-selected",
}

const AdminGroupUser: React.FC<IAdminGroupUser> = ({ grpId }: IAdminGroupUser) => {
  const form = useForm()
  const assignForm = useForm({ shouldUnregister: false })
  const unassignForm = useForm({ shouldUnregister: false })
  const saveForm = useForm()

  const baseUrl = "/admin/groups"
  const { data: groups, refetch } = useQuery(["admin-groups"], () => getAdminGroupList())

  const {
    data: assignedUsers,
    refetch: refetchAssigned,
    isFetching: isFetchingAssigned,
  } = useQuery(getGroupAssignedUsersKey(grpId), () => getAdminGroupAssignedUserList(grpId))
  const {
    data: unassignedUsers,
    refetch: refetchUnassigned,
    isFetching: isFetchingUnassigned,
  } = useQuery(getGroupUnassignedUsersKey(grpId), () => getAdminGroupUnassignedUserList(grpId))
  const {
    toAdd,
    toRemove,
    clear,
    handleUserAdd,
    handleUserRemove,
    stagingAssigned,
    stagingUnassigned,
  } = useAddRemoveTable<AdminUserModel>(assignedUsers ?? [], unassignedUsers ?? [], (item) => item.id)

  const loading = !groups && grpId > 0
  const { setLoading } = useLoader()

  const onSubmit = async (data: any) => {
    if (!assignedUsers || !unassignedUsers) {
      return
    }

    setLoading(true)
    Promise.allSettled([
      ...toAdd.map((e: AdminUserModel) => {
        const assignModel: AdminAssignModel = {
          groupId: grpId,
          userId: e.id,
        }

        return createAdminGroupUser(assignModel).client()
      }),
      ...toRemove.map((e: AdminUserModel) => deleteAdminGroupUser(grpId, e.id).client()),
    ])
      .then((res) => {
        if (res.some((resItem: any) => resItem.value.status !== 200)) {
          throw new Error("Saved failed")
        }
        toast.success("Updated group users.")
      })
      .catch((e) => {
        showToast(e, "Failed to update group users.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const history = useHistory()

  const resetPage = () => {
    clear()
  }

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
      history.push(`/admin/groups/${selectedGroupId}/group-users`)
      form.setValue(inputs.NAME, selectedGroup?.name)
      form.setValue(inputs.DESCRIPTION, selectedGroup?.description)
    }
  }, [selectedGroup])

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
      <button id="btn-unassign-selected" className="btn btn-label-thru mr-3" title="Remove group from the user">
        REMOVE
      </button>
    </div>,
  ]

  const addButton = [
    <div key={1}>
      <button id="btn-assign-selected" className="btn btn-label-thru mr-3" title="Add group to the user">
        ADD
      </button>
    </div>,
  ]

  useEffect(() => {
    stagingAssigned?.forEach((user) => {
      unassignForm.register(`checkbox-unassign-${user.id}`)
    })

    return () => {
      stagingAssigned?.forEach((user) => {
        unassignForm.unregister(`checkbox-unassign-${user.id}`)
      })
    }
  }, [stagingAssigned])

  useEffect(() => {
    stagingUnassigned?.forEach((user) => {
      if (user.id === 4) {
        console.log("Register 4")
      }
      assignForm.register(`checkbox-assign-${user.id}`)
    })

    return () => {
      stagingUnassigned?.forEach((user) => {
        if (user.id === 4) {
          console.log("Unregister 4")
        }
        assignForm.unregister(`checkbox-assign-${user.id}`)
      })
    }
  }, [stagingUnassigned])

  return (
    <div className="mt-4">
      <div className="d-flex ml-3 pl-3 mb-4">
        <h3 className="thruTitle ml-2">Group Users</h3>
        <div className="ml-2 mr-2 d-flex align-items-center thruSubtitle-breadcrumb-separator" />
        <div className="thruSubtitle d-flex align-items-center">manage group user assignment</div>
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
            <h4 className="ml-3 my-3">Assign Group Users</h4>
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
                      mainCheckbox="checkbox-main-assign"
                      customForm={assignForm}
                      onFormSubmit={(data) =>
                        handleUserAdd(data, assignForm, "checkbox-main-assign", "checkbox-assign-")
                      }
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
                    <h4 className="pb-3 pl-3 pt-3">Assigned Group Users</h4>
                  </div>
                  <div className="p-4">
                    <SearchableTable
                      header={header}
                      getSearchableContent={(data: AdminUserModel) => [data.firstName, data.lastName, data.username]}
                      getRowId={(data: AdminUserModel) => data.id}
                      data={stagingAssigned}
                      createButton={removeButton}
                      refresh={refetchAssigned}
                      mainCheckbox="checkbox-main-unassign"
                      customForm={unassignForm}
                      isFetching={isFetchingAssigned}
                      onFormSubmit={(data) =>
                        handleUserRemove(data, unassignForm, "checkbox-main-unassign", "checkbox-unassign-")
                      }
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
                      <button type="submit" id="btnSaveGroupUsers" className="btn btn-Save btn-thru-lg">
                        Save
                      </button>
                    </div>
                    <div className="mr-3">
                      <button
                        id="btnResetGroupUsers"
                        type="button"
                        onClick={() => resetPage()}
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

export default AdminGroupUser
