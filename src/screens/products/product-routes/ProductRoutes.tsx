import React from "react"
import { Route, Switch } from "react-router-dom"

import ProductList from "../ProductList"
import ProductEdit from "../Product-Edit"
import ProductProperties from "../ProductProperties"

const ProductRoutes = () => {
  return (
    <Switch>
      <Route
        path="/products/:id"
        render={(routerProps) => <ProductProperties productId={+routerProps.match.params.id} />}
      ></Route>
      <Route path="/products" render={(routerProps) => <ProductList />} />
    </Switch>
  )
}

export default ProductRoutes
