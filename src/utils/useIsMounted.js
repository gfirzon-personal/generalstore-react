import { useEffect, useRef } from "react"

function useIsMounted() {
    const isMounted = useRef(true)

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    return isMounted; // returning "isMounted.current" wouldn't work because we would return unmutable primitive
}

export default useIsMounted