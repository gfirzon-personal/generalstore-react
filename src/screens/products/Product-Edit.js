import React, { useState, useEffect } from "react"
import ProductForm from '../../components/ProductForm'
import { getProduct } from '../../utils/ProductsClient'

export default function ProductEdit({productId}) {
    let [product, setProduct] = useState(null)

    useEffect( async () => {
        let mounted = true

        let data = await getProduct(productId)
        setProduct(data)
        return () => mounted = false
    }, []);

    return (
        product ? <ProductForm defaultValues={product} /> : <div>Loading</div>
    )
}