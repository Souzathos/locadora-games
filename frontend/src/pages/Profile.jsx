import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import UserGamesCard from '../components/UserGamesCard'
import { returnGame } from '../services/RentService'
import { showUserRentals } from '../services/UserService'

function Profile() {
    const [games, setGames] = useState([])
    const [error, setError] = useState(null)
    const [sucess, setSucess] = useState(null)
    const [userId, setUserId] = useState(null)


    async function showMyRentals(id) {
        try {
            const data = await showUserRentals(id)

            setGames(data)
            
        } catch(e) {
            setError(e.message)
        }
    }


    async function returnG(id) {
        try {
            await returnGame(id)
            await showMyRentals(userId)

            setSucess('Jogo retornado com sucesso.')
        } catch(e) {
            setError(e.message)
            setSucess(null)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) return setError('Você precisa estar logado.')
        const { id } = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
        setUserId(id)
        showMyRentals(id)
    }, [])

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
    <div>
        <Header />

        {error && <p className='text-xs text-red-500'>{error}</p>}
        {sucess && <p className='text-xs text-green-500'>{sucess}</p>}

        {games.map((r) => (
            <UserGamesCard 
            key={r.id}
            game={{ ...r.game, rented: !r.returnedAt }}
            returnGame={returnG}/>
        ))}
    </div>
  )
}

export default Profile