import React, { useCallback } from 'react'
import _ from "lodash-es"

const DataCacheContext = React.createContext()

const initialState = { cache: [] }

function cacheReducer(state = initialState, { type, key, data }) {
    if (type === "STORE_CACHE") {
        state = { ...state, cache: state.cache.filter(cacheEntry => !_.isEqual(cacheEntry.key, key)) }

        return { cache: [...state.cache, { key: key, data: data, loading: false }] }
    } else if (type === "BEGIN_CACHE") {
        state = { ...state, cache: state.cache.filter(cacheEntry => !_.isEqual(cacheEntry.key, key)) }

        return { ...state, cache: [...state.cache, { key: key, data: null, loading: true }] }
    } else if (type === "INVALIDATE") {
        state = { ...state, cache: state.cache.filter(cacheEntry => !_.isEqual(cacheEntry.key, key)) }

        return { ...state, cache: [...state.cache, { key: key, data: null, loading: false, invalid: true }] }
    }
}

function DataCacheProvider({ children }) {
    const [data, dispatch] = React.useReducer(cacheReducer, initialState)

    return (
        <DataCacheContext.Provider value={{
            data,
            dispatch
        }}>
            {children}
        </DataCacheContext.Provider>
    )
}

function useDataCache() {
    const context = React.useContext(DataCacheContext)

    const getCacheInfo = useCallback((key) => {
        let cacheInfo = context?.data.cache.find(data => _.isEqual(data.key, key))

        return cacheInfo
    }, [context?.data.cache])

    const cacheNeeded = useCallback((key) => {
        let cacheObj = getCacheInfo(key)

        return (!cacheObj || (cacheObj?.invalid ?? false))
    }, [getCacheInfo])

    const getCacheData = useCallback((key) => {
        let cacheObj = getCacheInfo(key)

        if (!cacheObj || cacheObj.invalid || cacheObj.loading) return

        return cacheObj.data
    }, [getCacheInfo])

    return { ...context, getCacheInfo, cacheNeeded, getCacheData }
}

export { DataCacheProvider, useDataCache }
