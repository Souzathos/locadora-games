import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { generateToken } from "../utils/jwt";
import { UserMapper } from "../mappers/UserMapper";

export class AuthController {
    private service = new AuthService()

    async login(req:Request, res:Response) {
        const {email, password} = req.body

        const user = await this.service.login(email, password)

        const token = generateToken({
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            isAdmin: user.isAdmin
        })

        return res.status(200).json({user: UserMapper.toResponse(user), token})
    }

}
