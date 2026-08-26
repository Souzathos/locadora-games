import { AppDataSource } from "../config/dataSource";
import { Users } from "../models/Users";
import bcrypt from 'bcryptjs'
export class AuthService {
    private repo = AppDataSource.getRepository(Users)

    async login(email: string, password: string) {

        if(!email || !password) throw new Error('Dados não inseridos')

        const user = await this.repo.findOneBy({email})
        if(!user) throw new Error('Credenciais inválidas')

        const validate = await bcrypt.compare(password, user.password)
        if(!validate) throw new Error('Credenciais inválidas')

        return user
    }
}