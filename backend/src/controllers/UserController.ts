import { Request, Response } from "express";
import { UserService } from "../services/UserService";

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
}