import { api } from "./api";

export function rent(gameId) {
    return api(`/rent/${gameId}`, { method: 'POST' })
}

export function returnGame(gameId) {
    return api(`/rent/return/${gameId}`, { method: 'POST' })
}

export function showRentals() {
    return api('/rent/show')
}

export function showLateRentals() {
    return api('/rent/show-late')
}

export function showCurrentRentals() {
    return api('/rent/show-current')
}
