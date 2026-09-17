import { useEffect, useState } from 'react'
import { showCurrentRentals, showLateRentals, showRentals } from '../../services/RentService'
import { daysLate, formatDate, isLate } from '../../utils/format'
import { useFlash } from '../../hooks/useFlash'
import Badge from '../Badge'

const TH = 'px-4 py-3 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase'
const TD = 'px-4 py-3 text-slate-700'

const FILTERS = [
    { key: 'all', label: 'Todos', request: showRentals },
    { key: 'current', label: 'Em andamento', request: showCurrentRentals },
    { key: 'late', label: 'Atrasados', request: showLateRentals }
]

function statusBadge(rental) {
    if (rental.returnedAt) return <Badge tone='slate'>Devolvido</Badge>
    if (isLate(rental)) return <Badge tone='red'>Atrasado ({daysLate(rental)}d)</Badge>

    return <Badge tone='amber'>Em andamento</Badge>
}

function AdminRentals() {
    const [filter, setFilter] = useState('all')
    const [rentals, setRentals] = useState([])
    const [loading, setLoading] = useState(true)
    const { error, setError } = useFlash()

    useEffect(() => {
        let active = true

        async function load() {
            setLoading(true)
            try {
                const data = await FILTERS.find((f) => f.key === filter).request()
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
    }, [filter, setError])

    const current = rentals.filter((r) => !r.returnedAt).length
    const late = rentals.filter(isLate).length

  return (
    <div className='flex flex-col gap-4'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
            <div className='inline-flex rounded-xl border border-rose-200 bg-white p-1'>
                {FILTERS.map((option) => (
                    <button
                        key={option.key}
                        type='button'
                        aria-pressed={filter === option.key}
                        onClick={() => setFilter(option.key)}
                        className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition ${filter === option.key ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-600 hover:bg-rose-50 hover:text-rose-700'}`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div className='flex gap-4 text-sm text-slate-600'>
                <span><strong className='text-slate-800'>{rentals.length}</strong> exibidos</span>
                <span><strong className='text-amber-600'>{current}</strong> em andamento</span>
                <span><strong className='text-red-600'>{late}</strong> atrasados</span>
            </div>
        </div>

        {error && (
            <p className='rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700'>{error}</p>
        )}

        {loading ? (
            <p className='py-8 text-center text-sm text-slate-500'>Carregando aluguéis...</p>
        ) : rentals.length === 0 ? (
            <p className='rounded-2xl border border-dashed border-rose-200 bg-white/60 px-6 py-12 text-center text-sm text-slate-500'>
                Nenhum aluguel neste filtro.
            </p>
        ) : (
            <div className='overflow-x-auto rounded-2xl border border-rose-100 bg-white shadow-sm'>
                <table className='w-full min-w-3xl text-sm'>
                    <thead className='border-b border-rose-100 bg-rose-50/60'>
                        <tr>
                            <th className={TH}>Jogo</th>
                            <th className={TH}>Usuário</th>
                            <th className={TH}>Alugado em</th>
                            <th className={TH}>Vencimento</th>
                            <th className={TH}>Devolvido em</th>
                            <th className={TH}>Status</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-rose-50'>
                        {rentals.map((rental) => (
                            <tr key={rental.id} className='transition hover:bg-rose-50/40'>
                                <td className={`${TD} font-medium text-slate-800`}>{rental.game?.name}</td>
                                <td className={TD}>
                                    <div className='flex flex-col'>
                                        <span className='font-medium text-slate-800'>{rental.user?.name}</span>
                                        <span className='text-xs text-slate-500'>{rental.user?.email}</span>
                                    </div>
                                </td>
                                <td className={TD}>{formatDate(rental.rentedAt)}</td>
                                <td className={TD}>{formatDate(rental.dueDate)}</td>
                                <td className={TD}>{formatDate(rental.returnedAt)}</td>
                                <td className={TD}>{statusBadge(rental)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
  )
}

export default AdminRentals
