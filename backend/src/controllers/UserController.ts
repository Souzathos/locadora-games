import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { generateToken } from "../utils/jwt";

const userService = new UserService();

export class UserController {
    private service = new UserService()


    async create (req: Request, res: Response) {
        try {
            const data = req.body
            const user = await this.service.register(data)

            const safe = user
            delete(safe as any).password

            return res.status(201).json(safe)
        } catch(e: any) {
            return res.status(400).json({message: e.message})
        }
    }

    async list(req:Request, res:Response) {
        try {
            const users = await this.service.list()

            return res.status(200).json(users)
        }catch(e: any) {
            return res.status(404).json({message: e.message})
        }
    }

    async showById(req:Request, res:Response) {
        try {
            const user = await this.service.showById(Number(req.params.id))

            return res.status(200).json(user)
        } catch(e: any) {
            return res.status(404).json({message: e.message})
        }
    }

    async showByEmail(req:Request, res:Response) {
        try {
            const {email} = req.body
            const user = await this.service.showByEmail(email)

            return res.status(200).json(user)
        } catch(e: any) {
            return res.status(404).json({message: e.message})
        }
    }

    async update(req:Request, res:Response) {
        try {
            const data = req.body
            
            const user = await this.service.update(data, Number(req.params.id))

            return res.status(200).json(user)
        } catch(e: any) {
            return res.status(400).json({message: e.message})
        }
    }
}