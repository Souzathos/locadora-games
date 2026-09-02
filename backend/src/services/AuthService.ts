import { AppDataSource } from "../config/dataSource";
import { Users } from "../models/Users";
import bcrypt from 'bcryptjs'
import { BadRequestError, UnauthorizedError } from "../errors"
export class AuthService {
    private repo = AppDataSource.getRepository(Users)

    async login(email: string, password: string) {

        if(!email || !password) throw new BadRequestError('Email and password are required')

        const user = await this.repo.findOneBy({email})
        if(!user) throw new UnauthorizedError('Invalid email or password')

        const validate = await bcrypt.compare(password, user.password)
        if(!validate) throw new UnauthorizedError('Invalid email or password')

        return user
    }
}