import { AppDataSource } from "../config/dataSource";
import { Games } from "../models/Games";

const repo = AppDataSource.getRepository(Games)

export class GameService {
    

    async register( name: string, price: number, category: string, deadline: Date) {
        if (!name || !price || !category || !deadline) {
            throw new Error('Name, price, category and deadline are required.')
        }

        const game = repo.create({
            name, price, category, deadline
        })

        await repo.save(game)

        return game
    }
}