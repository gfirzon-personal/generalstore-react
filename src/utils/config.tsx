const getApiUrl = () => {
  //return (window as any)["runConfig"].apiUrl
  return 'https://localhost:44353/api'
}

console.log(`API URL: ${getApiUrl()}`)

export const cachingEnabled = true
export const apiUrl = getApiUrl()
