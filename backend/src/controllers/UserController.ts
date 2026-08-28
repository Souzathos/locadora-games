import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserMapper } from "../mappers/UserMapper";

export class UserController {
    private service = new UserService()


    async create (req: Request, res: Response) {
        const data = req.body
        const user = await this.service.register(data)

        return res.status(201).json(UserMapper.toResponse(user))
    }

    async list(req:Request, res:Response) {
        const users = await this.service.list()

        return res.status(200).json(users)
    }

    async showById(req:Request, res:Response) {
        const user = await this.service.showById(Number(req.params.id))

        return res.status(200).json(user)
    }

    async showByEmail(req:Request, res:Response) {
        const {email} = req.body
        const user = await this.service.showByEmail(email)

        return res.status(200).json(user)
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
}
