const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

export function formatPrice(value) {
    if (value === null || value === undefined || value === '') return '—'

    const number = Number(value)
    if (Number.isNaN(number)) return '—'

    return priceFormatter.format(number)
}

export function formatDate(iso) {
    if (!iso) return '—'

    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return '—'

    return date.toLocaleDateString('pt-BR')
}

export function isLate(rental) {
    if (!rental || rental.returnedAt) return false

    return new Date(rental.dueDate) < new Date()
}

export function daysLate(rental) {
    if (!isLate(rental)) return 0

    const diff = Date.now() - new Date(rental.dueDate).getTime()

    return Math.floor(diff / (1000 * 60 * 60 * 24))
}
