import React from 'react'

function PrivateRoute({children}) {
    const token = localStorage.getItem('token')

    if(!token)  {
        return <Navigate to="/"/>
    }

   

    return children
}

export default PrivateRoute