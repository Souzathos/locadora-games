import { Request, Response } from "express";
import { GameService } from "../services/GameService";

export class GameController {
    private service = new GameService()

    async register (req: Request, res: Response) {

        const {name, price, category, deadline} = req.body

        const game = await this.service.register(name, Number(price), category, deadline)

        return res.status(201).json(game)
    }
}