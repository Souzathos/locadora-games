import { api } from "./api";

export function listGames() {
    return api('/game/list')
}

export function createGame(data) {
    return api('/game/create', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

export function updateGame(id, data) {
    return api(`/game/update/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}

export function deleteGame(id) {
    return api(`/game/delete/${id}`, { method: 'DELETE' })
}
