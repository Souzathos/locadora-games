import { AppDataSource } from "../config/dataSource";
import { Games } from "../models/Games";
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from "../errors";
import { Users } from "../models/Users";
import { UpdateGameDTO } from "../dtos/game";
import { Rentals } from "../models/Rentals";
import { IsNull, LessThan, Not } from "typeorm";
import { boolean } from "zod";

const repo = AppDataSource.getRepository(Games)
const userRepo = AppDataSource.getRepository(Users)
const rentalRepo = AppDataSource.getRepository(Rentals)

export class GameService {

    async list () {
        const games = await repo.find()

        if(!games) throw new NotFoundError('Game not found')

        return games
    }

    async register ( name: string, price: number, category: string, rental_days?: number) {

        if (!name || !price || !category) {
            throw new BadRequestError('Name, price, and category are required')
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
            throw new BadRequestError('No data provided for update')
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

    async rent(gameId:number, userId:number) {

        const game = await repo.findOneBy({id: gameId})
        if(!game) throw new NotFoundError('Game not found')

        const user = await userRepo.findOneBy({id: userId})
        if(!user) throw new NotFoundError('User not found')

        const isRented = await rentalRepo.existsBy({game: {id: gameId}, returned_at: IsNull()})
        if(isRented) throw new ConflictError('Game is already rented')

        // mesmo where, metodo diferente: devolve true/false em vez do objeto (ou null)
        const hasOverdueRental = await rentalRepo.existsBy({user: {id: userId}, returned_at: IsNull(), due_date: LessThan(new Date())})
        if(hasOverdueRental) throw new ForbiddenError('This user cannot rent another game. You have games that you did not returned in the deadline.')

        const due_date = new Date()
        due_date.setDate(due_date.getDate() + game.rental_days)

        const newRental = rentalRepo.create({
            game,
            user,
            due_date,
            price_paid: Number(game.price)
        })

        await rentalRepo.save(newRental)

        game.rented = true
        game.rented_at = new Date()
        game.user = user

        await repo.save(game)

        return newRental
    }

    async return(gameId: number, userId: number) {
        const game = await repo.findOneBy({id: gameId})
        if(!game) throw new NotFoundError('Game not found')


        const activeRental = await rentalRepo.findOne({where: {game: {id: gameId}, returned_at: IsNull()}, 
        relations: {user: true, game: true}})

        if(!activeRental) throw new NotFoundError('Rent not found')
        if(activeRental.user.id !== userId) throw new ForbiddenError('You cannot return a game that you did not rent')

        const returnedAt = new Date()

        activeRental.returned_at = returnedAt
        await rentalRepo.save(activeRental)

        game.user = null
        game.rented = false
        game.rented_at = null
        await repo.save(game)

        const isLate = returnedAt > activeRental.due_date

        return {
            rental: activeRental,
            isLate,
            message: isLate
                ? 'Game returned after the deadline'
                : 'Game returned successfully'
        }
    }
}