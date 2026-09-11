import { api } from "./api";

export function listGames() {
    return api('/game/list')
}