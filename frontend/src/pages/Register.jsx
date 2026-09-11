import React, { useEffect, useState } from 'react'
import { register } from '../services/UserService'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpf, setCpf] = useState('')
    const [error, setError] = useState(null)
    const [sucess, setSucess] = useState(null)

    async function handleRegister() {
        try {
            const data = await register(name, email, password, cpf)
            setSucess('Usuário criado com sucesso!')
        } catch(e) {
            setError(e.message || 'Erro ao criar usuário')
        }
    }

    useEffect(() => {
        if(!error) return
        const t = setTimeout(() => setError(null), 3000)
        return () => clearTimeout(t)
    }, [error])

    useEffect(() => {
        if(!sucess) return
        const t = setTimeout(() => setSucess(null), 3000)
        return () => clearTimeout(t)
    }, [sucess])
  return (
    <div className='min-h-screen bg-white/80 p-4 flex items-center justify-center'>

        <div className='bg-rose-50 p-4 rounded-xl shadow flex flex-col gap-2='>
            <h1>Cadastre-se!</h1>
            <input type="text" placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} className='w-full border-gray-500 border-b p-2'/>
            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border-gray-500 border-b p-2'/>
            <input type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border-gray-500 border-b p-2'/>
            <input type="text" placeholder='CPF' value={cpf} onChange={(e) => setCpf(e.target.value)} className='w-full border-gray-500 border-b p-2'/>

            {error && (
                <p className='text-xs text-center text-red-500'>{error}</p>
            )}
            {sucess && (
                <p className='text-xs text-center text-green-500'>{sucess}</p>
            )}
            <button onClick={handleRegister} className='font-semibold cursor-pointer'>Cadastrar</button>
            <button onClick={() => navigate('/')}>Já possui uma conta?</button>

        </div>

    </div>
  )
}

export default Register