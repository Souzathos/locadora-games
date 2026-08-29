import { AppDataSource } from "../config/dataSource";
import { Games } from "../models/Games";
import { BadRequestError } from "../errors";

const repo = AppDataSource.getRepository(Games)

export class GameService {

    async register ( name: string, price: number, category: string, deadline: Date) {

        if (!name || !price || !category || !deadline) {
            throw new Error('Name, price, category and deadline are required.')
        }
        const game = repo.create({
            name, price, category, deadline
        })

        await repo.save(game)

        return game
    }
    
    async update ( id: number, price?: number) {

        const game = await repo.findOneBy({id})

        if (!game) {
            throw new Error('Game not found')
        }

        if (price) {
            game.price = price
        }

        await repo.save(game)

        return game;
    }

    async delete ( id: number) {
        
        const game = await repo.findOneBy({id})

        if (!game) {
            throw new Error ('Game not found')
        }

        await repo.delete(id)
    }
}