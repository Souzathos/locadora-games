import React, { useEffect, useState } from 'react'
import { listGames } from '../services/GameService'
import { rent as rentGame } from '../services/RentService'
import GameCard from '../components/GameCard'
import Header from '../components/Header'

function Home() {
    const [games, setGames] = useState([])
    const [error, setError] = useState(null)
    const [sucess, setSucess] = useState(null)
    const [rentingId, setRentingId] = useState(null)

    async function list() {
        try {
            const data = await listGames()

            setGames(data)
        } catch (e) {
            setError(e.message)
        }
    }

    async function handleRent(gameId) {
        setRentingId(gameId)
        try {
            await rentGame(gameId)
            setSucess('Jogo alugado com sucesso!')
            await list()
        } catch (e) {
            setError(e.message)
        } finally {
            setRentingId(null)
        }
    }

    useEffect(() => {
        list()
    }, [])

    useEffect(() => {
        if (!error) return
        const t = setTimeout(() => setError(null), 3000)
        return () => clearTimeout(t)
    }, [error])

    useEffect(() => {
        if (!sucess) return
        const t = setTimeout(() => setSucess(null), 3000)
        return () => clearTimeout(t)
    }, [sucess])

    return (
        <div className='min-h-screen p-4 flex flex-col gap-4'>
            <Header />
            {error && (
                <p className='text-sm text-red-500'>{error}</p>
            )}
            {sucess && (
                <p className='text-sm text-green-600'>{sucess}</p>
            )}
            {games.map((game) => (
                <GameCard
                    key={game.id}
                    game={game}
                    rent={handleRent}
                    loading={rentingId === game.id}
                />
            ))}
            

        </div>
    )
}

export default Home
