import { useState } from 'react'
import { register } from '../services/UserService'
import { Link, useNavigate } from 'react-router-dom'
import { useFlash } from '../hooks/useFlash'
import Button from '../components/Button'
import Input from '../components/Input'

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpf, setCpf] = useState('')
    const [loading, setLoading] = useState(false)
    const { error, success, setError, setSuccess } = useFlash()

    async function handleRegister(e) {
        e.preventDefault()
        setLoading(true)
        try {
            await register(name, email, password, cpf)
            setSuccess('Usuário criado com sucesso! Redirecionando para o login...')
            setTimeout(() => navigate('/login'), 1500)
        } catch(e) {
            setError(e.message || 'Erro ao criar usuário')
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex min-h-screen items-center justify-center bg-rose-50/60 p-4'>
        <div className='w-full max-w-sm'>
            <div className='mb-6 text-center'>
                <h1 className='text-2xl font-bold text-slate-800'>Cadastre-se!</h1>
                <p className='mt-1 text-sm text-slate-500'>
                    Crie sua conta para começar a alugar jogos.
                </p>
            </div>

            <div className='flex flex-col gap-4 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm'>
                <form className='flex flex-col gap-4' onSubmit={handleRegister}>
                    <Input label='Nome' placeholder='Seu nome completo'
                        value={name} onChange={(e) => setName(e.target.value)} />
                    <Input label='E-mail' type='email' placeholder='voce@email.com'
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input label='Senha' type='password' placeholder='••••••••'
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input label='CPF' placeholder='000.000.000-00'
                        value={cpf} onChange={(e) => setCpf(e.target.value)} />

                    {error && <p className='text-sm text-red-500'>{error}</p>}
                    {success && <p className='text-sm text-emerald-600'>{success}</p>}

                    <Button type='submit' className='w-full' loading={loading}>Cadastrar</Button>
                </form>

                <p className='text-center text-sm text-slate-500'>
                    Já possui uma conta?{' '}
                    <Link to='/login' className='font-semibold text-rose-600 hover:underline'>
                        Entrar
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Register
