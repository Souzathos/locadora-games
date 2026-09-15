import { api } from "./api";

export async function register(name, email, password, cpf) {
    return api('/user/create', {
        method: 'POST',
        body: JSON.stringify({name, email, password, cpf})
    })
}

export async function showUserRentals(userId) {
    return api(`/user/rentals/${userId}`)
}