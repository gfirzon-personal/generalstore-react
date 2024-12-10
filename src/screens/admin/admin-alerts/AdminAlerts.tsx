import React from "react"
import { useForm } from "react-hook-form"
import CancelButton from "../../../components/cancel-button/CancelButton"
import useAdminSecondaryNav from "../admin-routes/useAdminSecondaryNav"

const inputs = {
    DISABLE_ALL_PROCESSES: "disableAllProcesses",
    ALERT_FREQUENCY: "alertFrequency",
    SENDER_EMAIL_ADDRESS: "senderEmailAddress",
    SUBJECT: "subject",
    EMAIL_BODY: "emailBody",
    SMS_MESSAGE: "smsMessage"
}

const AdminAlerts: React.FC<IAdminAlerts> = () => {
    useAdminSecondaryNav()

    const { register, handleSubmit, formState } = useForm()

    const onSubmit = async (data: any) => {
        console.log({ submitData: data })
    }

    return (
        <div className="container mt-4">
            <div className="d-flex mb-4" style={{ marginLeft: 20 }}>
                <h3 className="thruTitle">Alert Settings</h3>
                <span className="ml-2 mr-2 pt-3 thruSubtitle-breadcrumb-separator" />
                <span className="thruSubtitle pt-2">manage alert settings</span>
            </div>
            <div className="thruCardContainer">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="Thru-Edit-Continer">
                        <div className="col">
                            <div className="border-bottom">
                                <h4 className="mb-3">General Alert Settings</h4>
                                <div className="row ml-5">
                                    <div className="col mb-3 d-flex justify-content-between">
                                        <div className="form-group">
                                            <label>Disable All Processes</label>
                                            <div className="custom-control custom-switch">
                                                <input id={inputs.DISABLE_ALL_PROCESSES} name={inputs.DISABLE_ALL_PROCESSES} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                                <label className="custom-control-label" htmlFor="adminRegistration" />
                                            </div>
                                        </div>
                                        <div className="form-group mb-4 col-4 pl-0 mr-5">
                                            <label>Alert Frequency</label>
                                            <select id={inputs.ALERT_FREQUENCY} name={inputs.ALERT_FREQUENCY} defaultValue={0} ref={register()} className="form-control " data-toggle="tooltip">
                                                <option value={0}>Never</option>
                                                <option value={15}>15 minutes</option>
                                                <option value={30}>30 minutes</option>
                                                <option value={60}>1 hour</option>
                                                <option value={120}>2 hours</option>
                                                <option value={180}>3 hours</option>
                                                <option value={240}>4 hours</option>
                                                <option value={480}>8 hours</option>
                                                <option value={720}>12 hours</option>
                                                <option value={1440}>24 hours</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom mt-3">
                                <h4 className="mb-3">Alert Customization</h4>
                                <div className="row pl-3">
                                    <div className="form-group mb-4 mx-auto">
                                        <p>Use this form to configure mail and SMS alerts. Notifications will be sent to members who subscribe to alerts.</p>
                                        <p>The following tags can be embedded in the subject and/or message fields:</p>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <ul className="list-group list-group-horizontal-lg">
                                                    <li className="list-group-item">[SiteName]</li>
                                                    <li className="list-group-item">Site URL</li>
                                                </ul>
                                                <ul className="list-group list-group-horizontal-lg">
                                                    <li className="list-group-item">[AreaName]</li>
                                                    <li className="list-group-item">Area name</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <ul className="list-group list-group-horizontal-lg">
                                                    <li className="list-group-item">[AlertCount]</li>
                                                    <li className="list-group-item">Number of pending issues</li>
                                                </ul>
                                                <ul className="list-group list-group-horizontal-lg">
                                                    <li className="list-group-item">[AlertSummary]</li>
                                                    <li className="list-group-item">Details about each alert</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <h4 className="mb-3">Mail Alerts</h4>
                                <div className="row">
                                    <div className="col-10 form-group mb-4 mx-auto">
                                        <div className="form-group ">
                                            <div className="col">
                                                <label>Sender Email Address</label>
                                                <input id={inputs.SENDER_EMAIL_ADDRESS} name={inputs.SENDER_EMAIL_ADDRESS} ref={register()} type="email" className="form-control" maxLength={128} data-toggle="tooltip" />
                                            </div>
                                            <div className="col mt-4">
                                                <label>Subject</label>
                                                <input id={inputs.SUBJECT} name={inputs.SUBJECT} ref={register()} type="text" className="form-control" maxLength={128} data-toggle="tooltip" />
                                            </div>
                                            <div className="col my-4">
                                                <label>Email Body</label>
                                                <textarea id={inputs.EMAIL_BODY} name={inputs.EMAIL_BODY} ref={register()} className="form-control " rows={4} data-toggle="tooltip" defaultValue={""} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <h4 className="mb-3">SMS Alets</h4>
                                <div className="row">
                                    <div className="col-10 form-group mb-4 mx-auto">
                                        <div className="col mb-2">
                                            <label>SMS Message</label>
                                            <textarea id={inputs.SMS_MESSAGE} name={inputs.SMS_MESSAGE} ref={register()} className="form-control " rows={4} data-toggle="tooltip" defaultValue={""} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Thru-portlet-footer border-top">
                        <div className="row">
                            <div className="col d-flex ml-3">
                                <div className="mr-3"><button className="btn btn-Save btn-thru-lg">Save</button></div>
                                <CancelButton isDirty={formState.isDirty} to="/admin" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

interface IAdminAlerts {

}

export default AdminAlerts
