import { AppDataSource } from "../config/dataSource";
import { Games } from "../models/Games";
import { BadRequestError, NotFoundError } from "../errors";
import { UpdateGameDTO } from "../dtos/game";

const repo = AppDataSource.getRepository(Games)

export class GameService {

    async list () {
        const games = await repo.find()

        if(!games) throw new NotFoundError('No games found')

        return games
    }

    async register ( name: string, price: number, category: string, rental_days?: number) {

        if (!name || !price || !category) {
            throw new BadRequestError('Name, price and category are required')
        }
        const game = repo.create({
            name, price, category, rental_days
        })

        await repo.save(game)

        return game
    }
    
    async update ( id: number, data: UpdateGameDTO) {

        const game = await repo.findOneBy({id})

        if (!game) {
            throw new NotFoundError('Game not found')
        }

       if(Object.keys(data).length === 0) {
            throw new BadRequestError('No fields provided for update')
        }

        if(data.name) game.name = data.name
        if(data.price) game.price = Number(data.price)
        if(data.category) game.category = data.category
        if(data.rental_days) game.rental_days = Number(data.rental_days)

        await repo.save(game)

        return {message: 'Game updated successfully'};
    }

    async delete ( id: number) {
        
        const game = await repo.findOneBy({id})

        if (!game) {
            throw new NotFoundError('Game not found')
        }

        await repo.delete(id)
    }
}
