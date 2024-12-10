interface ProductActionTypes {
    RECEIVE_PRODUCTS: string
    PRODUCTS_LOADING: string
    PRODUCTS_ERROR: string
}

const productActionTypes: ProductActionTypes = {
    RECEIVE_PRODUCTS: 'receive-products',
    PRODUCTS_LOADING: 'products-loading',
    PRODUCTS_ERROR: 'products-error'
  }

  export {
    productActionTypes,
  }  