import React, { useEffect, useState } from 'react'
import { login } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    async function handleLogin() {
        try {
            const data = await login(email, password)   
            localStorage.setItem('token', data.token)

            window.location.href = '/home'
        } catch(e) {
            setError(e.message || 'Erro ao fazer login')
        }
    }

    useEffect(() => {
        if(!error) return
        const t = setTimeout(() => setError(null), 3000)
        return () => clearTimeout(t)
    }, [error])


  return (
    <div className='min-h-screen flex items-center justify-center'>
            <div className='flex flex-col bg-rose-100 p-4 rounded-2xl w-80 gap-2'>
                <h1>Bem-vindo ao cuiudo play games! </h1>
                <input type="text" placeholder='E-mail' className='w-full p-2 border-b-2 border-gray-500'
                value={email} onChange={(e) => setEmail(e.target.value)}/>

                <input type="password" placeholder='Senha' className='w-full p-2 border-b-2 border-gray-500'
                value={password} onChange={(e) => setPassword(e.target.value)}/>

                {error && (
                    <p className='text-sm text-red-500 '>{error}</p>
                )}
                <button className='font-semibold cursor-pointer' onClick={handleLogin}>Entrar</button>
                <button onClick={() => navigate('/register')} className='cursor-pointer'>Não possui uma conta? Crie já!</button>
            </div>
    </div>
  )
}

export default Login