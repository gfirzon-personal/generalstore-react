import { useCallback, useEffect, useState, useReducer } from "react"

import useIsMounted from "./useIsMounted"
import { useDataCache } from "../contexts/DataCacheContext"
import { cachingEnabled } from "./config"
import { constructError, showToast } from "./ErrorUtils"

const initialState = { hasRun: false }

function useDataReducer(state = initialState, { type, key, data }: any) {
  if (type === "run") {
    return { hasRun: true }
  }
}

function useData<T>(
  endpoint: any,
  {
    requestOnMount = true,
    requestCache = false,
    onCall = (data: any) => {
      console.log("Not implemented")
    },
  }
) {
  const isMounted = useIsMounted()
  const { dispatch: orgDispatch, getCacheData, getCacheInfo, cacheNeeded } = useDataCache()
  const shouldCache = requestCache && orgDispatch && cachingEnabled
  const [state, setState] = useState<T | undefined>(shouldCache ? getCacheData(endpoint().key)?.data ?? null : null)
  const [error, setError] = useState<any>(null)
  const [reducerState, dispatch] = useReducer(useDataReducer, initialState)
  const [loading, setLoading] = useState(false)

  const makeRequest = useCallback(async () => {
    const { client, key } = endpoint()

    const fetchData = async () => {
      try {
        if (shouldCache) {
          orgDispatch({ type: "BEGIN_CACHE", key: key })
        }
        setLoading(true)
        const res = await client()

        if (!(res.status === 200 || res.status === 204)) {
          // TODO: Consumers of the useData custom hook will have no idea
          // when the call has failed... We need to add more state
          // to describe when the call is pending, has failed or
          // has returned valid data.
          console.log({ throwing: res })
          throw new Error(`Unable to load data ${res.status}`)
        }

        if (shouldCache) {
          orgDispatch({ type: "STORE_CACHE", key: key, data: res })
          return res
        } else {
          setState(res.data)
          return res
        }
      } catch (e) {
        const error = constructError(e)
        console.log({ e: e })
        showToast("HTTP Request Failed", e)
        setError(error)
        return error
      } finally {
        setLoading(false)
      }
    }

    if (!shouldCache) {
      const response = await fetchData()
      onCall(response)
      return response
    }

    if (cacheNeeded(key) && orgDispatch) {
      return await fetchData()
    }
  }, [orgDispatch, shouldCache, cacheNeeded, endpoint])

  const refresh = useCallback(
    async ({ silent } = { silent: false }) => {
      const { key } = endpoint()

      if (!silent) {
        setState(undefined)
      }
      if (orgDispatch) {
        orgDispatch({ type: "INVALIDATE", key: key })
      }
      await makeRequest()
    },
    [endpoint, orgDispatch, makeRequest]
  )

  useEffect(() => {
    const cachedObj = getCacheInfo(endpoint().key)

    if (cachedObj) {
      if (cachedObj.invalid) {
        makeRequest()
        return
      }
      if (cachedObj.loading) {
        return
      }

      setState(cachedObj.data.data)
    }
  }, [endpoint, getCacheInfo, getCacheData, isMounted, makeRequest])

  useEffect(() => {
    if (requestOnMount && !reducerState?.hasRun) {
      dispatch({ type: "run" })
      makeRequest()
    }
  }, [makeRequest, requestOnMount, dispatch, reducerState?.hasRun])

  return { data: state, setState, makeRequest, refresh, error, loading }
}

export { useData }
