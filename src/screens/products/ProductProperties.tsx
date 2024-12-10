import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router"
import CancelButton from "../../components/cancel-button/CancelButton"
import DeleteButton from "../../components/delete-button/DeleteButton"
import CheckboxInputLabel from "../../components/form/CheckboxInputLabel"
import TextInputLabel from "../../components/form/TextInputLabel"
import PropertyContainer from "../../components/screen-container/PropertyContainer"
import { ThruFormProvider } from "../../contexts/ThruFormContext"
import { useProductPropertiesData } from "./useOrgPropertiesData"

interface IProductProperties {
    productId: number
}

const ProductProperties: React.FC<IProductProperties> = ({ productId }: IProductProperties) => {
    const form = useForm()

    const { properties, submitData, loading, deleteProduct, inputs, error } = useProductPropertiesData(productId)

    const history = useHistory()

    console.log('properties:', properties);
    
    return (
        <PropertyContainer title="Product" description="add or edit product properties" error={error}>
            <ThruFormProvider loading={loading} customForm={form} onSubmit={submitData}>
                <div className="row Thru-Edit-Continer">
                    <div className="col-lg-12">
                        <div className="form-group mb-5 d-flex justify-content-between">
                            <div className="col-2 p-0">
                                <CheckboxInputLabel
                                    label="Enable"
                                    name={inputs.ENABLED}
                                    defaultChecked={properties ? properties?.enabled : false}
                                    //defaultChecked={true}
                                />
                            </div>
                            <div className="col-2 p-0">
                                <TextInputLabel label="Code" name={''} defaultValue={''} readOnly />
                            </div>
                        </div>
                        <div className="form-group">
                            <TextInputLabel
                                label="Product Name"
                                name={inputs.NAME}
                                defaultValue={properties?.productName}
                                required
                                maxLength={128}
                                placeholder="Enter product name"
                            />
                        </div>
                        <div className="form-group">
                            <TextInputLabel
                                label="Description"
                                name={inputs.DESCRIPTION}
                                defaultValue={properties?.description}
                                placeholder="Product description"
                                textArea
                            />
                        </div>
                        <div className="form-group">
                            <TextInputLabel
                                label="Price"
                                name={inputs.PRICE}
                                defaultValue={properties?.price != null 
                                    ? properties?.price.toString() : '' }
                                placeholder="Product price"
                                textArea
                            />
                        </div>                        
                    </div>
                </div>
                <div className="Thru-portlet-footer border-top">
                    <div className="row">
                        <div className="col d-flex">
                            <button id="btnSaveOrg" className="btn btn-Save btn-thru-lg">
                                Save
                            </button>
                            <CancelButton isDirty={form.formState.isDirty} to="/products" />
                            <DeleteButton
                                doDelete={async () => {
                                    /*
                                    await deleteProduct({
                                        id: productId,
                                        name: properties?.name ?? "unknown",
                                        onSuccess: () => history.push(`/products`),
                                    })
                                    */
                                    history.push(`/products`)
                                }}
                                hidden={productId <= 0}
                                to="/products"
                                successMessage={`Deleted product ${properties?.productName}`}
                                entityTypeName="Product"
                            />
                            <div className="mt-auto mb-auto"></div>
                        </div>
                    </div>
                </div>
            </ThruFormProvider>
        </PropertyContainer>
    )
}

export default ProductProperties
