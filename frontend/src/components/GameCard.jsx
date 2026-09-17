import { formatPrice } from '../utils/format'
import Badge from './Badge'
import Button from './Button'

function GameCard({game, rent, loading}) {
  return (
    <div className='flex flex-col gap-4 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm'>
        <div className='flex items-start justify-between gap-3'>
            <div>
                <h3 className='font-semibold text-slate-800'>{game.name}</h3>
                <p className='mt-1 text-xs text-slate-500'>{game.rental_days} dias de aluguel</p>
            </div>
            {game.rented ? (
                <Badge tone='amber'>Alugado</Badge>
            ) : (
                <Badge tone='green'>Disponível</Badge>
            )}
        </div>

        <div className='flex items-end justify-between gap-3'>
            <Badge tone='rose'>{game.category}</Badge>
            <span className='text-lg font-bold text-rose-600'>{formatPrice(game.price)}</span>
        </div>

        <Button
            className='w-full'
            onClick={() => rent(game.id)}
            disabled={game.rented}
            loading={loading}
        >
            {game.rented ? 'Indisponível' : loading ? 'Alugando...' : 'Alugar'}
        </Button>
    </div>
  )
}

export default GameCard
