import React from "react";
import { useForm } from "react-hook-form";
import CancelButton from "../../../components/cancel-button/CancelButton";
import useAdminSecondaryNav from "../admin-routes/useAdminSecondaryNav";

const inputs = {
    AUTO_USER_APPROVAL: "autoUserApproval",
    FILE_HOLD_TIME: "fileHoldTime",
    BRANDED_SETUP: "brandedSetup",
    INSTALLER_LINK_EXPIRATION: "installerLinkExpiration",
    INTERMEDIARY_SERVER: "intermediaryServer",
    PRIVATE_KEY_PASSWORD: "privateKeyPassword",
    PRIVATE_CERTIFICATE: "privateCertificate",
    BROWSER_TAB_TEXT: "browserTabText"
}

const AdminGeneralSettings: React.FC<IAdminGeneralSettings> = () => {
    useAdminSecondaryNav()

    const { register, handleSubmit, formState } = useForm()

    const onSubmit = async (data: any) => {
        console.log({ submitData: data })
    }

    return (
        <div className="container mt-4">
            <div className="d-flex mb-4" style={{ marginLeft: 20 }}>
                <h3 className="thruTitle">Settings</h3>
                <span className="ml-2 mr-2 pt-3 thruSubtitle-breadcrumb-separator" />
                <span className="thruSubtitle pt-2">manage account settings</span>
            </div>
            <div className="thruCardContainer">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="Thru-Edit-Continer">
                        <div className="col">
                            <div className="border-bottom">
                                <h4 className="mb-3">Registration</h4>
                                <div className="row ml-5">
                                    <div className="col mb-3">
                                        <label>Allow Automatic User Registration Approvals</label>
                                        <div className="custom-control custom-switch">
                                            <input id={inputs.AUTO_USER_APPROVAL} name={inputs.AUTO_USER_APPROVAL} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                            <label className="custom-control-label" htmlFor="adminRegistration">
                                            </label>
                                        </div>
                                        <small>New user registrations must be manually approved if this option is disabled</small>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom mt-3">
                                <h4 className="mb-3">File Transfer Resume Process</h4>
                                <div className="row ml-5 pl-3">
                                    <div className="form-group mb-4">
                                        <label>Partial File Hold Time</label>
                                        <select id={inputs.FILE_HOLD_TIME} name={inputs.FILE_HOLD_TIME} ref={register()} className="form-control " data-toggle="tooltip">
                                            <option value={8} selected>8 Hours</option>
                                            <option value={12}>12 Hours</option>
                                            <option value={16}>16 Hours</option>
                                            <option value={20}>20 Hours</option>
                                            <option value={24}>24 Hours</option>
                                            <option value={36}>36 Hours</option>
                                            <option value={48}>48 Hours</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom mt-3">
                                <h4 className="mb-3">Transport Clients</h4>
                                <div className="row ml-3">
                                    <div className="col-12 form-group mb-4">
                                        <div className="col mb-4">
                                            <label>Custom Client Settings by Organization Type:</label>
                                            <button className="transportClients ml-4">Click Here</button>
                                        </div>
                                        <div className="form-group d-flex justify-content-between">
                                            <div className="col">
                                                <label>Branded Setup</label>
                                                <input id={inputs.BRANDED_SETUP} name={inputs.BRANDED_SETUP} ref={register()} type="text" className="form-control" maxLength={128} data-toggle="tooltip" />
                                            </div>
                                            <div className="col">
                                                <label>Installer Link Expiration</label>
                                                <select id={inputs.INSTALLER_LINK_EXPIRATION} name={inputs.INSTALLER_LINK_EXPIRATION} ref={register()} className="form-control " data-toggle="tooltip">
                                                    <option value={0} selected>Never expires</option>
                                                    <option value={1}>1 Hour</option>
                                                    <option value={2}>2 Hours</option>
                                                    <option value={3}>3 Hours</option>
                                                    <option value={4}>4 Hours</option>
                                                    <option value={5}>5 Hours</option>
                                                    <option value={6}>6 Hours</option>
                                                    <option value={7}>7 Hours</option>
                                                    <option value={8}>8 Hours</option>
                                                    <option value={12}>12 Hours</option>
                                                    <option value={24}>1 Day</option>
                                                    <option value={48}>2 Days</option>
                                                    <option value={72}>3 Days</option>
                                                    <option value={96}>4 Days</option>
                                                    <option value={120}>5 Days</option>
                                                    <option value={144}>6 Days</option>
                                                    <option value={168}>7 Days</option>
                                                    <option value={192}>8 Days</option>
                                                    <option value={216}>9 Days</option>
                                                    <option value={240}>10 Days</option>
                                                    <option value={264}>11 Days</option>
                                                    <option value={288}>12 Days</option>
                                                    <option value={312}>13 Days</option>
                                                    <option value={336}>14 Days</option>
                                                    <option value={360}>15 Days</option>
                                                    <option value={384}>16 Days</option>
                                                    <option value={408}>17 Days</option>
                                                    <option value={432}>18 Days</option>
                                                    <option value={456}>19 Days</option>
                                                    <option value={480}>20 Days</option>
                                                    <option value={504}>21 Days</option>
                                                    <option value={528}>22 Days</option>
                                                    <option value={552}>23 Days</option>
                                                    <option value={576}>24 Days</option>
                                                    <option value={600}>25 Days</option>
                                                    <option value={624}>26 Days</option>
                                                    <option value={648}>27 Days</option>
                                                    <option value={672}>28 Days</option>
                                                    <option value={696}>29 Days</option>
                                                    <option value={720}>30 Days</option>
                                                    <option value={744}>31 Days</option>
                                                    <option value={768}>32 Days</option>
                                                    <option value={792}>33 Days</option>
                                                    <option value={816}>34 Days</option>
                                                    <option value={840}>35 Days</option>
                                                    <option value={864}>36 Days</option>
                                                    <option value={888}>37 Days</option>
                                                    <option value={912}>38 Days</option>
                                                    <option value={936}>39 Days</option>
                                                    <option value={960}>40 Days</option>
                                                    <option value={984}>41 Days</option>
                                                    <option value={1008}>42 Days</option>
                                                    <option value={1032}>43 Days</option>
                                                    <option value={1056}>44 Days</option>
                                                    <option value={1080}>45 Days</option>
                                                    <option value={1104}>46 Days</option>
                                                    <option value={1128}>47 Days</option>
                                                    <option value={1152}>48 Days</option>
                                                    <option value={1176}>49 Days</option>
                                                    <option value={1200}>50 Days</option>
                                                    <option value={1224}>51 Days</option>
                                                    <option value={1248}>52 Days</option>
                                                    <option value={1272}>53 Days</option>
                                                    <option value={1296}>54 Days</option>
                                                    <option value={1320}>55 Days</option>
                                                    <option value={1344}>56 Days</option>
                                                    <option value={1368}>57 Days</option>
                                                    <option value={1392}>58 Days</option>
                                                    <option value={1416}>59 Days</option>
                                                    <option value={1440}>60 Days</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom mt-3">
                                <h4 className="mb-3">AS2 Settings</h4>
                                <div className="row ml-3">
                                    <div className="col-12 form-group mb-4">
                                        <div className="form-group mb-5 d-flex justify-content-between">
                                            <div className="col">
                                                <label>AS2 Intermediary Server</label>
                                                <input id={inputs.INTERMEDIARY_SERVER} name={inputs.INTERMEDIARY_SERVER} ref={register()} type="text" className="form-control" maxLength={128} data-toggle="tooltip" disabled />
                                            </div>
                                            <div className="col">
                                                <label>Private Key Password</label>
                                                <input id={inputs.PRIVATE_KEY_PASSWORD} name={inputs.PRIVATE_KEY_PASSWORD} ref={register()} type="text" className="form-control" maxLength={128} data-toggle="tooltip" />
                                            </div>
                                        </div>
                                        <div className="col mb-2">
                                            <label>Private Certificate (pfx)</label>
                                            <textarea id={inputs.PRIVATE_CERTIFICATE} name={inputs.PRIVATE_CERTIFICATE} ref={register()} className="form-control " rows={4} data-toggle="tooltip" defaultValue={""} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <h4 className="mb-3">Page Customization</h4>
                                <div className="row ml-5 pl-3">
                                    <div className="form-group d-flex justify-content-between">
                                        <div className="form-group mb-2">
                                            <label className=" required ">Browser Tab Text</label>
                                            <input id={inputs.BROWSER_TAB_TEXT} name={inputs.BROWSER_TAB_TEXT} ref={register()} type="text" className="form-control" maxLength={128} data-toggle="tooltip" />
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

interface IAdminGeneralSettings {

}

export default AdminGeneralSettings
