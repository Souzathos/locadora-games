import { AppDataSource } from "../config/dataSource";
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

    
}