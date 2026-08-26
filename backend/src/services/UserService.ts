import { AppDataSource } from "../config/dataSource";
import { UserMapper } from "../mappers/UserMapper";
import { Users } from "../models/Users";
import bcrypt from 'bcryptjs'
export class UserService {
    private repo = AppDataSource.getRepository(Users)

    async register(data: any) {
        if(!data) throw new Error('Dados não inseridos')

        const exists = await this.repo.findOneBy({email: data.email})
        if(exists) throw new Error('Usuário já existe')
        const cpfExists = await this.repo.findOneBy({cpf: data.cpf})
        if(cpfExists) throw new Error('Usuário já existe')

        const password = await bcrypt.hash(data.password, 10)
        const user = this.repo.create({...data, password: password})

        return this.repo.save(user)
    }

    async showById(id: number) {
        if(!id) throw new Error('ID não fornecido')

        const user = await this.repo.findOneBy({id})
        if(!user) throw new Error('Usuário não encontrado')
        
        return UserMapper.toResponse(user)
    }

    async list() {
        const users = await this.repo.find()

        if(!users) throw new Error('Usuários não encontrados')

        return users.map((user) => UserMapper.toResponse(user))
    }


    async showByEmail(email: string) {
        if(!email) throw new Error('Email não fornecido')

        const user = await this.repo.findOneBy({email})
        if(!user) throw new Error('Usuário não encontrado')

        return UserMapper.toResponse(user)
    }
    

    async update(data: Partial<Users>, id: number) {
        const user = await this.repo.findOneBy({id})
        if(!user) throw new Error("Usuário não encontrado")

        await this.repo.update(id, data)

        // this.repo.save(user)
        return {message: 'Usuário atualizado com sucesso!'}
    }
}