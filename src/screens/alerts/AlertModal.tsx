import React from "react"
import { Link } from "react-router-dom"
import { AlertHistoryModel } from "../../types/AlertHistoryModel"

export interface IAlertModal {
  data?: AlertHistoryModel
}

const AlertModal: React.FC<IAlertModal> = ({ data }: IAlertModal) => {
  return (
    <>
      <button
        type="button"
        id="alert-open-modal"
        hidden
        className="btn btn-viewChanges text-center"
        data-toggle="modal"
        data-target="#alertModal"
      >
        <i className="fad fa-eye" />
      </button>
      <div
        className="modal fade"
        id="alertModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="alertModalLabel"
        aria-modal="false"
        aria-hidden="true"
        style={{ display: "none", paddingRight: 17 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content flowHis-rollback">
            <div className="modal-header">
              <h5 className="modal-title" id="alertModalLabel">
                Alert ID: {data?.id}
              </h5>
              <button type="button" id="close-alert-modal-x" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-left alertHistoryTable">
              <table className="table table-bordered table-striped">
                <tbody>
                  <tr>
                    <td>Organziation:</td>
                    <td>
                      {data?.isOrganizationDeleted && data?.organizationName}
                      {!data?.isOrganizationDeleted && (
                        <Link
                          onClick={() => document.getElementById("close-alert-modal-x")?.click()}
                          to={`/organizations/${data?.organizationId}`}
                        >
                          <u>{data?.organizationName}</u>
                        </Link>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Endpoint Name:</td>
                    <td>
                      {data?.isEndpointDeleted && data?.endpointName}
                      {!data?.isEndpointDeleted && (
                        <Link
                          onClick={() => document.getElementById("close-alert-modal-x")?.click()}
                          to={`/organizations/${data?.organizationId}/endpoints/${data?.endpointId}`}
                        >
                          <u>{data?.endpointName}</u>
                        </Link>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Flow Name:</td>
                    <td>
                      {data?.isFlowDeleted && data?.flowName}
                      {!data?.isFlowDeleted && (
                        <Link
                          onClick={() => document.getElementById("close-alert-modal-x")?.click()}
                          to={`/flows/${data?.flowId}`}
                        >
                          <u>{data?.flowName}</u>
                        </Link>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Alert Type:</td>
                    <td>{data?.alertType}</td>
                  </tr>
                  <tr>
                    <td>Description:</td>
                    <td>{data?.message}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer justify-content-start">
              <button type="button" id="close-alert-modal" className="btn btn-thru btn-thru-lg" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlertModal
