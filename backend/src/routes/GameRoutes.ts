import { Router } from "express";
import { GameController } from "../controllers/GameController";

const gameRoutes = Router()
const controller = new GameController()

gameRoutes.post('/create', controller.create.bind(controller))
gameRoutes.patch('/games/:id', controller.update.bind(controller))
gameRoutes.delete('/games/:id', controller.delete.bind(controller))

export default gameRoutes