import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"
import ListContainer from "../../../components/screen-container/ListContainer"
import SearchableTable, { compareDates, formatDate } from "../../../components/searchable-table/SearchableTable"

import { useData } from "../../../utils/useData"
import { getAdminPermissionList } from "../../../utils/AdminClient"
import { AdminPermissionModel } from "../../../types/AdminPermissionModel"

const AdminPermissionList: React.FC<IAdminPermissionList> = () => {
  const baseUrl = "/admin/permissions"
  const endpoint = useCallback(() => getAdminPermissionList(), [])
  const { data: permissions, refresh }: any = useData(endpoint, {})

  const history = useHistory()
  const actions = [
    {
      title: "Permission Groups",
      icon: <em className="fad fa-users">&nbsp;</em>,
      onClick: (data: AdminPermissionModel) => {
        history.push(`${baseUrl}/${data.id}/permission-groups`)
      },
    },
    {
      title: "Permission Users",
      icon: <em className="fad fa-user">&nbsp;</em>,
      onClick: (data: AdminPermissionModel) => {
        history.push(`${baseUrl}/${data.id}/permission-users`)
      },
    },
  ]

  const header = [
    {
      title: "Name",
      getValue: (data: AdminPermissionModel) => data.name,
    },
    {
      title: "Desciption",
      getValue: (data: AdminPermissionModel) => data.description,
    },
    {
      title: "Created",
      getValue: (data: AdminPermissionModel) => formatDate(data.created),
      compare: compareDates,
    },
  ]

  return (
    <ListContainer title="Permissions" description="listing of permissions">
      <SearchableTable
        getSearchableContent={(data: AdminPermissionModel) => [data.name, data.description]}
        getRowId={(data: any) => data.id}
        refresh={refresh}
        header={header}
        data={permissions}
        actions={actions}
      />
    </ListContainer>
  )
}

interface IAdminPermissionList {}

export default AdminPermissionList
