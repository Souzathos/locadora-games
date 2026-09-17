import { useState } from 'react'
import { login } from '../services/AuthService'
import { Link, useNavigate } from 'react-router-dom'
import { useFlash } from '../hooks/useFlash'
import Button from '../components/Button'
import Input from '../components/Input'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { error, setError } = useFlash()

    async function handleLogin(e) {
        e.preventDefault()
        setLoading(true)
        try {
            const data = await login(email, password)
            localStorage.setItem('token', data.token)

            navigate('/home')
        } catch(e) {
            setError(e.message || 'Erro ao fazer login')
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex min-h-screen items-center justify-center bg-rose-50/60 p-4'>
        <div className='w-full max-w-sm'>
            <div className='mb-6 text-center'>
                <h1 className='text-2xl font-bold text-rose-600'>
                    cuiudo <span className='text-slate-800'>play games</span>
                </h1>
                <p className='mt-1 text-sm text-slate-500'>Alugue seus jogos favoritos.</p>
            </div>

            <div className='flex flex-col gap-4 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm'>
                <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                    <Input
                        label='E-mail'
                        type='email'
                        placeholder='voce@email.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label='Senha'
                        type='password'
                        placeholder='••••••••'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className='text-sm text-red-500'>{error}</p>}

                    <Button type='submit' className='w-full' loading={loading}>Entrar</Button>
                </form>

                <p className='text-center text-sm text-slate-500'>
                    Não possui uma conta?{' '}
                    <Link to='/register' className='font-semibold text-rose-600 hover:underline'>
                        Crie já!
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login
