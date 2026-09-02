import { AppDataSource } from "../config/dataSource";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user";
import { UserMapper } from "../mappers/UserMapper";
import { Users } from "../models/Users";
import bcrypt from 'bcryptjs'
import { ConflictError, NotFoundError } from "../errors"
import { Rentals } from "../models/Rentals";
import { IsNull } from "typeorm";

export class UserService {
    private repo = AppDataSource.getRepository(Users)
    private rentalRepo = AppDataSource.getRepository(Rentals)

    async register(data: any) {

        const exists = await this.repo.findOneBy({email: data.email})
        if(exists) throw new ConflictError('This email is already registered')
        const cpfExists = await this.repo.findOneBy({cpf: data.cpf})
        if(cpfExists) throw new ConflictError('This CPF is already registered')

        const password = await bcrypt.hash(data.password, 10)
        const parsed = CreateUserDTO.parse(data)

        const user = this.repo.create({...parsed, password: password})

        return await this.repo.save(user)
    }

    async showById(id: number) {

        const user = await this.repo.findOneBy({id})
        if(!user) throw new NotFoundError('User not found')
        
        return user
    }

    async list() {
        const users = await this.repo.find()

        if(!users) throw new NotFoundError('Users not found')

        return users
    }


    async showByEmail(email: string) {

        const user = await this.repo.findOneBy({email})
        if(!user) throw new NotFoundError('User not found')

        return user
    }
    

    async update(data: Partial<Users>, id: number) {
        const user = await this.repo.findOneBy({id})
        if(!user) throw new NotFoundError('User not found')

        const updatedUser = UpdateUserDTO.parse(data)
        if(updatedUser) {
            await this.repo.update(id, updatedUser)
        }

        // this.repo.save(user)
        return {message: 'User updated successfully'}
    }

    async delete(id: number) {
        const user = await this.repo.findOneBy({id})
        if(!user) throw new NotFoundError('User not found')
            
        await this.repo.delete(id)
        return {message: 'User deleted successfully'}
    }

      async showUserRentals(userId: number) {
        const rentals = await this.rentalRepo.find({where: {user: {id: userId}}, 
        relations: {user: true, game: true},
        order: {rented_at: 'ASC'}})
        if(!rentals) throw new NotFoundError('No rentals found for this user')
            
        return rentals
    }

    async showCurrentUserRentals(userId: number) {
        const rentals = await this.rentalRepo.find({where: {user: {id: userId}, returned_at: IsNull()}, 
        relations: {user: true, game: true},
        order: {rented_at: 'ASC'}})
        if(!rentals) throw new NotFoundError('No rentals found for this user')
            
        return rentals
    }

}