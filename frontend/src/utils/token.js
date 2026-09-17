export function getToken() {
    return localStorage.getItem('token')
}

export function getUser() {
    const token = getToken()
    if (!token) return null

    try {
        const payload = token.split('.')[1]
        const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))

        return JSON.parse(json)
    } catch {
        return null
    }
}

export function isAdmin() {
    return getUser()?.isAdmin === true
}

export function logout() {
    localStorage.removeItem('token')
}
