import React, { useCallback, useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid';

const LoaderContext = React.createContext(null)

const initialState = []

function loaderReducer(state = initialState, { type, uuid }) {
    switch (type) {
        case "LOAD": {
            if (state.includes(uuid)) {
                return state;
            }

            return [
                ...state,
                uuid
            ]
        }
        case "UNLOAD": {
            return state.filter(currUUID => currUUID !== uuid)
        }
        default: {
            throw new Error(`The type ${type} is not a known type...`)
        }
    }
}

function LoaderProvider({ children }) {
    const [loadingComponents, dispatch] = React.useReducer(loaderReducer, initialState)
    const loading = loadingComponents.length > 0

    return (
        <LoaderContext.Provider value={{
            loading,
            dispatch
        }}>
            {children}
        </LoaderContext.Provider>
    )
}

function useLoader() {
    const context = React.useContext(LoaderContext)
    if (context === undefined) {
        throw new Error('useLoader must be used within a LoaderProvider')
    }
    const [loaderUUID] = useState(uuidv4())
    const { dispatch } = context;

    const setLoading = useCallback((value) => {
        if (value) {
            dispatch({ type: "LOAD", uuid: loaderUUID })
        } else {
            dispatch({ type: "UNLOAD", uuid: loaderUUID })
        }
    }, [dispatch, loaderUUID])

    useEffect(() => {
        return () => {
            dispatch({ type: "UNLOAD", uuid: loaderUUID })
        }
    }, [dispatch, loaderUUID])

    return { ...context, setLoading }
}

export { LoaderProvider, useLoader }
