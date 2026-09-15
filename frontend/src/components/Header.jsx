import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from '../pages/Login'

function Header() {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const payload = token.split('.')[1]
    const json = JSON.parse(atob(payload))
    const {id, name, email, cpf, isAdmin} = json
    async function handleLogout() {
        localStorage.clear()

        navigate('/login')
    }
  return (
    <div>
        <Link to="/home">Home</Link>
        <button className='cursor-pointer' onClick={handleLogout}>Sair</button>
        {isAdmin === true && (
            <Link to="/admin">Admin</Link>
        )}

        <Link to="/profile">Meu perfil</Link>
    </div>
  )
}

export default Header