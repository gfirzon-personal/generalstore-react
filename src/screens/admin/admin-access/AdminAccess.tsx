import React from "react"
import { useForm } from "react-hook-form"
import CancelButton from "../../../components/cancel-button/CancelButton"
import useAdminSecondaryNav from "../admin-routes/useAdminSecondaryNav"

const inputs = {
    LOCK_TRANSPORT_KEYS: "lockTransportKeys",
    AUTO_PASSWORD_EXPIRATION: "autoPasswordExpiration",
    EXPIRATION_DAYS: "expirationDays",
    AUTO_LOGIN_LOCKOUT: "automaticLoginLockout",
    MAX_LOGIN_ATTEMPTS: "maxLoginAttempts",
    LOCKOUT_DURATION_SECONDS: "lockoutDurationSeconds",
    MIN_PASSWORD_LENGTH: "minimumPasswordLength",
    SPECIAL_CHARACTER_REQUIRED: "specialCharacterRequired",
    ONE_LETTER_REQUIRED: "oneLetterRequired",
    ONE_NUMBER_REQUIRED: "oneNumberRequired",
    ONE_UPPERCASE_REQUIRED: "oneUppercaseRequired",
    ONE_LOWERCASE_REQUIRED: "oneLowercaseRequired"
}

const AdminAccess: React.FC<IAdminAccess> = () => {
    useAdminSecondaryNav()

    const { register, handleSubmit, formState } = useForm()

    const onSubmit = async (data: any) => {
        console.log({ submitData: data })
    }

    return (
        <div className="container mt-4">
            <div className="d-flex mb-4" style={{ marginLeft: 20 }}>
                <h3 className="thruTitle">Access Settings</h3>
                <span className="ml-2 mr-2 pt-3 thruSubtitle-breadcrumb-separator" />
                <span className="thruSubtitle pt-2">manage access settings</span>
            </div>
            <div className="thruCardContainer">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="Thru-Edit-Continer">
                        <div className="col">
                            <div className="border-bottom">
                                <h4 className="mb-3">Lock Transport Keys</h4>
                                <div className="row ml-5">
                                    <div className="col mb-3 pl-0">
                                        <div className="col mb-4 pl-0">
                                            <label>Area API Key</label>
                                            <button className="transportClients ml-4">Set a New Secret Key</button>
                                        </div>
                                        <label>Lock Transport Keys</label>
                                        <div className="custom-control custom-switch">
                                            <input id={inputs.LOCK_TRANSPORT_KEYS} name={inputs.LOCK_TRANSPORT_KEYS} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                            <label className="custom-control-label" htmlFor="adminLockTransKeys">
                                            </label>
                                        </div>
                                        <small>Block members from changing transport access keys</small>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <h4 className="mb-4">Password Policy</h4>
                                <h5 className="mb-3 ml-3">Password Expiration</h5>
                                <div className="row mb-3 ml-5">
                                    <div className="col-5 p-0">
                                        <label>Enable automatic password expiration</label>
                                        <div className="custom-control custom-switch">
                                            <input id={inputs.AUTO_PASSWORD_EXPIRATION} name={inputs.AUTO_PASSWORD_EXPIRATION} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                            <label className="custom-control-label " htmlFor="passwordExpiration">
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-2 p-0">
                                        <label>Expiration Days</label>
                                        <input id={inputs.EXPIRATION_DAYS} name={inputs.EXPIRATION_DAYS} ref={register({ valueAsNumber: true })} type="number" className="form-control" maxLength={128} data-toggle="tooltip" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <h5 className="mt-5 mb-3 ml-3">Login Lockout</h5>
                                <div className="row ml-3">
                                    <div className="col-12 form-group">
                                        <div className="col-5 p-0 mb-3 ml-3">
                                            <label>Enable automatic login lockout</label>
                                            <div className="custom-control custom-switch">
                                                <input id={inputs.AUTO_LOGIN_LOCKOUT} name={inputs.AUTO_LOGIN_LOCKOUT} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                                <label className="custom-control-label " htmlFor="loginLockout">
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group d-flex justify-content-between">
                                            <div className="col">
                                                <label>Max login attempts</label>
                                                <input id={inputs.MAX_LOGIN_ATTEMPTS} name={inputs.MAX_LOGIN_ATTEMPTS} ref={register({ valueAsNumber: true })} type="number" className="form-control" maxLength={128} data-toggle="tooltip" />
                                            </div>
                                            <div className="col">
                                                <label>Lockout duration seconds</label>
                                                <input id={inputs.LOCKOUT_DURATION_SECONDS} name={inputs.LOCKOUT_DURATION_SECONDS} ref={register({ valueAsNumber: true })} type="number" className="form-control" maxLength={128} data-toggle="tooltip" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <h5 className="mt-3 mb-3 ml-3">Password Format</h5>
                                <div className="row ml-3">
                                    <div className="col-12 form-group mb-4">
                                        <div className="form-group mb-5 d-flex justify-content-between">
                                            <div className="col-5">
                                                <label>Minimum password length (not less than 6)</label>
                                                <input id={inputs.MIN_PASSWORD_LENGTH} name={inputs.MIN_PASSWORD_LENGTH} ref={register({ valueAsNumber: true })} type="number" className="form-control" maxLength={128} data-toggle="tooltip" />
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-between ml-1">
                                            <div className="col p-0 mb-3 ml-3">
                                                <label>At least one special character required</label>
                                                <div className="custom-control custom-switch">
                                                    <input id={inputs.SPECIAL_CHARACTER_REQUIRED} name={inputs.SPECIAL_CHARACTER_REQUIRED} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                                    <label className="custom-control-label " htmlFor="specialChar">
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col p-0 mb-3 ml-3">
                                                <label>At least one letter required</label>
                                                <div className="custom-control custom-switch">
                                                    <input id={inputs.ONE_LETTER_REQUIRED} name={inputs.ONE_LETTER_REQUIRED} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                                    <label className="custom-control-label " htmlFor="oneLetterReq">
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col p-0 mb-3 ml-3">
                                                <label>At least one number required</label>
                                                <div className="custom-control custom-switch">
                                                    <input id={inputs.ONE_NUMBER_REQUIRED} name={inputs.ONE_NUMBER_REQUIRED} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                                    <label className="custom-control-label " htmlFor="oneNumReq">
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row ml-1">
                                            <div className="col-4 p-0 mb-3 ml-3">
                                                <label>At least one uppercase letter required</label>
                                                <div className="custom-control custom-switch">
                                                    <input id={inputs.ONE_UPPERCASE_REQUIRED} name={inputs.ONE_UPPERCASE_REQUIRED} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                                    <label className="custom-control-label " htmlFor="oneUpperCaseReq">
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col p-0 mb-3 ">
                                                <label>At least one lowercase letter required</label>
                                                <div className="custom-control custom-switch">
                                                    <input id={inputs.ONE_LOWERCASE_REQUIRED} name={inputs.ONE_LOWERCASE_REQUIRED} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                                    <label className="custom-control-label " htmlFor="oneLowerCaseReq">
                                                    </label>
                                                </div>
                                            </div>
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

interface IAdminAccess {

}

export default AdminAccess
