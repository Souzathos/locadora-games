import { AppDataSource } from "../config/dataSource";
import { Games } from "../models/Games";
import { BadRequestError, NotFoundError } from "../errors";
import { Users } from "../models/Users";
import { UpdateGameDTO } from "../dtos/game";

const repo = AppDataSource.getRepository(Games)
const userRepo = AppDataSource.getRepository(Users)

export class GameService {

    async list () {
        const games = await repo.find()

        if(!games) throw new NotFoundError('Game not found')

        return games
    }

    async register ( name: string, price: number, category: string, deadline: Date) {

        if (!name || !price || !category || !deadline) {
            throw new BadRequestError('Name, price, category and deadline are required.')
        }
        const game = repo.create({
            name, price, category, deadline
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
            throw new BadRequestError('No data provided for update')
        }

        if(data.name) game.name = data.name
        if(data.price) game.price = Number(data.price)
        if(data.category) game.category = data.category
        if(data.deadline) game.deadline = new Date(data.deadline)

        await repo.save(game)

        return game;
    }

    async delete ( id: number) {
        
        const game = await repo.findOneBy({id})

        if (!game) {
            throw new NotFoundError('Game not found')
        }

        await repo.delete(id)
    }

    async rent(gameId:number, userId:number) {
        const game = await repo.findOneBy({id: gameId})
        if(!game) throw new NotFoundError('Game not found')
        const user = await userRepo.findOneBy({id: userId})
        if(!user) throw new NotFoundError('User not found')

        
        
    }
}