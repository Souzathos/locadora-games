import { useEffect, useState } from 'react'

export function useFlash(timeout = 3000) {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        if (!error) return
        const t = setTimeout(() => setError(null), timeout)
        return () => clearTimeout(t)
    }, [error, timeout])

    useEffect(() => {
        if (!success) return
        const t = setTimeout(() => setSuccess(null), timeout)
        return () => clearTimeout(t)
    }, [success, timeout])

    return { error, success, setError, setSuccess }
}
