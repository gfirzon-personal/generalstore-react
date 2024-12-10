import React from "react"
import { Link } from "react-router-dom"
import useAdminSecondaryNav from "../admin-routes/useAdminSecondaryNav"

const baseUrl = "/admin/retention"

const AdminRetention: React.FC<IAdminRetention> = () => {
    useAdminSecondaryNav()

    return (
        <div className="container mt-4">
            <div className="d-flex mb-4" style={{ marginLeft: 20 }}>
                <div className="d-flex">
                    <h3 className="thruTitle">Default Retention Policy</h3>
                    <span className="mx-2 align-self-center thruSubtitle-breadcrumb-separator" />
                    <span className="thruSubtitle align-self-center">create the default retention</span>
                </div>
                <div className="ml-auto mr-4">
                    <button className="btn btn-Save-medLG btn-thru-lg">Reset To Keep Files In Place</button>
                </div>
            </div>
            <div className="thruCardContainer">
                <div className="thruCardHead">
                    <div className="thru-portlet__body retention-instruct">
                        <div className="row">
                            <div className="col-12">
                                <input type="hidden" data-toggle="tooltip" defaultValue={5} />
                                <div className="training-view text-left blue-grey lighten-5 my-3">
                                    <div className="training-view__panel">
                                        <h4 className="card-title mb-4 font-weight-normal">The default retention policy is to <b><u>keep files in place</u></b>.</h4>
                                        <Link to={`${baseUrl}/-1`}>
                                            <button className="btn btn-label-thru btn-bold btn-font-sm retention-create pr-3">
                                                <i className="fad fa-project-diagram mx-2" />
                                                CREATE FLOW RETENTION POLICY
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="training-view__panel">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-xl-12 pb-2">
                                                <div className="thru-list">
                                                    <div className="thru-list__item">
                                                        <span className="thru-list__icon"><i className="fad fa-file-image thru-font-success" /></span>
                                                        <span className="thru-list__text">Retention is a core component of the pipeline, allowing users to clear processed files either by purging or archiving them after a specified period.</span>
                                                    </div>
                                                    <div className="thru-list__item">
                                                        <span className="thru-list__icon"><i className="fad fa-chart-line thru-font-warning" /></span>
                                                        <span className="thru-list__text">For archival, the system works with ‘Archival Endpoints’ similar to the way delivery is done for target organizations.</span>
                                                    </div>
                                                    <div className="thru-list__item">
                                                        <span className="thru-list__icon"><i className="fad fa-clipboard-user thru-font-info" /></span>
                                                        <span className="thru-list__text">Retention policies can be applied at the Site level, or at the Flow Level.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface IAdminRetention {

}

export default AdminRetention
