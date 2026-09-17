import { Navigate } from 'react-router-dom'
import { getToken } from '../utils/token'

function PrivateRoute({children}) {
    if(!getToken()) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default PrivateRoute
