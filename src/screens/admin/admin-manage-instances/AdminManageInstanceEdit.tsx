import React from "react"
import { useForm } from "react-hook-form"
import CancelButton from "../../../components/cancel-button/CancelButton"
import DeleteButton from "../../../components/delete-button/DeleteButton"
import useAdminSecondaryNav from "../admin-routes/useAdminSecondaryNav"

const baseUrl = "/admin/manage-instances"

const inputs = {
  ENABLED: "enabled",
  INSTANCE_NAME: "instanceName",
  CODE: "code",
  TYPE: "type",
  STATUS: "status",
}

const AdminManageInstanceEdit: React.FC<IAdminManageInstanceEdit> = () => {
  useAdminSecondaryNav()

  const { register, handleSubmit, formState, errors } = useForm()

  const onSubmit = async (data: any) => {
    console.log({ submitData: data })
  }

  return (
    <div className="container mt-4">
      <div className="d-flex mb-4" style={{ marginLeft: 20 }}>
        <h3 className="thruTitle">Instances</h3>
        <span className="ml-2 mr-2 pt-3 thruSubtitle-breadcrumb-separator" />
        <span className="thruSubtitle pt-2">create a new or select an existing instance</span>
      </div>
      <div className="thruCardContainer ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row Thru-Edit-Continer">
            <div className="col-lg-12">
              <div className="form-group mb-5">
                <div className="col-2 p-0">
                  <label>Enable</label>
                  <div className="custom-control custom-switch">
                    <input
                      id={inputs.ENABLED}
                      name={inputs.ENABLED}
                      ref={register()}
                      type="checkbox"
                      className="custom-control-input"
                      defaultValue="true"
                      data-toggle="tooltip"
                    />
                    <label className="custom-control-label " htmlFor="instanceEnable"></label>
                  </div>
                </div>
              </div>
              <div className="form-group mb-4">
                <label>
                  Instance Name:<i className="Thru-required"> *</i>
                </label>
                <input
                  id={inputs.INSTANCE_NAME}
                  name={inputs.INSTANCE_NAME}
                  ref={register({ required: true })}
                  type="text"
                  className={`form-control${errors[inputs.INSTANCE_NAME] ? " validationError" : ""}`}
                  maxLength={128}
                  placeholder="Enter Instance name"
                  data-toggle="tooltip"
                />
              </div>
              <div className="form-group d-flex">
                <div className="col-4 p-0 pr-4">
                  <div className="form-group">
                    <label>Code</label>
                    <input
                      id={inputs.CODE}
                      name={inputs.CODE}
                      ref={register()}
                      type="text"
                      className="form-control"
                      data-toggle="tooltip"
                    />
                  </div>
                </div>
                <div className="col-4 p-0 pr-4">
                  <div className="form-group">
                    <label>Type</label>
                    <input
                      id={inputs.TYPE}
                      name={inputs.TYPE}
                      ref={register()}
                      type="text"
                      className="form-control"
                      data-toggle="tooltip"
                    />
                  </div>
                </div>
                <div className="col-4 p-0">
                  <div className="form-group">
                    <label>Status</label>
                    <input
                      id={inputs.STATUS}
                      name={inputs.STATUS}
                      ref={register()}
                      type="text"
                      className="form-control"
                      data-toggle="tooltip"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Thru-portlet-footer border-top">
            <div className="row">
              <div className="col d-flex">
                <div className="mr-3">
                  <button className="btn btn-Save btn-thru-lg">Save</button>
                </div>
                <CancelButton isDirty={formState.isDirty} to={baseUrl} />
                <DeleteButton
                  doDelete={async () => {
                    console.log("TODO")
                  }}
                  to={baseUrl}
                  successMessage="Successfully deleted instance <INSTANCE NAME HERE>"
                  entityTypeName="Instance"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

interface IAdminManageInstanceEdit {
  instanceId: number
}

export default AdminManageInstanceEdit
