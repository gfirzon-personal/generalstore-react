import { CURRENT_USER } from "./constants"
import axios, { AxiosResponse } from "axios"
//import { apiUrl } from "./config"

//let apiUrl = 'https://localhost:44353/api/authentication'
let apiUrl = 'https://localhost:5001/api/authentication'

function client<T>(
  endpoint: any,
  { body, method, ...customConfig }: any = {},
  cache = false,
  vanilla = false
): {
  client: () => Promise<AxiosResponse<T>>
  key?: { url: string; params: any; method: string }
} {
  const url = `${apiUrl}${endpoint}`

  const config: any = {
    params: { ...customConfig },
  }

  const t = window.localStorage.getItem(CURRENT_USER)
  if (t) {
    const tt = atob(t)
    const o = JSON.parse(tt)

    config.headers = { Authorization: `Bearer ${o.token}` }
  }

  if (method === "PUT") {
    return { client: () => axios.put<T>(url, body, config), key: undefined }
  } 
  else if (method === "DELETE") {
    return { client: () => axios.delete<T>(url, config), key: undefined }
  } 
  else if (method === "POST" || body) {
    return { client: () => axios.post<T>(url, body, config), key: undefined }
  } 
  else {
    return {
      client: () => axios.get<T>(url, config),
      key: { url: url, params: config.params, method: "get" },
    }
  }
}

export default client
