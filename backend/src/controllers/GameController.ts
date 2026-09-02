import { Request, Response } from "express";
import { GameService } from "../services/GameService";

const gameService = new GameService()

export class GameController {

    async list(req: Request, res: Response) {
        const games = await gameService.list()

        return res.status(200).json(games)
    }

    async create (req: Request, res: Response) {

        const {name, price, category, rental_days} = req.body

        const game = await gameService.register(name, Number(price), category, rental_days)

        return res.status(201).json(game)
    }

    async update (req: Request, res: Response) {
        
        const game = await gameService.update(Number(req.params.id), req.body)

        return res.status(201).json(game)
    }

    async delete (req: Request, res: Response) {

         await gameService.delete(Number(req.params.id))

         return res.status(204).send()
    }
}
