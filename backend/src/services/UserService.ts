import { AppDataSource } from "../config/dataSource";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user";
import { UserMapper } from "../mappers/UserMapper";
import { Users } from "../models/Users";
import bcrypt from 'bcryptjs'
import { ConflictError, NotFoundError } from "../errors"

export class UserService {
    private repo = AppDataSource.getRepository(Users)

    async register(data: any) {

        const exists = await this.repo.findOneBy({email: data.email})
        if(exists) throw new ConflictError('Usuário já existe')
        const cpfExists = await this.repo.findOneBy({cpf: data.cpf})
        if(cpfExists) throw new ConflictError('Usuário já existe')

        const password = await bcrypt.hash(data.password, 10)
        const parsed = CreateUserDTO.parse(data)

        const user = this.repo.create({...parsed, password: password})

        return await this.repo.save(user)
    }

    async showById(id: number) {

        const user = await this.repo.findOneBy({id})
        if(!user) throw new NotFoundError('Usuário não encontrado')
        
        return UserMapper.toResponse(user)
    }

    async list() {
        const users = await this.repo.find()

        if(!users) throw new NotFoundError('Usuários não encontrados')

        return users.map((user) => UserMapper.toResponse(user))
    }


    async showByEmail(email: string) {

        const user = await this.repo.findOneBy({email})
        if(!user) throw new NotFoundError('Usuário não encontrado')

        return UserMapper.toResponse(user)
    }
    

    async update(data: Partial<Users>, id: number) {
        const user = await this.repo.findOneBy({id})
        if(!user) throw new NotFoundError("Usuário não encontrado")

        const updatedUser = UpdateUserDTO.parse(data)
        if(updatedUser) {
            await this.repo.update(id, updatedUser)
        }

        // this.repo.save(user)
        return {message: 'Usuário atualizado com sucesso!'}
    }

    async delete(id: number) {
        const user = await this.repo.findOneBy({id})
        if(!user) throw new NotFoundError("Usuário não encontrado")
            
        await this.repo.delete(id)
        return {message: 'Usuário deletado com sucesso!'}
    }

    
}