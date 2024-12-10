import React from "react"
import { useForm } from "react-hook-form"
import CancelButton from "../../../components/cancel-button/CancelButton"
import useAdminSecondaryNav from "../admin-routes/useAdminSecondaryNav"

interface IAdminRetentionEdit {
  retentionId: number
  baseUrl?: string
}

const AdminRetentionEdit: React.FC<IAdminRetentionEdit> = ({
  retentionId,
  baseUrl = "/admin/retention",
}: IAdminRetentionEdit) => {
  useAdminSecondaryNav()

  const { formState } = useForm()

  return (
    <div className="container mt-4">
      <div className="d-flex mb-4" style={{ marginLeft: 20 }}>
        <div className="d-flex">
          <h3 className="thruTitle">Default Retention Policy</h3>
          <span className="mx-2 align-self-center thruSubtitle-breadcrumb-separator" />
          <span className="thruSubtitle align-self-center">
            create the default retention
          </span>
        </div>
        <div className="ml-auto mr-4">
          <button className="btn btn-Save-medLG btn-thru-lg">
            Reset To Keep Files In Place
          </button>
        </div>
      </div>
      <div className="thruCardContainer">
        <div className="thruCardHead">
          <div className="thru-portlet__body retention-instruct">
            <div className="p-4">
              <div className="thruep-editor-ghost-menu mb-5">
                <div className="d-flex flex-column mt-3 mb-4 mr-3">
                  <div className="schedulTitle text-center">
                    What is the preferred endpoint schedule frequency?
                  </div>
                  <div className="schedulTitle-small text-center mt-2">
                    Specify how often the endpoint should be automated to run
                    and begin the process of transferring files.
                  </div>
                </div>
                <ul
                  className="nav nav-pills d-flex justify-content-center thruep-editor-ghost-menu"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item text-center" role="presentation">
                    <a
                      className="nav-link active"
                      id="completedFiles-tab"
                      data-toggle="pill"
                      href="#completedFiles"
                      role="tab"
                      aria-controls="completedFiles"
                      aria-selected="true"
                    >
                      <i className="fad fa-archive fa-2x" />
                      <br />
                      Archive Completed Files
                    </a>
                  </li>
                  <li className="nav-item text-center" role="presentation">
                    <a
                      className="nav-link"
                      id="keepinPlace-tab"
                      data-toggle="pill"
                      href="#keepinPlace"
                      role="tab"
                      aria-controls="keepinPlace"
                      aria-selected="false"
                    >
                      <i className="fad fa-copy fa-2x" />
                      <br />
                      Keep Files in Place
                    </a>
                  </li>
                  <li className="nav-item text-center" role="presentation">
                    <a
                      className="nav-link"
                      id="purgeCompletedFiles-tab"
                      data-toggle="pill"
                      href="#purgeCompletedFiles"
                      role="tab"
                      aria-controls="purgeCompletedFiles"
                      aria-selected="false"
                    >
                      <i className="fad fa-trash-alt fa-2x" />
                      <br />
                      Purge Completed Files
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active thruep-editor"
                  id="completedFiles"
                  role="tabpanel"
                  aria-labelledby="completedFiles-tab"
                >
                  <div className="col border">
                    <div className="continuouslyTitle mt-3 mb-3">
                      Select archive delay schedule
                    </div>
                    <div className="row col-12 mb-3 d-flex justify-content-center">
                      <div className="pl-0 align-self-center mr-3">
                        Select the archive delay, max 5 years. Months are
                        approximated to 30 days.
                      </div>
                      <div className="col">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect4"
                        >
                          <option>Immediate</option>
                          <option>Days</option>
                          <option>Weeks</option>
                          <option>Months</option>
                          <option>Years</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col border mt-5">
                    <div className="continuouslyTitle mt-3 mb-3">
                      Choose archive endpoints
                    </div>
                    <div className="row col-12 mb-3 d-flex justify-content-center">
                      <div className="pl-0 align-self-center mr-3">
                        Archival endpoints can be S3, FTPS or SFTP. To add or
                        manage archival endpoints click on the button.
                      </div>
                      <div className="col">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect4"
                        >
                          <option>Select archival endpoint...</option>
                          <option>Select archival endpoint...</option>
                          <option>Select archival endpoint...</option>
                          <option>Select archival endpoint...</option>
                          <option>Select archival endpoint...</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col border mt-5">
                    <div className="continuouslyTitle mt-3 mb-3">
                      Choose archive folder
                    </div>
                    <div className="row col-12 mb-3 d-flex justify-content-center">
                      <div className="pl-0 align-self-center mr-3">
                        Enter the name of the folder where files will be
                        archived.
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter archive folder name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade thruep-editor"
                  id="keepinPlace"
                  role="tabpanel"
                  aria-labelledby="keepinPlace-tab"
                >
                  <div className="col border">
                    <div className="continuouslyTitle mt-3 mb-3">
                      Keep all files
                    </div>
                    <div className="row col-12 mb-3">
                      <div className="pl-0 align-self-center mr-3">
                        No action is needed, all completed files will be
                        retained indefinitely.
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade thruep-editor"
                  id="purgeCompletedFiles"
                  role="tabpanel"
                  aria-labelledby="purgeCompletedFiles-tab"
                >
                  <div className="col border">
                    <div className="continuouslyTitle mt-3 mb-3">
                      Purge Schedule
                    </div>
                    <div className="row col-12 mb-3 d-flex justify-content-center">
                      <div className="pl-0 align-self-center mr-3">
                        Select the timeframe to delete completed files.
                      </div>
                      <div className="col">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect5"
                        >
                          <option>Immediate</option>
                          <option>Days</option>
                          <option>Weeks</option>
                          <option>Months</option>
                          <option>Years</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="Thru-portlet-footer border-top mt-5"
              style={{ width: "100%" }}
            >
              <div className="row">
                <div className="col d-flex">
                  <div className="mr-3">
                    <button className="btn btn-Save btn-thru-lg">Save</button>
                  </div>
                  <CancelButton isDirty={formState.isDirty} to={baseUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminRetentionEdit
