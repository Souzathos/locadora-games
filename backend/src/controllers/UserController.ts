import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserMapper } from "../mappers/UserMapper";
import { RentMapper } from "../mappers/RentMapper";

export class UserController {
    private service = new UserService()


    async create (req: Request, res: Response) {
        const data = req.body
        const user = await this.service.register(data)

        return res.status(201).json(UserMapper.toResponse(user))
    }

    async list(req:Request, res:Response) {
        const users = await this.service.list()

        return res.status(200).json(users.map((u) => UserMapper.toResponse(u)))
    }

    async showById(req:Request, res:Response) {
        const user = await this.service.showById(Number(req.params.id))

        return res.status(200).json(UserMapper.toResponse(user))
    }

    async showByEmail(req:Request, res:Response) {
        const {email} = req.body
        const user = await this.service.showByEmail(email)

        return res.status(200).json(UserMapper.toResponse(user))
    }

    async update(req:Request, res:Response) {
        const data = req.body

        const user = await this.service.update(data, Number(req.params.id))

        return res.status(200).json(user)
    }

    async delete(req:Request, res:Response) {
        const user = await this.service.delete(Number(req.params.id))

        return res.status(200).json(user)
    }

    async showUserRentals(req:Request, res:Response) {
        const user = await this.service.showUserRentals(Number(req.params.id))

        return res.status(200).json(user.map((u) => RentMapper.toResponse(u)))
    }

    async showCurrentUserRentals(req:Request, res:Response) {
        const user = await this.service.showCurrentUserRentals(Number(req.params.id))

        return res.status(200).json(user.map((u) => RentMapper.toResponse(u)))
    }
}
