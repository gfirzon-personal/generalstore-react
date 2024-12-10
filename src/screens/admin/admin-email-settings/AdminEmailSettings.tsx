import React from "react"
import { useForm } from "react-hook-form"
import CancelButton from "../../../components/cancel-button/CancelButton"
import useAdminSecondaryNav from "../admin-routes/useAdminSecondaryNav"

const inputs = {
    EXPIRATION_DAYS: "expirationDays",
    INVITER_NAME: "inviterName"
}

const AdminEmailSettings: React.FC<IAdminEmailSettings> = () => {
    useAdminSecondaryNav()

    const { register, handleSubmit, formState } = useForm()

    const onSubmit = async (data: any) => {
        console.log({ submitData: data })
    }

    return (
        <div className="container mt-4">
            <div className="d-flex mb-4" style={{ marginLeft: 20 }}>
                <h3 className="thruTitle">Email Settings</h3>
                <span className="ml-2 mr-2 pt-3 thruSubtitle-breadcrumb-separator" />
                <span className="thruSubtitle pt-2">manage email settings</span>
            </div>
            <div className="thruCardContainer">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="Thru-Edit-Continer">
                        <div className="col">
                            <div className="mt-3">
                                <h4 className="mt-3 mb-3">User Invitation</h4>
                                <div className="row">
                                    <div className="col-12 form-group">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-2 p-0 ml-3">
                                                <label>Expiration Days</label>
                                                <input id={inputs.EXPIRATION_DAYS} name={inputs.EXPIRATION_DAYS} ref={register({ valueAsNumber: true })} type="number" className="form-control" maxLength={128} data-toggle="tooltip" />
                                            </div>
                                            <div className="col-8 p-0 ml-3">
                                                <label>Inviter name</label>
                                                <input id={inputs.INVITER_NAME} name={inputs.INVITER_NAME} ref={register()} type="text" className="form-control" maxLength={128} data-toggle="tooltip" />
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

interface IAdminEmailSettings {

}

export default AdminEmailSettings
