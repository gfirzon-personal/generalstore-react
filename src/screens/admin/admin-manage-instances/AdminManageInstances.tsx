import React from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import EditIcon from "../../../components/icons/EditIcon"
import TrashIcon from "../../../components/icons/TrashIcon"
import SearchableTable from "../../../components/searchable-table/SearchableTable"
import useAdminSecondaryNav from "../admin-routes/useAdminSecondaryNav"

const baseUrl = "/admin/manage-instances"

const AdminManageInstances: React.FC<IAdminManageInstances> = () => {
  useAdminSecondaryNav()

  const history = useHistory()
  const actions = [
    {
      title: "Edit",
      icon: <EditIcon />,
      onClick: (data: any) => {
        history.push(`${baseUrl}/${data.instanceId}`)
      },
    },
    {
      title: "Delete",
      icon: <TrashIcon />,
      onClick: (data: any) => {
        console.log("TODO DELETE NOT IMPLEMENTED")
      },
    },
  ]

  const instances = [
    {
      name: "Default Instance",
      code: "",
      type: "Default",
      status: "",
      active: true,
      id: 1,
    },
    {
      name: "Instance #2",
      code: "123456",
      type: "Default",
      status: "",
      active: false,
      id: 2,
    },
  ]

  const createButton = (
    <Link to={`${baseUrl}/-1`}>
      <button className="btn btn-label-thru mr-3" title="Select this customer for this user session">
        <i className="fas fa-plus mr-2 pl-0" data-toggle="tooltip" data-placement="top" />
        CREATE NEW INSTANCE
      </button>
    </Link>
  )

  const header = [
    { title: "Name", getValue: (data: any) => data.name, to: (data: any) => `${baseUrl}/${data.id}` },
    { title: "Code", getValue: (data: any) => data.code },
    { title: "Type", getValue: (data: any) => data.type },
    { title: "Status", getValue: (data: any) => data.status },
    { title: "Active", getValue: (data: any) => (data.active ? "Yes" : "No") },
  ]

  return (
    <div className="container mt-4">
      <div className="d-flex mb-4" style={{ marginLeft: 20 }}>
        <h3 className="thruTitle">Instances</h3>
        <span className="ml-2 mr-2 pt-3 thruSubtitle-breadcrumb-separator" />
        <span className="thruSubtitle pt-2">create a new or select an existing instance</span>
      </div>
      <div className="thruCardContainer">
        <SearchableTable
          getRowId={(data: any) => data.id}
          header={header}
          createButton={createButton}
          data={instances}
          actions={actions}
        />
      </div>
    </div>
  )
}

interface IAdminManageInstances {}

export default AdminManageInstances
