import React, { ReactNode, useContext, useReducer } from 'react'

import { productActionTypes } from '../actions/actionTypes'
import { productsReducer, initialState } from '../reducers/products-reducer'
import { getProducts } from '../utils/ProductsClient'

interface IProductsContext {
  state: any
  getAllProducts: () => void
}

const contextNotInitialized = () => console.log("Product Context not initialized")

const defaultValues: IProductsContext = {
  state: null,
  getAllProducts: contextNotInitialized,
}

const ProductsContext = React.createContext(defaultValues)

interface IProductsProvider {
  children: ReactNode
}

const ProductsProvider: React.FC<IProductsProvider> = ({
  children,
}: IProductsProvider) => {

  const [state, dispatch] = useReducer(productsReducer, initialState)

  async function getAllProducts() {
    let productsResponse

    dispatch({ type: productActionTypes.PRODUCTS_LOADING })

    try {
      productsResponse = await getProducts()
      
      dispatch({
        type: productActionTypes.RECEIVE_PRODUCTS,
        payload: { productsResponse }
      })

    } catch (e) {
      productsResponse = e
      dispatch({
        type: productActionTypes.PRODUCTS_ERROR,
        payload: productsResponse
      })      
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        state,
        getAllProducts        
      }}>
      {children}
    </ProductsContext.Provider>
  )
}

function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error('useParts must be used within a ProductsProvider')
  }
  return context
}

export { ProductsProvider, useProducts }