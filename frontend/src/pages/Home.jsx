import { useEffect, useMemo, useState } from 'react'
import { listGames } from '../services/GameService'
import { rent as rentGame } from '../services/RentService'
import { useFlash } from '../hooks/useFlash'
import GameCard from '../components/GameCard'
import Header from '../components/Header'
import Input from '../components/Input'

function Home() {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [rentingId, setRentingId] = useState(null)
    const { error, success, setError, setSuccess } = useFlash()

    async function refresh() {
        setGames(await listGames())
    }

    useEffect(() => {
        let active = true

        async function load() {
            try {
                const data = await listGames()
                if (active) setGames(data)
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

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase()
        if (!term) return games

        return games.filter((game) => game.name.toLowerCase().includes(term) || game.category.toLowerCase().includes(term))
    }, [games, search])

    const available = games.filter((game) => !game.rented).length

    async function handleRent(gameId) {
        setRentingId(gameId)
        try {
            await rentGame(gameId)
            setSuccess('Jogo alugado com sucesso!')
            await refresh()
        } catch (e) {
            setError(e.message)
        } finally {
            setRentingId(null)
        }
    }

    return (
        <div className='min-h-screen bg-rose-50/50'>
            <Header />

            <main className='mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8'>
                <div className='flex flex-wrap items-end justify-between gap-3'>
                    <div>
                        <h1 className='text-2xl font-bold text-slate-800'>Catálogo</h1>
                        <p className='text-sm text-slate-500'>
                            {available} de {games.length} jogos disponíveis para aluguel.
                        </p>
                    </div>
                    <div className='w-full sm:max-w-xs'>
                        <Input placeholder='Buscar por nome ou categoria...'
                            value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                {error && (
                    <p className='rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700'>{error}</p>
                )}
                {success && (
                    <p className='rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700'>{success}</p>
                )}

                {loading ? (
                    <p className='py-8 text-center text-sm text-slate-500'>Carregando jogos...</p>
                ) : filtered.length === 0 ? (
                    <p className='rounded-2xl border border-dashed border-rose-200 bg-white/60 px-6 py-12 text-center text-sm text-slate-500'>
                        {search ? 'Nenhum jogo encontrado para essa busca.' : 'Nenhum jogo cadastrado na locadora ainda.'}
                    </p>
                ) : (
                    <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                        {filtered.map((game) => (
                            <GameCard
                                key={game.id}
                                game={game}
                                rent={handleRent}
                                loading={rentingId === game.id}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

export default Home
