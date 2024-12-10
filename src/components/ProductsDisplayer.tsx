import { log } from "node:console"
import React from "react"
import { Link } from "react-router-dom"
import { useProducts } from "../contexts/products-context"
import ProductsTable from "./ProductsTable"

const baseUrl = "/products"

export default function ProductsDisplayer() {
    const { state: { products, loading, error = {} } } = useProducts()

    if (error) {
        return <div>Request error!!!</div>
    }

    if (!products || products.length == 0) {
        return <div>No Data!!!</div>
    }

    return (
        <>
            <Link to={`${baseUrl}/-1`}>
                <button id="createNewOrg" className="btn btn-label-thru mr-3" title="Select this customer for this user session">
                    <i className="fas fa-plus mr-2 pl-0" data-toggle="tooltip" data-placement="top" />
                    ADD PRODUCT
                </button>
            </Link>
            <ProductsTable products={products} />
        </>
    )
}