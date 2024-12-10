import React, { useState, useEffect } from "react"
import axios, { AxiosResponse } from "axios"
import { useForm } from "react-hook-form"
import { saveProduct } from '../utils/ProductsClient'

export default function ProductForm({ defaultValues }) {

    let id = defaultValues.productId
    
    const { register, handleSubmit, watch, errors } = useForm({

        defaultValues: defaultValues
    })

    const onSubmit = data => {
        //todo: use saveProduct in productclient to save products
        //data.productId = id
        //console.log('data in onSubmit:', data)
        saveProduct({...data, productId: id})
    }

    //<h2>Product Edit {params.id}</h2>
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="productname">Product name:</label>
                <input type="text" className="form-control" placeholder="enter product name"
                    name="productName" ref={register} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input type="text" className="form-control" placeholder="enter description"
                    name="description" ref={register} />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input type="text" className="form-control" placeholder="enter price"
                    name="price" ref={register} />
            </div>

            <input value="Save" type="submit" />
        </form>
    )
}