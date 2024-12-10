import React from "react"
import { Link } from "react-router-dom";
import { useProducts } from "../contexts/products-context";
import Product from "../models/Product";

export default function ProductsTable({ products } : {products: Product[]} ) {
    return (
        <>
            <h2>Products Table</h2>

            <table className="table table-condensed table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>***</th>
                        <th>***</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(function (product) {
                            return (
                                <tr key={product.productId}>
                                    <td>{product.productName}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td><button data-role="product-delete" id={`${product.productId}`}>Delete</button></td>
                                    <td>
                                        <Link
                                            className="nav-link active"
                                            to={`/products/${product.productId}`}>
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </>
    )
}