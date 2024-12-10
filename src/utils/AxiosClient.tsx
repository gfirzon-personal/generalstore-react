import { CURRENT_USER } from "./constants"
import { apiUrl } from "./config"
import axios from "axios"

async function client<T>(endpoint: any, { body, method, ...customConfig }: any = {}) {
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
    const res = await axios.put<T>(url, body, config)

    return res.data
  } else if (method === "DELETE") {
    return (await axios.delete<T>(url, config)).data
  } else if (method === "POST" || body) {
    return (await axios.post<T>(url, body, config)).data
  } else {
    const res = await axios.get<T>(url, config)

    return res.data
  }
}

export default client
