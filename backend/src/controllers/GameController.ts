import { Request, Response } from "express";
import { GameService } from "../services/GameService";

const gameService = new GameService()

export class GameController {
    async create (req: Request, res: Response) {

        const {name, price, category, deadline} = req.body

        const game = await gameService.register(name, Number(price), category, deadline)

        return res.status(201).json(game)
    }

    async update (req: Request, res: Response) {
        
        const {price} = req.body

        const game = await gameService.update(Number(price))

        return res.status(201).json(game)
    }

    async delete (req: Request, res: Response) {

         await gameService.delete(Number(req.params.id))

         return res.status(204).send()
    }
}