import { Navigate } from 'react-router-dom'
import { getToken, isAdmin } from '../utils/token'

function AdminRoute({children}) {
    if(!getToken()) {
        return <Navigate to="/login" replace />
    }

    if(!isAdmin()) {
        return <Navigate to="/home" replace />
    }

    return children
}

export default AdminRoute
