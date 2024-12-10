import axios, { AxiosResponse } from "axios"
import { ProductModel } from "../types/ProductModel"
import { CURRENT_USER } from './constants'

//let baseUrl = 'https://localhost:44353/api/products'
let baseUrl = 'https://localhost:5001/api/products'

function setAuthHeader(config : any) {
    
    // get token infor from localstorage
    const t = window.localStorage.getItem(CURRENT_USER)
    if (t) {
        const tt = atob(t)
        const o = JSON.parse(tt)

        // create authorization header entry witn out token
        config.headers = { Authorization: `Bearer ${o.token}` }
    }
}

async function getProduct(id: number): Promise<ProductModel> {
    const config: any = {
        params: { id }
    }

    // get token infor from localstorage
    setAuthHeader(config)

    let url = `${baseUrl}/getbyid`

    try {
        let response = await axios.get(url, config)
        return response.data
    } catch (error) {
        return error
    }
}

async function getProducts(): Promise<any> {
    let url = baseUrl

    const config: any = {
    }

    // get token infor from localstorage
    setAuthHeader(config)

    try {
        let response = await axios.get(url, config)
        return response.data
    } catch (error) {
        return error
    }
}

async function updateProduct(product : any): Promise<any> {
    let url = baseUrl

    const config: any = {
    }

    setAuthHeader(config)

    try {
        let response = await axios.put(url, product, config)
        return response.data
    } catch (error) {
        return error
    }
}

async function createProduct(product : any): Promise<any> {
    let url = baseUrl

    const config: any = {
    }

    setAuthHeader(config)

    try {
        let response = await axios.post(url, product, config)
        return response.data
    } catch (error) {
        return error
    }
}

async function deleteProduct(id: number): Promise<any> {
    let url = baseUrl

    const config: any = {
    }

    setAuthHeader(config)

    try {
        let response = await axios.delete(`${url}\${id}`, config)
        return response.data
    } catch (error) {
        return error
    }
}

export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}