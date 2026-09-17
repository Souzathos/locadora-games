import { logout } from '../utils/token'

const API_URL = import.meta.env.VITE_API_URL

function parseMessage(message) {
    if (Array.isArray(message)) {
        return message.map((issue) => issue.message).join(', ')
    }

    if (typeof message === 'string') return message

    return 'Erro inesperado'
}

export async function api(path, options = {}) {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && {Authorization: `Bearer ${token}`}),
            ...options.headers
        }
    })

    const isJson = res.headers.get('content-type')?.includes('application/json')
    const data = res.status === 204 || !isJson ? null : await res.json()

    if(!res.ok) {
        if (res.status === 401) {
            logout()
            window.location.href = '/login'
        }

        throw new Error(parseMessage(data?.message))
    }

    return data
}
