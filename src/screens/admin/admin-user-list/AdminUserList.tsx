import React from "react"
import { Link, useHistory } from "react-router-dom"
import ListContainer from "../../../components/screen-container/ListContainer"
import SearchableTable, { compareDates, formatDate } from "../../../components/searchable-table/SearchableTable"

import { getAdminUserList } from "../../../utils/AdminClient"
import { AdminUserModel } from "../../../types/AdminUserModel"
import EditIcon from "../../../components/icons/EditIcon"
import TrashIcon from "../../../components/icons/TrashIcon"
import { useQuery } from "react-query"
import { useLoader } from "../../../contexts/LoaderContext"
import { useAdminUserDelete } from "../useAdminUserDelete"

const AdminUserList: React.FC<IAdminUserList> = () => {
  const baseUrl = "/admin"
  const { data: usersData, refetch, isFetching, error } = useQuery(["admin-user-list"], () => getAdminUserList(0))

  const { setLoading } = useLoader()
  const history = useHistory()
  const deleteAdminUser = useAdminUserDelete()

  const actions = (data: AdminUserModel) => [
    {
      title: "Edit",
      icon: <EditIcon />,
      onClick: (data: AdminUserModel) => {
        history.push(`${baseUrl}/users/${data.id}`)
      },
    },
    {
      title: "User Groups",
      icon: <em className="fad fa-users">&nbsp;</em>,
      onClick: (data: AdminUserModel) => {
        history.push(`/admin/${data.id}/user-groups`)
      },
    },
    {
      title: "User Permissions",
      icon: <em className="fad fa-shield">&nbsp;</em>,
      onClick: (data: AdminUserModel) => {
        history.push(`${baseUrl}/${data.id}/user-permissions`)
      },
    },
    {
      title: "Sessions",
      icon: <em className="fad fa-laptop">&nbsp;</em>,
      onClick: (data: AdminUserModel) => {
        history.push(`${baseUrl}/user-sessions/${data.id}`)
      },
    },
    {
      title: "Delete User",
      icon: <TrashIcon />,
      confirm: {
        entityTypeName: "User",
        entityName: data.username,
      },
      onClick: (data: AdminUserModel) => {
        deleteAdminUser({ userId: data.id, customerId: 0 })
        //refetch()
      },
    },
  ]

  const header = [
    {
      title: "Last Name",
      getValue: (data: AdminUserModel) => data.lastName,
      to: (data: AdminUserModel) => `${baseUrl}/users/${data.id}`,
    },
    { title: "First Name", getValue: (data: AdminUserModel) => data.firstName },
    { title: "Username", getValue: (data: AdminUserModel) => data.username },
    {
      title: "Enabled",
      getValue: (data: AdminUserModel) => (data.isEnabled ? "Yes" : "No"),
    },
    {
      title: "Active",
      getValue: (data: AdminUserModel) => (data.isActive ? "Yes" : "No"),
    },
    { title: "Created", getValue: (data: AdminUserModel) => formatDate(data.created), compare: compareDates },
  ]

  const createButton = (
    <Link to={`${baseUrl}/users/-1`}>
      <button
        id="btnAddCustUser"
        className="btn btn-label-thru mr-3"
        title="Select this customer for this user session"
      >
        <i className="fas fa-plus mr-2 pl-0" data-toggle="tooltip" data-placement="top" />
        ADD USER
      </button>
    </Link>
  )

  return (
    <ListContainer title="Users" description="listing of users" error={error}>
      <SearchableTable
        getSearchableContent={(data: AdminUserModel) => [data.firstName, data.lastName, data.username]}
        getRowId={(data: AdminUserModel) => data.id}
        refresh={refetch}
        isFetching={isFetching}
        header={header}
        createButton={createButton}
        data={usersData}
        actions={actions}
      />
    </ListContainer>
  )
}

interface IAdminUserList {}

export default AdminUserList
