import { useEffect, useState } from 'react'
import api from '../api'

export function useCmsList(path, fallback = []) {
    const [items, setItems] = useState(fallback)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let alive = true

        setLoading(true)
        setError(null)

        api
            .get(path)
            .then((response) => {
                if (!alive) return

                const data = response.data

                setItems(
                    Array.isArray(data)
                        ? data
                        : data?.items || []
                )
            })
            .catch((error) => {
                if (!alive) return

                console.error(`CMS API error: ${path}`, error)
                setError(error)
            })
            .finally(() => {
                if (alive) {
                    setLoading(false)
                }
            })

        return () => {
            alive = false
        }
    }, [path])

    return {
        items,
        loading,
        error,
    }
}