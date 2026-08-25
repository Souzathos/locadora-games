import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {

    async list (req: Request, res: Response) {
        try {
            const user = await userService.list()
            return res.status(200).json(user);
        }
        catch (e: any) {
            return res.status(404).json({message: e.message});
        }
    }

    async create (req: Request, res: Response) {}
}