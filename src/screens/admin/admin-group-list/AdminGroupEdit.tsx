import React from "react"
import { useForm } from "react-hook-form"
import PropertyContainer from "../../../components/screen-container/PropertyContainer"
import SkeletonFormControl from "../../../components/skeleton-form-control/SkeletonFormControl"
import { createAdminGroup, getAdminGroup, updateAdminGroup } from "../../../utils/AdminClient"
import CancelButton from "../../../components/cancel-button/CancelButton"
import DeleteButton from "../../../components/delete-button/DeleteButton"
import { toast } from "react-toastify"
import { useLoader } from "../../../contexts/LoaderContext"
import { AdminGroupModel } from "../../../types/AdminGroupModel"
import { showToast } from "../../../utils/ErrorUtils"
import { useDataCache } from "../../../contexts/DataCacheContext"
import { useHistory } from "react-router"
import { useQuery, useQueryClient } from "react-query"
import { useGroupDelete } from "../useDeleteGroup"

const inputs = {
  NAME: "name",
  DESCRIPTION: "description",
}

interface IAdminGroupEdit {
  groupId: number
}

const AdminGroupEdit: React.FC<IAdminGroupEdit> = ({ groupId }: IAdminGroupEdit) => {
  const { register, formState, handleSubmit, errors } = useForm()

  const deleteAdminGroup = useGroupDelete()
  const baseUrl = `/admin/groups`

  const { data: adminGroupData, isLoading } = useQuery(["admin-group", groupId], () => getAdminGroup(groupId), {
    enabled: groupId > 0,
  })
  const queryClient = useQueryClient()

  const { dispatch } = useDataCache()

  const loading = !adminGroupData && groupId > 0
  const history = useHistory()

  const { setLoading } = useLoader()

  const onSubmit = async (data: any) => {
    const user: AdminGroupModel = {
      id: groupId === -1 ? 0 : groupId,
      name: data[inputs.NAME],
      description: data[inputs.DESCRIPTION],
    }

    const func = groupId > 0 ? updateAdminGroup : createAdminGroup

    setLoading(true)
    func(user)
      .client()
      .then((res: any) => {
        if (res.status === 200) {
          toast.success(groupId > 0 ? "Group updated." : "Group created.")

          const newGroupId = res.data.group.id

          queryClient.setQueryData(["admin-group", newGroupId], (old: any) => {
            return { ...res, data: res.data.group, name: res.data.group.name }
          })
          queryClient.invalidateQueries(["admin-groups"])

          history.push(`/admin/groups`)
        } else {
          throw new Error(`Failed to update group ${res.status}`)
        }
      })
      .catch((e: any) => {
        showToast("Failed to update group.", e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <PropertyContainer title="Group" description="add or edit group settings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row Thru-Edit-Continer">
          <div className="col-lg-12">
            <div className="form-group mb-4">
              <label>
                Name <i className="Thru-required">*</i>
              </label>
              <SkeletonFormControl loading={loading}>
                <input
                  id={inputs.NAME}
                  name={inputs.NAME}
                  ref={register({ required: true })}
                  type="text"
                  className={`form-control${errors[inputs.NAME] ? " validationError" : ""}`}
                  defaultValue={adminGroupData?.name}
                  maxLength={128}
                  placeholder="enter group name"
                  data-toggle="tooltip"
                />
              </SkeletonFormControl>
            </div>
            <div className="form-group mb-4">
              <label>
                Description <i className="Thru-required">*</i>
              </label>
              <SkeletonFormControl loading={loading}>
                <textarea
                  id="desciption"
                  defaultValue={adminGroupData?.description}
                  className="form-control"
                  name="description"
                  rows={4}
                  placeholder="enter group description"
                  data-toggle="tooltip"
                  ref={register()}
                />
              </SkeletonFormControl>
            </div>
          </div>
        </div>
        <div className="Thru-portlet-footer border-top">
          <div className="row">
            <div className="col d-flex">
              <div className="mr-3">
                <button id="btnSaveAdminGroup" className="btn btn-Save btn-thru-lg">
                  Save
                </button>
              </div>
              <CancelButton isDirty={formState.isDirty} to="/admin/groups" />
              <DeleteButton
                id="btnDeleteGroup"
                hidden={groupId <= 0}
                doDelete={() =>
                  deleteAdminGroup({
                    id: groupId,
                    name: adminGroupData?.name ?? "unknown",
                    onSuccess: () => history.push(baseUrl),
                  })
                }
                to={baseUrl}
                successMessage={`Deleted setting ${groupId}`}
                entityTypeName="Admin Setting"
              />
            </div>
          </div>
        </div>
      </form>
    </PropertyContainer>
  )
}

export default AdminGroupEdit
