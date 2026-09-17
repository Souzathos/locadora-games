import { useState } from 'react'
import Header from '../components/Header'
import AdminGames from '../components/admin/AdminGames'
import AdminRentals from '../components/admin/AdminRentals'

const TABS = [
    { key: 'games', label: 'Jogos' },
    { key: 'rentals', label: 'Aluguéis' }
]

function Admin() {
    const [tab, setTab] = useState('games')

  return (
    <div className='min-h-screen bg-rose-50/50'>
        <Header />

        <main className='mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8'>
            <div>
                <h1 className='text-2xl font-bold text-slate-800'>Painel administrativo</h1>
                <p className='text-sm text-slate-500'>
                    Gerencie o catálogo de jogos e acompanhe os aluguéis da locadora.
                </p>
            </div>

            <div className='flex gap-1 border-b border-rose-200'>
                {TABS.map((option) => (
                    <button
                        key={option.key}
                        type='button'
                        role='tab'
                        aria-selected={tab === option.key}
                        onClick={() => setTab(option.key)}
                        className={`-mb-px cursor-pointer border-b-2 px-4 py-2.5 text-sm font-semibold transition ${tab === option.key ? 'border-rose-500 text-rose-600' : 'border-transparent text-slate-500 hover:text-rose-600'}`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {tab === 'games' ? <AdminGames /> : <AdminRentals />}
        </main>
    </div>
  )
}

export default Admin
