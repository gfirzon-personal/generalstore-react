import React, { useState, useEffect } from "react"
import { useProducts } from "../../contexts/products-context"
import ProductsDisplayer from "../../components/ProductsDisplayer"
import Loader from "../../components/Loader"

export default function ProductList() {
    const {
        state: { loading = false },
        getAllProducts,
    } = useProducts()

    useEffect(() => {
        getAllProducts()
    }, []);

    return (
        <div className={"PageStyle"}>
            <div className="container">
                { !loading ? <ProductsDisplayer /> : <Loader />}
            </div>
        </div>
    )
}