import { productActionTypes } from '../actions/actionTypes'

const initialState = {
    products: undefined,
    loading: false,
    error: null,
}

function productsReducer(state = initialState, { type, payload } : any) {
    switch (type) {
        case productActionTypes.RECEIVE_PRODUCTS: {
            return {
                ...state,
                products: payload.productsResponse,
                error: null,
                loading: false
            }
        }
        case productActionTypes.PRODUCTS_LOADING: {
            return {
                ...state,
                products: undefined,
                error: null,
                loading: true
            }
        }
        case productActionTypes.PRODUCTS_ERROR: {
            return {
                ...state,
                products: undefined,
                error: payload,
                loading: false
            }
        }
        default: {
            throw new Error(`The type ${type} is not a known type...`)
        }
    }
}

export { initialState, productsReducer }