import React from 'react'

function GameCard({game, rent, loading}) {

  return (
    <div className='bg-rose-200 border border-b-gray-300 rounded-2xl p-4'>
        <div className='flex flex-col p-2 gap-2 bg-gray-200'>
            <p>{game.name}</p>
            <p>{game.price}</p>
            <p>{game.category}</p>
            <p>{game.rental_days}</p>
            {game.rented ? <p>Alugado</p> : <p>Disponivel</p>}

        </div>
        <button
            onClick={() => rent(game.id)}
            disabled={game.rented || loading}
            className='mt-2 w-full rounded-xl bg-rose-500 px-4 py-2 text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
        >
            {game.rented ? 'Indisponivel' : loading ? 'Alugando...' : 'Alugar'}
        </button>
    </div>
  )
}

export default GameCard
