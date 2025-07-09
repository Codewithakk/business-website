import { useEffect, useState } from 'react'

export default function useFetch(fetchFn, initialValue) {
    const [data, setData] = useState(initialValue)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetchFn()
                setData(response)
            } catch (err) {
                setError(err.message || 'Failed to fetch data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [fetchFn])

    return { data, loading, error }
}