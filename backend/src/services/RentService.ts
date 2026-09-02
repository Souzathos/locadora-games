import { IsNull, LessThan } from "typeorm";
import { AppDataSource } from "../config/dataSource";
import { ConflictError, ForbiddenError, NotFoundError } from "../errors";
import { Games } from "../models/Games";
import { Rentals } from "../models/Rentals";
import { Users } from "../models/Users";

export class RentService {
    private repo = AppDataSource.getRepository(Rentals)
    private userRepo = AppDataSource.getRepository(Users)
    private gameRepo = AppDataSource.getRepository(Games)

    async show() {
        const rentals = await this.repo.find({relations: {user: true, game: true}, 
        order: {rented_at: 'ASC'}})

        return rentals
    }

    async showLate() {

        const lateRentals = await this.repo.find({
            where: {returned_at: IsNull(), due_date: LessThan(new Date())},
            relations: {user: true, game: true},
            order: {due_date: 'ASC'}
        })

        return lateRentals
    }

    async showCurrent() {
        const currentRentals = await this.repo.find({
            where: {returned_at: IsNull()},
            relations: {user: true, game: true},
            order: {rented_at: 'ASC'}
        })

        return currentRentals
    }

    async rent(gameId:number, userId:number) {

        const game = await this.gameRepo.findOneBy({id: gameId})
        if(!game) throw new NotFoundError('Game not found')

        const user = await this.userRepo.findOneBy({id: userId})
        if(!user) throw new NotFoundError('User not found')

        const isRented = await this.repo.existsBy({game: {id: gameId}, returned_at: IsNull()})
        if(isRented) throw new ConflictError('This game is already rented')

        // mesmo where, metodo diferente: devolve true/false em vez do objeto (ou null)
        const hasOverdueRental = await this.repo.existsBy({user: {id: userId}, returned_at: IsNull(), due_date: LessThan(new Date())})
        if(hasOverdueRental) throw new ForbiddenError('You have overdue rentals. Return them before renting another game.')

        const due_date = new Date()
        due_date.setDate(due_date.getDate() + game.rental_days)

        const newRental = this.repo.create({
            game,
            user,
            due_date,
            price_paid: Number(game.price)
        })

        await this.repo.save(newRental)

        game.rented = true
        game.rented_at = new Date()
        game.user = user

        await this.gameRepo.save(game)

        return newRental
    }

    async return(gameId: number, userId: number) {
        const game = await this.gameRepo.findOneBy({id: gameId})
        if(!game) throw new NotFoundError('Game not found')


        const activeRental = await this.repo.findOne({where: {game: {id: gameId}, returned_at: IsNull()}, 
        relations: {user: true, game: true}})

        if(!activeRental) throw new NotFoundError('This game is not currently rented')
        if(activeRental.user.id !== userId) throw new ForbiddenError('You cannot return a game rented by another user')

        const returnedAt = new Date()

        activeRental.returned_at = returnedAt
        await this.repo.save(activeRental)

        game.user = null
        game.rented = false
        game.rented_at = null
        await this.gameRepo.save(game)

        const isLate = returnedAt > activeRental.due_date

        return {
            rental: activeRental,
            isLate,
            message: isLate
                ? 'Game returned after the due date'
                : 'Game returned successfully'
        }
    }
}
