import { useEffect, useState } from 'react'
import { showUserRentals } from '../services/UserService'
import { returnGame } from '../services/RentService'
import { getUser } from '../utils/token'
import { isLate } from '../utils/format'
import { useFlash } from '../hooks/useFlash'
import Header from '../components/Header'
import UserGamesCard from '../components/UserGamesCard'

function Profile() {
    const user = getUser()
    const [rentals, setRentals] = useState([])
    const [loading, setLoading] = useState(true)
    const [returningId, setReturningId] = useState(null)
    const { error, success, setError, setSuccess } = useFlash()

    async function refresh() {
        setRentals(await showUserRentals(user.id))
    }

    useEffect(() => {
        let active = true
        const current = getUser()

        async function load() {
            if (!current) {
                if (active) {
                    setError('Você precisa estar logado.')
                    setLoading(false)
                }
                return
            }

            try {
                const data = await showUserRentals(current.id)
                if (active) setRentals(data)
            } catch (e) {
                if (active) setError(e.message)
            } finally {
                if (active) setLoading(false)
            }
        }

        load()
        return () => {
            active = false
        }
    }, [setError])

    async function handleReturn(gameId) {
        setReturningId(gameId)
        try {
            const data = await returnGame(gameId)
            setSuccess(data?.isLate ? 'Jogo devolvido com atraso.' : 'Jogo retornado com sucesso.')
            await refresh()
        } catch (e) {
            setError(e.message)
        } finally {
            setReturningId(null)
        }
    }

    const active = rentals.filter((rental) => !rental.returnedAt)
    const late = active.filter(isLate)

    return (
        <div className='min-h-screen bg-rose-50/50'>
            <Header />

            <main className='mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8'>
                <div className='flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm'>
                    <div>
                        <h1 className='text-2xl font-bold text-slate-800'>{user?.name}</h1>
                        <p className='text-sm text-slate-500'>{user?.email}</p>
                        {user?.cpf && <p className='text-xs text-slate-400'>CPF {user.cpf}</p>}
                    </div>

                    <div className='flex gap-6 text-center'>
                        <div>
                            <p className='text-xl font-bold text-slate-800'>{rentals.length}</p>
                            <p className='text-xs text-slate-500'>Aluguéis</p>
                        </div>
                        <div>
                            <p className='text-xl font-bold text-amber-600'>{active.length}</p>
                            <p className='text-xs text-slate-500'>Em andamento</p>
                        </div>
                        <div>
                            <p className='text-xl font-bold text-red-600'>{late.length}</p>
                            <p className='text-xs text-slate-500'>Atrasados</p>
                        </div>
                    </div>
                </div>

                {error && (
                    <p className='rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700'>{error}</p>
                )}
                {success && (
                    <p className='rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700'>{success}</p>
                )}

                <div>
                    <h2 className='mb-4 text-lg font-semibold text-slate-800'>Meus aluguéis</h2>

                    {loading ? (
                        <p className='py-8 text-center text-sm text-slate-500'>Carregando aluguéis...</p>
                    ) : rentals.length === 0 ? (
                        <p className='rounded-2xl border border-dashed border-rose-200 bg-white/60 px-6 py-12 text-center text-sm text-slate-500'>
                            Você ainda não alugou nenhum jogo. Volte para o catálogo e escolha o primeiro.
                        </p>
                    ) : (
                        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                            {rentals.map((rental) => (
                                <UserGamesCard
                                    key={rental.id}
                                    game={{...rental.game, rented: !rental.returnedAt}}
                                    rental={rental}
                                    returnGame={handleReturn}
                                    loading={returningId === rental.game?.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Profile
