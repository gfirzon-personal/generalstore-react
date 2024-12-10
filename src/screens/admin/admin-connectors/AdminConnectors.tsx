import React from "react"
import { useForm } from "react-hook-form"
import CancelButton from "../../../components/cancel-button/CancelButton"
import useAdminSecondaryNav from "../admin-routes/useAdminSecondaryNav"

const inputs = {
    MULE_SOFT: "muleSoft",
    BOOMI: "boomi",
    IN_HOUSE: "onHouse"
}

const AdminConnectors: React.FC<IAdminConnectors> = () => {
    useAdminSecondaryNav()

    const { register, handleSubmit, formState } = useForm()

    const onSubmit = async (data: any) => {
        console.log({ submitData: data })
    }

    return (
        <div className="container mt-4">
            <div className="d-flex mb-4" style={{ marginLeft: 20 }}>
                <h3 className="thruTitle">Connector Settings</h3>
                <span className="ml-2 mr-2 pt-3 thruSubtitle-breadcrumb-separator" />
                <span className="thruSubtitle pt-2">manage connector settings</span>
            </div>
            <div className="thruCardContainer">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="Thru-Edit-Continer">
                        <div className="col">
                            <div className="mt-3">
                                <h4 className="mt-3 mb-3">Connectors</h4>
                                <div className="row ml-3">
                                    <div className="col-12 form-group mb-4">
                                        <div className="row d-flex justify-content-between ml-1">
                                            <div className="col p-0 mb-3 ml-3">
                                                <label>MuleSoft</label>
                                                <div className="custom-control custom-switch">
                                                    <input id={inputs.MULE_SOFT} name={inputs.MULE_SOFT} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                                    <label className="custom-control-label " htmlFor="mulesoftConnect">
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col p-0 mb-3 ml-3">
                                                <label>Boomi</label>
                                                <div className="custom-control custom-switch">
                                                    <input id={inputs.BOOMI} name={inputs.BOOMI} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                                    <label className="custom-control-label " htmlFor="boomiConnect">
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col p-0 mb-3 ml-3">
                                                <label>In House</label>
                                                <div className="custom-control custom-switch">
                                                    <input id={inputs.IN_HOUSE} name={inputs.IN_HOUSE} ref={register()} type="checkbox" className="custom-control-input" defaultValue="true" data-toggle="tooltip" />
                                                    <label className="custom-control-label " htmlFor="inHouseConnect">
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

interface IAdminConnectors {

}

export default AdminConnectors
