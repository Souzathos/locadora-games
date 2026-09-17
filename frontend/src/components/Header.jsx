import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../utils/token'
import Badge from './Badge'
import Button from './Button'

function linkClass({isActive}) {
    return `rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
        isActive
            ? 'bg-rose-100 text-rose-700'
            : 'text-slate-600 hover:bg-rose-50 hover:text-rose-700'
    }`
}

function Header() {
    const navigate = useNavigate()
    const user = getUser()

    function handleLogout() {
        logout()
        navigate('/login')
    }

  return (
    <header className='sticky top-0 z-40 border-b border-rose-100 bg-white/90 backdrop-blur'>
        <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3'>
            <Link to='/home' className='text-lg font-bold text-rose-600'>
                cuiudo <span className='text-slate-800'>play games</span>
            </Link>

            <nav className='flex items-center gap-1'>
                <NavLink to='/home' className={linkClass}>Home</NavLink>
                <NavLink to='/profile' className={linkClass}>Meu perfil</NavLink>
                {user?.isAdmin === true && (
                    <NavLink to='/admin' className={linkClass}>Admin</NavLink>
                )}
            </nav>

            <div className='flex items-center gap-3'>
                {user && (
                    <div className='hidden flex-col items-end leading-tight sm:flex'>
                        <span className='text-sm font-semibold text-slate-800'>{user.name}</span>
                        {user.isAdmin === true ? (
                            <Badge tone='rose'>Admin</Badge>
                        ) : (
                            <span className='text-xs text-slate-500'>{user.email}</span>
                        )}
                    </div>
                )}
                <Button variant='secondary' size='sm' onClick={handleLogout}>Sair</Button>
            </div>
        </div>
    </header>
  )
}

export default Header
