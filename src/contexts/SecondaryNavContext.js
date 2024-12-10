import React, { useState } from 'react'

const SecondaryNavContext = React.createContext(null)

function SecondaryNavProvider({ children }) {
    const [navComponent, setNavComponent] = useState(undefined);

    return (
        <SecondaryNavContext.Provider value={{
            navComponent,
            setNavComponent
        }}>
            {children}
        </SecondaryNavContext.Provider>
    )
}

function useSecondaryNav() {
    const context = React.useContext(SecondaryNavContext)
    if (context === undefined) {
        throw new Error('useLoader must be used within a LoaderProvider')
    }
    return context
}

export { SecondaryNavProvider, useSecondaryNav }
