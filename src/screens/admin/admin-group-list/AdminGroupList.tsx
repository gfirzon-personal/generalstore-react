import React from "react"
import { Link, useHistory } from "react-router-dom"
import ListContainer from "../../../components/screen-container/ListContainer"
import SearchableTable, { compareDates, formatDate } from "../../../components/searchable-table/SearchableTable"

import { getAdminGroupList } from "../../../utils/AdminClient"
import { AdminGroupModel } from "../../../types/AdminGroupModel"
import EditIcon from "../../../components/icons/EditIcon"
import TrashIcon from "../../../components/icons/TrashIcon"
import { useQuery } from "react-query"
import { useLoader } from "../../../contexts/LoaderContext"
import { useGroupDelete } from "../useDeleteGroup"

const AdminGroupList: React.FC<IAdminGroupList> = () => {
  const baseUrl = "/admin/groups"
  const { data: groups, refetch, isFetching, error } = useQuery(["admin-groups"], () => getAdminGroupList())

  const history = useHistory()
  const { setLoading } = useLoader()
  const deleteAdminGroup = useGroupDelete()

  const actions = (data: AdminGroupModel) => [
    {
      title: "Edit",
      icon: <EditIcon />,
      onClick: (data: AdminGroupModel) => {
        history.push(`${baseUrl}/${data.id}`)
      },
    },
    {
      title: "Users",
      icon: <em className="fad fa-users">&nbsp;</em>,
      onClick: (data: AdminGroupModel) => {
        history.push(`${baseUrl}/${data.id}/group-users`)
      },
    },
    {
      title: "Permissions",
      icon: <em className="fad fa-shield">&nbsp;</em>,
      onClick: (data: AdminGroupModel) => {
        history.push(`${baseUrl}/${data.id}/group-permissions`)
      },
    },
    {
      title: "Delete Group",
      icon: <TrashIcon />,
      confirm: {
        entityTypeName: "Group",
        entityname: data.name,
      },
      onClick: (data: AdminGroupModel) => {
        deleteAdminGroup({ id: data.id, name: data.name })
      },
    },
  ]

  const header = [
    {
      title: "Name",
      getValue: (data: AdminGroupModel) => data.name,
      to: (data: AdminGroupModel) => `${baseUrl}/${data.id}`,
    },
    {
      title: "Desciption",
      getValue: (data: AdminGroupModel) => data.description,
    },
    {
      title: "Created",
      getValue: (data: AdminGroupModel) => formatDate(data.created),
      compare: compareDates,
    },
  ]

  const createButton = (
    <Link to={`${baseUrl}/-1`}>
      <button id="btnAddGroup" className="btn btn-label-thru mr-3" title="Select this customer for this user session">
        <i className="fas fa-plus mr-2 pl-0" data-toggle="tooltip" data-placement="top" />
        ADD GROUP
      </button>
    </Link>
  )

  return (
    <ListContainer title="Groups" description="listing of groups" error={error}>
      <SearchableTable
        getSearchableContent={(data: AdminGroupModel) => [data.name, data.description]}
        getRowId={(data: any) => data.id}
        refresh={refetch}
        isFetching={isFetching}
        header={header}
        createButton={createButton}
        data={groups}
        actions={actions}
      />
    </ListContainer>
  )
}

interface IAdminGroupList {}

export default AdminGroupList
