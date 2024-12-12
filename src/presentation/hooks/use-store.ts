import { useEffect, useState } from "react"

export const useStore = <T, F>(
    store: (callback: (state: T) => unknown) => unknown,
    callback: (state: T) => F
) => {
    const result = store(callback) as F
    const [data, setData] = useState<F>()

    useEffect(() => {
        setData(result)
    }, [result])

    return data
}

export const useHydration = () => {
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        setHydrated(true)
    }, [])

    return hydrated
}
