import { formatDate, formatPrice } from '../utils/format'
import Badge from './Badge'
import Button from './Button'

function UserGamesCard({game, rental, returnGame, loading}) {
    const late = game.rented && rental?.dueDate && new Date(rental.dueDate) < new Date()

  return (
    <div className='flex flex-col gap-4 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm'>
        <div className='flex items-start justify-between gap-3'>
            <div>
                <h3 className='font-semibold text-slate-800'>{game.name}</h3>
                <p className='mt-1 text-xs text-slate-500'>{game.rental_days} dias de aluguel</p>
            </div>
            {!game.rented ? (
                <Badge tone='slate'>Devolvido</Badge>
            ) : late ? (
                <Badge tone='red'>Atrasado</Badge>
            ) : (
                <Badge tone='amber'>Alugado</Badge>
            )}
        </div>

        <div className='flex flex-col gap-1 rounded-xl bg-rose-50/70 px-3 py-2 text-xs text-slate-600'>
            <div className='flex justify-between'>
                <span>Alugado em</span>
                <span className='font-semibold text-slate-700'>{formatDate(rental?.rentedAt)}</span>
            </div>
            <div className='flex justify-between'>
                <span>{game.rented ? 'Devolver até' : 'Devolvido em'}</span>
                <span className={`font-semibold ${late ? 'text-red-600' : 'text-slate-700'}`}>
                    {formatDate(game.rented ? rental?.dueDate : rental?.returnedAt)}
                </span>
            </div>
        </div>

        <div className='flex items-end justify-between gap-3'>
            <Badge tone='rose'>{game.category}</Badge>
            <span className='text-lg font-bold text-rose-600'>
                {formatPrice(rental?.pricePaid ?? game.price)}
            </span>
        </div>

        <Button
            className='w-full'
            onClick={() => returnGame(game.id)}
            disabled={!game.rented}
            loading={loading}
        >
            {game.rented ? 'Retornar' : 'Retornado'}
        </Button>
    </div>
  )
}

export default UserGamesCard
