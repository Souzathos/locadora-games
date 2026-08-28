import { Request, Response } from "express";
import { GameService } from "../services/GameService";

const gameService = new GameService()

export class GameController {
    async register (req: Request, res: Response) {

        const {name, price, category, deadline} = req.body

        const game = await GameService.register(name, Number(price), category, deadline)

        return res.status(201).json(game)
    }
}