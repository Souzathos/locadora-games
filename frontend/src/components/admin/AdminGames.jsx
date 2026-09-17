import { useEffect, useMemo, useState } from 'react'
import { createGame, deleteGame, listGames, updateGame } from '../../services/GameService'
import { formatPrice } from '../../utils/format'
import { useFlash } from '../../hooks/useFlash'
import Badge from '../Badge'
import Button from '../Button'
import Input from '../Input'
import Modal from '../Modal'

const TH = 'px-4 py-3 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase'
const TD = 'px-4 py-3 text-slate-700'
const PRICE_REGEX = /^\d+(\.\d{1,2})?$/

function emptyForm(game) {
    return {
        name: game?.name ?? '',
        price: game ? String(game.price) : '',
        category: game?.category ?? '',
        rental_days: game ? String(game.rental_days) : '14'
    }
}

function validate(values) {
    const errors = {}

    if (values.name.trim().length < 3 || values.name.trim().length > 100) {
        errors.name = 'O nome deve ter entre 3 e 100 caracteres.'
    }
    if (!PRICE_REGEX.test(values.price.trim())) {
        errors.price = 'Informe um preço válido, ex: 59.90'
    }
    if (values.category.trim().length < 3 || values.category.trim().length > 100) {
        errors.category = 'A categoria deve ter entre 3 e 100 caracteres.'
    }
    if (!Number.isInteger(Number(values.rental_days)) || Number(values.rental_days) < 1) {
        errors.rental_days = 'Informe pelo menos 1 dia de aluguel.'
    }

    return errors
}

function AdminGames() {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(null)
    const [formErrors, setFormErrors] = useState({})
    const [saving, setSaving] = useState(false)
    const [toDelete, setToDelete] = useState(null)
    const [deleting, setDeleting] = useState(false)
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

    function openForm(game) {
        setEditing(game)
        setForm(emptyForm(game))
        setFormErrors({})
    }

    function closeForm() {
        setForm(null)
        setEditing(null)
    }

    async function handleSave(e) {
        e.preventDefault()

        const found = validate(form)
        setFormErrors(found)
        if (Object.keys(found).length > 0) return

        // price vai como string e rental_days como number: é o que o DTO do backend exige
        const payload = {
            name: form.name.trim(),
            price: form.price.trim(),
            category: form.category.trim(),
            rental_days: Number(form.rental_days)
        }

        setSaving(true)
        try {
            if (editing) {
                // o backend aceita parcial e rejeita objeto vazio
                const initial = emptyForm(editing)
                const changed = Object.fromEntries(
                    Object.entries(payload).filter(
                        ([key, value]) => String(value) !== String(initial[key]).trim()
                    )
                )

                if (Object.keys(changed).length === 0) {
                    setSaving(false)
                    return setFormErrors({form: 'Nenhuma alteração para salvar.'})
                }

                await updateGame(editing.id, changed)
                setSuccess('Jogo atualizado com sucesso.')
            } else {
                await createGame(payload)
                setSuccess('Jogo cadastrado com sucesso.')
            }

            closeForm()
            // update/create não retornam o jogo, então a lista precisa ser refeita
            await refresh()
        } catch (e) {
            setError(e.message)
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete() {
        setDeleting(true)
        try {
            await deleteGame(toDelete.id)
            setSuccess(`"${toDelete.name}" foi excluído.`)
            setToDelete(null)
            await refresh()
        } catch (e) {
            setError(e.message)
        } finally {
            setDeleting(false)
        }
    }

  return (
    <div className='flex flex-col gap-4'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
            <div className='w-full sm:max-w-xs'>
                <Input placeholder='Buscar por nome ou categoria...'
                    value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Button onClick={() => openForm(null)}>+ Novo jogo</Button>
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
                {search ? 'Nenhum jogo encontrado para essa busca.' : 'Nenhum jogo cadastrado ainda.'}
            </p>
        ) : (
            <div className='overflow-x-auto rounded-2xl border border-rose-100 bg-white shadow-sm'>
                <table className='w-full min-w-3xl text-sm'>
                    <thead className='border-b border-rose-100 bg-rose-50/60'>
                        <tr>
                            <th className={TH}>Jogo</th>
                            <th className={TH}>Categoria</th>
                            <th className={TH}>Preço</th>
                            <th className={TH}>Dias</th>
                            <th className={TH}>Status</th>
                            <th className={`${TH} text-right`}>Ações</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-rose-50'>
                        {filtered.map((game) => (
                            <tr key={game.id} className='transition hover:bg-rose-50/40'>
                                <td className={`${TD} font-medium text-slate-800`}>{game.name}</td>
                                <td className={TD}><Badge tone='rose'>{game.category}</Badge></td>
                                <td className={TD}>{formatPrice(game.price)}</td>
                                <td className={TD}>{game.rental_days} dias</td>
                                <td className={TD}>
                                    {game.rented ? (
                                        <Badge tone='amber'>Alugado</Badge>
                                    ) : (
                                        <Badge tone='green'>Disponível</Badge>
                                    )}
                                </td>
                                <td className={TD}>
                                    <div className='flex justify-end gap-2'>
                                        <Button size='sm' variant='secondary' onClick={() => openForm(game)}>
                                            Editar
                                        </Button>
                                        <Button
                                            size='sm'
                                            variant='danger'
                                            disabled={game.rented}
                                            title={game.rented ? 'Jogo alugado não pode ser excluído' : undefined}
                                            onClick={() => setToDelete(game)}
                                        >
                                            Excluir
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}

        <Modal open={Boolean(form)} title={editing ? 'Editar jogo' : 'Novo jogo'} onClose={closeForm}>
            {form && (
                <form className='flex flex-col gap-4' onSubmit={handleSave}>
                    <Input label='Nome' placeholder='Elden Ring' error={formErrors.name}
                        value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
                    <Input label='Categoria' placeholder='RPG' error={formErrors.category}
                        value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} />
                    <div className='flex gap-4'>
                        <Input label='Preço (R$)' placeholder='59.90' inputMode='decimal' error={formErrors.price}
                            value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />
                        <Input label='Dias de aluguel' type='number' min='1' error={formErrors.rental_days}
                            value={form.rental_days} onChange={(e) => setForm({...form, rental_days: e.target.value})} />
                    </div>

                    {formErrors.form && <p className='text-sm text-red-500'>{formErrors.form}</p>}

                    <div className='mt-2 flex justify-end gap-2'>
                        <Button type='button' variant='secondary' onClick={closeForm}>Cancelar</Button>
                        <Button type='submit' loading={saving}>
                            {editing ? 'Salvar alterações' : 'Cadastrar jogo'}
                        </Button>
                    </div>
                </form>
            )}
        </Modal>

        <Modal open={Boolean(toDelete)} title='Excluir jogo' onClose={() => setToDelete(null)}>
            <p className='text-sm text-slate-600'>
                Tem certeza que deseja excluir <strong>{toDelete?.name}</strong>? Essa ação não pode ser desfeita.
            </p>
            <div className='mt-5 flex justify-end gap-2'>
                <Button variant='secondary' onClick={() => setToDelete(null)}>Cancelar</Button>
                <Button variant='danger' loading={deleting} onClick={handleDelete}>Excluir</Button>
            </div>
        </Modal>
    </div>
  )
}

export default AdminGames
